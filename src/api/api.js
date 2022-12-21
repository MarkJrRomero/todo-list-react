import {
    collection,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query, 
    where
  } from "firebase/firestore";

  import { db } from "./config";

  export {collection,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query, 
    where};


  
  const tableros = "tableros";
  const notas = "notas";
  
// Ordenes
  export const saveTablero = (newLink) => addDoc(collection(db, tableros), newLink);
  
  export const updateTablero = (id, updatedFields) => updateDoc(doc(db, tableros, id), updatedFields);
  
  export const onGetTableros = (callback) => {
    const unsub = onSnapshot(collection(db, tableros), callback);
    return unsub;
  };
  
  export const getTableros = () => getDocs(collection(db, tableros));
  
  export const deleteTablero = (id) => deleteDoc(doc(db, tableros, id));
  
  export const getTablero = (id) => getDoc(doc(db, tableros, id));



  export const saveNota = (newLink) => addDoc(collection(db, notas), newLink);
 