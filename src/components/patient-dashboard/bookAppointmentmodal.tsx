'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDoctors } from '@/actions/patients/getDoctors';
import { getSlotsForDoctor } from '@/actions/patients/getSlotsForDoctors';
import { useSession } from 'next-auth/react'; // Assuming you're using next-auth

// Type for form values
type FormValues = {
  appointmentDate: string;
  slot: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  notes: string;
};

// Function to generate available dates, excluding weekends
const generateDates = (numDays: number) => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) { // Exclude weekends
      const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
      dates.push({
        date: nextDate.toISOString().split('T')[0],
        day: dayName
      });
    }
  }
  return dates;
};

// BookAppointmentModal component
const BookAppointmentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
  const [availableDates, setAvailableDates] = useState<{ date: string, day: string }[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<{ id: string, name: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [patientName, setPatientName] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');

  useEffect(() => {
    setAvailableDates(generateDates(5));
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors = await getDoctors();
        setAvailableDoctors(doctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSlots = async () => {
        try {
          const slots = await getSlotsForDoctor(selectedDoctor, selectedDate);
          setAvailableSlots(slots);
        } catch (error) {
          console.error('Failed to fetch slots:', error);
        }
      };

      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    if (session?.user) {
      setPatientName(session?.user?.userName || 'unknown');
      setPatientId(session.user?.id);
      // Set default values for hidden fields
      setValue('patientName', session.user.name || '');
      setValue('patientId', session.user.id || 'unknown');
    }
  }, [session, setValue]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-1.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 7 6.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Book Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="doctorId" className="block text-gray-700 text-sm font-medium">Doctor</label>
            <select
              id="doctorId"
              {...register('doctorId', { required: 'Doctor is required' })}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a doctor</option>
              {availableDoctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
            {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId.message}</p>}
          </div>

          <div>
            <label htmlFor="appointmentDate" className="block text-gray-700 text-sm font-medium">Date</label>
            <select
              id="appointmentDate"
              {...register('appointmentDate', { required: 'Date is required' })}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                // Optionally clear selected slot when date changes
                // setSelectedSlot(null);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a date</option>
              {availableDates.map(({ date, day }) => (
                <option key={date} value={date}>{`${day}, ${date}`}</option>
              ))}
            </select>
            {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate.message}</p>}
          </div>

          <div>
            <label htmlFor="slot" className="block text-gray-700 text-sm font-medium">Slot</label>
            <select
              id="slot"
              {...register('slot', { required: 'Slot is required' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a slot</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.slot && <p className="text-red-500 text-sm">{errors.slot.message}</p>}
          </div>

          <div>
            <label htmlFor="patientName" className="block text-gray-700 text-sm font-medium">Patient Name</label>
            <input
              id="patientName"
              type="text"
              value={patientName}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          <input type="hidden" value={patientId} {...register('patientId')} />
          <input type="hidden" value={patientName} {...register('patientName')} />

          <div>
            <label htmlFor="notes" className="block text-gray-700 text-sm font-medium">Notes</label>
            <textarea
              id="notes"
              {...register('notes')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
