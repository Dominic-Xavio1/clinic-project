import React from 'react'
import { Search, MoreVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import axios from "axios"
import {useEffect,useState} from "react";
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


export function PatientTable() {
  const navigate = useNavigate();
    const [allPatient,setAllPatient] = useState([])
  const token = localStorage.getItem("token")
    useEffect(()=>{
      const getPatient = async()=>{
        try {
          const res = await axios.get("http://localhost:5000/get/patient", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAllPatient(res.data.patient)
        } catch (err) {
          console.error("Error fetching patients:", err?.response || err.message || err);
        }
      }
      getPatient()
    },[])

  const deletePatient = async (id) => {
    if (!confirm('Delete this patient?')) return;
    try {
      const res = await axios.delete(`http://localhost:5000/register/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setAllPatient(prev => prev.filter(p => p._id !== id));
        toast.success(res.data.message || 'Patient deleted');
      } else {
        toast.error(res.data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting patient', err?.response.data);
      toast.error(err.response?.data?.message || 'Error deleting patient');
    }
  };

  const scheduleAppointment = async (id) => {
    const date = prompt('Enter appointment date/time (ISO or yyyy-mm-dd hh:mm):');
    if (!date) return;
    const notes = prompt('Optional notes:') || '';
    try {
      const res = await axios.post('http://localhost:5000/register/appointment', { patientId: id, date, notes }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        toast.success('Appointment scheduled');
      } else {
        toast.error(res.data.message || 'Failed to schedule');
      }
      console.log('Appointment created', res.data);
    } catch (err) {
      console.error('Error scheduling appointment', err?.response || err.message || err);
      toast.error(err.response?.data?.message || 'Error scheduling appointment');
    }
  }
  return (
    <Card className="mt-6 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Patients</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Family</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPatient.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                         • {patient.age}years • {patient.gender}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{patient.phone}</div>
                      <div className="text-muted-foreground">{patient.family}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={patient.status === 'active' ? 'default' : 'secondary'}
                      className={patient.status === 'active' ? 'border-green-200 text-green-800 bg-green-100 hover:border-green-200 hover:text-green-800 hover:bg-green-100' : 'border-gray-200 text-gray-800 bg-gray-100 hover:border-gray-200 hover:text-gray-800 hover:bg-gray-100'}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{patient.medicalcondition}</TableCell>
                  <TableCell className="text-sm">{patient.familyname}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm">{patient.gender}</div> 
                      {patient.appointmentSoon && (
                        <Badge variant="outline" className="w-fit text-xs">Soon</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=> navigate(`/patient/${patient._id}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> navigate('/register',{state: patient})}>Edit Patient</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> scheduleAppointment(patient._id)}>Schedule Appointment</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={()=> deletePatient(patient._id)}>Delete Patient</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

