import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if BACKEND_URL is populated correctly
console.log('API_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

// Assign API_URL
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
