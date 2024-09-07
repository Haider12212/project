import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from '@/lib/firebaseConfig';  // Ensure this path is correct

// Function to upload multiple files to Firebase Storage and update the user's document with the file names and URLs
export const uploadFiles = async (
  filesWithNames: { file: File; name: string }[],
  userId: string,
  folderName: string = 'medical-documents'
) => {
  try {
    const fileUploads = filesWithNames.map(({ file, name }) => {
      // Create a unique storage reference using the userId
      const storageRef = ref(storage, `${folderName}/${userId}/${name}_${file.name}`);

      // Start the file upload
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Return a promise for each file upload
      return new Promise<{ name: string; url: string }>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          async () => {
            // Upload completed, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ name, url: downloadURL });
          }
        );
      });
    });

    // Resolve all file uploads
    const uploadedFiles = await Promise.all(fileUploads);

    // Create a map of the uploaded file names and URLs
    const filesMap = uploadedFiles.reduce((acc, { name, url }) => {
      acc[name] = url;
      return acc;
    }, {} as Record<string, string>);

    // Update the user's Firestore document with the uploaded files
    const userDocRef = doc(db, 'patients', userId);
    await updateDoc(userDocRef, {
      medicalDocuments: arrayUnion(filesMap), // Add the new files to the `medicalDocuments` field
    });

    console.log('User document updated with uploaded files.');

    return uploadedFiles;
  } catch (error) {
    console.error('Error uploading files or updating user document:', error);
    throw new Error('Failed to upload files and update user document');
  }
};
