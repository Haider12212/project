import AdminDashboard from '@/components/admin-dashboard/dashboard'
import React from 'react'
import 

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminDashboard numDoctors={0} numAppointments={0} numPatients={0}/>
    </div>
  )
}

export default page