
import React from 'react'
import DashboardLayout from './other/DashboardLayout'
import { SectionCards } from './dashboard-main/section-cards'
import { PatientTable } from './dashboard-main/patient-table'

const DashboardMain = () => {
  return (
    <DashboardLayout>
      
      <div>
        <h1 className="text-2xl font-bold">Clinic Management System</h1>
        <p className="text-gray-600 mt-2 text-gray-600 font-bold ">Welcome {localStorage.getItem("name")} !</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
          <SectionCards
            title="Total Patients"
            value={1248}
            increasing={true}
            percentage="12.5%"
            footerHeader="Active Patients"
            footerDescription="Total number of registered patients"
          />
          <SectionCards
            title="Appointments Today"
            value={32}
            increasing={true}
            percentage="8.3%"
            footerHeader="Scheduled Today"
            footerDescription="Total appointments for today"
          />
          <SectionCards
            title="Pending Diagnostics"
            value={15}
            increasing={false}
            percentage="3.2%"
            footerHeader="Tests Pending"
            footerDescription="Awaiting diagnostic results"
          />
          <SectionCards
            title="Revenue This Month"
            value="$45,231"
            increasing={true}
            percentage="15.7%"
            footerHeader="Monthly Revenue"
            footerDescription="Total revenue for current month"
          />
        </div>
        
        <PatientTable />
      </div>
      
    </DashboardLayout>
  )
}

export default DashboardMain