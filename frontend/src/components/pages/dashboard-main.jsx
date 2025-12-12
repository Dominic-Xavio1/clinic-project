
import React from 'react'
import { SectionCards } from '../dashboard-main/section-cards'
import { PatientTable } from '../dashboard-main/patient-table'
import { ReportsCard } from '../dashboard-main/reports-card'
import DashboardLayout from '../other/DashboardLayout'
import {useEffect,useState} from "react";
import axios from "axios"
import { createApiEndpoint } from '../../config/api'
import { Link } from "react-router-dom"
const DashboardMain = () => {
  const [allPatient,setAllPatient] = useState([])
  const [reportsCount, setReportsCount] = useState(0)
  const [diseases, setDiseases] = useState([])
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  
  useEffect(()=>{
    const getPatient = async()=>{
      try {
        const res = await axios.get(createApiEndpoint('get/patient'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllPatient(res.data.patient)
        console.log("Patient ",res.data.patient)
      } catch (err) {
        console.error("Error fetching patients:", err?.response || err.message || err);
      }
    }
    
    const getReportsCount = async()=>{
      try {
        const res = await axios.get(createApiEndpoint('register/report'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setReportsCount(res.data.reports?.length || 0)
        }
      } catch (err) {
        console.error("Error fetching reports count:", err?.response || err.message || err);
      }
    }

    const getDiseases = async() => {
      try{
        const res = await axios.get(createApiEndpoint('register/diseases'),{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        })
        if(res.data.success){
          setDiseases(res.data.diseases || [])
        }
      }catch(err){
        console.error("Error fetching diseases:", err?.response || err.message || err);
      }
    }
    
    if(role === "doctor" || role === "nurse" || role === "receptionist"){
      getPatient()
      getReportsCount()
    }else{
      getDiseases()
    }
  },[token, role])
  return (
    <DashboardLayout>
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clinic Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {localStorage.getItem("name")}!</p>
      </div>
      {role === "doctor" || role === "nurse" || role === "receptionist" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SectionCards
              title="Total Patients"
              value={allPatient.length}
              increasing={true}
              percentage="12.5%"
              footerHeader="Active Patients"
              footerDescription="Total number of registered patients"
            />
            <SectionCards
              title="Total Reports"
              value={reportsCount}
              increasing={true}
              percentage=""
              footerHeader="Medical Reports"
              footerDescription="Reports created by doctors"
            />
          </div>
          <ReportsCard />
          <PatientTable />
        </>
      ) : (
        <div className="grid gap-6">
          <SectionCards
            title="Health Tips"
            value={diseases.length}
            increasing={true}
            percentage=""
            footerHeader="Disease awareness entries"
            footerDescription="Learn how to prevent and stay healthy"
          />
          <div className="grid md:grid-cols-2 gap-4">
            {diseases.slice(0,4).map((disease)=>(
              <div key={disease._id} className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold">{disease.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{disease.description}</p>
                <p className="text-sm text-gray-500 mt-2"><span className="font-semibold">Prevention:</span> {disease.prevention}</p>
              </div>
            ))}
            {diseases.length === 0 && <p className="text-sm text-gray-600">No health tips yet. Check back soon.</p>}
          </div>
          <div className="flex gap-3">
            <Link to="/messages" className="text-primary underline">Chat with a doctor</Link>
            <Link to="/diseases" className="text-primary underline">See all health tips</Link>
          </div>
        </div>
      )}
      </div>
      
    </DashboardLayout>
  )
}

export default DashboardMain