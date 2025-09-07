const admin = require('firebase-admin');

// Initialize Firebase Admin (will use default credentials in Netlify)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'srimaan-portfolio'
  });
}

const db = admin.firestore();

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const required = ['firstName', 'lastName', 'email', 'contactNumber', 'location', 'profession', 'message'];
    
    // Validate required fields
    for (const key of required) {
      if (!payload[key] || String(payload[key]).trim() === '') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `${key} is required` })
        };
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
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        id: docRef.id,
        message: 'Contact form submitted successfully'
      })
    };
    
  } catch (error) {
    console.error('Create contact error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save contact' })
    };
  }
};
