'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clipboard, Activity } from 'react-feather';
import { uploadFiles } from '@/actions/files/uploadFiles';
import { useSession } from 'next-auth/react';
import BookAppointmentModal from './bookAppointmentmodal';
import ViewMedicalHistoryModal from './viewMedicalhistorymodal'; 
import ViewBookedAppointmentsModal from './viewBookedAppointmentsModal'; 
import ViewDoctorsModal from './viewDoctorsModal'; // Import the new modal component

type Document = {
  name: string;
  url: string;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMedicalModalOpen, setIsViewMedicalModalOpen] = useState(false);
  const [isViewAppointmentsModalOpen, setIsViewAppointmentsModalOpen] = useState(false);
  const [isViewDoctorsModalOpen, setIsViewDoctorsModalOpen] = useState(false); // State for doctors modal

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      setDocumentNames(Array.from(e.target.files).map(() => ""));
    }
  };

  const handleDocumentNameChange = (index: number, name: string) => {
    setDocumentNames(prev => {
      const updatedNames = [...prev];
      updatedNames[index] = name;
      return updatedNames;
    });
  };

  const handleUpload = async () => {
    if (!selectedFiles || documentNames.some(name => !name) || !userId) {
      alert('Please provide a name for each document.');
      return;
    }
    setUploading(true);
    try {
      const filesWithNames = Array.from(selectedFiles).map((file, index) => ({
        file,
        name: documentNames[index],
      }));

      const uploadedDocs = await uploadFiles(filesWithNames, userId, 'medical-documents');
      setDocuments(prev => [...prev, ...uploadedDocs]);
    } catch (error) {
      console.error('Error uploading documents:', error);
    } finally {
      setUploading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openViewMedicalHistoryModal = () => setIsViewMedicalModalOpen(true);
  const closeViewMedicalHistoryModal = () => setIsViewMedicalModalOpen(false);

  const openViewAppointmentsModal = () => setIsViewAppointmentsModalOpen(true);
  const closeViewAppointmentsModal = () => setIsViewAppointmentsModalOpen(false);

  const openViewDoctorsModal = () => setIsViewDoctorsModalOpen(true); // Open doctors modal
  const closeViewDoctorsModal = () => setIsViewDoctorsModalOpen(false); // Close doctors modal

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* View Appointments */}
        <div className="dashboard-card bg-blue-500 text-white p-4 rounded-md shadow-md">
          <Calendar size={48} />
          <h2 className="text-xl font-semibold mt-4">View Appointments</h2>
          <p className="mt-2">Check and manage your upcoming appointments.</p>
          <button
            onClick={openViewAppointmentsModal}
            className="mt-4 bg-blue-700 py-2 px-4 rounded"
          >
            Go to Appointments
          </button>
        </div>
        
        {/* View Medical History */}
        <div className="dashboard-card bg-green-500 text-white p-4 rounded-md shadow-md">
          <Clipboard size={48} />
          <h2 className="text-xl font-semibold mt-4">View Medical History</h2>
          <p className="mt-2">Review your past medical records and reports.</p>
          <button
            onClick={openViewMedicalHistoryModal}
            className="mt-4 bg-green-700 py-2 px-4 rounded"
          >
            Go to Medical History
          </button>
        </div>
        
        {/* View Doctors */}
        <div className="dashboard-card bg-yellow-500 text-white p-4 rounded-md shadow-md">
          <User size={48} />
          <h2 className="text-xl font-semibold mt-4">View Doctors</h2>
          <p className="mt-2">Find doctors and specialists available for consultations.</p>
          <button
            onClick={openViewDoctorsModal} // Handle button click to open doctors modal
            className="mt-4 bg-yellow-700 py-2 px-4 rounded"
          >
            Go to Doctors
          </button>
        </div>
        
        {/* Book New Appointment */}
        <div className="dashboard-card bg-red-500 text-white p-4 rounded-md shadow-md">
          <Activity size={48} />
          <h2 className="text-xl font-semibold mt-4">Book New Appointment</h2>
          <p className="mt-2">Schedule a new appointment with a doctor.</p>
          <button
            onClick={openModal}
            className="mt-4 bg-red-700 py-2 px-4 rounded"
          >
            Book Appointment
          </button>
        </div>

        {/* Upload Medical Documents */}
        <div className="dashboard-card bg-purple-500 text-white p-4 rounded-md shadow-md">
          <Clipboard size={48} />
          <h2 className="text-xl font-semibold mt-4">Upload Medical Documents</h2>
          <p className="mt-2">Upload and store your medical documents securely.</p>
          
          <input type="file" multiple onChange={handleFileChange} className="mt-4" />
          
          {selectedFiles && Array.from(selectedFiles).map((file, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">{file.name}</p>
              <input
                type="text"
                placeholder="Document Name"
                value={documentNames[index] || ""}
                onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          ))}

          <button
            onClick={handleUpload}
            className="mt-4 bg-purple-700 py-2 px-4 rounded"
            disabled={uploading || !selectedFiles || documentNames.some(name => !name) || !userId}
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Uploaded Documents:</h3>
            <ul>
              {documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-white underline">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Render BookAppointmentModal if isModalOpen is true */}
      {isModalOpen && <BookAppointmentModal onClose={closeModal} />}

      {/* Render ViewMedicalHistoryModal if isViewMedicalModalOpen is true */}
      {isViewMedicalModalOpen && <ViewMedicalHistoryModal onClose={closeViewMedicalHistoryModal} patientId={session?.user?.id} />}

      {/* Render ViewBookedAppointmentsModal if isViewAppointmentsModalOpen is true */}
      {isViewAppointmentsModalOpen && <ViewBookedAppointmentsModal onClose={closeViewAppointmentsModal} patientId={session?.user?.id} />}

      {/* Render ViewDoctorsModal if isViewDoctorsModalOpen is true */}
      {isViewDoctorsModalOpen && <ViewDoctorsModal onClose={closeViewDoctorsModal} />}
    </div>
  );
};

export default Dashboard;
