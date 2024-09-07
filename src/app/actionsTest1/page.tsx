'use client';

import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig'; // Make sure this path is correct

const DummyDataUploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Dummy data for patients, doctors, and appointments
  const dummyData = {
    patients: [
      {
        id: 'dummyPatientId1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        dob: '1990-01-01',
        gender: 'male',
        contactInfo: '123-456-7890',
        emergencyContact: '987-654-3210',
        medicalDocuments: [
          {
            name: 'Consultation Report',
            url: 'https://example.com/consultation-report.pdf',
          },
        ],
      },
      {
        id: 'dummyPatientId2',
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        dob: '1992-02-02',
        gender: 'female',
        contactInfo: '321-654-9870',
        emergencyContact: '654-321-0987',
        medicalDocuments: [],
      },
    ],
    doctors: [
      {
        id: 'dummyDoctorId1',
        name: 'Dr. Smith',
        specialization: 'Cardiologist',
        contactInfo: '456-123-7890',
        email: 'drsmith@example.com',
        availability: {
          Monday: ['09:00 AM - 11:00 AM', '01:00 PM - 03:00 PM'],
          Wednesday: ['10:00 AM - 12:00 PM'],
        },
      },
      {
        id: 'dummyDoctorId2',
        name: 'Dr. Johnson',
        specialization: 'Dermatologist',
        contactInfo: '789-321-4560',
        email: 'drjohnson@example.com',
        availability: {
          Tuesday: ['09:00 AM - 12:00 PM'],
          Thursday: ['02:00 PM - 04:00 PM'],
        },
      },
    ],
    appointments: [
      {
        patientId: 'dummyPatientId1',
        doctorId: 'dummyDoctorId1',
        appointmentDate: '2024-09-10',
        slot: '09:00 AM - 11:00 AM',
        notes: 'Initial consultation for heart health.',
      },
      {
        patientId: 'dummyPatientId2',
        doctorId: 'dummyDoctorId2',
        appointmentDate: '2024-09-11',
        slot: '09:00 AM - 12:00 PM',
        notes: 'Skin condition consultation.',
      },
    ],
  };

  const uploadDummyData = async () => {
    setLoading(true);
    setStatus('');

    try {
      // Upload patients
      for (const patient of dummyData.patients) {
        await setDoc(doc(db, 'patients', patient.id), patient);
      }

      // Upload doctors
      for (const doctor of dummyData.doctors) {
        await setDoc(doc(db, 'doctors', doctor.id), doctor);
      }

      // Upload appointments
      for (const appointment of dummyData.appointments) {
        const appointmentId = `${appointment.patientId}-${appointment.doctorId}-${appointment.appointmentDate}`;
        await setDoc(doc(db, 'appointments', appointmentId), appointment);
      }

      setStatus('Dummy data uploaded successfully.');
    } catch (error) {
      console.error('Error uploading dummy data:', error);
      setStatus('Failed to upload dummy data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Dummy Data</h1>
      <p>This page allows you to upload dummy data for testing purposes.</p>
      <button
        onClick={uploadDummyData}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Dummy Data'}
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
};

export default DummyDataUploadPage;
