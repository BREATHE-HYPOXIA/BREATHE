# B.R.E.A.T.H.E. Backend

A secure Node.js/Express backend for the B.R.E.A.T.H.E. Water Quality Monitoring System.

## Features

- ✅ Gemini AI chat API endpoint
- ✅ Secure API key management
- ✅ CORS configured for frontend
- ✅ Environment-based configuration
- ✅ Ready for deployment to Render, Railway, or Heroku

## Local Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the backend folder:
```bash
cd BREATHE-BCK
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from the template:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
```

### Running Locally

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on http://localhost:3000

### Testing

Check if the backend is running:
```bash
curl http://localhost:3000/api/health
```

Test Gemini API:
```bash
curl http://localhost:3000/api/test/gemini
```

Test Gemini chat:
```bash
curl -X POST http://localhost:3000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?"}'
```

## API Endpoints

### GET `/api/health`
Returns health status of the backend.

**Response:**
```json
{ "status": "Backend is running!" }
```

### POST `/api/gemini/chat`
Sends a message to Gemini AI and gets a response.

**Request Body:**
```json
{
  "message": "Your question or prompt",
  "systemPrompt": "Optional system instruction"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "AI response text"
}
```

### GET `/api/test/gemini`
Tests if Gemini API is properly configured.

## Deployment to Render

### Step 1: Prepare Your Git Repository

Make sure you have git initialized and committed:
```bash
cd .. # go to root directory
git init
git add .
git commit -m "Initial commit with backend"
```

### Step 2: Push to GitHub

1. Create a GitHub repository
2. Push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in the form:
   - **Name:** breathe-backend
   - **Root Directory:** `BREATHE-BCK`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click "Advanced" and add environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `FRONTEND_URL`: Your frontend URL (e.g., `https://yourdomain.com`)
6. Click "Create Web Service"

Render will automatically deploy. Your backend URL will look like:
```
https://breathe-backend.onrender.com
```

### Step 4: Update Frontend

Update your HTML file to use the new backend URL:

Change:
```javascript
const BACKEND_URL = "http://localhost:3000";
```

To your Render URL when deployed.

## Security Best Practices

✅ **What This Backend Does:**
- Keeps API keys secure on the server
- Never exposes secrets to the frontend
- Uses CORS to restrict API access
- Validates incoming requests

✅ **What You Should Do:**
- Never commit `.env` file
- Use strong, unique API keys
- Set `FRONTEND_URL` to your actual domain
- Regularly rotate API keys
- Monitor Render logs for errors

## Firebase Security Rules

Use the included `firestore.rules` file for your Firestore database.

## Troubleshooting

**Backend not starting?**
- Check Node.js version: `node --version` (needs 16+)
- Verify `.env` file exists and has `GEMINI_API_KEY`

**CORS errors?**
- Update `FRONTEND_URL` in `.env`
- Check that frontend domain is in CORS whitelist

**Gemini API errors?**
- Verify API key is valid
- Check Gemini API quotas at [Google AI Studio](https://aistudio.google.com)
- Test with: `curl http://localhost:3000/api/test/gemini`

**Can't deploy to Render?**
- Ensure git repository is up to date
- Check Render build logs for errors
- Verify environment variables are set in Render dashboard

## Support

For issues with:
- **Gemini API**: [Google AI Documentation](https://ai.google.dev/)
- **Express**: [Express.js Documentation](https://expressjs.com/)
- **Render**: [Render Documentation](https://render.com/docs)
