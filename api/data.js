import { getTursoClient } from './lib/turso.js';

const ALLOWED_TABLES = [
  'doctors',
  'hospitals',
  'products',
  'adoption',
  'boarding',
  'places',
  'food_suppliers',
  'cremation',
  'vaccinations',
  'vet_visits',
  'bookings',
  'orders',
  'lost_found',
  'stray_reports',
  'reviews',
  'users',
  'blocked_list'
];

function parseJsonFields(row) {
  if (!row) return row;
  const parsed = { ...row };
  const jsonFields = ['tags', 'features', 'services', 'items'];
  for (const field of jsonFields) {
    if (parsed[field] && typeof parsed[field] === 'string') {
      try {
        parsed[field] = JSON.parse(parsed[field]);
      } catch {
        // Keep as string if parsing fails
      }
    }
  }
  // Convert 1/0 back to booleans where expected
  const boolFields = ['available24x7', 'videoCall', 'emergency', 'inStock', 'vaccinated', 'neutered', 'delivery', 'isBlocked'];
  for (const field of boolFields) {
    if (parsed[field] !== undefined) {
      parsed[field] = Boolean(parsed[field]);
    }
  }
  return parsed;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = getTursoClient();
  if (!client) {
    return res.status(500).json({ error: 'Turso client not configured' });
  }

  const { table, userId, city, id } = req.query;

  if (!ALLOWED_TABLES.includes(table)) {
    return res.status(400).json({ error: `Invalid or unauthorized table: ${table}` });
  }

  try {
    // GET single or all records
    if (req.method === 'GET') {
      if (id) {
        const result = await client.execute({
          sql: `SELECT * FROM ${table} WHERE id = ?`,
          args: [id]
        });
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Record not found' });
        }
        return res.status(200).json(parseJsonFields(result.rows[0]));
      }

      let sql = `SELECT * FROM ${table}`;
      const args = [];
      const where = [];

      if (userId && ['vaccinations', 'vet_visits', 'bookings', 'orders'].includes(table)) {
        where.push('userId = ?');
        args.push(userId);
      }

      if (city && city !== 'All' && ['doctors', 'hospitals', 'adoption', 'boarding', 'places', 'food_suppliers', 'cremation'].includes(table)) {
        where.push('city = ?');
        args.push(city);
      }

      if (where.length > 0) {
        sql += ` WHERE ` + where.join(' AND ');
      }

      // Default sorting: newer records first for bookings, orders, lost_found, stray_reports
      if (['bookings', 'orders', 'stray_reports'].includes(table)) {
        sql += ' ORDER BY rowid DESC';
      }

      const result = await client.execute({ sql, args });
      const rows = result.rows.map(parseJsonFields);
      return res.status(200).json(rows);
    }

    // POST insert or update record
    if (req.method === 'POST') {
      const data = req.body;
      if (!data) {
        return res.status(400).json({ error: 'Missing request body' });
      }

      const rowId = data.id || ('id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4));
      const record = { ...data, id: rowId };

      // Stringify JSON fields if needed
      const jsonFields = ['tags', 'features', 'services', 'items'];
      for (const f of jsonFields) {
        if (record[f] && typeof record[f] !== 'string') {
          record[f] = JSON.stringify(record[f]);
        }
      }

      // Convert booleans to 1/0
      const boolFields = ['available24x7', 'videoCall', 'emergency', 'inStock', 'vaccinated', 'neutered', 'delivery', 'isBlocked'];
      for (const f of boolFields) {
        if (record[f] !== undefined) {
          record[f] = record[f] ? 1 : 0;
        }
      }

      // Query table info to only insert columns that exist in the database table
      const colInfo = await client.execute(`PRAGMA table_info(${table})`);
      const validCols = new Set(colInfo.rows.map(r => r.name));

      const safeRecord = {};
      for (const [k, v] of Object.entries(record)) {
        if (validCols.has(k)) {
          safeRecord[k] = v;
        }
      }

      const columns = Object.keys(safeRecord);
      if (columns.length === 0) {
        return res.status(400).json({ error: 'No valid table columns in payload' });
      }

      const placeholders = columns.map(() => '?').join(', ');
      const values = Object.values(safeRecord);

      await client.execute({
        sql: `INSERT OR REPLACE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
        args: values
      });

      return res.status(201).json({ success: true, record: parseJsonFields(record) });
    }

    // DELETE record by id
    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'Missing id query parameter for deletion' });
      }

      await client.execute({
        sql: `DELETE FROM ${table} WHERE id = ?`,
        args: [id]
      });

      return res.status(200).json({ success: true, deleted: id });
    }
  } catch (error) {
    console.error(`Error querying ${table}:`, error);
    return res.status(500).json({ error: error.message || 'Database query error' });
  }
}
