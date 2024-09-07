'use client'
import React, { useState } from 'react';
import { Calendar, User, Clipboard, Activity } from 'react-feather'; // Icons for the dashboard
import BookAppointmentModal from './bookAppointmentmodal'; // Adjust the import path as needed

type Props = {};

const Dashboard = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* View Appointments */}
        <div className="dashboard-card bg-blue-500 text-white p-4 rounded-md shadow-md">
          <Calendar size={48} />
          <h2 className="text-xl font-semibold mt-4">View Appointments</h2>
          <p className="mt-2">Check and manage your upcoming appointments.</p>
          <button className="mt-4 bg-blue-700 py-2 px-4 rounded">Go to Appointments</button>
        </div>
        
        {/* View Medical History */}
        <div className="dashboard-card bg-green-500 text-white p-4 rounded-md shadow-md">
          <Clipboard size={48} />
          <h2 className="text-xl font-semibold mt-4">View Medical History</h2>
          <p className="mt-2">Review your past medical records and reports.</p>
          <button className="mt-4 bg-green-700 py-2 px-4 rounded">Go to Medical History</button>
        </div>
        
        {/* View Doctors */}
        <div className="dashboard-card bg-yellow-500 text-white p-4 rounded-md shadow-md">
          <User size={48} />
          <h2 className="text-xl font-semibold mt-4">View Doctors</h2>
          <p className="mt-2">Find doctors and specialists available for consultations.</p>
          <button className="mt-4 bg-yellow-700 py-2 px-4 rounded">Go to Doctors</button>
        </div>
        
        {/* Book New Appointment */}
        <div className="dashboard-card bg-red-500 text-white p-4 rounded-md shadow-md">
          <Activity size={48} />
          <h2 className="text-xl font-semibold mt-4">Book New Appointment</h2>
          <p className="mt-2">Schedule a new appointment with a doctor.</p>
          <button
            className="mt-4 bg-red-700 py-2 px-4 rounded"
            onClick={openModal}
          >
            Book Appointment
          </button>
        </div>
      </div>
      {isModalOpen && <BookAppointmentModal onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
