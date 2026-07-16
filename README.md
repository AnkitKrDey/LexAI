# LexAI — AI-Powered Legal & Contract Generator

LexAI is a production-ready full-stack SaaS web application that helps users generate, analyze, edit, and export legally structured contracts using Google Gemini. It includes secure authentication, Firestore persistence, risk analysis, plain-English summaries, and server-side PDF generation.

![LexAI Screenshot Placeholder](https://via.placeholder.com/1280x720?text=LexAI+Dashboard+Screenshot)

## Features

- [x] Firebase Authentication (Email/Password + Google OAuth)
- [x] Protected app routes with token-based backend verification
- [x] AI contract generation via Gemini (`gemini-1.5-pro`)
- [x] Risk analysis with structured JSON output and severity tagging
- [x] Contract plain-English summarization
- [x] 3-step contract creation wizard
- [x] Real-time clause editing with autosave
- [x] Add/edit/delete clause system
- [x] Dashboard analytics and contract management
- [x] PDF export via `pdfkit` with signatures and page numbers
- [x] Dark mode with localStorage persistence
- [x] Secure middleware stack: Helmet, CORS, rate limits, sanitization
- [x] Responsive premium SaaS UI with Framer Motion animations
- [x] Deploy-ready architecture for Vercel (frontend) + Render (backend)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Framer Motion, Radix UI, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| AI | Google Gemini API (`gemini-1.5-pro`) |
| PDF | `pdfkit` |
| Deployment | Vercel (frontend), Render or GCP (backend) |

## Prerequisites

- Node.js 18+
- npm 9+
- Firebase project and service account
- Gemini API key from Google AI Studio

## Local Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd project-contract-generator
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ../server
npm install
```

4. Fill environment variables:

- Update `/Users/ankitkumardey/Desktop/project-contract-generator/client/.env.local`
- Update `/Users/ankitkumardey/Desktop/project-contract-generator/server/.env`

5. Run backend:

```bash
cd /Users/ankitkumardey/Desktop/project-contract-generator/server
npm run dev
```

6. Run frontend in a separate terminal:

```bash
cd /Users/ankitkumardey/Desktop/project-contract-generator/client
npm run dev
```

7. Open:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Firebase Setup

1. Create a Firebase project: [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication:
- Email/Password
- Google Sign-In
3. Create Firestore Database in production mode.
4. Generate a service account key (Project Settings → Service Accounts).
5. Put values into backend `.env`:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (escape newlines as `\n`)
6. Paste Firestore security rules:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /contracts/{contractId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

## Gemini API Setup

1. Visit [aistudio.google.com](https://aistudio.google.com)
2. Create API key
3. Set `GEMINI_API_KEY` in `/Users/ankitkumardey/Desktop/project-contract-generator/server/.env`

## Deployment

### Frontend on Vercel

1. Push repository to GitHub.
2. Import the `client` directory into Vercel.
3. Set frontend environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_BASE_URL` (Render/GCP backend URL)
4. Deploy.

### Backend on Render

1. Create a new Web Service in Render pointing to `server`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Set backend environment variables:
- `PORT`
- `GEMINI_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `JWT_SECRET`
- `NODE_ENV=production`
- `VITE_CLIENT_URL` (your Vercel URL)
5. Deploy and verify `/health`.

### Backend on GCP (Alternative)

- Deploy `server` to Cloud Run with the same environment variables.
- Ensure CORS `VITE_CLIENT_URL` matches your frontend domain.

## API Endpoint Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create/merge Firestore user document |
| POST | `/api/auth/verify` | Verify Firebase token and return user profile |
| GET | `/api/contracts` | Get all contracts for authenticated user |
| POST | `/api/contracts` | Create a new contract |
| GET | `/api/contracts/:id` | Get a contract by ID |
| PUT | `/api/contracts/:id` | Update contract content/clauses/metadata |
| DELETE | `/api/contracts/:id` | Delete a contract |
| POST | `/api/ai/generate` | Generate contract text with Gemini |
| POST | `/api/ai/analyze` | Analyze legal risk with Gemini |
| POST | `/api/ai/summarize` | Generate simple summary with Gemini |
| POST | `/api/pdf/generate` | Generate and download contract PDF |

## Environment Variables

### Frontend (`/client/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `VITE_API_BASE_URL` | Yes | Backend base URL |

### Backend (`/server/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | Backend port (default `5000`) |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Yes | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Yes | Firebase service private key |
| `JWT_SECRET` | Yes | Reserved secret for extensibility |
| `NODE_ENV` | Yes | `development` or `production` |
| `VITE_CLIENT_URL` | Yes | Allowed CORS origin |

## License

MIT
