import { initializeApp } from "firebase/app";
// import {getStorage} from 'firebase/storage'
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD2S9w25nyp_9mz3x1I_9cc472PkvMYL3Q",
  authDomain: "kinals-corner.firebaseapp.com",
  projectId: "kinals-corner",
  storageBucket: "kinals-corner.appspot.com",
  messagingSenderId: "222837360747",
  appId: "1:222837360747:web:184ed02c403a46b028c92e",
  measurementId: "G-3Q0P02RVV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFile(file, id) {
    const storageRef = ref(storage, 'teachers/' +id)
    await uploadBytes(storageRef, file)
}

export async function getFile(id) {
    const url = await getDownloadURL(ref(storage, `teachers/${id}`))
    return url
}

export async function deleteFile(id){
    const desertRef = ref(storage, `teachers/${id}`)
    return await deleteObject(desertRef)
}

export async function uploadFileHS(file, id) {
    const storageRef = ref(storage, 'helpSocials/' + id);
    await uploadBytes(storageRef, file);
}