import 'dotenv/config';
import { firestore } from './config/firebase.config.js';

async function testFirestore() {
  try {
    console.log('1. Attempting to access Firestore collection...');
    const snapshot = await firestore.collection('users').limit(1).get();
    console.log('2. Firestore read completed successfully!');
    console.log('Number of documents read:', snapshot.size);
    snapshot.forEach(doc => {
      console.log('User document ID:', doc.id, doc.data());
    });
  } catch (error) {
    console.error('Firestore operation failed:', error.message || error);
  }
}

testFirestore();
