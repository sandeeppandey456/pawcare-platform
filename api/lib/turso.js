import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

let client = null;

export function getTursoClient() {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN;

  if (!url) {
    return null;
  }

  client = createClient({
    url,
    authToken: authToken || undefined,
  });

  return client;
}
