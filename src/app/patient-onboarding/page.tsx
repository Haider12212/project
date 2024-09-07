'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUserDataAndUploadToPatients } from '@/actions/patients/createPatients';
import {useRouter} from 'next/navigation';
type FormData = {
  name: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
};

const PatientOnboarding: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!session?.user?.id) {
      setError('User is not logged in');
      return;
    }
    
    setLoading(true);
    try {
      await getUserDataAndUploadToPatients(session.user.id, data);
      // Handle successful form submission here
      router.push('/patient-dashboard');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Onboarding</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        
        {/* Date of Birth Field */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            {...register('dateOfBirth', { required: 'Date of Birth is required' })}
            className="border p-2 w-full"
          />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth.message}</p>}
        </div>
        
        {/* Gender Field */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="border p-2 w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        </div>
        
        {/* Contact Info Field */}
        <div>
          <label className="block mb-1 font-medium">Contact Info</label>
          <input
            type="text"
            {...register('contactInfo', { required: 'Contact Info is required' })}
            className="border p-2 w-full"
          />
          {errors.contactInfo && <p className="text-red-500">{errors.contactInfo.message}</p>}
        </div>
        
        {/* Emergency Contact Field */}
        <div>
          <label className="block mb-1 font-medium">Emergency Contact</label>
          <input
            type="text"
            {...register('emergencyContact', { required: 'Emergency Contact is required' })}
            className="border p-2 w-full"
          />
          {errors.emergencyContact && <p className="text-red-500">{errors.emergencyContact.message}</p>}
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'bg-blue-300 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PatientOnboarding;
