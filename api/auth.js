import { getTursoClient } from './lib/turso.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = getTursoClient();
  if (!client) {
    return res.status(500).json({ error: 'Turso client not configured' });
  }

  const { action } = req.query;

  try {
    if (action === 'login') {
      const { email, password } = req.body;
      const result = await client.execute({
        sql: 'SELECT id, name, email, phone, city, avatar, role FROM users WHERE email = ? AND password = ?',
        args: [email, password]
      });

      if (result.rows.length === 0) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      return res.status(200).json({ success: true, user: result.rows[0] });
    }

    if (action === 'signup') {
      const { name, email, password, phone, city } = req.body;
      const existing = await client.execute({
        sql: 'SELECT id FROM users WHERE email = ?',
        args: [email]
      });

      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, error: 'Email already registered' });
      }

      const id = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
      const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

      await client.execute({
        sql: 'INSERT INTO users (id, name, email, password, phone, city, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        args: [id, name, email, password, phone || '', city || 'Bangalore', avatar, 'user']
      });

      const user = { id, name, email, phone, city, avatar, role: 'user' };
      return res.status(201).json({ success: true, user });
    }

    return res.status(400).json({ error: 'Invalid auth action' });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
