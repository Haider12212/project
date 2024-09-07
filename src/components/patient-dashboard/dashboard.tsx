'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, User, Clipboard, Activity } from 'react-feather'; // Icons for the dashboard
import { uploadFiles } from '@/actions/files/uploadFiles'; // Import the upload function
import { useSession } from 'next-auth/react';  // Import to get the user session
import BookAppointmentModal from './bookAppointmentmodal'; // Import the modal component

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();  // Get user session data
  const [userId, setUserId] = useState<string | null>(null); // Store userId
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [documentNames, setDocumentNames] = useState<string[]>([]); // Store document names
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Use useEffect to set the userId after the session is loaded
  useEffect(() => {
    if (session?.user?.id) {
      console.log(session.user)
      setUserId(session.user.id);
    }
  }, [session]);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      setDocumentNames(Array.from(e.target.files).map(() => "")); // Initialize empty document names
    }
  };

  // Handle document name input change
  const handleDocumentNameChange = (index: number, name: string) => {
    const updatedNames = [...documentNames];
    updatedNames[index] = name;
    setDocumentNames(updatedNames);
  };

  // Handle the file upload
  const handleUpload = async () => {
    if (!selectedFiles || documentNames.some((name) => !name) || !userId) {
      alert('Please provide a name for each document.');
      return;
    }
    setUploading(true);
    try {
      // Map selected files to their document names
      const filesWithNames = Array.from(selectedFiles).map((file, index) => ({
        file,
        name: documentNames[index],
      }));

      // Call uploadFiles function with userId and files
      const uploadedDocs = await uploadFiles(filesWithNames, userId, 'medical-documents');
      setDocuments((prevDocs) => [...prevDocs, ...uploadedDocs]);
    } catch (error) {
      console.error('Error uploading documents:', error);
    } finally {
      setUploading(false);
    }
  };

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* View Appointments */}
        <div className="dashboard-card bg-blue-500 text-white p-4 rounded-md shadow-md">
          <Calendar size={48} />
          <h2 className="text-xl font-semibold mt-4">View Appointments</h2>
          <p className="mt-2">Check and manage your upcoming appointments.</p>
          <button className="mt-4 bg-blue-700 py-2 px-4 rounded">Go to Appointments</button>
        </div>
        
        {/* View Medical History */}
        <div className="dashboard-card bg-green-500 text-white p-4 rounded-md shadow-md">
          <Clipboard size={48} />
          <h2 className="text-xl font-semibold mt-4">View Medical History</h2>
          <p className="mt-2">Review your past medical records and reports.</p>
          <button className="mt-4 bg-green-700 py-2 px-4 rounded">Go to Medical History</button>
        </div>
        
        {/* View Doctors */}
        <div className="dashboard-card bg-yellow-500 text-white p-4 rounded-md shadow-md">
          <User size={48} />
          <h2 className="text-xl font-semibold mt-4">View Doctors</h2>
          <p className="mt-2">Find doctors and specialists available for consultations.</p>
          <button className="mt-4 bg-yellow-700 py-2 px-4 rounded">Go to Doctors</button>
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
            disabled={uploading || !selectedFiles || documentNames.some((name) => !name) || !userId}
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>

          {/* Show uploaded documents */}
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
    </div>
  );
};

export default Dashboard;
