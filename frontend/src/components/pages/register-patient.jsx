import React, { useEffect } from "react"
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
import toast from "react-hot-toast"
import axios from "axios"
import {useLocation} from "react-router-dom"
import { createApiEndpoint } from '../../config/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const patientFormSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  familyname: z.string().min(2, "Family name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female", "other"], "Please select a gender"),
  medicalcondition: z.string().min(2, "Medical condition is required"),
  status: z.enum(["healed", "diagnosis", "sick", "in_treatment"], "Please select a status")
})
export default function RegisterPatience() {
  const form = useForm({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullname: "",
      familyname: "",
      age: "",
      gender: "",
      medicalcondition: "",
      status: "healed",
    },
  })
  const location = useLocation()
  const editing = location?.state || null

  useEffect(() => {
    if (editing && typeof editing === 'object') {
      form.reset({
        fullname: editing.name || editing.fullname || '',
        familyname: editing.familyname || '',
        age: editing.age ? String(editing.age) : '',
        gender: editing.gender || '',
        medicalcondition: editing.medicalcondition || '',
        status: editing.status || 'healed',
      })
    }
  }, [editing])
  const onSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      let response;
      if (editing && editing._id) {
        response = await axios.put(
          createApiEndpoint(`register/patient/${editing._id}`),
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          createApiEndpoint('register/patient'),
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success === false) {
        toast.error(response.data.message || "Error creating patient");
      } else {
        toast.success(response.data.message || (editing ? "Patient updated" : "Patient registered successfully"));
        form.reset();
      }
    } catch (err) {
      console.error("Error registering patient:", err);
      toast.error(err.response?.data?.message || "Failed to register patient");
    }
  }

  return (
    <DashboardLayout>
      <div className="w-[550px] flex ml-[250px] mr-[250px] py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{editing ? "Edit Patient" : "Register New Patient"}</CardTitle>
            <CardDescription>
              Enter the patient's information to register them in the system.
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
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter patient's full name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="familyname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter family name..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age of the patient</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter patient's age"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) => field.onChange(e)}
                            className="w-full h-10 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicalcondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Condition</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter medical condition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) => field.onChange(e)}
                            className="w-full h-10 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="sick">Sick</option>
                            <option value="healed">Healed</option>
                            <option value="diagnosis">Diagnosis</option>
                            <option value="in_treatment">In Treatment</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-primary text-white"
                  >
                    {editing ? 'Update Patient' : 'Register Patient'}
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
