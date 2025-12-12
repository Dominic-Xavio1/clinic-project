import React, { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "../other/DashboardLayout"
import { createApiEndpoint } from "../../config/api"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import toast from "react-hot-toast"

const emptyForm = { title: "", description: "", prevention: "" }

const DiseasesPage = () => {
  const [diseases, setDiseases] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  const isStaff = role === "doctor" || role === "nurse"

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const load = async () => {
    try {
      const res = await axios.get(createApiEndpoint("register/diseases"), { headers })
      if (res.data.success) setDiseases(res.data.diseases)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load diseases")
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(createApiEndpoint(`register/diseases/${editingId}`), form, { headers })
        toast.success("Disease updated")
      } else {
        await axios.post(createApiEndpoint("register/diseases"), form, { headers })
        toast.success("Disease created")
      }
      setForm(emptyForm)
      setEditingId(null)
      load()
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Save failed")
    }
  }

  const onEdit = (item) => {
    setEditingId(item._id)
    setForm({ title: item.title, description: item.description, prevention: item.prevention })
  }

  const onDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return
    try {
      await axios.delete(createApiEndpoint(`register/diseases/${id}`), { headers })
      toast.success("Deleted")
      load()
    } catch (err) {
      console.error(err)
      toast.error("Delete failed")
    }
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-2xl font-bold">Disease Awareness</h1>
            <p className="text-sm text-muted-foreground">Education and prevention tips for patients</p>
          </div>
        </div>

        {isStaff && (
          <Card className="w-[600px] ml-[200px]">
            <CardHeader>
              <CardTitle>{editingId ? "Edit entry" : "Create new entry"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <Input
                  placeholder="Disease title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Prevention / advice"
                  rows={3}
                  value={form.prevention}
                  onChange={(e) => setForm({ ...form, prevention: e.target.value })}
                  required
                />
                <div className="flex gap-3">
                  <Button type="submit">{editingId ? "Update" : "Create"}</Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {diseases.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div>
                  <p className="font-semibold">Prevention</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.prevention}</p>
                </div>
                {isStaff && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(item._id)}>Delete</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {diseases.length === 0 && <p className="text-sm text-muted-foreground">No entries yet.</p>}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DiseasesPage

