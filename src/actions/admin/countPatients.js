
import { collection, getDocs } from 'firebase/firestore'; 
import {db} from '../../lib/firebaseConfig';
// Initialize Firebase
// (Assuming you have already initialized Firebase elsewhere in your code)
export const countPatients = () => {
  const patientsCollection = collection(db, 'patients'); // Reference to 'patients' collection
  return getDocs(patientsCollection)
    .then(querySnapshot => {
      return querySnapshot.size; // Return the count of documents
    })
    .catch(error => {
      console.error('Error getting documents:', error);
      return 0; // Return 0 or handle the error as needed
    });
};