import { getFirestore, collection, addDoc } from 'firebase/firestore';

const addDoctor = async (doctorData) => {
  try {
    const db = getFirestore(); // Get Firestore instance
    const doctorsCollection = collection(db, 'doctors'); // Reference to 'doctors' collection
    const docRef = await addDoc(doctorsCollection, {
      ...doctorData,
      createdAt: new Date() // Optional: Add timestamp
    });
    return docRef.id; // Return the ID of the added document
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw new Error('Failed to add doctor'); // Handle the error as needed
  }
};
