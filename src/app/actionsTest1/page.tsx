'use client';

import { useState, useEffect } from 'react';
import { getPatientById } from '@/actions/patients/getPatientById'; // Ensure correct path

const PatientDetailsPage = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hardcoded patient ID
  const patientId = 'dV6UWVIvQwWz8IZgPfAGM06gVhk2';

  // Fetch patient data when the component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const data = await getPatientById(patientId);
        setPatientData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch patient data.');
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [patientId]);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="patient-details-container p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Details</h1>
      {patientData ? (
        <div>
          <p><strong>Name:</strong> {patientData.name}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Date of Birth:</strong> {patientData.dob}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Contact Info:</strong> {patientData.contactInfo}</p>
          <p><strong>Emergency Contact:</strong> {patientData.emergencyContact}</p>
          <p><strong>User Type:</strong> {patientData.userType}</p>
          <p><strong>Created At:</strong> {new Date(patientData.createdAt.seconds * 1000).toLocaleString()}</p>

          <h2 className="text-2xl font-bold mt-6">Medical Documents</h2>
          {patientData.medicalDocuments && patientData.medicalDocuments.length > 0 ? (
            <ul>
              {patientData.medicalDocuments.map((doc, index) => (
                <li key={index}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medical documents uploaded.</p>
          )}
        </div>
      ) : (
        <p>No patient data found.</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;
