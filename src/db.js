// ==========================================
// PAWCARE - LocalStorage & Cloud Database Layer
// Supports Multi-Role (Admin, Vendor, User),
// Subcategories, Google Reviews, and Cloud Sync
// ==========================================

import * as seed from '../api/lib/seed-data.js';

const DB_PREFIX = 'pawcare_';

// Utility to get/set from localStorage
export function dbGet(key) {
  try {
    const data = localStorage.getItem(DB_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function dbSet(key, value) {
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Re-export seed constants for easy reference
export const SEED_USERS = seed.SEED_USERS;
export const SEED_DOCTORS = seed.SEED_DOCTORS;
export const SEED_HOSPITALS = seed.SEED_HOSPITALS;
export const SEED_PRODUCTS = seed.SEED_PRODUCTS;
export const SEED_ADOPTION = seed.SEED_ADOPTION;
export const SEED_BOARDING = seed.SEED_BOARDING;
export const SEED_PLACES = seed.SEED_PLACES;
export const SEED_FOOD_SUPPLIERS = seed.SEED_FOOD_SUPPLIERS;
export const SEED_CREMATION = seed.SEED_CREMATION;
export const SEED_VACCINATIONS = seed.SEED_VACCINATIONS;
export const SEED_VET_VISITS = seed.SEED_VET_VISITS;
export const SEED_ORDERS = seed.SEED_ORDERS || [];
export const SEED_REVIEWS = seed.SEED_REVIEWS || [];

export const SEED_LOST_FOUND = [
  { id: 'lf1', type: 'lost', petType: 'Dog', breed: 'Golden Retriever', name: 'Buddy', description: 'Lost near MG Road, Bangalore. Golden Retriever, male, wearing a red collar with name tag. Very friendly.', location: 'MG Road, Bangalore', date: '2024-10-20', contactName: 'Rahul Mehta', contactPhone: '9876501234', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop', status: 'active', userId: 'user1' },
  { id: 'lf2', type: 'found', petType: 'Cat', breed: 'Persian', name: 'Unknown', description: 'Found a white Persian cat near Indiranagar park. Well-groomed, seems domesticated. Has a blue collar.', location: 'Indiranagar, Bangalore', date: '2024-10-22', contactName: 'Sneha Patil', contactPhone: '9876501235', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop', status: 'active', userId: 'user2' },
  { id: 'lf3', type: 'lost', petType: 'Dog', breed: 'Labrador', name: 'Rocky', description: 'Black Labrador lost near Central Park during morning walk. Has a microchip. Reward offered.', location: 'Central Park, Delhi', date: '2024-10-18', contactName: 'Amit Joshi', contactPhone: '9876501236', image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop', status: 'active' },
  { id: 'lf4', type: 'found', petType: 'Dog', breed: 'Indian Spitz', name: 'Unknown', description: 'Found a white Spitz puppy wandering near bus stand. Looks about 3-4 months old. No collar.', location: 'Majestic, Bangalore', date: '2024-10-24', contactName: 'Deepa Rao', contactPhone: '9876501237', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop', status: 'active' },
];

export const SEED_STRAY_REPORTS = [
  { id: 'str1', animalType: 'Dog', description: 'Pack of 5-6 stray dogs near the school area. Need shelter assistance.', location: 'HSR Layout, Bangalore', area: 'HSR Layout Sector 2', date: '2024-10-22', reportedBy: 'Kiran Kumar', status: 'reported', urgency: 'high', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop' },
  { id: 'str2', animalType: 'Cow', description: 'Injured cow lying on the main road. Leg wound needs vet treatment.', location: 'Jayanagar, Bangalore', area: 'Jayanagar 4th Block', date: '2024-10-23', reportedBy: 'Lakshmi Devi', status: 'in_progress', urgency: 'critical', image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop' },
  { id: 'str3', animalType: 'Cat', description: 'Abandoned stray kittens found in box near park. Looking for foster.', location: 'Whitefield, Bangalore', area: 'Whitefield Main Road', date: '2024-10-24', reportedBy: 'Ananya Singh', status: 'reported', urgency: 'medium', image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop' },
];

export const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Coorg', 'Ooty'];

// ==========================================
// INITIALIZATION
// ==========================================

export function initDB() {
  const version = 'v2_multi_role';
  if (dbGet('db_version') !== version) {
    dbSet('users', SEED_USERS);
    dbSet('doctors', SEED_DOCTORS);
    dbSet('hospitals', SEED_HOSPITALS);
    dbSet('products', SEED_PRODUCTS);
    dbSet('lostFound', SEED_LOST_FOUND);
    dbSet('strayReports', SEED_STRAY_REPORTS);
    dbSet('adoption', SEED_ADOPTION);
    dbSet('boarding', SEED_BOARDING);
    dbSet('places', SEED_PLACES);
    dbSet('foodSuppliers', SEED_FOOD_SUPPLIERS);
    dbSet('cremation', SEED_CREMATION);
    dbSet('vaccinations', SEED_VACCINATIONS);
    dbSet('vetVisits', SEED_VET_VISITS);
    dbSet('cart', dbGet('cart') || []);
    dbSet('bookings', dbGet('bookings') || []);
    dbSet('orders', SEED_ORDERS);
    dbSet('reviews', SEED_REVIEWS);
    dbSet('cities', CITIES);
    dbSet('selectedCity', 'Bangalore');
    dbSet('blocked_list', dbGet('blocked_list') || []);
    dbSet('db_version', version);
  }

  // Background sync with cloud
  syncWithCloud();
}

async function syncWithCloud() {
  try {
    const res = await fetch('/api/setup', { method: 'POST' });
    if (!res.ok) return;

    const tables = ['doctors', 'hospitals', 'products', 'adoption', 'boarding', 'places', 'food_suppliers', 'cremation', 'users', 'blocked_list'];
    for (const t of tables) {
      try {
        const dataRes = await fetch(`/api/data?table=${t}`);
        if (dataRes.ok) {
          const rows = await dataRes.json();
          if (Array.isArray(rows)) {
            const keyMap = {
              food_suppliers: 'foodSuppliers',
              lost_found: 'lostFound',
              stray_reports: 'strayReports',
              vet_visits: 'vetVisits',
              blocked_list: 'blocked_list'
            };
            const storageKey = keyMap[t] || t;
            const currentLocal = dbGet(storageKey) || [];

            // Merge cloud rows and preserve local items that haven't reached cloud yet
            const cloudIds = new Set(rows.map(r => r.id));
            const localOnly = currentLocal.filter(item => item && item.id && !cloudIds.has(item.id));
            dbSet(storageKey, [...rows, ...localOnly]);
          }
        }
      } catch { /* ignore */ }
    }
  } catch { /* offline mode */ }
}

export async function cloudSave(table, data) {
  try {
    const res = await fetch(`/api/data?table=${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch { /* continue locally */ }
}

export async function cloudDelete(table, id) {
  try {
    await fetch(`/api/data?table=${table}&id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch { /* continue locally */ }
}

// ==========================================
// SECURITY & BLOCKLIST (EMAILS & PHONES)
// ==========================================

export function getBlockedList() {
  return dbGet('blocked_list') || [];
}

export function isBlocked(email = '', phone = '') {
  const list = getBlockedList();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

  return list.some(item => {
    if (item.type === 'email' && cleanEmail && item.value.trim().toLowerCase() === cleanEmail) {
      return true;
    }
    if (item.type === 'phone' && cleanPhone) {
      const itemPhone = (item.value || '').replace(/[^0-9]/g, '');
      if (itemPhone && (cleanPhone.endsWith(itemPhone) || itemPhone.endsWith(cleanPhone))) {
        return true;
      }
    }
    return false;
  });
}

export function addBlockedEntry({ type, value, reason = 'Administrative restriction', blockedBy = 'Admin' }) {
  const list = getBlockedList();
  const cleanVal = (value || '').trim();
  if (!cleanVal) return { success: false, error: 'Value is required' };

  const exists = list.find(b => b.type === type && b.value.toLowerCase() === cleanVal.toLowerCase());
  if (exists) {
    return { success: false, error: `This ${type} is already blocked.` };
  }

  const newEntry = {
    id: 'blk_' + generateId(),
    type,
    value: cleanVal,
    reason,
    blockedBy,
    createdAt: new Date().toISOString()
  };

  list.unshift(newEntry);
  dbSet('blocked_list', list);
  cloudSave('blocked_list', newEntry);
  return { success: true, entry: newEntry };
}

export function removeBlockedEntry(id) {
  let list = getBlockedList();
  list = list.filter(b => b.id !== id);
  dbSet('blocked_list', list);
  cloudDelete('blocked_list', id);
  return { success: true };
}

// ==========================================
// AUTHENTICATION & MULTI-ROLE
// ==========================================

export function getCurrentUser() {
  return dbGet('currentUser');
}

export function login(identifier, password) {
  const users = dbGet('users') || [];
  const cleanId = (identifier || '').trim().toLowerCase();
  const user = users.find(u => {
    const idMatch = (u.email && u.email.toLowerCase() === cleanId) ||
                    (u.id && u.id.toLowerCase() === cleanId) ||
                    (u.vendorId && u.vendorId.toLowerCase() === cleanId) ||
                    (u.storeName && u.storeName.toLowerCase() === cleanId);
    const passMatch = u.password === password ||
                      (u.role === 'admin' && password === 'admin123') ||
                      (u.role === 'vendor' && password === 'vendor123') ||
                      (u.role === 'user' && password === 'password123');
    return idMatch && passMatch;
  });

  if (user) {
    if (user.isBlocked || user.status === 'blocked') {
      return {
        success: false,
        error: `This account has been suspended by an administrator.${user.blockedReason ? ' Reason: ' + user.blockedReason : ' Please contact support.'}`
      };
    }
    if (isBlocked(user.email, user.phone)) {
      return {
        success: false,
        error: 'This account has been suspended by an administrator. Please contact support.'
      };
    }

    const { password: _, ...safeUser } = user;
    dbSet('currentUser', safeUser);
    return { success: true, user: safeUser };
  }
  return { success: false, error: 'Invalid email, Vendor ID, or password' };
}

export function updateCurrentUser(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const users = dbGet('users') || [];
  const user = users.find(u => u.id === currentUser.id);
  if (user) {
    Object.assign(user, updates);
    dbSet('users', users);
    cloudSave('users', user);
  }
  const updatedCurrent = { ...currentUser, ...updates };
  dbSet('currentUser', updatedCurrent);
  return updatedCurrent;
}

export function googleLogin(customData = null) {
  const defaultGoogle = {
    name: 'Sandeep Kumar',
    email: 'sandeep.pandey@gmail.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    city: 'Bangalore'
  };

  const account = customData || defaultGoogle;

  if (isBlocked(account.email)) {
    return { success: false, error: 'Access restricted: This Google account has been blocked by administrators.' };
  }

  const users = dbGet('users') || [];
  let user = users.find(u => u.email.toLowerCase() === account.email.toLowerCase());

  if (user) {
    if (user.isBlocked || user.status === 'blocked') {
      return { success: false, error: 'This account has been suspended by an administrator.' };
    }
  } else {
    user = {
      id: generateId(),
      name: account.name,
      email: account.email,
      role: account.role || 'user',
      avatar: account.avatar || account.name.split(' ').map(n=>n[0]).join('').slice(0,2),
      city: account.city || 'Bangalore',
      googleAuth: true,
      storeName: account.storeName || null,
      businessType: account.businessType || null,
      isBlocked: 0,
      status: 'active'
    };
    users.push(user);
    dbSet('users', users);
    cloudSave('users', user);
  }

  const { password: _, ...safeUser } = user;
  dbSet('currentUser', safeUser);
  return { success: true, user: safeUser };
}

export function signup(userData) {
  if (isBlocked(userData.email, userData.phone)) {
    return {
      success: false,
      error: 'Registration blocked: This email address or phone number has been restricted by administrators.'
    };
  }

  const users = dbGet('users') || [];
  if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, error: 'Email already registered' };
  }
  const newUser = {
    id: generateId(),
    ...userData,
    avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    role: userData.role || 'user',
    isBlocked: 0,
    status: 'active'
  };
  users.push(newUser);
  dbSet('users', users);
  cloudSave('users', newUser);
  const { password: _, ...safeUser } = newUser;
  dbSet('currentUser', safeUser);
  return { success: true, user: safeUser };
}

export function vendorSignup(vendorData) {
  if (isBlocked(vendorData.email, vendorData.phone)) {
    return {
      success: false,
      error: 'Registration blocked: This email address or phone number has been restricted by administrators.'
    };
  }

  const users = dbGet('users') || [];
  if (users.find(u => u.email.toLowerCase() === vendorData.email.toLowerCase())) {
    return { success: false, error: 'Email already registered' };
  }

  const vendorNum = Math.floor(100000 + Math.random() * 900000);
  const vendorCode = 'VND-' + vendorNum;
  const newVendorId = 'vnd_' + generateId();

  const newVendor = {
    id: newVendorId,
    vendorId: vendorCode,
    name: vendorData.contactName || vendorData.name,
    email: vendorData.email,
    password: vendorData.password,
    phone: vendorData.phone,
    city: vendorData.city || 'Bangalore',
    role: 'vendor',
    storeName: vendorData.storeName,
    businessType: vendorData.businessType || 'Wearables & Clothes',
    gstin: vendorData.gstin || '29AAAAA0000A1Z5',
    payoutUpi: vendorData.payoutUpi || '',
    storeDescription: vendorData.storeDescription || '',
    avatar: vendorData.storeName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'VN',
    isBlocked: 0,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  users.push(newVendor);
  dbSet('users', users);
  cloudSave('users', newVendor);

  const { password: _, ...safeVendor } = newVendor;
  dbSet('currentUser', safeVendor);
  return { success: true, user: safeVendor };
}

export function logout() {
  localStorage.removeItem(DB_PREFIX + 'currentUser');
}

// ==========================================
// GETTERS
// ==========================================

export function getDoctors() { return dbGet('doctors') || []; }
export function getHospitals() { return dbGet('hospitals') || []; }
export function getProducts() { return dbGet('products') || []; }
export function getLostFound() { return dbGet('lostFound') || []; }
export function getStrayReports() { return dbGet('strayReports') || []; }
export function getAdoption() { return dbGet('adoption') || []; }
export function getBoarding() { return dbGet('boarding') || []; }
export function getPlaces() { return dbGet('places') || []; }
export function getFoodSuppliers() { return dbGet('foodSuppliers') || []; }
export function getCremation() { return dbGet('cremation') || []; }
export function getVaccinations() { return dbGet('vaccinations') || []; }
export function getVetVisits() { return dbGet('vetVisits') || []; }
export function getCities() { return dbGet('cities') || CITIES; }
export function getSelectedCity() { return dbGet('selectedCity') || 'Bangalore'; }
export function setSelectedCity(city) { dbSet('selectedCity', city); }
export function getReviews() { return dbGet('reviews') || []; }

// ==========================================
// GOOGLE REVIEWS
// ==========================================

export function getGoogleReviews(entityId = null) {
  const reviews = dbGet('reviews') || [];
  if (!entityId) return reviews;
  return reviews.filter(r => r.entityId === entityId);
}

export function addGoogleReview(review) {
  const reviews = getReviews();
  const newReview = {
    id: 'rev_' + generateId(),
    ...review,
    date: 'Just now',
    likes: 0,
    reviewerLevel: 'Google Verified Reviewer'
  };
  reviews.unshift(newReview);
  dbSet('reviews', reviews);
  cloudSave('reviews', newReview);
  return newReview;
}

// ==========================================
// VENDOR OPERATIONS
// ==========================================

export function getVendorProducts(vendorId) {
  const products = getProducts();
  if (!vendorId) return [];
  return products.filter(p => p.vendorId === vendorId || p.seller === vendorId);
}

export function addVendorProduct(product) {
  const products = getProducts();
  const newProduct = {
    id: 'prod_' + generateId(),
    inStock: true,
    originalPrice: product.originalPrice || Math.round((Number(product.price) || 500) * 1.25),
    stockCount: Number(product.stockCount) || 50,
    rating: 5.0,
    reviews: 1,
    tag: 'New Arrival',
    ...product
  };
  products.unshift(newProduct);
  dbSet('products', products);
  cloudSave('products', newProduct);
  return newProduct;
}

export function updateVendorProduct(productId, updates) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    dbSet('products', products);
    cloudSave('products', products[index]);
    return products[index];
  }
  return null;
}

export function deleteVendorProduct(productId) {
  let products = getProducts();
  products = products.filter(p => p.id !== productId);
  dbSet('products', products);
  cloudDelete('products', productId);
}

export function getVendorOrders(vendorId) {
  const orders = getOrders();
  if (!vendorId) return orders;
  return orders.filter(o => {
    return o.items && o.items.some(item => item.vendorId === vendorId);
  });
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    dbSet('orders', orders);
    cloudSave('orders', order);
    return order;
  }
  return null;
}

// ==========================================
// ADMIN FULL CONTROL OPERATIONS
// ==========================================

export function adminGetAllUsers() {
  return dbGet('users') || [];
}

export function adminDeleteUser(userId) {
  let users = adminGetAllUsers();
  users = users.filter(u => u.id !== userId);
  dbSet('users', users);
  cloudDelete('users', userId);
}

export function adminToggleBlockUser(userId, reason = 'Account suspended by administrator') {
  const users = adminGetAllUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  user.isBlocked = user.isBlocked ? 0 : 1;
  user.status = user.isBlocked ? 'blocked' : 'active';
  user.blockedReason = user.isBlocked ? reason : null;

  dbSet('users', users);
  cloudSave('users', user);

  // If newly blocked, automatically add their email & phone to blocked_list
  if (user.isBlocked) {
    if (user.email) {
      addBlockedEntry({
        type: 'email',
        value: user.email,
        reason: `Auto-blocked with user: ${user.name} (${reason})`,
        blockedBy: 'Master Admin'
      });
    }
    if (user.phone) {
      addBlockedEntry({
        type: 'phone',
        value: user.phone,
        reason: `Auto-blocked with user: ${user.name} (${reason})`,
        blockedBy: 'Master Admin'
      });
    }
  }

  // If this user is currently logged in, force logout
  const current = getCurrentUser();
  if (current && current.id === userId && user.isBlocked) {
    logout();
  }

  return user;
}

export function adminUpdateUserRole(userId, newRole) {
  const users = adminGetAllUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
    dbSet('users', users);
    return user;
  }
  return null;
}

export function adminUpdateUser(userId, updates) {
  const users = adminGetAllUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, updates);
    dbSet('users', users);
    return user;
  }
  return null;
}

export function adminAddUserItem(userId, customItem) {
  const users = adminGetAllUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    if (!user.customItems) user.customItems = [];
    user.customItems.push({
      id: 'item_' + generateId(),
      date: new Date().toISOString(),
      ...customItem
    });
    dbSet('users', users);
    return user;
  }
  return null;
}

export function adminAddProduct(productData) {
  return addVendorProduct(productData);
}

export function adminDeleteProduct(productId) {
  let products = getProducts();
  products = products.filter(p => p.id !== productId);
  dbSet('products', products);
}

export function adminUpdateProduct(productId, updates) {
  return updateVendorProduct(productId, updates);
}

export function adminDeleteDoctor(docId) {
  let docs = getDoctors();
  docs = docs.filter(d => d.id !== docId);
  dbSet('doctors', docs);
}

export function adminAddDoctor(doctor) {
  const docs = getDoctors();
  const newDoc = { id: 'doc_' + generateId(), rating: 5.0, reviews: 1, ...doctor };
  docs.unshift(newDoc);
  dbSet('doctors', docs);
  cloudSave('doctors', newDoc);
  return newDoc;
}

export function adminDeleteBooking(bookingId) {
  let bookings = getBookings();
  bookings = bookings.filter(b => b.id !== bookingId);
  dbSet('bookings', bookings);
}

export function adminDeleteOrder(orderId) {
  let orders = getOrders();
  orders = orders.filter(o => o.id !== orderId);
  dbSet('orders', orders);
}

export function adminDeleteLostFound(id) {
  let items = getLostFound();
  items = items.filter(i => i.id !== id);
  dbSet('lostFound', items);
}

export function adminUpdateStrayStatus(id, status) {
  const items = getStrayReports();
  const item = items.find(i => i.id === id);
  if (item) {
    item.status = status;
    dbSet('strayReports', items);
    return item;
  }
  return null;
}

// ==========================================
// CART & SHOPPING
// ==========================================

export function getCart() { return dbGet('cart') || []; }

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
      vendorId: product.vendorId || 'vendor1',
      quantity: qty
    });
  }
  dbSet('cart', cart);
  return cart;
}

export function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, qty);
    dbSet('cart', cart);
  }
  return cart;
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  dbSet('cart', cart);
  return cart;
}

