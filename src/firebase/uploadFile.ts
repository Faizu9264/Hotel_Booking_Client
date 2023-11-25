import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getStorage} from 'firebase/storage';
import { app as firebaseApp } from './config';

const storage = getStorage(firebaseApp);

const uploadFile = (file: File, filePath: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

export default uploadFile;
