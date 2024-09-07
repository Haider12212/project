'use client';

import AdminDashboard from '@/components/admin-dashboard/dashboard';
import React, { useEffect, useState } from 'react';
import Header from '@/components/logout-button/logout';
import { useSession } from 'next-auth/react';
import { countPatients } from '@/actions/admin/countPatients';

type Props = {}

const AdminPage =  (props: Props) => {
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [numPatients, setNumPatients] = useState(0);
  const numDoctors = 20; // Example static value, replace with actual data fetching logic
  const numAppointments = 150; // Example static value, replace with actual data fetching logic

  async function getPatients() {
    const numPatients = await countPatients();
    return numPatients;
  }

  useEffect(() => {
    if (session && session.user?.userType === 'admin') {
      setIsAuthorized(true);

      getPatients().then((numPatients) => {
        setNumPatients(numPatients);
      }); 
    } else {
      setIsAuthorized(false);
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return (
      <div>
        <Header />
        <p className="text-red-500 text-center mt-6">
          You do not have the privilege to access this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <AdminDashboard numAppointments={numAppointments} numPatients={numPatients} numDoctors={numDoctors} />
    </div>
  );
};

export default AdminPage;
