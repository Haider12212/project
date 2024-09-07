'use client';

import AdminDashboard from '@/components/admin-dashboard/dashboard';
import React, { useEffect, useState } from 'react';
import Header from '@/components/logout-button/logout';
import { useSession } from 'next-auth/react';

type Props = {}

const AdminPage = (props: Props) => {
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (session && session.user?.userType === 'admin') {
      setIsAuthorized(true);
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
      <AdminDashboard numDoctors={0} numAppointments={0} numPatients={0} />
    </div>
  );
};

export default AdminPage;
