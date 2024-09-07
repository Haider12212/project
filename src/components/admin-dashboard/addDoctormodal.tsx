'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { createDoctor } from '@/actions/admin/addDoctor';  // Make sure the path is correct

type FormValues = {
  name: string;
  specialization: string;
  contact: string;
  email: string;
  password: string;
  availability: { [day: string]: string[] };
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timeSlots = Array.from({ length: 8 }, (_, i) => {
  const startHour = 9 + Math.floor(i * 45 / 60);
  const startMinute = (i * 45) % 60;
  const endHour = startHour + Math.floor((startMinute + 45) / 60);
  const endMinute = (startMinute + 45) % 60;
  return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')} - ${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
});

interface AddDoctorModalProps {
  onClose: () => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({ onClose }) => {
  const [openDay, setOpenDay] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      availability: daysOfWeek.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {} as { [day: string]: string[] }),
    },
  });

  // Form submission handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Prepare doctor data
      const doctorData = {
        name: data.name,
        specialization: data.specialization,
        contactInfo: data.contact,
        email: data.email,
        password: data.password,
        availability: data.availability,
      };

      // Call the createDoctor function
      await createDoctor(doctorData);

      console.log('Doctor created successfully!');
      reset(); // Reset the form on success
      onClose(); // Close the modal on success
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-1.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 7 6.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="specialization" className="block text-gray-700">Specialization</label>
            <input
              id="specialization"
              type="text"
              {...register('specialization', { required: 'Specialization is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization.message}</p>}
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700">Contact</label>
            <input
              id="contact"
              type="text"
              {...register('contact', { required: 'Contact is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Availability Section */}
          <div>
            <label className="block text-gray-700">Availability</label>
            <div className="space-y-2">
              {daysOfWeek.map(day => (
                <Disclosure key={day}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="w-full text-left bg-gray-200 p-2 rounded-md flex justify-between items-center"
                        onClick={() => setOpenDay(openDay === day ? null : day)}
                      >
                        <span>{day}</span>
                        <ChevronDownIcon className={`w-5 h-5 ${openDay === day ? 'rotate-180' : 'rotate-0'} transition-transform`} />
                      </Disclosure.Button>
                      {(openDay === day) && (
                        <Disclosure.Panel className="bg-gray-100 p-2 rounded-md">
                          <div className="space-y-1">
                            {timeSlots.map(slot => (
                              <div key={slot} className="flex items-center">
                                <input
                                  type="checkbox"
                                  {...register(`availability.${day}`, { required: false })}
                                  value={slot}
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2 text-sm">{slot}</span>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      )}
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
