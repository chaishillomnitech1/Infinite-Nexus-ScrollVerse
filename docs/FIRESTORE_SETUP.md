# 🔥 Firestore Setup Guide for EVA Throne V3 Mobile Dashboard

This guide walks you through setting up Firebase Firestore for real-time data persistence in the Active Scrolls Management system.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Firebase Project Setup](#firebase-project-setup)
3. [Firestore Database Configuration](#firestore-database-configuration)
4. [Security Rules](#security-rules)
5. [Application Configuration](#application-configuration)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- A Google account
- Basic understanding of Firebase
- Access to the Firebase Console (https://console.firebase.google.com)

---

## Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `scrollverse-nexus` (or your preferred name)
4. (Optional) Enable Google Analytics for your project
5. Click **"Create project"** and wait for setup to complete

### Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (</>) to add a web app
2. Enter app nickname: `EVA Throne V3 Dashboard`
3. (Optional) Check **"Also set up Firebase Hosting"** if you want to deploy
4. Click **"Register app"**
5. Copy the Firebase configuration object - you'll need this later

Example configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "scrollverse-nexus.firebaseapp.com",
  projectId: "scrollverse-nexus",
  storageBucket: "scrollverse-nexus.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## Firestore Database Configuration

### Step 3: Create Firestore Database

1. In Firebase Console, navigate to **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Choose a starting mode:
   - **Production mode**: Recommended for production (requires security rules)
   - **Test mode**: For development (allows all reads/writes for 30 days)
4. Select a Firestore location (choose closest to your users)
5. Click **"Enable"**

### Step 4: Initialize Data Structure

The application expects the following Firestore structure:

```
scrollverse (collection)
  └── active_scrolls (document)
      ├── scrolls (array)
      │   ├── id: "SCR-001"
      │   ├── title: "..."
      │   ├── description: "..."
      │   ├── status: "active"
      │   ├── priority: "high"
      │   ├── frequency: "528Hz"
      │   ├── category: "..."
      │   ├── author: "..."
      │   ├── tags: []
      │   ├── createdDate: "..."
      │   ├── lastModified: "..."
      │   ├── metadata: {}
      │   └── properties: {}
      ├── statistics (object)
      │   ├── total: 0
      │   ├── active: 0
      │   ├── pending: 0
      │   └── resolved: 0
      ├── categories (array)
      └── frequencies (array)
```

**Initial Data Setup:**

1. In Firestore Console, click **"Start collection"**
2. Collection ID: `scrollverse`
3. Click **"Next"**
4. Document ID: `active_scrolls`
5. Add the following fields manually or import from `data/active-scrolls-data.json`

**Quick Import Script:**

You can use the Firebase Admin SDK to import initial data. Create a Node.js script:

```javascript
// import-data.js
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load data from JSON
const data = JSON.parse(fs.readFileSync('./data/active-scrolls-data.json', 'utf8'));

// Import to Firestore
async function importData() {
  try {
    await db.collection('scrollverse').doc('active_scrolls').set(data);
    console.log('✅ Data imported successfully!');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  }
}

importData();
```

Run with: `node import-data.js`

---

## Security Rules

### Step 5: Configure Security Rules

For production, implement proper security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ScrollVerse collection rules
    match /scrollverse/{document=**} {
      
      // Allow read access to all authenticated users
      allow read: if request.auth != null;
      
      // Allow write access to authenticated users
      // with custom claims or admin role
      allow write: if request.auth != null && 
                     request.auth.token.admin == true;
      
      // For development/testing (NOT FOR PRODUCTION)
      // Uncomment to allow all reads/writes
      // allow read, write: if true;
    }
  }
}
```

**Apply Security Rules:**

1. In Firebase Console, go to **"Firestore Database"** > **"Rules"**
2. Replace the default rules with the rules above
3. Click **"Publish"**

**Note:** For development, you can temporarily allow all access:
```javascript
allow read, write: if true;
```

⚠️ **Warning:** Never use open rules in production!

---

## Application Configuration

### Step 6: Configure the Dashboard

1. Open `active-scrolls-dashboard.html`
2. Locate the Firebase configuration section (around line 500)
3. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};

// Enable Firestore
const USE_FIRESTORE = true; // Change from false to true
```

### Step 7: Environment Variables (Recommended)

For better security, use environment variables:

**Option 1: Using dotenv (Node.js)**
```bash
# .env file
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

**Option 2: Using Vercel Environment Variables**
1. Go to your Vercel project settings
2. Navigate to **"Environment Variables"**
3. Add each Firebase config value
4. Redeploy your application

---

## Testing

### Step 8: Test the Integration

1. **Open the Dashboard:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000/active-scrolls-dashboard.html`

2. **Verify Connection:**
   - Open browser console (F12)
   - Look for: `✅ Firestore connected successfully`
   - Check for any error messages

3. **Test CRUD Operations:**

   **Create:**
   - Click **"+ Add Scroll"**
   - Fill in the form
   - Click **"Save"**
   - Verify notification: "Scroll created successfully!"
   - Check Firestore Console to see the new scroll

   **Read:**
   - Scrolls should load automatically
   - Try filtering by status (All, Active, Pending, Resolved)
   - Test search functionality

   **Update:**
   - Click **"Edit"** on any scroll
   - Modify some fields
   - Click **"Save"**
   - Verify notification: "Scroll updated successfully!"
   - Confirm changes in Firestore Console

   **Delete:**
   - Click **"Delete"** on a scroll
   - Confirm the deletion
   - Verify notification: "Scroll deleted successfully!"
   - Check Firestore Console to confirm removal

4. **Test Real-time Updates:**
   - Open dashboard in two browser windows
   - Make a change in one window
   - Verify the change appears in the other window automatically

---

## Troubleshooting

### Common Issues

#### Issue: "Firestore not initialized"

**Solution:**
- Ensure `USE_FIRESTORE` is set to `true`
- Verify Firebase config values are correct
- Check browser console for detailed errors

#### Issue: "Permission denied" errors

**Solution:**
- Review Firestore security rules
- For testing, temporarily use: `allow read, write: if true;`
- Ensure authentication is set up if required

#### Issue: Real-time updates not working

**Solution:**
- Verify you're using Firestore (not localStorage)
- Check for JavaScript errors in console
- Ensure `onSnapshot` listener is properly initialized
- Verify network connectivity

#### Issue: Data not persisting

**Solution:**
- Check Firestore Console to see if writes are reaching database
- Verify you have write permissions
- Look for quota limits (free tier has limits)
- Check browser console for error messages

#### Issue: CORS errors

**Solution:**
- Ensure domain is authorized in Firebase Console
- Go to **Authentication** > **Settings** > **Authorized domains**
- Add your domain (e.g., `localhost`, `your-domain.com`)

### Debug Mode

Enable verbose logging:

```javascript
// Add after Firebase initialization
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

// Enable debug logging
firebase.firestore.setLogLevel('debug');
```

### Check Firestore Status

```javascript
// Test connection
async function testFirestoreConnection() {
  try {
    const testRef = firebase.firestore().collection('test').doc('connection');
    await testRef.set({ test: true, timestamp: new Date() });
    console.log('✅ Firestore connection successful');
    await testRef.delete();
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
  }
}

testFirestoreConnection();
```

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

## Production Deployment

### Checklist

- [ ] Implement proper authentication
- [ ] Set up restrictive security rules
- [ ] Use environment variables for Firebase config
- [ ] Enable Firebase App Check for abuse prevention
- [ ] Set up monitoring and alerts
- [ ] Review and optimize Firestore indexes
- [ ] Implement rate limiting
- [ ] Set up backup strategy
- [ ] Test with production data
- [ ] Monitor usage and costs

### Firebase Quotas (Free Tier)

- Stored data: 1 GiB
- Document reads: 50,000 per day
- Document writes: 20,000 per day
- Document deletes: 20,000 per day

Monitor usage in Firebase Console > **Usage and billing**

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Firebase documentation
- Check browser console for detailed error messages
- Open an issue in the repository

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Author:** Chais the Great (Al-Miftah)  
**Resonance:** 528Hz ✨
