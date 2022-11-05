import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBN9CrDBE3TpT0Toir6MXexz5hY0ZXmuZg',
  authDomain: 'crwn-clothing-db-d3e09.firebaseapp.com',
  projectId: 'crwn-clothing-db-d3e09',
  storageBucket: 'crwn-clothing-db-d3e09.appspot.com',
  messagingSenderId: '622534427354',
  appId: '1:622534427354:web:ced59a5b06d96c92505be3'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup: () => Promise<UserCredential> =
  () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: []
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(
      collectionRef,
      // @ts-ignore
      object.title.toLowerCase()
    );
    batch.set(docRef, object);
  });
  // @ts-ignore
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data()
  );

  return categoryMap;
};
export const createUserDocumentFromAuth = async (
  userAuth: User
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log(
        'error creating the user',
        error instanceof Error ? error.message : null
      );
    }
  }
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export async function signOutUser() {
  signOut(auth);
}

export const onAuthStateChangedListener = (
  callback: NextOrObserver<User>
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  console.log('getCurrentUser');
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
