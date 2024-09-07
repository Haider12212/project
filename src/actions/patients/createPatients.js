import { db } from "@/lib/firebaseConfig"; // Make sure this is properly initialized
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUserDataAndUploadToPatients = async (userId) => {
  console.log(userId)

  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Fetch user data from Firestore (users collection)
    const userDocRef = doc(db, 'users', userId);  // Use userId instead of hardcoding
    const userDoc = await getDoc(userDocRef);  // Fetch the document data

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    console.log(userData)

    // Return the user and patient data
    return {
      userId,
    };
  } catch (error) {
    console.error('Error fetching or uploading user data:', error);
    throw new Error('Failed to fetch or upload user data');
  }
};
