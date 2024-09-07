// pages/user/[id].js

import { getUserData } from '@/actions/patients/createPatients';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const userData = await getUserData(id);

    return {
      props: { userData }, // Pass user data to the page component as a prop
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: { error: 'Failed to fetch user data' },
    };
  }
}

const UserProfile = ({ userData, error }) => {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Date of Birth: {userData.dob}</p>
      <p>Gender: {userData.gender}</p>
      <p>Contact Info: {userData.contactInfo}</p>
      <p>Emergency Contact: {userData.emergency}</p>
    </div>
  );
};

export default UserProfile;
