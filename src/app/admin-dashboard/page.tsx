import AdminDashboard from '@/components/admin-dashboard/dashboard'
import React from 'react'
import Header from '@/components/logout-button/logout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Header/>
        <AdminDashboard numDoctors={0} numAppointments={0} numPatients={0}/>
    </div>
  )
}

export default page