'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: string;
  emergencyContact: string;
};

const PatientOnboarding: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // You can handle form submission here, such as sending data to an API
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Onboarding</h1>
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientOnboarding;
