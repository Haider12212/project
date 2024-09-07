'use client'
import React from 'react';
import { signOut } from 'next-auth/react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl"></h1>
      <button
        onClick={() => signOut()} // Call signOut on button click
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
