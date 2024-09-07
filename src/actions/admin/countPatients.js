import { getFirestore, collection, getDocs } from 'firebase/firestore'; 

// Initialize Firebase
// (Assuming you have already initialized Firebase elsewhere in your code)

const countPatients = async () => {
  try {
    const db = getFirestore(); // Get Firestore instance
    const patientsCollection = collection(db, 'patients'); // Reference to 'patients' collection
    const querySnapshot = await getDocs(patientsCollection); // Fetch documents
    return querySnapshot.size; // Return the count of documents
  } catch (error) {
    console.error('Error getting documents:', error);
    return 0; // Return 0 or handle the error as needed
  }
};

// Usage example
countPatients().then(count => {
  console.log(`Number of patients: ${count}`);
});
