import React from 'react'
import DoctorDashboard from '@/components/doctor-dashboard/dashboard'
import Header from '@/components/logout-button/logout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Header />
        <DoctorDashboard />
    </div>
  )
}

export default page