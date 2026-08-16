import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

/* =========================================
   HEALTH CHECK
========================================= */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'Backend is running!'
  });
});

/* =========================================
   GEMINI CHAT
========================================= */

app.post('/api/gemini/chat', async (req, res) => {
  try {

    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key not configured'
      });
    }

    const model =
      genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction:
          systemPrompt ||
          'You are a helpful water quality analysis assistant.'
      });

    const result =
      await model.generateContent(message);

    const reply =
      result.response.text();

    res.json({
      success: true,
      reply
    });

  } catch (error) {

    console.error(
      'Gemini API error:',
      error
    );

    res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });

  }
});

/* =========================================
   GEMINI TEST
========================================= */

app.get('/api/test/gemini', async (req, res) => {
  try {

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        configured: false,
        error: 'Gemini API key not configured'
      });
    }

    const model =
      genAI.getGenerativeModel({
        model: 'gemini-2.5-flash'
      });

    const result =
      await model.generateContent(
        'Say hello'
      );

    res.json({
      configured: true,
      response:
        result.response.text()
    });

  } catch (error) {

    console.error(
      'Gemini test error:',
      error
    );

    res.status(500).json({
      configured: false,
      error: error.message
    });

  }
});

/* =========================================
   FIREBASE CONFIG
========================================= */

app.get('/api/config/firebase', (req, res) => {

  if (!process.env.FIREBASE_API_KEY) {

    return res.status(500).json({
      error:
        'Firebase configuration not available'
    });

  }

  res.json({
    apiKey:
      process.env.FIREBASE_API_KEY,

    authDomain:
      process.env.FIREBASE_AUTH_DOMAIN,

    projectId:
      process.env.FIREBASE_PROJECT_ID,

    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET,

    messagingSenderId:
      process.env.FIREBASE_MESSAGING_SENDER_ID,

    appId:
      process.env.FIREBASE_APP_ID,

    measurementId:
      process.env.FIREBASE_MEASUREMENT_ID
  });

});

/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {

  console.log(
    `🚀 B.R.E.A.T.H.E. Backend running on port ${PORT}`
  );

  console.log(
    `📊 Environment: ${
      process.env.NODE_ENV ||
      'development'
    }`
  );

  console.log(
    `🔑 Gemini API: ${
      process.env.GEMINI_API_KEY
        ? '✓ Configured'
        : '✗ Not configured'
    }`
  );

});
