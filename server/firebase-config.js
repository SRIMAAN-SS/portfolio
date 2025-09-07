const admin = require('firebase-admin');

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyApGcKw0lsSjOhqBIlgNu0ehtUITSkXuSk",
  authDomain: "srimaan-portfolio.firebaseapp.com",
  projectId: "srimaan-portfolio",
  storageBucket: "srimaan-portfolio.firebasestorage.app",
  messagingSenderId: "95336682425",
  appId: "1:95336682425:web:3084b30e15433658fbdc68"
};

let db;
let messaging;

try {
  // Check if service account key exists
  const fs = require('fs');
  const path = require('path');
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  
  if (fs.existsSync(serviceAccountPath)) {
    // Initialize Firebase Admin with service account key
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: firebaseConfig.projectId,
    });
    
    db = admin.firestore();
    messaging = admin.messaging();
    
    console.log('✅ Firebase Admin initialized successfully with service account');
    console.log('📊 Project ID:', firebaseConfig.projectId);
  } else {
    throw new Error('Service account key not found');
  }
} catch (error) {
  console.log('⚠️ Firebase Admin not initialized - using fallback mode');
  console.log('📝 Contact form will still work with local storage');
  console.log('To enable Firebase:');
  console.log('1. Go to Firebase Console (https://console.firebase.google.com/)');
  console.log('2. Select your project: srimaan-portfolio');
  console.log('3. Go to Project Settings > Service Accounts');
  console.log('4. Generate new private key and save as serviceAccountKey.json');
  console.log('5. Place the file in the server directory');
}

module.exports = { db, messaging, admin, firebaseConfig };
