import { db } from '@/lib/firebaseConfig'; // Make sure to adjust the path if needed
import { collection, query, where, getDocs } from 'firebase/firestore';

// Function to get all appointments for a specific doctor by doctorId
export const getAppointmentsByDoctorId = async (doctorId) => {
  try {
    // Reference the appointments collection
    const appointmentsRef = collection(db, 'appointments');
    
    // Create a query to filter appointments by doctorId
    const q = query(appointmentsRef, where('doctorId', '==', doctorId));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Map over the results to extract the data
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,  // Document ID
      ...doc.data()  // Spread the rest of the appointment data
    }));

    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw new Error('Failed to fetch appointments');
  }
};
