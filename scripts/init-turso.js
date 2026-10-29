import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import * as seed from '../api/lib/seed-data.js';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL || process.env.VITE_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.VITE_TURSO_AUTH_TOKEN;

if (!url) {
  console.error('❌ Error: TURSO_DATABASE_URL is not set.');
  process.exit(1);
}

const client = createClient({
  url,
  authToken: authToken || undefined,
});

async function safeAddColumn(table, columnDef) {
  try {
    await client.execute(`ALTER TABLE ${table} ADD COLUMN ${columnDef}`);
  } catch {
    // column already exists
  }
}

async function main() {
  console.log(`Connecting to Turso: ${url}...`);

  console.log('Migrating table columns...');
  await safeAddColumn('users', 'storeName TEXT');
  await safeAddColumn('users', 'businessType TEXT');
  await safeAddColumn('users', 'gstin TEXT');
  await safeAddColumn('users', 'payoutUpi TEXT');
  await safeAddColumn('users', 'vendorId TEXT');
  await safeAddColumn('users', 'storeDescription TEXT');
  await safeAddColumn('users', 'isBlocked INTEGER DEFAULT 0');
  await safeAddColumn('users', 'status TEXT DEFAULT "active"');
  await safeAddColumn('users', 'blockedReason TEXT');

  await safeAddColumn('products', 'vendorId TEXT');
  await safeAddColumn('products', 'vendorCode TEXT');
  await safeAddColumn('products', 'stockCount INTEGER DEFAULT 50');

  await safeAddColumn('doctors', 'address TEXT');
  await safeAddColumn('doctors', 'googlePlaceId TEXT');
  await safeAddColumn('doctors', 'lat REAL');
  await safeAddColumn('doctors', 'lng REAL');

  await safeAddColumn('hospitals', 'address TEXT');
  await safeAddColumn('hospitals', 'googleRating REAL');
  await safeAddColumn('hospitals', 'googleReviewsCount INTEGER');
  await safeAddColumn('hospitals', 'lat REAL');
  await safeAddColumn('hospitals', 'lng REAL');

  await safeAddColumn('boarding', 'address TEXT');
  await safeAddColumn('boarding', 'googleRating REAL');
  await safeAddColumn('boarding', 'googleReviewsCount INTEGER');
  await safeAddColumn('boarding', 'lat REAL');
  await safeAddColumn('boarding', 'lng REAL');

  await safeAddColumn('places', 'address TEXT');
  await safeAddColumn('places', 'googleRating REAL');
  await safeAddColumn('places', 'googleReviewsCount INTEGER');
  await safeAddColumn('places', 'lat REAL');
  await safeAddColumn('places', 'lng REAL');

  await client.execute(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      entityId TEXT,
      entityType TEXT,
      authorName TEXT,
      authorAvatar TEXT,
      reviewerLevel TEXT,
      rating REAL,
      date TEXT,
      text TEXT,
      likes INTEGER DEFAULT 0
    );
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS blocked_list (
      id TEXT PRIMARY KEY,
      type TEXT,
      value TEXT UNIQUE,
      reason TEXT,
      blockedBy TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('Upserting admin and vendor accounts...');
  for (const u of seed.SEED_USERS) {
    await client.execute({
      sql: 'INSERT OR REPLACE INTO users (id, name, email, password, phone, city, avatar, role, storeName, businessType, gstin, payoutUpi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [u.id, u.name, u.email, u.password, u.phone, u.city, u.avatar, u.role, u.storeName || null, u.businessType || null, u.gstin || null, u.payoutUpi || null]
    });
  }

  console.log('Upserting products with subcategories...');
  for (const p of seed.SEED_PRODUCTS) {
    await client.execute({
      sql: 'INSERT OR REPLACE INTO products (id, name, category, subcategory, price, originalPrice, image, rating, reviews, seller, vendorId, sellerType, description, inStock, stockCount, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [p.id, p.name, p.category, p.subcategory, p.price, p.originalPrice, p.image, p.rating, p.reviews, p.seller, p.vendorId || 'vendor1', p.sellerType, p.description, p.inStock, p.stockCount || 50, p.tag]
    });
  }

  console.log('Upserting Google reviews...');
  for (const r of seed.SEED_REVIEWS) {
    await client.execute({
      sql: 'INSERT OR REPLACE INTO reviews (id, entityId, entityType, authorName, authorAvatar, reviewerLevel, rating, date, text, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [r.id, r.entityId, r.entityType, r.authorName, r.authorAvatar, r.reviewerLevel, r.rating, r.date, r.text, r.likes || 0]
    });
  }

  console.log('✅ Successfully updated and synced Turso database schema!');
}

main().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
