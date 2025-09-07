const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();

// Contact form submission function
exports.contact = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const payload = req.body || {};
    const required = ['firstName', 'lastName', 'email', 'contactNumber', 'location', 'profession', 'message'];
    
    // Validate required fields
    for (const key of required) {
      if (!payload[key] || String(payload[key]).trim() === '') {
        return res.status(400).json({ error: `${key} is required` });
      }
    }
    
    // Prepare contact data
    const contactData = {
      ...payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      timestamp: Date.now()
    };
    
    // Save to Firestore
    const docRef = await db.collection('contacts').add(contactData);
    
    console.log('✅ Contact saved to Firebase:', { id: docRef.id, ...contactData });
    
    res.status(201).json({
      success: true,
      id: docRef.id,
      message: 'Contact form submitted successfully'
    });
    
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// Get all contacts function (admin)
exports.getContacts = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const snapshot = await db.collection('contacts')
      .orderBy('createdAt', 'desc')
      .get();
    
    const contacts = [];
    snapshot.forEach(doc => {
      contacts.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

// Health check function
exports.health = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    firebase: 'connected'
  });
});
