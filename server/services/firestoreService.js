import admin from 'firebase-admin';
import { firestore } from '../config/firebase.config.js';

const usersCollection = firestore.collection('users');
const contractsCollection = firestore.collection('contracts');

export const firestoreService = {
  async upsertUser(user) {
    const docRef = usersCollection.doc(user.uid);
    const snapshot = await docRef.get();

    const payload = {
      uid: user.uid,
      name: user.name || user.email?.split('@')[0] || 'User',
      email: user.email,
      plan: snapshot.exists ? snapshot.data().plan || 'free' : 'free',
      contractCount: snapshot.exists ? snapshot.data().contractCount || 0 : 0,
      createdAt: snapshot.exists ? snapshot.data().createdAt : admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.set(payload, { merge: true });
    const fresh = await docRef.get();
    return fresh.data();
  },

  async getUser(uid) {
    const snapshot = await usersCollection.doc(uid).get();
    return snapshot.exists ? snapshot.data() : null;
  },

  async createContract(data) {
    const docRef = contractsCollection.doc();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const contract = {
      contractId: docRef.id,
      userId: data.userId,
      type: data.type,
      title: data.title,
      formData: data.formData || {},
      content: data.content || '',
      clauses: data.clauses || [],
      riskAnalysis: data.riskAnalysis || {
        riskScore: 'Medium',
        riskyClauses: [],
        suggestions: [],
        summary: '',
      },
      simpleSummary: data.simpleSummary || '',
      status: data.status || 'draft',
      pdfUrl: data.pdfUrl || null,
      createdAt: now,
      updatedAt: now,
    };

    await docRef.set(contract);

    await usersCollection.doc(data.userId).set(
      {
        contractCount: admin.firestore.FieldValue.increment(1),
        updatedAt: now,
      },
      { merge: true }
    );

    const snapshot = await docRef.get();
    return snapshot.data();
  },

  async getContractsByUser(userId) {
    const snapshot = await contractsCollection
      .where('userId', '==', userId)
      .orderBy('updatedAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => doc.data());
  },

  async getContractById(contractId) {
    const snapshot = await contractsCollection.doc(contractId).get();
    return snapshot.exists ? snapshot.data() : null;
  },

  async updateContract(contractId, payload) {
    const now = admin.firestore.FieldValue.serverTimestamp();
    await contractsCollection.doc(contractId).set({ ...payload, updatedAt: now }, { merge: true });
    const snapshot = await contractsCollection.doc(contractId).get();
    return snapshot.data();
  },

  async deleteContract(contractId, userId) {
    await contractsCollection.doc(contractId).delete();
    await usersCollection.doc(userId).set(
      {
        contractCount: admin.firestore.FieldValue.increment(-1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  },
};
