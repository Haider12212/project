import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getUserDataAndUploadToPatients = async (userId) => {
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

    // Return the user data
    return {
      userId,
      userData,
    };
  } catch (error) {
    console.error('Error fetching or uploading user data:', error);
    throw new Error('Failed to fetch or upload user data');
  }
};
