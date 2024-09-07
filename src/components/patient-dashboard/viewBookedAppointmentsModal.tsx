'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {getAppointmentsById} from '@/actions/patients/getAppointmentsById'
type Appointment = {
  id: string;
  date: string;
  status: 'attended' | 'pending';
  description: string;
};

const ViewBookedAppointmentsModal = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'attended' | 'pending'>('attended');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        
        const data = await getAppointmentsById(session?.user?.id || '');
        setAppointments(data);
      } catch (err) {
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchAppointments();
    }
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>

        <div className="flex space-x-4 mb-4">
          <button
            className={`py-2 px-4 rounded ${activeTab === 'attended' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('attended')}
          >
            Attended
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="py-2 px-4 border-b">{appointment.date}</td>
                  <td className="py-2 px-4 border-b">{appointment.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-2 px-4 text-center">
                  No {activeTab} appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewBookedAppointmentsModal;
