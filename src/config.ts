import dotenv from 'dotenv';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
export const VERTEX_BASE_URL = process.env.VERTEX_BASE_URL || '';
export const ALCHEMY_API_KEY = process.env.ALCHEMY_KEY || '';
export const PUBLIC_KEY = process.env.PUBLIC_KEY || '';