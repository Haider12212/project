import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export async function getSlotsForDoctor(doctorId, date) {
  try {
    // Get the day of the week from the date
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

    // Reference to the doctor document
    const doctorDocRef = doc(db, 'doctors', doctorId);
    const doctorDoc = await getDoc(doctorDocRef);

    if (!doctorDoc.exists()) {
      throw new Error('Doctor not found');
    }

    const doctorData = doctorDoc.data();
    if (!doctorData || !doctorData.availability) {
      throw new Error('Availability not found');
    }

    // Get the availability for the specified day
    const availabilityForDay = doctorData.availability[dayOfWeek];

    if (!availabilityForDay) {
      throw new Error(`No availability for ${dayOfWeek}`);
    }

    return availabilityForDay;
  } catch (error) {
    console.error('Failed to fetch slots:', error);
    return [];
  }
}