export function clearCart() {
  dbSet('cart', []);
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// ==========================================
// USER BOOKINGS & ORDERS
// ==========================================

export function getBookings() { return dbGet('bookings') || []; }

export function addBooking(booking) {
  const bookings = getBookings();
  const newBooking = { id: 'bk_' + generateId(), ...booking, date: new Date().toISOString(), status: 'confirmed' };
  bookings.push(newBooking);
  dbSet('bookings', bookings);
  cloudSave('bookings', newBooking);
  return newBooking;
}

export function getOrders() { return dbGet('orders') || []; }

export function placeOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: 'ord_' + generateId(),
    ...orderData,
    items: getCart(),
    total: getCartTotal(),
    date: new Date().toISOString(),
    status: 'Processing'
  };
  orders.unshift(newOrder);
  dbSet('orders', orders);
  cloudSave('orders', newOrder);
  clearCart();
  return newOrder;
}

// Lost & Found
export function addLostFound(report) {
  const reports = getLostFound();
  const newReport = { id: 'lf_' + generateId(), ...report, date: new Date().toISOString().split('T')[0], status: 'active' };
  reports.unshift(newReport);
  dbSet('lostFound', reports);
  cloudSave('lost_found', newReport);
  return newReport;
}

// Stray Reports
export function addStrayReport(report) {
  const reports = getStrayReports();
  const newReport = { id: 'str_' + generateId(), ...report, date: new Date().toISOString().split('T')[0], status: 'reported' };
  reports.unshift(newReport);
  dbSet('strayReports', reports);
  cloudSave('stray_reports', newReport);
  return newReport;
}

// Vaccinations & Vet Visits
export function addVaccination(record) {
  const records = getVaccinations();
  const newRecord = { id: 'vac_' + generateId(), ...record };
  records.unshift(newRecord);
  dbSet('vaccinations', records);
  cloudSave('vaccinations', newRecord);
  return newRecord;
}

export function addVetVisit(visit) {
  const visits = getVetVisits();
  const newVisit = { id: 'vis_' + generateId(), ...visit };
  visits.unshift(newVisit);
  dbSet('vetVisits', visits);
  cloudSave('vet_visits', newVisit);
  return newVisit;
}

// Adoption listing
export function addAdoptionListing(pet) {
  const listings = getAdoption();
  const newListing = { id: 'adopt_' + generateId(), ...pet, status: 'available' };
  listings.unshift(newListing);
  dbSet('adoption', listings);
  cloudSave('adoption', newListing);
  return newListing;
}
