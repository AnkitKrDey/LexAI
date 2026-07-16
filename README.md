# LexAI — AI-Powered Legal & Contract Generator

LexAI is a modern, full-stack web application designed to help users generate, analyze, edit, and export legally structured contracts using Google Gemini. It features secure user authentication, Firestore persistence, clause management, legal risk analysis, plain-English contract summaries, and server-side PDF exports.

## How LexAI is Helpful for Personal Use

Managing and drafting contracts can be expensive, complex, and time-consuming. LexAI makes legal document drafting accessible for personal use by providing:
- **Instant Contract Drafting**: Easily generate standard agreements like Non-Disclosure Agreements (NDAs), Freelance contracts, and Service agreements on-demand using simple prompts.
- **Risk Analysis**: Automatically highlight potential liabilities, imbalances, or risky clauses in contracts before signing them.
- **Plain-English Summarization**: Translate complex legal jargon into straightforward, easy-to-understand summaries.
- **Easy Customization & Export**: Edit individual clauses in real-time, auto-save drafts to your account, and export professional PDFs ready for signatures.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion, Radix UI, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **AI Integration** | Google Gemini API (`gemini-2.5-flash`) |
| **PDF Generation** | `pdfkit` |
