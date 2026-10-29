import { getTursoClient } from './lib/turso.js';
import * as seed from './lib/seed-data.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client = getTursoClient();
  if (!client) {
    return res.status(500).json({
      error: 'Turso client not initialized. Ensure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are set in Vercel environment variables.',
    });
  }

  try {
    // 1. Create all tables
    await client.batch([
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT,
        city TEXT,
        avatar TEXT,
        role TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );`,
      `CREATE TABLE IF NOT EXISTS doctors (
        id TEXT PRIMARY KEY,
        name TEXT,
        specialty TEXT,
        hospital TEXT,
        city TEXT,
        rating REAL,
        reviews INTEGER,
        experience TEXT,
        available24x7 INTEGER,
        videoCall INTEGER,
        phone TEXT,
        fee REAL,
        image TEXT,
        tags TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS hospitals (
        id TEXT PRIMARY KEY,
        name TEXT,
        city TEXT,
        area TEXT,
        rating REAL,
        reviews INTEGER,
        phone TEXT,
        emergency INTEGER,
        image TEXT,
        features TEXT,
        priceRange TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        category TEXT,
        subcategory TEXT,
        price REAL,
        originalPrice REAL,
        image TEXT,
        rating REAL,
        reviews INTEGER,
        seller TEXT,
        sellerType TEXT,
        description TEXT,
        inStock INTEGER,
        tag TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS adoption (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        breed TEXT,
        age TEXT,
        gender TEXT,
        size TEXT,
        vaccinated INTEGER,
        neutered INTEGER,
        description TEXT,
        city TEXT,
        contactName TEXT,
        contactPhone TEXT,
        image TEXT,
        status TEXT,
        fee REAL,
        listedBy TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS boarding (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        city TEXT,
        area TEXT,
        rating REAL,
        reviews INTEGER,
        pricePerDay REAL,
        image TEXT,
        features TEXT,
        description TEXT,
        ownerType TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS places (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        city TEXT,
        area TEXT,
        rating REAL,
        reviews INTEGER,
        image TEXT,
        features TEXT,
        description TEXT,
        priceRange TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS food_suppliers (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        city TEXT,
        rating REAL,
        reviews INTEGER,
        image TEXT,
        description TEXT,
        priceRange TEXT,
        delivery INTEGER,
        phone TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS cremation (
        id TEXT PRIMARY KEY,
        name TEXT,
        city TEXT,
        rating REAL,
        reviews INTEGER,
        image TEXT,
        services TEXT,
        priceRange TEXT,
        phone TEXT,
        description TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS vaccinations (
        id TEXT PRIMARY KEY,
        petName TEXT,
        petType TEXT,
        vaccineName TEXT,
        date TEXT,
        nextDue TEXT,
        doctor TEXT,
        hospital TEXT,
        status TEXT,
        userId TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS vet_visits (
        id TEXT PRIMARY KEY,
        petName TEXT,
        petType TEXT,
        date TEXT,
        doctor TEXT,
        hospital TEXT,
        reason TEXT,
        diagnosis TEXT,
        prescription TEXT,
        weight TEXT,
        temperature TEXT,
        notes TEXT,
        userId TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        type TEXT,
        doctorId TEXT,
        doctorName TEXT,
        hospitalId TEXT,
        hospital TEXT,
        boardingId TEXT,
        boardingName TEXT,
        petName TEXT,
        date TEXT,
        time TEXT,
        checkIn TEXT,
        checkOut TEXT,
        reason TEXT,
        fee REAL,
        status TEXT,
        userId TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );`,
      `CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        userId TEXT,
        items TEXT,
        total REAL,
        address TEXT,
        city TEXT,
        pin TEXT,
        phone TEXT,
        payment TEXT,
        status TEXT,
        date TEXT DEFAULT (datetime('now'))
      );`,
      `CREATE TABLE IF NOT EXISTS lost_found (
        id TEXT PRIMARY KEY,
        status TEXT,
        petType TEXT,
        breed TEXT,
        color TEXT,
        location TEXT,
        city TEXT,
        date TEXT,
        reward TEXT,
        contactName TEXT,
        contactPhone TEXT,
        description TEXT,
        image TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS stray_reports (
        id TEXT PRIMARY KEY,
        animalType TEXT,
        condition TEXT,
        location TEXT,
        landmark TEXT,
        city TEXT,
        reporterName TEXT,
        reporterPhone TEXT,
        description TEXT,
        image TEXT,
        status TEXT,
        date TEXT
      );`
    ]);

    // 2. Check if doctors table has records; if not, seed all tables
    const checkUsers = await client.execute('SELECT COUNT(*) as count FROM users');
    let seeded = false;

    if (checkUsers.rows[0].count === 0) {
      const inserts = [];

      for (const u of seed.SEED_USERS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO users (id, name, email, password, phone, city, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          args: [u.id, u.name, u.email, u.password, u.phone, u.city, u.avatar, u.role]
        });
      }
      for (const d of seed.SEED_DOCTORS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO doctors (id, name, specialty, hospital, city, rating, reviews, experience, available24x7, videoCall, phone, fee, image, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [d.id, d.name, d.specialty, d.hospital, d.city, d.rating, d.reviews, d.experience, d.available24x7, d.videoCall, d.phone, d.fee, d.image, d.tags]
        });
      }
      for (const h of seed.SEED_HOSPITALS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO hospitals (id, name, city, area, rating, reviews, phone, emergency, image, features, priceRange) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [h.id, h.name, h.city, h.area, h.rating, h.reviews, h.phone, h.emergency, h.image, h.features, h.priceRange]
        });
      }
      for (const p of seed.SEED_PRODUCTS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO products (id, name, category, subcategory, price, originalPrice, image, rating, reviews, seller, sellerType, description, inStock, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [p.id, p.name, p.category, p.subcategory, p.price, p.originalPrice, p.image, p.rating, p.reviews, p.seller, p.sellerType, p.description, p.inStock, p.tag]
        });
      }
      for (const a of seed.SEED_ADOPTION) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO adoption (id, name, type, breed, age, gender, size, vaccinated, neutered, description, city, contactName, contactPhone, image, status, fee, listedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [a.id, a.name, a.type, a.breed, a.age, a.gender, a.size, a.vaccinated, a.neutered, a.description, a.city, a.contactName, a.contactPhone, a.image, a.status, a.fee, a.listedBy]
        });
      }
      for (const b of seed.SEED_BOARDING) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO boarding (id, name, type, city, area, rating, reviews, pricePerDay, image, features, description, ownerType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [b.id, b.name, b.type, b.city, b.area, b.rating, b.reviews, b.pricePerDay, b.image, b.features, b.description, b.ownerType]
        });
      }
      for (const pl of seed.SEED_PLACES) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO places (id, name, type, city, area, rating, reviews, image, features, description, priceRange) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [pl.id, pl.name, pl.type, pl.city, pl.area, pl.rating, pl.reviews, pl.image, pl.features, pl.description, pl.priceRange]
        });
      }
      for (const f of seed.SEED_FOOD_SUPPLIERS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO food_suppliers (id, name, type, city, rating, reviews, image, description, priceRange, delivery, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [f.id, f.name, f.type, f.city, f.rating, f.reviews, f.image, f.description, f.priceRange, f.delivery, f.phone]
        });
      }
      for (const c of seed.SEED_CREMATION) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO cremation (id, name, city, rating, reviews, image, services, priceRange, phone, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [c.id, c.name, c.city, c.rating, c.reviews, c.image, c.services, c.priceRange, c.phone, c.description]
        });
      }
      for (const v of seed.SEED_VACCINATIONS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO vaccinations (id, petName, petType, vaccineName, date, nextDue, doctor, hospital, status, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [v.id, v.petName, v.petType, v.vaccineName, v.date, v.nextDue, v.doctor, v.hospital, v.status, v.userId]
        });
      }
      for (const vs of seed.SEED_VET_VISITS) {
        inserts.push({
          sql: 'INSERT OR IGNORE INTO vet_visits (id, petName, petType, date, doctor, hospital, reason, diagnosis, prescription, weight, temperature, notes, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [vs.id, vs.petName, vs.petType, vs.date, vs.doctor, vs.hospital, vs.reason, vs.diagnosis, vs.prescription, vs.weight, vs.temperature, vs.notes, vs.userId]
        });
      }

      await client.batch(inserts);
      seeded = true;
    }

    return res.status(200).json({
      success: true,
      message: seeded ? 'Database schema created and initial data successfully seeded!' : 'Database schema verified and active.',
      seeded,
    });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: error.message || 'Setup failed' });
  }
}
