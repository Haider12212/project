import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getUserDataAndUploadToPatients = async (userId, formData) => {
  console.log('User ID:', userId);

  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Fetch user data from Firestore (users collection)
    const userDocRef = doc(db, 'users', userId);  // Proper document reference
    const userDoc = await getDoc(userDocRef);  // Fetch the document data

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    console.log('User Data:', userData);

    // Prepare data to upload to patients collection
    const patientData = {
      id: userId,
      email: userData.email, // Reuse email from the existing user data
      userType: 'patient', // Default type for patients
      name: formData.name,  // From the FormData input
      dob: formData.dateOfBirth, // From the FormData input
      gender: formData.gender, // From the FormData input
      contactInfo: formData.contactInfo, // From the FormData input
      emergencyContact: formData.emergencyContact, // From the FormData input
      createdAt: new Date(), // Add a timestamp for when the record was created
    };

    // Upload the patient data to the patients collection
    const patientDocRef = doc(db, 'patients', userId);  // Reference to patients document
    await setDoc(patientDocRef, patientData, { merge: true });  // Merge to avoid overwriting existing data

    console.log(`Patient data for user ID ${userId} has been uploaded to the patients collection.`);

    // Mark profileComplete as true in the user's document
    await updateDoc(userDocRef, {
      profileComplete: true,
    });

    console.log(`User profile for user ID ${userId} marked as complete.`);

    // Return the user and patient data
    return {
      userId,
      userData,
      patientData,
    };
  } catch (error) {
    console.error('Error fetching or uploading user data:', error);
    throw new Error('Failed to fetch or upload user data');
  }
};
