
import React from 'react'
import { SectionCards } from '../dashboard-main/section-cards'
import { PatientTable } from '../dashboard-main/patient-table'
import { ReportsCard } from '../dashboard-main/reports-card'
import DashboardLayout from '../other/DashboardLayout'
import {useEffect,useState} from "react";
import axios from "axios"
import { createApiEndpoint } from '../../config/api'
const DashboardMain = () => {
  const [allPatient,setAllPatient] = useState([])
  const [reportsCount, setReportsCount] = useState(0)
  const token = localStorage.getItem("token")
  
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
    
    getPatient()
    getReportsCount()
  },[token])
  return (
    <DashboardLayout>
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clinic Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {localStorage.getItem("name")}!</p>
      </div>
      
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
          {/* <SectionCards
            title="Pending Diagnostics"
            value={15}
            increasing={false}
            percentage="3.2%"
            footerHeader="Tests Pending"
            footerDescription="Awaiting diagnostic results"
          /> */}
          {/* <SectionCards
            title="Revenue This Month"
            value="$45,231"
            increasing={true}
            percentage="15.7%"
            footerHeader="Monthly Revenue"
            footerDescription="Total revenue for current month"
          /> */}
        </div>
        
        <ReportsCard />
        <PatientTable />
      </div>
      
    </DashboardLayout>
  )
}

export default DashboardMain