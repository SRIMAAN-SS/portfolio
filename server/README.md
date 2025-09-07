# Portfolio Server

Simple Express.js server for the portfolio website with Firebase integration.

## Features

- ✅ **Firebase Firestore**: Store contact form submissions
- ✅ **Contact Form API**: Handle form submissions
- ✅ **Health Check**: Server status endpoint
- ✅ **Static Files**: Serve portfolio website

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Firebase Setup:**
   - Place your `serviceAccountKey.json` file in the `server` directory
   - The server will automatically use Firebase Firestore for data storage

3. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)
- `GET /api/health` - Server health check
- `GET /api/firebase-config` - Firebase configuration for frontend

## Contact Form Data

The contact form saves the following data to Firebase:
- firstName, lastName, email, contactNumber, location, profession, message, linkedin
- createdAt timestamp
- Auto-generated document ID

## Server Status

The server runs on `http://localhost:3000` by default.

If Firebase is not available, the server will use local fallback storage.