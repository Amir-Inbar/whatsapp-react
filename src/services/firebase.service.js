import { initializeApp } from "firebase/app";
// import { getStorage} from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  addDoc,
  where,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
// import { async } from "@firebase/util";
// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

async function queryItems(collectionName, operator = "==", items = "") {
  const q = query(collection(db, collectionName), where(documentId(), operator, items));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { _id: doc.id, ...doc.data() };
  });
}

async function getEntityById(collectionName, key = "", operator = "==", condition = "") {
  const q = query(collection(db, collectionName), where(key === "docId" ? documentId() : key, operator, condition));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { _id: doc.id, ...doc.data() };
  });
}

async function getEntitys(collectionName, operator = "in", items = []) {
  const q = query(collection(db, collectionName), where(documentId(), operator, items));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { _id: doc.id, ...doc.data() };
  });
}

async function saveEntity(collectionName, entity) {
  if (entity._id) {
    const entityRef = doc(db, collectionName, entity._id);
    delete entity._id;
   return await updateDoc(entityRef, entity);
  } else {
    return await addDoc(collection(db, collectionName), {
      ...entity,
      createdAt: serverTimestamp(),
    });
  }
}

async function removeEntity(collectionName, entityId) {
  await deleteDoc(doc(db, collectionName, entityId));
}

async function getChatById(collectionName, entityId, cb) {
  onSnapshot(doc(db, collectionName, entityId), (doc) => {
    cb({ ...doc.data() });
  });
}

async function sendMsg(collectionName, userMsg, activeChatId) {
  const entityRef = doc(db, collectionName, activeChatId);
  const docSnap = await getDoc(entityRef);
  const updateChat = docSnap.data();
  updateChat.msgs.push(userMsg);
  return await updateDoc(entityRef, updateChat);
}

async function logOut() {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
}

export const firebaseService = {
  queryItems,
  getChatById,
  sendMsg,
  removeEntity,
  getEntityById,
  saveEntity,
  getEntitys,
};

export const firebaseAuth = {
  auth,
  onAuthStateChanged,
  logOut,
  updateProfile,
};
