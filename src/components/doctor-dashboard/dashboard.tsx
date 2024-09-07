'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, UserCheck, Clipboard, Clock } from 'react-feather'; // Icons for the dashboard
import { getAppointmentsByDoctorId } from '@/actions/doctor/viewAppointments'; // Adjust the path if necessary
import { useSession } from 'next-auth/react'; // To access the doctor ID from the session

const DoctorDashboard = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments using the doctorId from the session
  useEffect(() => {
    const fetchAppointments = async () => {
      if (session?.user?.id) {
        try {
          const result = await getAppointmentsByDoctorId(session.user.id);
          setAppointments(result);
        } catch (error) {
          setError('Failed to fetch appointments.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchAppointments();
  }, [session]);

  if (loading) {
    return <p>Loading your appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Manage Appointments */}
        <div className="dashboard-card bg-blue-500 text-white p-4 rounded-md shadow-md">
          <Calendar size={48} />
          <h2 className="text-xl font-semibold mt-4">Manage Appointments</h2>
          <p className="mt-2">View and manage your upcoming appointments with patients.</p>
          <div className="mt-4">
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="border-b py-2">
                    <p><strong>Patient:</strong> {appointment.patientName}</p>
                    <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                    <p><strong>Slot:</strong> {appointment.slot}</p>
                    <p><strong>Notes:</strong> {appointment.notes || 'No notes'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming appointments.</p>
            )}
          </div>
        </div>

        {/* View Patient Information */}
        <div className="dashboard-card bg-green-500 text-white p-4 rounded-md shadow-md">
          <UserCheck size={48} />
          <h2 className="text-xl font-semibold mt-4">View Patient Information</h2>
          <p className="mt-2">Access detailed information about your patients.</p>
          <button className="mt-4 bg-green-700 py-2 px-4 rounded">Go to Patients</button>
        </div>

        {/* View Medical Records */}
        <div className="dashboard-card bg-yellow-500 text-white p-4 rounded-md shadow-md">
          <Clipboard size={48} />
          <h2 className="text-xl font-semibold mt-4">View Medical Records</h2>
          <p className="mt-2">Review patients' medical records and history.</p>
          <button className="mt-4 bg-yellow-700 py-2 px-4 rounded">Go to Records</button>
        </div>

        {/* Update Availability */}
        <div className="dashboard-card bg-red-500 text-white p-4 rounded-md shadow-md">
          <Clock size={48} />
          <h2 className="text-xl font-semibold mt-4">Update Availability</h2>
          <p className="mt-2">Set your availability for patient appointments.</p>
          <button className="mt-4 bg-red-700 py-2 px-4 rounded">Update Availability</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
