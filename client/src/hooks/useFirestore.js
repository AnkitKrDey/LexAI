import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFirestore = () => {
  const getUserDoc = async (uid) => {
    const ref = doc(db, 'users', uid);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? snapshot.data() : null;
  };

  const upsertUserDoc = async (uid, data) => {
    const ref = doc(db, 'users', uid);
    await setDoc(ref, data, { merge: true });
  };

  return { getUserDoc, upsertUserDoc };
};
