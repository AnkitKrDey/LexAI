import 'dotenv/config';
console.log('1. Dotenv loaded');
import cors from 'cors';
console.log('2. Cors imported');
import express from 'express';
console.log('3. Express imported');
import helmet from 'helmet';
console.log('4. Helmet imported');
import morgan from 'morgan';
console.log('5. Morgan imported');

import './config/firebase.config.js';
console.log('6. Firebase config loaded');
import './config/gemini.config.js';
console.log('7. Gemini config loaded');
import aiRoutes from './routes/ai.routes.js';
console.log('8. AI routes loaded');
import authRoutes from './routes/auth.routes.js';
console.log('9. Auth routes loaded');
import contractRoutes from './routes/contract.routes.js';
console.log('10. Contract routes loaded');
import pdfRoutes from './routes/pdf.routes.js';
console.log('11. PDF routes loaded');

console.log('All imports completed successfully!');
