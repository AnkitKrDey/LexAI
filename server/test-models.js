import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const response = await genAI.getDocs();
        console.log(response);
    } catch (e) {
        try {
            console.log("getDocs failed, trying REST API");
            const fetchResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
            const data = await fetchResponse.json();
            console.log(data.models.map(m => m.name).filter(name => name.includes('gemini')));
        } catch (err) {
            console.error("Failed to list models:", err.message);
        }
    }
}

listModels();
