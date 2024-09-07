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
      {isModalOpen && <AddDoctorModal onClose={handleCloseModal} />}
    </div>
  );
};

export default AdminDashboard;
