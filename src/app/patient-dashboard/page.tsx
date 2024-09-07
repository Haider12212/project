import React from 'react'
import Dashboard from '@/components/patient-dashboard/dashboard'
import Header from '@/components/logout-button/logout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Header />
        <Dashboard />
    </div>
  )
}

export default page