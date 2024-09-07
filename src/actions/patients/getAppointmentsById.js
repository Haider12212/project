import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../lib/firebaseConfig";
export const getAppointmentsById = async (patientId) => {
  try {
    // Reference the appointments collection
    const appointmentsRef = collection(db, "appointments");

    // Create a query to find all appointments where the patientId matches the provided ID
    const q = query(appointmentsRef, where("patientId", "==", patientId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Extract and return the appointment data
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
};
