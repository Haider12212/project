import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export async function getDoctors() {
  try {
    // Get the collection reference
    const doctorsCollection = collection(db, 'doctors');
    
    // Fetch the documents
    const snapshot = await getDocs(doctorsCollection);
    
    // Check if there are any documents
    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }
    
    // Extract data from documents
    const doctors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors');
  }
}