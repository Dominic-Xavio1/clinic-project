import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../ui/button"
import DashboardLayout from "../other/DashboardLayout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { createApiEndpoint } from '../../config/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const reportFormSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  diagnosis: z.string().optional(),
  prescription: z.string().optional(),
  recommendations: z.string().optional(),
})

export default function CreateReport() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token")
  const preselectedPatientId = location?.state?.patientId || ""

  const form = useForm({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      patientId: preselectedPatientId,
      title: "",
      description: "",
      diagnosis: "",
      prescription: "",
      recommendations: "",
    },
  })

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(createApiEndpoint('get/patient'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPatients(res.data.patient || [])
      } catch (err) {
        console.error("Error fetching patients:", err)
        toast.error("Failed to load patients")
      }
    }
    fetchPatients()
  }, [token])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post(
        createApiEndpoint('register/report'),
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success("Report created successfully!")
        form.reset()
        navigate("/dashboard")
      } else {
        toast.error(res.data.message || "Failed to create report")
      }
    } catch (err) {
      console.error("Error creating report:", err)
      toast.error(
        err.response?.data?.message || "Error creating report. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-[200px] mr-[500px] max-w-4xl ">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Medical Report</CardTitle>
            <CardDescription>
              Add a detailed medical report for a patient consultation
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Patient</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) => field.onChange(e)}
                            className="w-full h-10 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select a patient...</option>
                            {patients.map((patient) => (
                              <option key={patient._id} value={patient._id}>
                                {patient.name} - {patient.age} years ({patient.gender})
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Report Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Initial Consultation, Follow-up Visit"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter detailed medical description, symptoms, observations..."
                            rows={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter diagnosis..."
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prescription (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter prescribed medications and dosages..."
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recommendations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recommendations (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter recommendations for follow-up care, lifestyle changes, etc..."
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-white"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Report"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

