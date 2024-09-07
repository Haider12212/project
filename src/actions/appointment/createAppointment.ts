import { db } from '@/lib/firebaseConfig'; // Ensure this is correctly initialized
import { doc, setDoc } from 'firebase/firestore';

// Function to create an appointment
export const createAppointment = async (appointmentData: {
  patientId: string;
  patientName: string;
  doctorId: string;
  appointmentDate: string;
  slot: string;
  notes: string;
}) => {
  try {
    const appointmentId = `${appointmentData.patientId}_${appointmentData.doctorId}_${appointmentData.appointmentDate}_${appointmentData.slot}`;

    // Create a reference to the appointment document in Firestore
    const appointmentDocRef = doc(db, 'appointments', appointmentId);

    // Upload appointment data to Firestore
    await setDoc(appointmentDocRef, {
      ...appointmentData,
      createdAt: new Date(),
    });

    console.log('Appointment created successfully with ID:', appointmentId);

    return appointmentId; // Return the ID of the created appointment
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
};
