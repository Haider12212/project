'use client'
import React, { useState } from 'react';
import AddDoctorModal from './addDoctormodal'; // Adjust the import path as needed

type Props = {
  numDoctors: number;
  numAppointments: number;
  numPatients: number;
};

const AdminDashboard: React.FC<Props> = ({ numDoctors, numAppointments, numPatients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold">{numDoctors}</h2>
          <p>Registered Doctors</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold">{numAppointments}</h2>
          <p>Total Appointments</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold">{numPatients}</h2>
          <p>Total Patients</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={handleOpenModal}
          className="bg-indigo-500 text-white p-4 rounded-md shadow-md"
        >
          Add Doctor
        </button>
        <button className="bg-purple-500 text-white p-4 rounded-md shadow-md">
          Create Invoice
        </button>
        <button className="bg-orange-500 text-white p-4 rounded-md shadow-md">
          Other Actions
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-3xl relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-1.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 7 6.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <AddDoctorModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
