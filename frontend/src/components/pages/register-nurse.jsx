import React, { useState } from "react"
import DashboardLayout from "../other/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import toast from "react-hot-toast"
import { createApiEndpoint } from "../../config/api"
import { useNavigate } from "react-router-dom"

const RegisterNurse = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(createApiEndpoint("auth/nurse"), form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        toast.success("Nurse registered")
        setForm({ name: "", email: "", password: "" })
        navigate("/dashboard")
      } else {
        toast.error(res.data.message || "Failed to register")
      }
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Failed to register")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <Card className="w-[480px]">
          <CardHeader>
            <CardTitle>Register Nurse</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <Input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Register"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RegisterNurse

