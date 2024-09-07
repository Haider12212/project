// lib/getUserData.js

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

export const getUserData = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Fetch user data from Firestore
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    return {
      id: userId,
      email: userData.email,
      userType: userData.userType,
      name: userData.name,
      dob: userData.dob,
      gender: userData.gender,
      contactInfo: userData.contactInfo,
      emergency: userData.emergency,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
