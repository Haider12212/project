'use client';

import React, { useEffect, useState } from 'react';
import DoctorDashboard from '@/components/doctor-dashboard/dashboard';
import Header from '@/components/logout-button/logout';
import { useSession } from 'next-auth/react';

type Props = {}

const DoctorPage = (props: Props) => {
  const { data: session, status } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (session && session.user?.userType === 'doctor') {
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
      <DoctorDashboard />
    </div>
  );
};

export default DoctorPage;
