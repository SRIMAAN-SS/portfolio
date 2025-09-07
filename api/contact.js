const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'srimaan-portfolio'
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
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
}
