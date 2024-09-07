'use client';
import React, { useState, useEffect } from 'react';
import { getDoctors } from '@/actions/patients/getDoctors';

type Doctor = {
  id: string;
  name: string;
  specialization: string;
};

type Props = {
  onClose: () => void; // Function to close the modal
};

const ViewDoctorsModal = ({ onClose }: Props) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const fetchedDoctors = await getDoctors();
        setDoctors(fetchedDoctors);
      } catch (err) {
        setError('Failed to fetch doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Registered Doctors</h2>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Specialization</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="py-2 px-4 border-b">{doc.name}</td>
                <td className="py-2 px-4 border-b">{doc.specialization}</td>
              </tr>
            ))}
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

export default ViewDoctorsModal;
