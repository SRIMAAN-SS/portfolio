'use strict';

const path = require('path');
const express = require('express');
const { db, firebaseConfig } = require('./firebase-config');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Firebase Firestore setup
const contactsCollection = 'contacts';

// Fallback storage for when Firebase is not available
let fallbackContacts = [];

console.log('✅ Using Firebase Firestore for data storage');

// Serve Firebase config to frontend
app.get('/api/firebase-config', (req, res) => {
  res.json(firebaseConfig);
});

app.post('/api/contact', async (req, res) => {
  try {
    const payload = req.body || {};
    const required = ['firstName', 'lastName', 'email', 'contactNumber', 'location', 'profession', 'message'];
    for (const key of required) {
      if (!payload[key] || String(payload[key]).trim() === '') {
        return res.status(400).json({ error: `${key} is required` });
      }
    }
    
    // Save to Firebase Firestore or fallback
    const contactData = {
      ...payload,
      createdAt: new Date(),
      timestamp: Date.now()
    };
    
    let contactId;
    
    if (db) {
      // Save to Firebase Firestore
      const docRef = await db.collection(contactsCollection).add(contactData);
      contactId = docRef.id;
      console.log('✅ Contact saved to Firebase:', { id: contactId, ...contactData });
    } else {
      // Fallback to local storage
      contactId = Date.now().toString();
      contactData.id = contactId;
      fallbackContacts.push(contactData);
      console.log('✅ Contact saved to fallback storage:', contactData);
    }
    
    res.status(201).json({
      success: true,
      id: contactId,
      message: 'Contact form submitted successfully'
    });
    
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Get all contacts (for admin purposes)
app.get('/api/contacts', async (req, res) => {
  try {
    if (db) {
      // Get from Firebase Firestore
      const snapshot = await db.collection(contactsCollection)
        .orderBy('createdAt', 'desc')
        .get();
      
      const contacts = [];
      snapshot.forEach(doc => {
        contacts.push({ id: doc.id, ...doc.data() });
      });
      
      res.json(contacts);
    } else {
      // Get from fallback storage
      res.json(fallbackContacts.sort((a, b) => b.timestamp - a.timestamp));
    }
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    firebase: db ? 'connected' : 'fallback mode'
  });
});

const PORT = process.env.PORT || 3000;

// For Vercel deployment
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  // For local development
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}