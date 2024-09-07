import { auth, db } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Function to create a doctor
export const createDoctor = async (doctorData) => {
  try {
    // 1. Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, doctorData.email, doctorData.password);
    const user = userCredential.user;

    // 2. Add a new user document to the 'users' collection
    await setDoc(doc(db, 'users', user.uid), {
      name: doctorData.name,
      email: doctorData.email,
      userType: 'doctor',  // Set userType to doctor
      profileComplete: true, // Assuming the profile is complete upon creation
    });

    // 3. Add a new doctor document to the 'doctors' collection using the same userId
    await setDoc(doc(db, 'doctors', user.uid), {
      userId: user.uid,  // Use the same userId from Firebase Auth
      name: doctorData.name,
      email: doctorData.email,
      specialization: doctorData.specialization,
      yearsOfExperience: doctorData.yearsOfExperience || 0,  // Years of experience, optional or pass from form
      contactInfo: doctorData.contactInfo,
      availability: doctorData.availability,  // Availability array from the form
      createdAt: new Date(),  // Add a timestamp for when the record was created
    });

    console.log(`Doctor ${doctorData.name} created successfully with userId ${user.uid}`);

    // Return the user and doctor data
    return {
      userId: user.uid,
      email: doctorData.email,
      doctorData: {
        name: doctorData.name,
        specialization: doctorData.specialization,
        yearsOfExperience: 10,
        contactInfo: doctorData.contactInfo,
        availability: doctorData.availability,
      },
    };
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw new Error('Failed to create doctor');
  }
};
