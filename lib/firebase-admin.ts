// lib/firebase-admin.js
import admin from 'firebase-admin';

// Check if Firebase Admin app has already been initialized to avoid duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin?.credential?.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
    }),
  });
}

// Export Firebase Admin services
export const auth = admin.auth();
export const db = admin.firestore();
