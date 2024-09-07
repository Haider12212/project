'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, UserCheck, Clipboard, Clock } from 'react-feather'; // Icons for the dashboard
import { getAppointmentsByDoctorId } from '@/actions/doctor/viewAppointments';
import { getPatientsByDoctorId } from '@/actions/doctor/viewPatients'; // New function to fetch patients
import { useSession } from 'next-auth/react'; // To access the doctor ID from the session

const DoctorDashboard = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments using the doctorId from the session
  useEffect(() => {
    const fetchAppointmentsAndPatients = async () => {
      if (session?.user?.id) {
        try {
          const fetchedAppointments = await getAppointmentsByDoctorId(session.user.id);
          setAppointments(fetchedAppointments);
          
          const fetchedPatients = await getPatientsByDoctorId(session.user.id); // Fetch patients
          setPatients(fetchedPatients);
        } catch (error) {
          setError('Failed to fetch data.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchAppointmentsAndPatients();
  }, [session]);

  if (loading) {
    return <p>Loading your dashboard...</p>;
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
          <div className="mt-4">
            {patients.length > 0 ? (
              <ul>
                {patients.map((patient) => (
                  <li key={patient.id} className="border-b py-2">
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Date of Birth:</strong> {patient.dob}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact Info:</strong> {patient.contactInfo}</p>
                    <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
                    <p><strong>User Type:</strong> {patient.userType}</p>

                    {/* Display medical documents */}
                    <h3 className="mt-4 text-lg font-semibold">Medical Documents:</h3>
                    {patient.medicalDocuments.length > 0 ? (
                      <ul>
                        {patient.medicalDocuments.map((doc, index) => (
                          <li key={index}>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-white underline">
                              {doc.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No medical documents available.</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No patients found.</p>
            )}
          </div>
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
