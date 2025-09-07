// Simple contact form handler for Vercel
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
    const required = ['firstName', 'email', 'message'];
    
    // Validate required fields
    for (const key of required) {
      if (!payload[key] || String(payload[key]).trim() === '') {
        return res.status(400).json({ error: `${key} is required` });
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Prepare contact data
    const contactData = {
      ...payload,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    
    // Log the contact data (in production, you might want to save to a database)
    console.log('✅ Contact form submitted:', contactData);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        name: `${payload.firstName} ${payload.lastName || ''}`.trim(),
        email: payload.email,
        timestamp: contactData.timestamp
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
}
