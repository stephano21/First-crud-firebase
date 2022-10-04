// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, 
    collection, addDoc, 
    getDocs, onSnapshot, 
    deleteDoc, 
    doc, 
    getDoc, 
    updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    /* Put  you credentials here*/
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()
/* Save a new task */
export const savetask = (title, description) => {
    addDoc(collection(db, 'task'), { title, description })
}
/* Get and load all task */
export const getTasks = () => getDocs(collection(db, 'task'))
/* Get an id for all task */
export const onGetTask = (callback) => onSnapshot(collection(db, 'task'), callback)
/* Fuction for delete a selected task */
export const deleteTask = id => deleteDoc(doc(db, 'task', id))
/* Get id of the task selected for delete or edit */
export const getTask = id => getDoc(doc(db, 'task', id))
/* Fuction for upate an selected task */
export const updateTask = (id, newField) => updateDoc(doc(db, 'task', id), newField)

