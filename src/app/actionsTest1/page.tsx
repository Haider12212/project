'use client';

import React, { useState, useEffect } from 'react';
import { getAppointmentsByDoctorId } from '@/actions/doctor/viewAppointments';
import { useSession } from 'next-auth/react';

const DoctorAppointments = () => {
  const { data: session, status } = useSession(); // Get the session
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctorId, setDoctorId] = useState(null);

  // Fetch doctorId from the session
  useEffect(() => {
    if (session?.user?.userType === 'doctor') {
      setDoctorId(session.user.id); // Set the doctorId from session
    }
  }, [session]);

  // Fetch appointments once doctorId is available
  useEffect(() => {
    if (doctorId) {
      const fetchAppointments = async () => {
        try {
          const result = await getAppointmentsByDoctorId(doctorId);
          setAppointments(result);
        } catch (error) {
          setError('Failed to fetch appointments');
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [doctorId]);

  if (status === 'loading') return <p>Loading session...</p>;
  if (!doctorId) return <p>Unable to fetch doctor information.</p>;
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appointments for Doctor {doctorId}</h1>
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
        <p>No appointments found for this doctor.</p>
      )}
    </div>
  );
};

export default DoctorAppointments;
