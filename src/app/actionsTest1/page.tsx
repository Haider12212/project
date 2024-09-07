"use client";
import { useSession } from "next-auth/react";
import { getUserDataAndUploadToPatients } from "@/actions/patients/createPatients"; // Adjust the path if needed

// pages/user/[id].js

const UserProfile = () => {
  const { data: session, status } = useSession();

  // If the session is still loading
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If the user is not authenticated
  if (!session) {
    return <p>User is not authenticated.</p>;
  }

  // Extract user data from the session
  const { user } = session;

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={()=>{getUserDataAndUploadToPatients(user.id)}}>click me</button>
      <p><strong>Name:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.image && <img src={user.image} alt="User Profile" width={100} height={100} />}
    </div>
  );
};

export default UserProfile;
