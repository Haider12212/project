'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Disable automatic redirection
    router.push('/authentication'); // Redirect to login page or desired route
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">App Name</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
