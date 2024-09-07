'use client'
import React, { useEffect, useState } from 'react';
import { getMedicalDocuments } from '@/actions/patients/getMedicalRecords';

type Props = {
  patientId: string; // patientId passed as prop
  onClose: () => void; // Function to close the modal
};

const ViewMedicalHistoryModal = ({ patientId, onClose }: Props) => {
  const [medicalDocuments, setMedicalDocuments] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fetchedDocuments = await getMedicalDocuments(patientId);

        // Check if fetchedDocuments is defined and has the medicalDocuments key
        if (fetchedDocuments && fetchedDocuments.medicalDocuments) {
          setMedicalDocuments(fetchedDocuments.medicalDocuments);
        } else {
          setError('No medical documents found.');
        }
      } catch (err) {
        setError('Failed to fetch medical records.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [patientId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">File Name</th>
              <th className="py-2 px-4 border-b">Download Link</th>
            </tr>
          </thead>
          <tbody>
            {medicalDocuments.length > 0 ? (
              medicalDocuments.map((doc, index) => (
                Object.entries(doc).map(([name, url]) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{name}</td>
                    <td className="py-2 px-4 border-b">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-2 px-4 border-b text-center">No documents available</td>
              </tr>
            )}
          </tbody>
        </table>

        <button 
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewMedicalHistoryModal;
