import { db } from "../../lib/firebaseConfig"; // Adjust the path as needed
import { doc, getDoc } from "firebase/firestore";

export const getMedicalDocuments = async (patientId) => {
  try {
    // Reference to the patient document
    const patientDocRef = doc(db, "patients", patientId);

    // Fetch the patient document
    const patientDoc = await getDoc(patientDocRef);

    // Check if the document exists
    if (patientDoc.exists()) {
      // Get the medicalHistory object
      const medicalHistory = patientDoc.data().medicalDocuments;

      console.log(medicalHistory);
      return medicalHistory?.medicalDocuments || [];
    } else {
      console.error("Patient document not found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching medical documents:", error);
    return [];
  }
};
