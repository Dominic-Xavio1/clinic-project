import React, { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"
import DashboardLayout from "../other/DashboardLayout"
import { API_BASE_URL, createApiEndpoint } from "../../config/api"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import toast from "react-hot-toast"

const MessagesPage = () => {
  const role = localStorage.getItem("role")
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const headers = { Authorization: `Bearer ${token}` }
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState("")
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const socketRef = useRef(null)

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u._id !== userId &&
        (u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()))
    )
  }, [users, search, userId])

  const loadUsers = async () => {
    try {
      const res = await axios.get(createApiEndpoint("auth/users"), { headers })
      if (res.data.success) {
        setUsers(res.data.users || [])
        if (!selectedUser && res.data.users?.length) {
          const first = res.data.users.find((u) => u._id !== userId)
          if (first) setSelectedUser(first._id)
        }
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to load users")
    }
  }

  const loadMessages = async (targetId) => {
    if (!targetId) return
    try {
      const res = await axios.get(createApiEndpoint(`register/messages?with=${targetId}`), { headers })
      if (res.data.success) setMessages(res.data.messages)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load messages")
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    if (!token) return
    socketRef.current = io(API_BASE_URL, {
      auth: { token },
      transports: ["websocket"],
    })
    socketRef.current.on("message:new", (msg) => {
      const involves = msg.from?._id === selectedUser || msg.to?._id === selectedUser || msg.to === selectedUser
      if (involves) {
        setMessages((prev) => [...prev, msg])
      }
    })
    socketRef.current.on("connect_error", (err) => {
      console.error("Socket error", err)
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [token, selectedUser])

  useEffect(() => {
    loadMessages(selectedUser)
  }, [selectedUser])

  const send = async () => {
    if (!selectedUser) return toast.error("Choose someone to chat with")
    if (!content.trim()) return toast.error("Message required")
    try {
      const res = await axios.post(createApiEndpoint("register/messages"), { content, to: selectedUser }, { headers })
      if (res.data.success) {
        setContent("")
        // message will be appended via socket; also append optimistically
        setMessages((prev) => [...prev, res.data.message])
      }
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Send failed")
    }
  }

  return (
    <DashboardLayout>
      <div className="grid md:grid-cols-[280px_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>People</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filteredUsers.map((u) => (
                <div
                  key={u._id}
                  className={`p-2 rounded border cursor-pointer ${selectedUser === u._id ? "border-primary" : "border-transparent hover:border-border"}`}
                  onClick={() => setSelectedUser(u._id)}
                >
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.role}</div>
                </div>
              ))}
              {filteredUsers.length === 0 && <p className="text-xs text-muted-foreground">No users</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle>
              {selectedUser
                ? `Chat with ${users.find((u) => u._id === selectedUser)?.name || "User"}`
                : "Select someone to chat"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3 pb-4">
              {messages.map((msg) => {
                const isMine = msg.from?._id === userId || msg.from === userId
                return (
                  <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${isMine ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <p className="text-xs text-muted-foreground mb-1">
                        {msg.from?.name || "You"}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                )
              })}
              {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
            </div>
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder={selectedUser ? "Write your message..." : "Select a user first"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
              />
              <Button onClick={send} disabled={!selectedUser}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default MessagesPage