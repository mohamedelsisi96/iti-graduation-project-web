// File: functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');

admin.initializeApp();
const app = express();

// Enable CORS for all origins
app.use(cors({ origin: true }));

// Example endpoint
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    res.status(201).json({ user: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export the API
exports.api = functions.https.onRequest(app);
