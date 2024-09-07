import { db } from '@/lib/firebaseConfig'; // Ensure the Firebase config is correct
import { doc, getDoc } from 'firebase/firestore';

// Function to get a patient by ID
export const getPatientById = async (patientId) => {
  try {
    if (!patientId) {
      throw new Error('Patient ID is required');
    }

    // Reference to the patient document in the 'patients' collection
    const patientDocRef = doc(db, 'patients', patientId);

    // Fetch the document data
    const patientDoc = await getDoc(patientDocRef);

    // Check if the document exists
    if (!patientDoc.exists()) {
      throw new Error('Patient not found');
    }

    // Return the patient data
    const patientData = patientDoc.data();
    return {
      id: patientId,  // Add the patientId manually since it's not part of the document data
      ...patientData, // Spread the patient data, which includes fields like contactInfo, medicalDocuments, etc.
    };
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw new Error('Failed to fetch patient data');
  }
};
