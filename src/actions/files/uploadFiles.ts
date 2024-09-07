import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebaseConfig';  // Make sure this path is correct

// Function to upload a file to Firebase Storage
export const uploadFile = async (file: File, folderName: string = 'uploads') => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Create a storage reference
    const storageRef = ref(storage, `${folderName}/${file.name}`);

    // Start the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wrap the upload task in a promise
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can handle progress updates here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle any errors
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          // Upload completed successfully, now get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};
