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
    // 1. Create / update all tables
    await client.batch([
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT,
        city TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'user',
        storeName TEXT,
        businessType TEXT,
        gstin TEXT,
        payoutUpi TEXT,
        vendorId TEXT,
        storeDescription TEXT,
        isBlocked INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        blockedReason TEXT,
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
        tags TEXT,
        address TEXT,
        googlePlaceId TEXT,
        lat REAL,
        lng REAL
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
        priceRange TEXT,
        address TEXT,
        googleRating REAL,
        googleReviewsCount INTEGER,
        lat REAL,
        lng REAL
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
        vendorId TEXT,
        vendorCode TEXT,
        sellerType TEXT,
        description TEXT,
        inStock INTEGER,
        stockCount INTEGER DEFAULT 50,
        tag TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS blocked_list (
        id TEXT PRIMARY KEY,
        type TEXT,
        value TEXT UNIQUE,
        reason TEXT,
        blockedBy TEXT,
        createdAt TEXT DEFAULT (datetime('now'))
      );`,
      `CREATE TABLE IF NOT EXISTS reviews (
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
        ownerType TEXT,
        address TEXT,
        googleRating REAL,
        googleReviewsCount INTEGER,
        lat REAL,
        lng REAL
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
        priceRange TEXT,
        address TEXT,
        googleRating REAL,
        googleReviewsCount INTEGER,
        lat REAL,
        lng REAL
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
        phone TEXT,
        address TEXT,
        googleRating REAL,
        googleReviewsCount INTEGER
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
        description TEXT,
        address TEXT,
        googleRating REAL,
        googleReviewsCount INTEGER
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

    return res.status(200).json({
      success: true,
      message: 'Database schema verified and active.',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: error.message || 'Setup failed' });
  }
}
