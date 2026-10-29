// ==========================================
// PAWCARE - All Page Renderers
// ==========================================

import { navigate } from './router.js';
import { renderStars, showToast, showModal, updateCartBadge, renderGoogleMap, renderGoogleReviews, openGoogleLoginModal } from './components.js';
import * as db from './db.js';

// Helper to safely parse array fields that might be stringified in SQLite
function safeArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return val.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
}

// ==========================================
// HOMEPAGE
// ==========================================

export function renderHome() {
  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
      
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <i class="fas fa-sparkles"></i>
            India's #1 Pet Care Platform
          </div>
          <h1 class="hero-title">
            Everything Your <span>Pet Needs</span>, One Platform
          </h1>
          <p class="hero-subtitle">
            From finding the best vets to adopting your new best friend, shopping pet essentials to booking day care — PawCare is the all-in-one platform for every pet parent.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="window.location.hash='/shop'">
              <i class="fas fa-shopping-bag"></i> Explore Shop
            </button>
            <button class="btn btn-outline btn-lg" onclick="window.location.hash='/adoption'">
              <i class="fas fa-heart"></i> Adopt a Pet
            </button>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-value">10K+</span>
              <span class="hero-stat-label">Happy Pet Parents</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">500+</span>
              <span class="hero-stat-label">Verified Vets</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">2K+</span>
              <span class="hero-stat-label">Pets Adopted</span>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="hero-image-grid">
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop" alt="Happy dog" loading="lazy">
            </div>
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop" alt="Cute cat" loading="lazy">
            </div>
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop" alt="Dogs playing" loading="lazy">
            </div>
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=200&fit=crop" alt="Pet care" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="section">
      <div class="section-header">
        <div class="section-label"><i class="fas fa-th-large"></i> Our Services</div>
        <h2 class="section-title">Everything for Your Pet</h2>
        <p class="section-subtitle">A complete ecosystem of pet care services designed to make life easier for pet parents and better for pets.</p>
      </div>
      
      <div class="services-grid">
        <div class="service-card" onclick="window.location.hash='/vets'">
          <div class="service-icon amber"><i class="fas fa-user-doctor"></i></div>
          <h3>Find Vets & Hospitals</h3>
          <p>24/7 vet access, video consultations, hospital bookings, and reviews from other pet parents.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/shop'">
          <div class="service-icon teal"><i class="fas fa-shopping-bag"></i></div>
          <h3>Pet Accessories & Shop</h3>
          <p>From homemade to big brands — collars, toys, beds, grooming kits, and more on one platform.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/adoption'">
          <div class="service-icon rose"><i class="fas fa-heart"></i></div>
          <h3>Adopt or Rehome</h3>
          <p>Find your perfect companion. Dogs, cats, rabbits, birds — all domestic animals looking for a loving home.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/boarding'">
          <div class="service-icon blue"><i class="fas fa-house-user"></i></div>
          <h3>Day Boarding</h3>
          <p>Premium facilities to home stays by college students and IT pros. Safe and fun stays for your pet.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/lost-found'">
          <div class="service-icon purple"><i class="fas fa-search-location"></i></div>
          <h3>Lost & Found</h3>
          <p>Lost your pet? Found one? Post with photos and location. Help reunite pets with their families.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/health'">
          <div class="service-icon green"><i class="fas fa-heartbeat"></i></div>
          <h3>Pet Health Tracker</h3>
          <p>Track vaccinations, deworming, vet visits with full history. Get reminders for upcoming appointments.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/places'">
          <div class="service-icon orange"><i class="fas fa-map-marked-alt"></i></div>
          <h3>Pet-Friendly Places</h3>
          <p>Discover dog-friendly restaurants, resorts, cafés, and pet festivals happening near you.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/food-suppliers'">
          <div class="service-icon pink"><i class="fas fa-utensils"></i></div>
          <h3>Fresh Food Suppliers</h3>
          <p>Home-cooked meals and fresh food from local suppliers. Healthy, preservative-free nutrition.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/stray-reports'">
          <div class="service-icon cyan"><i class="fas fa-paw"></i></div>
          <h3>Stray Animal Reports</h3>
          <p>Report stray or injured animals in your area. Help connect them with shelters and government care.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/shop?category=Medicine'">
          <div class="service-icon indigo"><i class="fas fa-pills"></i></div>
          <h3>Pet Medicine</h3>
          <p>Order medicines from local stores with optional delivery. Flea treatments, supplements, and first aid.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/cremation'">
          <div class="service-icon sky"><i class="fas fa-dove"></i></div>
          <h3>Pet Cremation</h3>
          <p>Dignified farewell services for your beloved companion. Private cremation and memorial options.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
        
        <div class="service-card" onclick="window.location.hash='/shop?category=Food'">
          <div class="service-icon lime"><i class="fas fa-bone"></i></div>
          <h3>Pet Food & Treats</h3>
          <p>Premium dry food, wet food, treats, and supplements. Organic and grain-free options available.</p>
          <span class="service-arrow"><i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    </section>
    
    <!-- Featured Pets Section -->
    <section class="section" style="background: var(--bg-dark); margin: 0 calc(-1 * var(--space-xl)); padding: var(--space-3xl) var(--space-xl);">
      <div style="max-width: 1280px; margin: 0 auto;">
        <div class="section-header">
          <div class="section-label"><i class="fas fa-heart"></i> Adopt Don't Shop</div>
          <h2 class="section-title">Pets Looking for a Home</h2>
          <p class="section-subtitle">These adorable animals are waiting for their forever families. Give them the love they deserve.</p>
        </div>
        
        <div class="grid-4">
          ${db.getAdoption().slice(0, 4).map(pet => `
            <div class="pet-card" onclick="window.location.hash='/adoption'">
              <div class="pet-image-wrap">
                <img src="${pet.image}" alt="${pet.name}" loading="lazy">
                <span class="pet-status badge-available">${pet.fee === 0 ? 'Free Adoption' : `₹${pet.fee.toLocaleString()}`}</span>
              </div>
              <div class="pet-body">
                <div class="pet-name">${pet.name}</div>
                <div class="pet-breed">${pet.breed}</div>
                <div class="pet-details">
                  <span class="pet-detail"><i class="fas fa-birthday-cake"></i> ${pet.age}</span>
                  <span class="pet-detail"><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
                  <span class="pet-detail"><i class="fas fa-map-pin"></i> ${pet.city}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: var(--space-xl);">
          <button class="btn btn-primary btn-lg" onclick="window.location.hash='/adoption'">
            View All Pets <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section" style="text-align: center;">
      <div style="max-width: 700px; margin: 0 auto; padding: var(--space-2xl); background: var(--gradient-glass); border: 1px solid var(--border-color); border-radius: var(--radius-xl);">
        <h2 style="font-family: var(--font-heading); font-size: 36px; font-weight: 800; margin-bottom: var(--space-md);">
          Ready to give your pet the <span style="color: var(--primary);">best care</span>?
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-xl); font-size: 16px;">
          Join thousands of pet parents who trust PawCare for their pet's health, happiness, and everything in between.
        </p>
        <div style="display: flex; gap: var(--space-md); justify-content: center;">
          <button class="btn btn-primary btn-lg" onclick="window.location.hash='/signup'">
            <i class="fas fa-user-plus"></i> Get Started Free
          </button>
          <button class="btn btn-outline btn-lg" onclick="window.location.hash='/vets'">
            <i class="fas fa-stethoscope"></i> Find a Vet
          </button>
        </div>
      </div>
    </section>
  `;
}

// ==========================================
// AUTH PAGES (Login / Signup)
// ==========================================

export function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="nav-brand" style="justify-content: center; margin-bottom: 16px; cursor: pointer;" onclick="window.location.hash='/'">
              <div class="nav-brand-icon">🐾</div>
              <span class="nav-brand-text">PawCare</span>
            </div>
            <h2>Welcome Back!</h2>
            <p>Login to access your pet care dashboard, vendor hub, or admin panel</p>
          </div>

          <!-- Google 1-Click Login -->
          <button type="button" class="btn-google" id="google-login-btn">
            <svg viewBox="0 0 48 48" width="18" height="18">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </button>
          
          <div class="auth-divider">or sign in with email</div>
          
          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Email Address or Vendor ID</label>
              <input type="text" class="form-input" id="login-email" placeholder="e.g. you@example.com or VND-123456" required value="sandeep@example.com">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required value="password123">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
          </form>

          <!-- Quick 1-Click Role Switcher Demo -->
          <div class="demo-logins-box">
            <div class="demo-logins-title"><i class="fas fa-bolt" style="color: var(--primary);"></i> Quick Test Roles</div>
            <div class="demo-buttons-group">
              <button type="button" class="btn-demo-quick" onclick="window.quickLoginDemo('admin')">
                <i class="fas fa-shield-alt" style="color: #FB7185;"></i> Admin
              </button>
              <button type="button" class="btn-demo-quick" onclick="window.quickLoginDemo('vendor')">
                <i class="fas fa-store" style="color: #2DD4BF;"></i> Vendor
              </button>
              <button type="button" class="btn-demo-quick" onclick="window.quickLoginDemo('user')">
                <i class="fas fa-paw" style="color: #FCD34D;"></i> Pet Parent
              </button>
            </div>
          </div>
          
          <div class="auth-footer" style="display: flex; flex-direction: column; gap: 8px; margin-top: 20px;">
            <div>Don't have an account? <a onclick="window.location.hash='/signup'" style="cursor: pointer; color: var(--primary); font-weight: 600;">Sign Up as Pet Parent</a></div>
            <div style="font-size: 13px;">Are you a pet business or creator? <a onclick="window.location.hash='/vendor-signup'" style="cursor: pointer; color: var(--secondary); font-weight: 700;">Register as Vendor →</a></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initLoginEvents() {
  document.getElementById('google-login-btn')?.addEventListener('click', () => {
    openGoogleLoginModal();
  });

  window.quickLoginDemo = function(role) {
    let email, pass;
    if (role === 'admin') {
      email = 'admin@pawcare.com';
      pass = 'admin123';
    } else if (role === 'vendor') {
      email = 'vendor@pawstyle.com';
      pass = 'vendor123';
    } else {
      email = 'sandeep@example.com';
      pass = 'password123';
    }

    const res = db.login(email, pass);
    if (res.success) {
      showToast(`Logged in as ${res.user.name} (${role.toUpperCase()}) 🚀`, 'success');
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    } else {
      showToast(res.error, 'error');
    }
  };

  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const result = db.login(email, password);
      if (result.success) {
        showToast(`Welcome back, ${result.user.name}! 🐾`, 'success');
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else if (result.user.role === 'vendor') {
          navigate('/vendor');
        } else {
          navigate('/');
        }
      } else {
        showToast(result.error, 'error');
      }
    });
  }
}

export function renderSignup() {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="nav-brand" style="justify-content: center; margin-bottom: 16px; cursor: pointer;" onclick="window.location.hash='/'">
              <div class="nav-brand-icon">🐾</div>
              <span class="nav-brand-text">PawCare</span>
            </div>
            <h2>Create Account</h2>
            <p>Join the community of caring pet parents</p>
          </div>

          <button type="button" class="btn-google" id="google-signup-btn">
            <svg viewBox="0 0 48 48" width="18" height="18">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign up with Google
          </button>

          <div class="auth-divider">or create with email</div>
          
          <form id="signup-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="signup-name" placeholder="Enter your full name" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="signup-email" placeholder="Email address" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="signup-phone" placeholder="Phone number" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">City</label>
              <select class="form-input" id="signup-city">
                ${db.getCities().map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="signup-password" placeholder="Create a password" required minlength="6">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
              <i class="fas fa-user-plus"></i> Create Account
            </button>
          </form>

          <div style="margin-top: 16px; padding: 12px; background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 700; color: #2DD4BF; font-size: 13px;">Are you a Vendor / Pet Business?</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin: 4px 0 8px;">Sell wearables, fresh food, or services to 10k+ pet parents</div>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.location.hash='/vendor-signup'">
              <i class="fas fa-store"></i> Register as a Vendor Partner →
            </button>
          </div>
          
          <div class="auth-footer" style="margin-top: 16px;">
            Already have an account? <a onclick="window.location.hash='/login'" style="cursor: pointer; color: var(--primary); font-weight: 600;">Login</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSignupEvents() {
  document.getElementById('google-signup-btn')?.addEventListener('click', () => {
    openGoogleLoginModal();
  });

  const form = document.getElementById('signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        phone: document.getElementById('signup-phone').value,
        city: document.getElementById('signup-city').value,
        password: document.getElementById('signup-password').value,
        role: 'user'
      };
      const result = db.signup(userData);
      if (result.success) {
        showToast(`Welcome to PawCare, ${result.user.name}! 🎉`, 'success');
        navigate('/');
      } else {
        showToast(result.error, 'error');
      }
    });
  }
}

// ==========================================
// VENDOR REGISTRATION ONBOARDING
// ==========================================

export function renderVendorSignup() {
  return `
    <div class="auth-page" style="padding: 40px 16px;">
      <div style="max-width: 720px; margin: 0 auto; width: 100%;">
        <div class="auth-card" style="padding: 36px;">
          <div class="auth-header" style="text-align: center; margin-bottom: 24px;">
            <div class="nav-brand" style="justify-content: center; margin-bottom: 12px; cursor: pointer;" onclick="window.location.hash='/'">
              <div class="nav-brand-icon">🐾</div>
              <span class="nav-brand-text">PawCare Partner Hub</span>
            </div>
            <h2>Grow Your Pet Business on PawCare</h2>
            <p>Join India's premier pet platform. Sell wearables, fresh nutrition, accessories, or services with 0% commission for the first 60 days.</p>
          </div>

          <!-- Vendor Perks Banner -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
              <i class="fas fa-percent" style="color: var(--primary); font-size: 20px;"></i>
              <div style="font-weight: 700; font-size: 13px; margin-top: 6px;">0% Commission</div>
              <div style="font-size: 11px; color: var(--text-muted);">First 60 days free</div>
            </div>
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
              <i class="fas fa-users" style="color: var(--secondary); font-size: 20px;"></i>
              <div style="font-weight: 700; font-size: 13px; margin-top: 6px;">10K+ Pet Parents</div>
              <div style="font-size: 11px; color: var(--text-muted);">Direct buyers in your city</div>
            </div>
            <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
              <i class="fas fa-bolt" style="color: #60A5FA; font-size: 20px;"></i>
              <div style="font-weight: 700; font-size: 13px; margin-top: 6px;">Instant UPI Payouts</div>
              <div style="font-size: 11px; color: var(--text-muted);">Fast weekly settlements</div>
            </div>
          </div>

          <form id="vendor-signup-form">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: var(--primary); border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              <i class="fas fa-store"></i> 1. Store / Business Information
            </h3>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Store / Brand Name</label>
                <input type="text" class="form-input" id="v-store-name" placeholder="e.g. PawStyle Creations" required>
              </div>
              <div class="form-group">
                <label class="form-label">Business Category</label>
                <select class="form-input" id="v-business-type" required>
                  <option value="Wearables & Clothes">Wearables & Pet Clothing (Festive, Raincoats, Scarfs)</option>
                  <option value="Pet Food & Nutrition">Pet Food, Treats & Fresh Kitchen</option>
                  <option value="Pharmacy & Healthcare">Pharmacy, Supplements & First Aid</option>
                  <option value="Toys & Accessories">Toys, Beds & Pet Accessories</option>
                  <option value="Boarding & Services">Day Care, Boarding & Grooming</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">GSTIN / Registration No. (Optional for Home Sellers)</label>
                <input type="text" class="form-input" id="v-gstin" placeholder="e.g. 29ABCDE1234F1Z5">
              </div>
              <div class="form-group">
                <label class="form-label">Operating City</label>
                <select class="form-input" id="v-city" required>
                  ${db.getCities().map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Store Bio / Pitch</label>
              <textarea class="form-input" id="v-description" rows="2" placeholder="Tell customers about your handmade items, quality ingredients, or specialties..."></textarea>
            </div>

            <h3 style="font-size: 16px; margin: 20px 0 12px; color: var(--secondary); border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              <i class="fas fa-user-tie"></i> 2. Owner & Payout Details
            </h3>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Contact Person Name</label>
                <input type="text" class="form-input" id="v-contact-name" placeholder="Full Name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Business Email</label>
                <input type="email" class="form-input" id="v-email" placeholder="vendor@example.com" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Business Phone Number</label>
                <input type="tel" class="form-input" id="v-phone" placeholder="9876543210" required>
              </div>
              <div class="form-group">
                <label class="form-label">UPI ID for Payouts</label>
                <input type="text" class="form-input" id="v-upi" placeholder="yourstore@okhdfcbank" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Create Portal Password</label>
              <input type="password" class="form-input" id="v-password" placeholder="At least 6 characters" required minlength="6">
            </div>

            <button type="submit" class="btn btn-secondary" style="width: 100%; padding: 15px; font-size: 16px; font-weight: 700; margin-top: 10px;">
              <i class="fas fa-store"></i> Launch My Vendor Store & Dashboard
            </button>
          </form>

          <div class="auth-footer" style="margin-top: 20px; text-align: center;">
            Already registered as a partner? <a onclick="window.location.hash='/login'" style="cursor: pointer; color: var(--primary); font-weight: 600;">Login to Vendor Hub</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initVendorSignupEvents() {
  const form = document.getElementById('vendor-signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const vendorData = {
        storeName: document.getElementById('v-store-name').value,
        businessType: document.getElementById('v-business-type').value,
        gstin: document.getElementById('v-gstin').value,
        city: document.getElementById('v-city').value,
        storeDescription: document.getElementById('v-description').value,
        contactName: document.getElementById('v-contact-name').value,
        email: document.getElementById('v-email').value,
        phone: document.getElementById('v-phone').value,
        payoutUpi: document.getElementById('v-upi').value,
        password: document.getElementById('v-password').value,
      };

      const result = db.vendorSignup(vendorData);
      if (result.success) {
        showToast(`Vendor account created! Your Vendor ID is ${result.user.vendorId || result.user.id}. Welcome, ${result.user.storeName}! 🏪`, 'success');
        navigate('/vendor');
      } else {
        showToast(result.error, 'error');
      }
    });
  }
}

// ==========================================
// SHOP PAGE WITH CREATIVE SUBSECTION SIDEBAR
// ==========================================

export function renderShop(params = {}) {
  const products = db.getProducts();
  const currentCategory = params.category || 'All';
  const currentSub = params.sub || 'All';
  const currentSellerType = params.sellerType || 'All';
  const currentPriceRange = params.price || 'All';
  const inStockOnly = params.stock === '1';

  // Subsections mapping
  const CATEGORY_MAP = {
    'Clothing': {
      title: 'Wearables & Clothes',
      icon: 'fa-shirt',
      subs: ['Festive & Ethnic', 'Raincoats & Jackets', 'Scarfs & Bandanas', 'Harnesses & Leashes', 'Booties & Shoes']
    },
    'Food': {
      title: 'Food & Nutrition',
      icon: 'fa-bowl-food',
      subs: ['Fresh & Home-Cooked', 'Dry Food', 'Treats & Jerky', 'Dental Chews']
    },
    'Medicine': {
      title: 'Pharmacy & Health',
      icon: 'fa-pills',
      subs: ['Flea & Tick', 'Joint & Mobility', 'Calming & Anxiety', 'First Aid']
    },
    'Accessories': {
      title: 'Toys & Gear',
      icon: 'fa-baseball',
      subs: ['Interactive Toys', 'Beds & Furniture', 'Grooming']
    }
  };

  // Filter products
  let filtered = [...products];

  if (currentCategory !== 'All') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentSub !== 'All') {
    filtered = filtered.filter(p => p.subcategory === currentSub);
  }
  if (currentSellerType !== 'All') {
    filtered = filtered.filter(p => p.sellerType === currentSellerType);
  }
  if (inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }
  if (currentPriceRange === 'under500') {
    filtered = filtered.filter(p => p.price < 500);
  } else if (currentPriceRange === '500-1500') {
    filtered = filtered.filter(p => p.price >= 500 && p.price <= 1500);
  } else if (currentPriceRange === '1500-3000') {
    filtered = filtered.filter(p => p.price > 1500 && p.price <= 3000);
  } else if (currentPriceRange === 'above3000') {
    filtered = filtered.filter(p => p.price > 3000);
  }

  // Helper to build URL with query params
  const buildShopUrl = (updates) => {
    const next = {
      category: currentCategory,
      sub: currentSub,
      sellerType: currentSellerType,
      price: currentPriceRange,
      stock: inStockOnly ? '1' : '0',
      ...updates
    };
    const parts = [];
    if (next.category && next.category !== 'All') parts.push(`category=${encodeURIComponent(next.category)}`);
    if (next.sub && next.sub !== 'All') parts.push(`sub=${encodeURIComponent(next.sub)}`);
    if (next.sellerType && next.sellerType !== 'All') parts.push(`sellerType=${encodeURIComponent(next.sellerType)}`);
    if (next.price && next.price !== 'All') parts.push(`price=${encodeURIComponent(next.price)}`);
    if (next.stock === '1') parts.push(`stock=1`);
    return `/shop${parts.length > 0 ? '?' + parts.join('&') : ''}`;
  };

  return `
    <div class="page-header">
      <h1>PawCare Pet Marketplace</h1>
      <p>Handmade indie designer clothes, raincoats, festive ethnic wear, fresh chef meals, and essential medicine.</p>
    </div>

    <div class="shop-layout">
      <!-- Creative Subsections Sidebar -->
      <aside class="shop-sidebar">
        <!-- Category & Subsections -->
        <div class="sidebar-block">
          <div class="sidebar-title"><i class="fas fa-layer-group"></i> Categories</div>
          
          <div class="sidebar-category-header ${currentCategory === 'All' ? 'active' : ''}" onclick="window.location.hash='/shop'">
            <span><i class="fas fa-border-all"></i> All Products</span>
            <span class="sub-count-badge">${products.length}</span>
          </div>

          ${Object.entries(CATEGORY_MAP).map(([catKey, catInfo]) => {
            const catProds = products.filter(p => p.category === catKey);
            const isCatActive = currentCategory === catKey;

            return `
              <div class="sidebar-category-group">
                <div class="sidebar-category-header ${isCatActive ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ category: catKey, sub: 'All' })}'">
                  <span><i class="fas ${catInfo.icon}"></i> ${catInfo.title}</span>
                  <span class="sub-count-badge">${catProds.length}</span>
                </div>

                <div class="sidebar-subcategories">
                  ${catInfo.subs.map(subName => {
                    const subCount = catProds.filter(p => p.subcategory === subName).length;
                    const isSubActive = isCatActive && currentSub === subName;

                    return `
                      <div class="sidebar-sub-item ${isSubActive ? 'active' : ''}" 
                           onclick="window.location.hash='${buildShopUrl({ category: catKey, sub: subName })}'">
                        <span>${subName}</span>
                        <span class="sub-count-badge">${subCount}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Seller Origin Filter -->
        <div class="sidebar-block">
          <div class="sidebar-title"><i class="fas fa-store"></i> Seller Origin</div>
          <div class="filter-pills-row">
            <button class="filter-pill ${currentSellerType === 'All' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ sellerType: 'All' })}'">All</button>
            <button class="filter-pill ${currentSellerType === 'small' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ sellerType: 'small' })}'">🏠 Indie / Handmade</button>
            <button class="filter-pill ${currentSellerType === 'big' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ sellerType: 'big' })}'">🏢 Big Brands</button>
          </div>
        </div>

        <!-- Price Range -->
        <div class="sidebar-block">
          <div class="sidebar-title"><i class="fas fa-indian-rupee-sign"></i> Price Range</div>
          <div class="filter-pills-row">
            <button class="filter-pill ${currentPriceRange === 'All' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ price: 'All' })}'">All</button>
            <button class="filter-pill ${currentPriceRange === 'under500' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ price: 'under500' })}'">Under ₹500</button>
            <button class="filter-pill ${currentPriceRange === '500-1500' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ price: '500-1500' })}'">₹500 - ₹1500</button>
            <button class="filter-pill ${currentPriceRange === '1500-3000' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ price: '1500-3000' })}'">₹1500 - ₹3000</button>
            <button class="filter-pill ${currentPriceRange === 'above3000' ? 'active' : ''}" onclick="window.location.hash='${buildShopUrl({ price: 'above3000' })}'">₹3000+</button>
          </div>
        </div>

        <!-- Availability Toggle -->
        <div class="sidebar-block">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">
            <input type="checkbox" id="stock-filter-chk" ${inStockOnly ? 'checked' : ''} onclick="window.location.hash='${buildShopUrl({ stock: inStockOnly ? '0' : '1' })}'">
            <span>In Stock Only</span>
          </label>
        </div>

        <!-- Reset Button -->
        <button class="btn btn-outline btn-sm" onclick="window.location.hash='/shop'" style="width: 100%;">
          <i class="fas fa-rotate-left"></i> Reset All Filters
        </button>
      </aside>

      <!-- Main Marketplace Listing Area -->
      <main class="shop-main">
        <div class="shop-top-controls" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div class="search-input-wrap" style="flex: 1; max-width: 480px;">
            <i class="fas fa-search"></i>
            <input type="text" class="search-input" id="shop-search" placeholder="Search clothes, food, medicine, toys...">
          </div>

          <div style="font-size: 13px; color: var(--text-muted);">
            Showing <strong style="color: var(--text-primary);">${filtered.length}</strong> pet products
          </div>
        </div>

        <!-- Active Filter Tags Display -->
        ${(currentCategory !== 'All' || currentSub !== 'All' || currentSellerType !== 'All' || currentPriceRange !== 'All') ? `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center;">
            <span style="font-size: 12px; color: var(--text-muted);">Active Filters:</span>
            ${currentCategory !== 'All' ? `<span class="filter-pill active">${currentCategory} <i class="fas fa-times" onclick="window.location.hash='${buildShopUrl({ category: 'All', sub: 'All' })}'"></i></span>` : ''}
            ${currentSub !== 'All' ? `<span class="filter-pill active">${currentSub} <i class="fas fa-times" onclick="window.location.hash='${buildShopUrl({ sub: 'All' })}'"></i></span>` : ''}
            ${currentSellerType !== 'All' ? `<span class="filter-pill active">${currentSellerType === 'small' ? 'Indie Sellers' : 'Big Brands'} <i class="fas fa-times" onclick="window.location.hash='${buildShopUrl({ sellerType: 'All' })}'"></i></span>` : ''}
            ${currentPriceRange !== 'All' ? `<span class="filter-pill active">${currentPriceRange} <i class="fas fa-times" onclick="window.location.hash='${buildShopUrl({ price: 'All' })}'"></i></span>` : ''}
          </div>
        ` : ''}

        ${filtered.length === 0 ? `
          <div class="empty-state" style="padding: 48px 0; text-align: center;">
            <i class="fas fa-filter-circle-xmark" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
            <h3>No products found</h3>
            <p>Try resetting filters or searching for different keywords.</p>
            <button class="btn btn-primary" onclick="window.location.hash='/shop'" style="margin-top: 12px;">View All Products</button>
          </div>
        ` : `
          <div class="grid-3" id="products-grid">
            ${filtered.map(product => `
              <div class="product-card">
                <div class="product-image-wrap">
                  <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
                  ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
                  ${product.sellerType === 'small' ? `<span class="product-tag" style="top: auto; bottom: 8px; left: 8px; background: rgba(20,184,166,0.9);"><i class="fas fa-heart"></i> Handmade</span>` : ''}
                  <button class="product-wishlist"><i class="far fa-heart"></i></button>
                </div>
                <div class="product-body">
                  <div class="product-category">${product.subcategory || product.category}</div>
                  <div class="product-title">${product.name}</div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-muted); margin: 4px 0 8px;">
                    <span>by <strong>${product.seller}</strong></span>
                    ${product.stockCount ? `<span style="color: ${product.stockCount < 15 ? '#FB7185' : 'var(--text-muted)'}; font-weight: 600;"><i class="fas fa-boxes-stacked"></i> ${product.stockCount} left</span>` : ''}
                  </div>

                  <!-- Google Rating Snippet -->
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 12px;">
                    <i class="fab fa-google" style="color: #4285F4;"></i>
                    <span style="color: #FBBC04; font-weight: 700;">★ ${product.rating || 4.8}</span>
                    <span style="color: var(--text-muted);">(${product.reviews || 89} reviews)</span>
                  </div>

                  <div class="product-footer">
                    <div>
                      <span class="card-price">₹${product.price.toLocaleString()}</span>
                      ${product.originalPrice ? `<span class="card-price-old">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">
                      <i class="fas fa-cart-plus"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </main>
    </div>
  `;
}

export function initShopEvents() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) {
        showToast('Please login to add items to cart', 'error');
        navigate('/login');
        return;
      }
      const productId = btn.dataset.id;
      const product = db.getProducts().find(p => p.id === productId);
      if (product) {
        db.addToCart(product);
        updateCartBadge();
        showToast(`${product.name} added to cart! 🛒`, 'success');
      }
    });
  });

  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const cat = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
        card.style.display = (title.includes(query) || cat.includes(query)) ? '' : 'none';
      });
    });
  }
}


// ==========================================
// CART PAGE
// ==========================================

export function renderCart() {
  const cart = db.getCart();
  const total = db.getCartTotal();
  
  if (cart.length === 0) {
    return `
      <div class="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div class="empty-state">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button class="btn btn-primary" onclick="window.location.hash='/shop'">
          <i class="fas fa-shopping-bag"></i> Start Shopping
        </button>
      </div>
    `;
  }
  
  return `
    <div class="page-header">
      <h1>Shopping Cart</h1>
      <p>${cart.length} item${cart.length > 1 ? 's' : ''} in your cart</p>
    </div>
    
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <img class="cart-item-image" src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
              <div class="quantity-controls">
                <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--primary);">
                ₹${(item.price * item.quantity).toLocaleString()}
              </div>
              <button class="btn btn-ghost btn-sm remove-item" data-id="${item.id}" style="margin-top: 8px; color: var(--accent);">
                <i class="fas fa-trash-alt"></i> Remove
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹${total.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span style="color: #22C55E;">FREE</span>
        </div>
        <div class="summary-row">
          <span>Discount</span>
          <span style="color: #22C55E;">-₹${Math.round(total * 0.1).toLocaleString()}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₹${Math.round(total * 0.9).toLocaleString()}</span>
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
          <input type="text" class="form-input" placeholder="Enter coupon code" id="coupon-input">
        </div>
        
        <button class="btn btn-primary" style="width: 100%; padding: 14px;" id="checkout-btn">
          <i class="fas fa-lock"></i> Proceed to Checkout
        </button>
        
        <p style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 12px;">
          <i class="fas fa-shield-alt"></i> Secure checkout powered by PawCare
        </p>
      </div>
    </div>
  `;
}

export function initCartEvents() {
  // Quantity controls
  document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = db.getCart();
      const item = cart.find(i => i.id === id);
      if (item) {
        db.updateCartQty(id, item.quantity + 1);
        navigate('/cart');
      }
    });
  });
  
  document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = db.getCart();
      const item = cart.find(i => i.id === id);
      if (item && item.quantity > 1) {
        db.updateCartQty(id, item.quantity - 1);
        navigate('/cart');
      }
    });
  });
  
  // Remove item
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      db.removeFromCart(btn.dataset.id);
      updateCartBadge();
      showToast('Item removed from cart', 'info');
      navigate('/cart');
    });
  });
  
  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) {
        showToast('Please login to checkout', 'error');
        navigate('/login');
        return;
      }
      navigate('/checkout');
    });
  }
}

// ==========================================
// CHECKOUT PAGE
// ==========================================

export function renderCheckout() {
  const cart = db.getCart();
  const total = db.getCartTotal();
  
  if (cart.length === 0) {
    navigate('/cart');
    return '';
  }
  
  return `
    <div class="page-header">
      <h1>Checkout</h1>
      <p>Complete your order</p>
    </div>
    
    <div class="cart-layout">
      <div>
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-xl);">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 700; margin-bottom: var(--space-lg);">Delivery Address</h3>
          <form id="checkout-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="checkout-name" required value="${db.getCurrentUser()?.name || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Address</label>
              <textarea class="form-input" id="checkout-address" placeholder="Enter your full address" required style="min-height: 80px;"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">City</label>
                <select class="form-input" id="checkout-city">
                  ${db.getCities().map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">PIN Code</label>
                <input type="text" class="form-input" id="checkout-pin" placeholder="Enter PIN code" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" id="checkout-phone" required value="${db.getCurrentUser()?.phone || ''}">
            </div>
            
            <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 700; margin: var(--space-xl) 0 var(--space-lg);">Payment Method</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <label class="filter-option" style="padding: 14px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <input type="radio" name="payment" value="cod" checked> Cash on Delivery
              </label>
              <label class="filter-option" style="padding: 14px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <input type="radio" name="payment" value="upi"> UPI Payment
              </label>
              <label class="filter-option" style="padding: 14px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <input type="radio" name="payment" value="card"> Credit/Debit Card
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 16px; margin-top: var(--space-xl); font-size: 16px;">
              <i class="fas fa-check-circle"></i> Place Order — ₹${Math.round(total * 0.9).toLocaleString()}
            </button>
          </form>
        </div>
      </div>
      
      <div class="cart-summary">
        <h3>Order Items (${cart.length})</h3>
        ${cart.map(item => `
          <div style="display: flex; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color);">
            <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
              <div style="font-size: 13px; font-weight: 600;">${item.name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">Qty: ${item.quantity}</div>
            </div>
            <div style="font-weight: 600; color: var(--primary);">₹${(item.price * item.quantity).toLocaleString()}</div>
          </div>
        `).join('')}
        <div class="summary-row total" style="margin-top: 12px;">
          <span>Total</span>
          <span>₹${Math.round(total * 0.9).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

export function initCheckoutEvents() {
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const order = db.placeOrder({
        address: document.getElementById('checkout-address').value,
        city: document.getElementById('checkout-city').value,
        pin: document.getElementById('checkout-pin').value,
        phone: document.getElementById('checkout-phone').value,
        payment: document.querySelector('input[name="payment"]:checked').value,
      });
      updateCartBadge();
      navigate('/order-success');
    });
  }
}

// ==========================================
// ORDER SUCCESS
// ==========================================

export function renderOrderSuccess() {
  return `
    <div class="success-page">
      <div class="success-icon">
        <i class="fas fa-check"></i>
      </div>
      <h1 style="font-family: var(--font-heading); font-size: 36px; font-weight: 800; margin-bottom: var(--space-md);">
        Order Placed Successfully! 🎉
      </h1>
      <p style="color: var(--text-secondary); font-size: 18px; margin-bottom: var(--space-xl); max-width: 500px; margin-left: auto; margin-right: auto;">
        Thank you for your order. You'll receive a confirmation shortly. Your pet is going to love their new goodies!
      </p>
      <div style="display: flex; gap: var(--space-md); justify-content: center;">
        <button class="btn btn-primary btn-lg" onclick="window.location.hash='/orders'">
          <i class="fas fa-box"></i> View Orders
        </button>
        <button class="btn btn-outline btn-lg" onclick="window.location.hash='/shop'">
          <i class="fas fa-shopping-bag"></i> Continue Shopping
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// VETS PAGE (Doctors + Hospitals)
// ==========================================

export function renderVets(params = {}) {
  const doctors = db.getDoctors();
  const hospitals = db.getHospitals();
  const tab = params.tab || 'doctors';
  
  return `
    <div class="page-header">
      <h1>Veterinary Services</h1>
      <p>Find the best vets and hospitals for your pet. Book appointments, read reviews, and access 24/7 care.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="tabs">
        <button class="tab ${tab === 'doctors' ? 'active' : ''}" onclick="window.location.hash='/vets?tab=doctors'">
          <i class="fas fa-user-doctor"></i> Doctors
        </button>
        <button class="tab ${tab === 'hospitals' ? 'active' : ''}" onclick="window.location.hash='/vets?tab=hospitals'">
          <i class="fas fa-hospital"></i> Hospitals
        </button>
      </div>
      
      <div class="search-bar">
        <div class="search-input-wrap">
          <i class="fas fa-search"></i>
          <input type="text" class="search-input" id="vet-search" placeholder="Search ${tab === 'doctors' ? 'doctors' : 'hospitals'}...">
        </div>
      </div>
      
      ${tab === 'doctors' ? `
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);" id="doctors-list">
          ${doctors.map(doc => `
            <div class="doctor-card">
              <img class="doctor-avatar" src="${doc.image}" alt="${doc.name}" loading="lazy">
              <div class="doctor-info" style="flex: 1;">
                <h3>${doc.name}</h3>
                <div class="doctor-specialty">${doc.specialty}</div>
                <div class="doctor-details">
                  <span><i class="fas fa-hospital"></i> ${doc.hospital}</span>
                  <span><i class="fas fa-map-pin"></i> ${doc.city}</span>
                  <span><i class="fas fa-clock"></i> ${doc.experience}</span>
                </div>
                ${renderStars(doc.rating)}
                <span style="font-size: 12px; color: var(--text-muted);">(${doc.reviews} reviews)</span>
                
                <div style="display: flex; gap: 8px; margin: 8px 0; flex-wrap: wrap;">
                  <button type="button" class="btn btn-outline btn-xs" onclick="window.openGoogleReviewsModal('${doc.id}', '${doc.name}', ${doc.rating || 4.9}, ${doc.reviews || 24})" style="padding: 4px 8px; font-size: 11px; border: 1px solid rgba(66,133,244,0.3); background: rgba(66,133,244,0.08); color: #60A5FA;">
                    <i class="fab fa-google"></i> Google Reviews (${doc.reviews || 24})
                  </button>
                  <button type="button" class="btn btn-outline btn-xs" onclick="window.openGoogleMapModal('${doc.name}', '${doc.hospital}, ${doc.city}')" style="padding: 4px 8px; font-size: 11px; border: 1px solid var(--border-color); background: var(--bg-surface);">
                    <i class="fas fa-map-location-dot" style="color: #34A853;"></i> Map Location
                  </button>
                </div>

                <div class="doctor-tags">
                  ${safeArray(doc.tags).map(tag => `<span class="doctor-tag">${tag}</span>`).join('')}
                  ${doc.available24x7 ? '<span class="doctor-tag available">24/7 Available</span>' : ''}
                  ${doc.videoCall ? '<span class="doctor-tag" style="background: rgba(99,102,241,0.1); color: #6366F1; border-color: rgba(99,102,241,0.2);"><i class="fas fa-video"></i> Video Call</span>' : ''}
                </div>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
                <div style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--primary);">₹${doc.fee}</div>
                <div style="font-size: 12px; color: var(--text-muted);">Consultation fee</div>
                <button class="btn btn-primary btn-sm book-doctor-btn" data-id="${doc.id}">
                  <i class="fas fa-calendar-check"></i> Book Now
                </button>
                <button class="btn btn-outline btn-sm" onclick="window.open('tel:${doc.phone}')">
                  <i class="fas fa-phone"></i> Call
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="grid-2" id="hospitals-list">
          ${hospitals.map(hosp => `
            <div class="place-card">
              <img class="place-image" src="${hosp.image}" alt="${hosp.name}" loading="lazy">
              <div class="place-body">
                <div class="place-name">${hosp.name}</div>
                <div class="place-location"><i class="fas fa-map-pin"></i> ${hosp.area}, ${hosp.city}</div>
                ${renderStars(hosp.rating)}
                <span style="font-size: 12px; color: var(--text-muted);">(${hosp.reviews} reviews)</span>

                <div style="display: flex; gap: 8px; margin: 8px 0; flex-wrap: wrap;">
                  <button type="button" class="btn btn-outline btn-xs" onclick="window.openGoogleReviewsModal('${hosp.id}', '${hosp.name}', ${hosp.rating || 4.8}, ${hosp.reviews || 45})" style="padding: 4px 8px; font-size: 11px; border: 1px solid rgba(66,133,244,0.3); background: rgba(66,133,244,0.08); color: #60A5FA;">
                    <i class="fab fa-google"></i> Google Reviews (${hosp.reviews || 45})
                  </button>
                  <button type="button" class="btn btn-outline btn-xs" onclick="window.openGoogleMapModal('${hosp.name}', '${hosp.area}, ${hosp.city}')" style="padding: 4px 8px; font-size: 11px; border: 1px solid var(--border-color); background: var(--bg-surface);">
                    <i class="fas fa-map-location-dot" style="color: #34A853;"></i> Map
                  </button>
                </div>

                <div class="place-features">
                  ${safeArray(hosp.features).map(f => `<span class="place-feature">${f}</span>`).join('')}
                </div>
                <div class="place-footer">
                  <div class="place-price">${hosp.priceRange}</div>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-sm book-hospital-btn" data-id="${hosp.id}">
                      <i class="fas fa-calendar-check"></i> Book
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="window.open('tel:${hosp.phone}')">
                      <i class="fas fa-phone"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

export function initVetsEvents() {
  // Book doctor buttons
  document.querySelectorAll('.book-doctor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to book', 'error'); navigate('/login'); return; }
      
      const docId = btn.dataset.id;
      const doc = db.getDoctors().find(d => d.id === docId);
      
      showModal('Book Appointment', `
        <form id="book-doctor-form">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px; padding: 16px; background: var(--bg-surface); border-radius: var(--radius-md);">
            <img src="${doc.image}" style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover;">
            <div>
              <div style="font-weight: 700;">${doc.name}</div>
              <div style="font-size: 13px; color: var(--secondary);">${doc.specialty}</div>
              <div style="font-size: 13px; color: var(--text-muted);">${doc.hospital}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Pet Name</label>
            <input type="text" class="form-input" id="book-pet-name" placeholder="Enter your pet's name" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" id="book-date" required>
            </div>
            <div class="form-group">
              <label class="form-label">Time</label>
              <select class="form-input" id="book-time">
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
                <option>05:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Reason for Visit</label>
            <textarea class="form-input" id="book-reason" placeholder="Brief description of the issue" style="min-height: 80px;"></textarea>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
            <div style="font-size: 18px; font-weight: 700; color: var(--primary);">Fee: ₹${doc.fee}</div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-check"></i> Confirm Booking
            </button>
          </div>
        </form>
      `);
      
      document.getElementById('book-doctor-form').addEventListener('submit', (e) => {
        e.preventDefault();
        db.addBooking({
          type: 'doctor',
          doctorId: doc.id,
          doctorName: doc.name,
          hospital: doc.hospital,
          petName: document.getElementById('book-pet-name').value,
          date: document.getElementById('book-date').value,
          time: document.getElementById('book-time').value,
          reason: document.getElementById('book-reason').value,
          fee: doc.fee,
          userId: user.id,
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Appointment booked successfully! 🎉', 'success');
      });
    });
  });
  
  // Book hospital
  document.querySelectorAll('.book-hospital-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to book', 'error'); navigate('/login'); return; }
      
      const hospId = btn.dataset.id;
      const hosp = db.getHospitals().find(h => h.id === hospId);
      
      showModal('Book Hospital Visit', `
        <form id="book-hospital-form">
          <div style="margin-bottom: 20px; padding: 16px; background: var(--bg-surface); border-radius: var(--radius-md);">
            <div style="font-weight: 700; font-size: 16px;">${hosp.name}</div>
            <div style="font-size: 13px; color: var(--text-muted);">${hosp.area}, ${hosp.city}</div>
          </div>
          <div class="form-group">
            <label class="form-label">Pet Name</label>
            <input type="text" class="form-input" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Time</label>
              <select class="form-input">
                <option>Morning (9-12)</option>
                <option>Afternoon (12-4)</option>
                <option>Evening (4-8)</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Service Needed</label>
            <select class="form-input">
              <option>General Checkup</option>
              <option>Vaccination</option>
              <option>Surgery Consultation</option>
              <option>Emergency</option>
              <option>Dental</option>
              <option>Grooming</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
            <i class="fas fa-check"></i> Book Appointment
          </button>
        </form>
      `);
      
      document.getElementById('book-hospital-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Hospital appointment booked! 🏥', 'success');
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
      });
    });
  });
  
  // Search
  const searchInput = document.getElementById('vet-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.doctor-card, .place-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
}

// ==========================================
// ADOPTION PAGE
// ==========================================

export function renderAdoption(params = {}) {
  const pets = db.getAdoption();
  const type = params.type || 'All';
  const types = ['All', ...new Set(pets.map(p => p.type))];
  
  const filtered = type === 'All' ? pets : pets.filter(p => p.type === type);
  
  return `
    <div class="page-header">
      <h1>Pet Adoption & Selling</h1>
      <p>Find your new best friend. Dogs, cats, rabbits, birds — all domestic animals looking for loving homes.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="tabs">
        ${types.map(t => `
          <button class="tab ${t === type ? 'active' : ''}" onclick="window.location.hash='/adoption?type=${t}'">${t}</button>
        `).join('')}
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl);">
        <p style="color: var(--text-muted); font-size: 14px;">${filtered.length} pets available</p>
        <button class="btn btn-primary" id="list-pet-btn">
          <i class="fas fa-plus"></i> List a Pet
        </button>
      </div>
      
      <div class="grid-4">
        ${filtered.map(pet => `
          <div class="pet-card">
            <div class="pet-image-wrap">
              <img src="${pet.image}" alt="${pet.name}" loading="lazy">
              <span class="pet-status badge-available">${pet.fee === 0 ? 'Free Adoption' : `₹${pet.fee.toLocaleString()}`}</span>
            </div>
            <div class="pet-body">
              <div class="pet-name">${pet.name}</div>
              <div class="pet-breed">${pet.breed}</div>
              <div class="pet-details">
                <span class="pet-detail"><i class="fas fa-birthday-cake"></i> ${pet.age}</span>
                <span class="pet-detail"><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
                <span class="pet-detail"><i class="fas fa-ruler"></i> ${pet.size}</span>
              </div>
              <div class="pet-details">
                <span class="pet-detail"><i class="fas fa-map-pin"></i> ${pet.city}</span>
                <span class="pet-detail">${pet.vaccinated ? '✅ Vaccinated' : '❌ Not Vaccinated'}</span>
              </div>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${pet.description}</p>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-primary btn-sm adopt-btn" data-id="${pet.id}" style="flex: 1;">
                  <i class="fas fa-heart"></i> ${pet.fee === 0 ? 'Adopt' : 'Contact'}
                </button>
                <button class="btn btn-outline btn-sm" onclick="window.open('tel:${pet.contactPhone}')">
                  <i class="fas fa-phone"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function initAdoptionEvents() {
  document.querySelectorAll('.adopt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to adopt', 'error'); navigate('/login'); return; }
      
      const pet = db.getAdoption().find(p => p.id === btn.dataset.id);
      showModal(`Adopt ${pet.name}`, `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${pet.image}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 16px; margin: 0 auto;">
          <h3 style="margin-top: 12px; font-family: var(--font-heading);">${pet.name}</h3>
          <p style="color: var(--secondary);">${pet.breed} · ${pet.age} · ${pet.gender}</p>
        </div>
        <div style="background: var(--bg-surface); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${pet.description}</p>
        </div>
        <div style="display: flex; gap: 12px; font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
          <span><i class="fas fa-user"></i> ${pet.contactName}</span>
          <span><i class="fas fa-phone"></i> ${pet.contactPhone}</span>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="window.open('tel:${pet.contactPhone}')">
            <i class="fas fa-phone"></i> Call ${pet.contactName}
          </button>
          <button class="btn btn-secondary" style="flex: 1;" onclick="window.open('https://wa.me/91${pet.contactPhone}')">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </button>
        </div>
      `);
    });
  });
  
  // List pet button
  const listBtn = document.getElementById('list-pet-btn');
  if (listBtn) {
    listBtn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to list a pet', 'error'); navigate('/login'); return; }
      
      showModal('List a Pet for Adoption', `
        <form id="list-pet-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pet Name</label>
              <input type="text" class="form-input" id="pet-name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Animal Type</label>
              <select class="form-input" id="pet-type">
                <option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Other</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Breed</label>
              <input type="text" class="form-input" id="pet-breed" required>
            </div>
            <div class="form-group">
              <label class="form-label">Age</label>
              <input type="text" class="form-input" id="pet-age" placeholder="e.g., 2 years" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select class="form-input" id="pet-gender"><option>Male</option><option>Female</option></select>
            </div>
            <div class="form-group">
              <label class="form-label">Price (₹0 for free adoption)</label>
              <input type="number" class="form-input" id="pet-fee" value="0" min="0">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input" id="pet-desc" required placeholder="Describe your pet's personality, habits, etc."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i class="fas fa-plus"></i> List Pet
          </button>
        </form>
      `);
      
      document.getElementById('list-pet-form').addEventListener('submit', (e) => {
        e.preventDefault();
        db.addAdoptionListing({
          name: document.getElementById('pet-name').value,
          type: document.getElementById('pet-type').value,
          breed: document.getElementById('pet-breed').value,
          age: document.getElementById('pet-age').value,
          gender: document.getElementById('pet-gender').value,
          fee: parseInt(document.getElementById('pet-fee').value) || 0,
          description: document.getElementById('pet-desc').value,
          city: user.city || 'Bangalore',
          contactName: user.name,
          contactPhone: user.phone || '',
          image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
          vaccinated: false, neutered: false, size: 'Medium', listedBy: 'Owner',
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Pet listed successfully! 🐾', 'success');
        navigate('/adoption');
      });
    });
  }
}

// ==========================================
// LOST & FOUND
// ==========================================

export function renderLostFound(params = {}) {
  const reports = db.getLostFound();
  const filter = params.filter || 'all';
  const filtered = filter === 'all' ? reports : reports.filter(r => r.type === filter);
  
  return `
    <div class="page-header">
      <h1>Lost & Found Pets</h1>
      <p>Lost your pet? Found one? Post here with photos and location to help reunite pets with their families.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: 12px;">
        <div class="tabs" style="margin-bottom: 0;">
          <button class="tab ${filter === 'all' ? 'active' : ''}" onclick="window.location.hash='/lost-found?filter=all'">All</button>
          <button class="tab ${filter === 'lost' ? 'active' : ''}" onclick="window.location.hash='/lost-found?filter=lost'">🔴 Lost</button>
          <button class="tab ${filter === 'found' ? 'active' : ''}" onclick="window.location.hash='/lost-found?filter=found'">🟢 Found</button>
        </div>
        <button class="btn btn-primary" id="report-pet-btn">
          <i class="fas fa-plus"></i> Report Lost/Found
        </button>
      </div>
      
      <div class="grid-3">
        ${filtered.map(report => `
          <div class="lost-found-card ${report.type}">
            <img class="lost-found-image" src="${report.image}" alt="${report.petType}" loading="lazy">
            <div class="lost-found-body">
              <span class="lost-found-type ${report.type === 'lost' ? 'badge-urgent' : 'badge-found'}">
                ${report.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
              </span>
              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700;">
                ${report.type === 'lost' ? report.name : report.petType} ${report.breed ? `(${report.breed})` : ''}
              </h3>
              <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0; line-height: 1.5;">${report.description}</p>
              <div style="font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px; margin-top: 12px;">
                <span><i class="fas fa-map-pin"></i> ${report.location}</span>
                <span><i class="fas fa-calendar"></i> ${report.date}</span>
                <span><i class="fas fa-user"></i> ${report.contactName}</span>
              </div>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.open('tel:${report.contactPhone}')">
                  <i class="fas fa-phone"></i> Contact
                </button>
                <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.open('https://wa.me/91${report.contactPhone}')">
                  <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function initLostFoundEvents() {
  const reportBtn = document.getElementById('report-pet-btn');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to report', 'error'); navigate('/login'); return; }
      
      showModal('Report Lost/Found Pet', `
        <form id="report-pet-form">
          <div class="form-group">
            <label class="form-label">Report Type</label>
            <select class="form-input" id="report-type">
              <option value="lost">Lost Pet</option>
              <option value="found">Found Pet</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Animal Type</label>
              <select class="form-input" id="report-animal">
                <option>Dog</option><option>Cat</option><option>Bird</option><option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Breed (if known)</label>
              <input type="text" class="form-input" id="report-breed" placeholder="e.g., Golden Retriever">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Pet Name (if known)</label>
            <input type="text" class="form-input" id="report-name" placeholder="Pet's name">
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-input" id="report-location" placeholder="Where was the pet last seen/found?" required>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input" id="report-desc" required placeholder="Color, size, collar, any identifying marks..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Your Contact Number</label>
            <input type="tel" class="form-input" id="report-phone" value="${user.phone || ''}" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i class="fas fa-paper-plane"></i> Submit Report
          </button>
        </form>
      `);
      
      document.getElementById('report-pet-form').addEventListener('submit', (e) => {
        e.preventDefault();
        db.addLostFound({
          type: document.getElementById('report-type').value,
          petType: document.getElementById('report-animal').value,
          breed: document.getElementById('report-breed').value,
          name: document.getElementById('report-name').value || 'Unknown',
          location: document.getElementById('report-location').value,
          description: document.getElementById('report-desc').value,
          contactName: user.name,
          contactPhone: document.getElementById('report-phone').value,
          image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
          userId: user.id,
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Report submitted successfully! 🐾', 'success');
        navigate('/lost-found');
      });
    });
  }
}

// ==========================================
// BOARDING PAGE
// ==========================================

export function renderBoarding() {
  const facilities = db.getBoarding();
  
  return `
    <div class="page-header">
      <h1>Day Boarding & Pet Sitting</h1>
      <p>From premium resorts to home-stays by pet-loving college students and IT professionals. Your pet deserves the best!</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="tabs">
        <button class="tab active" onclick="filterBoarding('all')">All</button>
        <button class="tab" onclick="filterBoarding('big')">🏢 Premium Facilities</button>
        <button class="tab" onclick="filterBoarding('individual')">🏠 Home Stays</button>
      </div>
      
      <div class="grid-2" id="boarding-grid">
        ${facilities.map(place => `
          <div class="place-card" data-type="${place.ownerType}">
            <img class="place-image" src="${place.image}" alt="${place.name}" loading="lazy">
            <div class="place-body">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="card-badge ${place.ownerType === 'big' ? 'badge-verified' : 'badge-new'}">
                  ${place.ownerType === 'big' ? '🏢 Premium' : '🏠 Home Stay'}
                </span>
              </div>
              <div class="place-name">${place.name}</div>
              <div class="place-location"><i class="fas fa-map-pin"></i> ${place.area}, ${place.city}</div>
              ${renderStars(place.rating)}
              <span style="font-size: 12px; color: var(--text-muted);">(${place.reviews} reviews)</span>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5;">${place.description}</p>
              <div class="place-features">
                ${safeArray(place.features).map(f => `<span class="place-feature">${f}</span>`).join('')}
              </div>
              <div class="place-footer">
                <div class="place-price">₹${place.pricePerDay.toLocaleString()} <span>/day</span></div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-outline btn-sm" onclick="window.openGoogleReviewsModal('${place.id}', '${place.name}', ${place.rating || 4.9}, ${place.reviews || 40})" title="Google Reviews" style="padding: 6px 10px;">
                    <i class="fab fa-google" style="color: #EA4335;"></i> Reviews
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="window.openGoogleMapModal('${place.name}', '${place.area}, ${place.city}')" title="Google Map" style="padding: 6px 10px;">
                    <i class="fas fa-map-marker-alt" style="color: #4285F4;"></i> Map
                  </button>
                  <button class="btn btn-primary btn-sm book-boarding-btn" data-id="${place.id}">
                    <i class="fas fa-calendar-check"></i> Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function initBoardingEvents() {
  // Filter function
  window.filterBoarding = (type) => {
    document.querySelectorAll('.place-card').forEach(card => {
      if (type === 'all' || card.dataset.type === type) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    document.querySelectorAll('.tabs .tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
  };
  
  // Book boarding
  document.querySelectorAll('.book-boarding-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      if (!user) { showToast('Please login to book', 'error'); navigate('/login'); return; }
      
      const place = db.getBoarding().find(b => b.id === btn.dataset.id);
      showModal(`Book ${place.name}`, `
        <form id="book-boarding-form">
          <div style="padding: 16px; background: var(--bg-surface); border-radius: var(--radius-md); margin-bottom: 16px;">
            <div style="font-weight: 700;">${place.name}</div>
            <div style="font-size: 13px; color: var(--text-muted);">${place.area}, ${place.city}</div>
            <div style="font-size: 18px; font-weight: 700; color: var(--primary); margin-top: 4px;">₹${place.pricePerDay}/day</div>
          </div>
          <div class="form-group">
            <label class="form-label">Pet Name</label>
            <input type="text" class="form-input" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Check-in Date</label>
              <input type="date" class="form-input" id="board-checkin" required>
            </div>
            <div class="form-group">
              <label class="form-label">Check-out Date</label>
              <input type="date" class="form-input" id="board-checkout" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Special Requirements</label>
            <textarea class="form-input" placeholder="Diet restrictions, medication, etc." style="min-height: 60px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
            <i class="fas fa-check"></i> Confirm Booking
          </button>
        </form>
      `);
      
      document.getElementById('book-boarding-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Boarding booked successfully! 🏠', 'success');
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
      });
    });
  });
}

// ==========================================
// PET-FRIENDLY PLACES
// ==========================================

export function renderPlaces(params = {}) {
  const places = db.getPlaces();
  const type = params.type || 'All';
  const types = ['All', ...new Set(places.map(p => p.type))];
  const filtered = type === 'All' ? places : places.filter(p => p.type === type);
  
  return `
    <div class="page-header">
      <h1>Pet-Friendly Places</h1>
      <p>Discover dog-friendly restaurants, resorts, cafés, and exciting pet festivals near you.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="tabs">
        ${types.map(t => `
          <button class="tab ${t === type ? 'active' : ''}" onclick="window.location.hash='/places?type=${t}'">${t === 'All' ? 'All Places' : t + 's'}</button>
        `).join('')}
      </div>
      
      <div class="grid-3">
        ${filtered.map(place => `
          <div class="place-card">
            <img class="place-image" src="${place.image}" alt="${place.name}" loading="lazy">
            <div class="place-body">
              <span class="card-badge badge-${place.type === 'Event' ? 'new' : 'verified'}">${place.type}</span>
              <div class="place-name">${place.name}</div>
              <div class="place-location"><i class="fas fa-map-pin"></i> ${place.area}, ${place.city}</div>
              ${renderStars(place.rating)}
              <span style="font-size: 12px; color: var(--text-muted);">(${place.reviews} reviews)</span>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5;">${place.description}</p>
              <div class="place-features">
                ${safeArray(place.features).map(f => `<span class="place-feature">${f}</span>`).join('')}
              </div>
              <div class="place-footer">
                <div class="place-price" style="font-size: 16px;">${place.priceRange}</div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-outline btn-sm" onclick="window.openGoogleReviewsModal('${place.id}', '${place.name}', ${place.rating || 4.8}, ${place.reviews || 50})" title="Google Reviews" style="padding: 6px 10px;">
                    <i class="fab fa-google" style="color: #EA4335;"></i> Reviews
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="window.openGoogleMapModal('${place.name}', '${place.area}, ${place.city}')" style="padding: 6px 10px;">
                    <i class="fas fa-directions" style="color: #4285F4;"></i> Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// PET HEALTH TRACKER
// ==========================================

export function renderHealth() {
  const user = db.getCurrentUser();
  if (!user) {
    return `
      <div class="page-header"><h1>Pet Health Tracker</h1></div>
      <div class="empty-state">
        <i class="fas fa-lock"></i>
        <h3>Login Required</h3>
        <p>Please login to access your pet's health records, vaccination tracker, and vet visit history.</p>
        <button class="btn btn-primary" onclick="window.location.hash='/login'"><i class="fas fa-sign-in-alt"></i> Login</button>
      </div>
    `;
  }
  
  const vaccinations = db.getVaccinations().filter(v => v.userId === user.id);
  const visits = db.getVetVisits().filter(v => v.userId === user.id);
  
  return `
    <div class="page-header">
      <h1>Pet Health Tracker</h1>
      <p>Track vaccinations, deworming schedules, and complete vet visit history for your pets.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      
      <!-- Upcoming Reminders -->
      <div style="background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(244,63,94,0.05)); border: 1px solid rgba(245,158,11,0.2); border-radius: var(--radius-lg); padding: var(--space-xl); margin-bottom: var(--space-xl);">
        <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: var(--space-md);">
          <i class="fas fa-bell" style="color: var(--primary);"></i> Upcoming Reminders
        </h3>
        <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
          ${vaccinations.filter(v => v.status === 'upcoming').map(v => `
            <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 12px 16px; border: 1px solid var(--border-color); flex: 1; min-width: 250px;">
              <div style="font-weight: 600;">${v.vaccineName} — ${v.petName}</div>
              <div style="font-size: 13px; color: var(--accent); margin-top: 4px;">Due: ${v.nextDue}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${v.doctor} · ${v.hospital}</div>
            </div>
          `).join('') || '<p style="color: var(--text-muted); font-size: 14px;">No upcoming reminders. All caught up! ✅</p>'}
        </div>
      </div>
      
      <div class="grid-2" style="gap: var(--space-xl);">
        <!-- Vaccinations -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
            <h2 style="font-family: var(--font-heading); font-size: 24px;">💉 Vaccinations</h2>
            <button class="btn btn-primary btn-sm" id="add-vaccine-btn"><i class="fas fa-plus"></i> Add</button>
          </div>
          
          <div class="health-timeline">
            ${vaccinations.map(v => `
              <div class="timeline-item">
                <div class="timeline-date">${v.date}</div>
                <div class="timeline-title">${v.vaccineName} — ${v.petName} (${v.petType})</div>
                <div class="timeline-desc">
                  <div>Doctor: ${v.doctor}</div>
                  <div>Hospital: ${v.hospital}</div>
                  <div>Next Due: <span style="color: ${v.status === 'upcoming' ? 'var(--accent)' : 'var(--secondary)'};">${v.nextDue}</span></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Vet Visits -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
            <h2 style="font-family: var(--font-heading); font-size: 24px;">🏥 Vet Visits</h2>
            <button class="btn btn-primary btn-sm" id="add-visit-btn"><i class="fas fa-plus"></i> Add</button>
          </div>
          
          <div class="health-timeline">
            ${visits.map(v => `
              <div class="timeline-item">
                <div class="timeline-date">${v.date}</div>
                <div class="timeline-title">${v.reason} — ${v.petName}</div>
                <div class="timeline-desc">
                  <div><strong>Doctor:</strong> ${v.doctor} · ${v.hospital}</div>
                  <div><strong>Diagnosis:</strong> ${v.diagnosis}</div>
                  <div><strong>Prescription:</strong> ${v.prescription}</div>
                  <div style="margin-top: 6px; display: flex; gap: 16px; font-size: 12px;">
                    <span>Weight: ${v.weight}</span>
                    <span>Temp: ${v.temperature}</span>
                  </div>
                  ${v.notes ? `<div style="margin-top: 6px; font-style: italic; font-size: 12px; color: var(--text-muted);">Notes: ${v.notes}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div style="margin-top: var(--space-2xl); padding: var(--space-xl); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg);">
        <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: var(--space-md);">
          <i class="fas fa-info-circle" style="color: var(--secondary);"></i> How Health Tracking Works
        </h3>
        <div class="grid-3" style="gap: var(--space-lg);">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">📋 Full History</div>
            <p style="font-size: 13px; color: var(--text-secondary);">Every visit is recorded so any doctor can check the full medical history for the next appointment.</p>
          </div>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">🔔 Smart Reminders</div>
            <p style="font-size: 13px; color: var(--text-secondary);">Get alerts for upcoming vaccinations, deworming schedules, and follow-up appointments.</p>
          </div>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">🔐 Secure Access</div>
            <p style="font-size: 13px; color: var(--text-secondary);">Doctors can access records via OTP verification. Your pet's data stays safe and private.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initHealthEvents() {
  const addVaccineBtn = document.getElementById('add-vaccine-btn');
  if (addVaccineBtn) {
    addVaccineBtn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      showModal('Add Vaccination Record', `
        <form id="add-vaccine-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pet Name</label>
              <input type="text" class="form-input" id="vac-pet" required>
            </div>
            <div class="form-group">
              <label class="form-label">Pet Type</label>
              <select class="form-input" id="vac-type"><option>Dog</option><option>Cat</option><option>Other</option></select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Vaccine Name</label>
            <input type="text" class="form-input" id="vac-name" placeholder="e.g., Rabies, DHPP, Deworming" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date Given</label>
              <input type="date" class="form-input" id="vac-date" required>
            </div>
            <div class="form-group">
              <label class="form-label">Next Due Date</label>
              <input type="date" class="form-input" id="vac-next" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Doctor</label>
              <input type="text" class="form-input" id="vac-doctor">
            </div>
            <div class="form-group">
              <label class="form-label">Hospital</label>
              <input type="text" class="form-input" id="vac-hospital">
            </div>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i class="fas fa-plus"></i> Add Record
          </button>
        </form>
      `);
      
      document.getElementById('add-vaccine-form').addEventListener('submit', (e) => {
        e.preventDefault();
        db.addVaccination({
          petName: document.getElementById('vac-pet').value,
          petType: document.getElementById('vac-type').value,
          vaccineName: document.getElementById('vac-name').value,
          date: document.getElementById('vac-date').value,
          nextDue: document.getElementById('vac-next').value,
          doctor: document.getElementById('vac-doctor').value,
          hospital: document.getElementById('vac-hospital').value,
          status: 'completed',
          userId: user.id,
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Vaccination record added! 💉', 'success');
        navigate('/health');
      });
    });
  }
  
  const addVisitBtn = document.getElementById('add-visit-btn');
  if (addVisitBtn) {
    addVisitBtn.addEventListener('click', () => {
      const user = db.getCurrentUser();
      showModal('Add Vet Visit Record', `
        <form id="add-visit-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pet Name</label>
              <input type="text" class="form-input" id="vis-pet" required>
            </div>
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" id="vis-date" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Doctor</label>
              <input type="text" class="form-input" id="vis-doctor" required>
            </div>
            <div class="form-group">
              <label class="form-label">Hospital</label>
              <input type="text" class="form-input" id="vis-hospital" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Reason for Visit</label>
            <input type="text" class="form-input" id="vis-reason" required>
          </div>
          <div class="form-group">
            <label class="form-label">Diagnosis</label>
            <textarea class="form-input" id="vis-diagnosis" style="min-height: 60px;"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Prescription</label>
            <textarea class="form-input" id="vis-prescription" style="min-height: 60px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i class="fas fa-plus"></i> Add Record
          </button>
        </form>
      `);
      
      document.getElementById('add-visit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        db.addVetVisit({
          petName: document.getElementById('vis-pet').value,
          petType: 'Dog',
          date: document.getElementById('vis-date').value,
          doctor: document.getElementById('vis-doctor').value,
          hospital: document.getElementById('vis-hospital').value,
          reason: document.getElementById('vis-reason').value,
          diagnosis: document.getElementById('vis-diagnosis').value,
          prescription: document.getElementById('vis-prescription').value,
          weight: '', temperature: '', notes: '',
          userId: user.id,
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Visit record added! 🏥', 'success');
        navigate('/health');
      });
    });
  }
}

// ==========================================
// STRAY REPORTS
// ==========================================

export function renderStrayReports() {
  const reports = db.getStrayReports();
  
  return `
    <div class="page-header">
      <h1>Stray Animal Reports</h1>
      <p>Report stray or injured animals in your area. Help connect them with animal shelters and government authorities for care.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl);">
        <p style="color: var(--text-muted);">${reports.length} reports in your area</p>
        <button class="btn btn-primary" id="report-stray-btn">
          <i class="fas fa-plus"></i> Report Stray Animal
        </button>
      </div>
      
      <div style="background: rgba(20,184,166,0.05); border: 1px solid rgba(20,184,166,0.15); border-radius: var(--radius-lg); padding: var(--space-lg); margin-bottom: var(--space-xl);">
        <h4 style="color: var(--secondary); margin-bottom: 8px;">🏛️ Can we involve the government?</h4>
        <p style="font-size: 14px; color: var(--text-secondary);">Yes! PawCare works with local animal welfare departments and municipal corporations. When you file a report, it gets forwarded to the relevant authorities for action. You can also call the AWBI helpline at <strong>1962</strong>.</p>
      </div>
      
      <div class="grid-3">
        ${reports.map(report => `
          <div class="lost-found-card ${report.urgency === 'critical' ? 'lost' : ''}">
            <img class="lost-found-image" src="${report.image}" alt="${report.animalType}" loading="lazy">
            <div class="lost-found-body">
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <span class="card-badge badge-${report.urgency === 'critical' ? 'urgent' : report.urgency === 'high' ? 'lost' : 'new'}">
                  ${report.urgency.toUpperCase()} URGENCY
                </span>
                <span class="card-badge badge-${report.status === 'in_progress' ? 'verified' : 'new'}">
                  ${report.status === 'in_progress' ? '🔄 In Progress' : '📋 Reported'}
                </span>
              </div>
              <h3 style="font-family: var(--font-heading); font-size: 18px;">${report.animalType}</h3>
              <p style="font-size: 14px; color: var(--text-secondary); margin: 8px 0; line-height: 1.5;">${report.description}</p>
              <div style="font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
                <span><i class="fas fa-map-pin"></i> ${report.location}</span>
                <span><i class="fas fa-map"></i> ${report.area}</span>
                <span><i class="fas fa-calendar"></i> ${report.date}</span>
                <span><i class="fas fa-user"></i> Reported by: ${report.reportedBy}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function initStrayEvents() {
  const reportBtn = document.getElementById('report-stray-btn');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      showModal('Report Stray Animal', `
        <form id="stray-report-form">
          <div class="form-group">
            <label class="form-label">Animal Type</label>
            <select class="form-input" id="stray-type">
              <option>Dog</option><option>Cat</option><option>Cow</option><option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-input" id="stray-location" placeholder="Area/street name" required>
          </div>
          <div class="form-group">
            <label class="form-label">Area/Locality</label>
            <input type="text" class="form-input" id="stray-area" placeholder="Specific area or landmark" required>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-input" id="stray-desc" required placeholder="Describe the situation, number of animals, condition..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Urgency</label>
            <select class="form-input" id="stray-urgency">
              <option value="low">Low - General sighting</option>
              <option value="medium">Medium - Needs attention</option>
              <option value="high">High - Aggressive/Dangerous</option>
              <option value="critical">Critical - Injured/Emergency</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i class="fas fa-paper-plane"></i> Submit Report
          </button>
        </form>
      `);
      
      document.getElementById('stray-report-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = db.getCurrentUser();
        db.addStrayReport({
          animalType: document.getElementById('stray-type').value,
          location: document.getElementById('stray-location').value,
          area: document.getElementById('stray-area').value,
          description: document.getElementById('stray-desc').value,
          urgency: document.getElementById('stray-urgency').value,
          reportedBy: user?.name || 'Anonymous',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
        });
        document.getElementById('active-modal').remove();
        document.body.style.overflow = '';
        showToast('Stray report submitted! Authorities notified. 🐾', 'success');
        navigate('/stray-reports');
      });
    });
  }
}

// ==========================================
// FOOD SUPPLIERS
// ==========================================

export function renderFoodSuppliers() {
  const suppliers = db.getFoodSuppliers();
  
  return `
    <div class="page-header">
      <h1>Fresh Food Suppliers</h1>
      <p>Home-cooked meals, raw food diets, and natural treats — from people who prepare with love, right at home.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="grid-3">
        ${suppliers.map(supplier => `
          <div class="place-card">
            <img class="place-image" src="${supplier.image}" alt="${supplier.name}" loading="lazy">
            <div class="place-body">
              <span class="card-badge ${supplier.type === 'Home Cook' ? 'badge-new' : 'badge-verified'}">
                ${supplier.type === 'Home Cook' ? '🏠 Home Cook' : '🏢 Company'}
              </span>
              <div class="place-name">${supplier.name}</div>
              <div class="place-location"><i class="fas fa-map-pin"></i> ${supplier.city}</div>
              ${renderStars(supplier.rating)}
              <span style="font-size: 12px; color: var(--text-muted);">(${supplier.reviews} reviews)</span>
              <p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5;">${supplier.description}</p>
              <div class="place-footer">
                <div class="place-price" style="font-size: 16px;">${supplier.priceRange}</div>
                <div style="display: flex; gap: 8px;">
                  ${supplier.delivery ? '<span style="font-size: 12px; color: #22C55E;"><i class="fas fa-truck"></i> Delivery</span>' : ''}
                  <button class="btn btn-primary btn-sm" onclick="window.open('tel:${supplier.phone}')">
                    <i class="fas fa-phone"></i> Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// PET CREMATION
// ==========================================

export function renderCremation() {
  const services = db.getCremation();
  
  return `
    <div class="page-header">
      <h1>Pet Cremation & Memorial</h1>
      <p>Dignified farewell services for your beloved companion. We help you say goodbye with love and respect.</p>
    </div>
    
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <div class="grid-2">
        ${services.map(service => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden;">
            <img src="${service.image}" style="width: 100%; height: 200px; object-fit: cover; filter: grayscale(30%);" loading="lazy">
            <div style="padding: var(--space-xl);">
              <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; margin-bottom: 4px;">${service.name}</h3>
              <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;"><i class="fas fa-map-pin"></i> ${service.city}</div>
              ${renderStars(service.rating)}
              <p style="font-size: 14px; color: var(--text-secondary); margin: 12px 0; line-height: 1.6;">${service.description}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0;">
                ${safeArray(service.services).map(s => `<span class="place-feature">${s}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--primary);">${service.priceRange}</div>
                <button class="btn btn-outline btn-sm" onclick="window.open('tel:${service.phone}')">
                  <i class="fas fa-phone"></i> Contact
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// BOOKINGS PAGE
// ==========================================

export function renderBookings() {
  const user = db.getCurrentUser();
  if (!user) { navigate('/login'); return ''; }
  
  const bookings = db.getBookings().filter(b => b.userId === user.id);
  
  return `
    <div class="page-header">
      <h1>My Bookings</h1>
      <p>View and manage your appointments and bookings</p>
    </div>
    
    <div style="max-width: 900px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      ${bookings.length === 0 ? `
        <div class="empty-state">
          <i class="fas fa-calendar-alt"></i>
          <h3>No Bookings Yet</h3>
          <p>You haven't made any bookings. Book a vet appointment or boarding today!</p>
          <button class="btn btn-primary" onclick="window.location.hash='/vets'"><i class="fas fa-user-doctor"></i> Find a Vet</button>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          ${bookings.map(booking => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-xl);">
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <span class="card-badge badge-verified">${booking.status}</span>
                  <h3 style="font-family: var(--font-heading); font-size: 18px; margin-top: 8px;">${booking.doctorName || booking.type}</h3>
                  <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${booking.hospital || ''}</div>
                  <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
                    <span><i class="fas fa-calendar"></i> ${booking.date?.split('T')[0]}</span>
                    ${booking.time ? ` · <span><i class="fas fa-clock"></i> ${booking.time}</span>` : ''}
                  </div>
                  <div style="font-size: 14px; color: var(--text-secondary); margin-top: 4px;">
                    <span><i class="fas fa-paw"></i> ${booking.petName}</span>
                  </div>
                </div>
                ${booking.fee ? `<div style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--primary);">₹${booking.fee}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ==========================================
// ORDERS PAGE
// ==========================================

export function renderOrders() {
  const user = db.getCurrentUser();
  if (!user) { navigate('/login'); return ''; }
  
  const orders = db.getOrders();
  
  return `
    <div class="page-header">
      <h1>My Orders</h1>
      <p>Track your recent orders</p>
    </div>
    
    <div style="max-width: 900px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      ${orders.length === 0 ? `
        <div class="empty-state">
          <i class="fas fa-box-open"></i>
          <h3>No Orders Yet</h3>
          <p>Start shopping and your orders will appear here.</p>
          <button class="btn btn-primary" onclick="window.location.hash='/shop'"><i class="fas fa-shopping-bag"></i> Shop Now</button>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          ${orders.map(order => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-xl);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div>
                  <span class="card-badge badge-verified">${order.status}</span>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Order #${order.id}</div>
                </div>
                <div style="font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: var(--primary);">₹${Math.round(order.total * 0.9).toLocaleString()}</div>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${order.items.map(item => `
                  <div style="display: flex; gap: 8px; align-items: center; background: var(--bg-surface); border-radius: var(--radius-md); padding: 8px 12px;">
                    <img src="${item.image}" style="width: 36px; height: 36px; object-fit: cover; border-radius: 6px;">
                    <div>
                      <div style="font-size: 13px; font-weight: 600;">${item.name}</div>
                      <div style="font-size: 11px; color: var(--text-muted);">x${item.quantity}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">${new Date(order.date).toLocaleString()}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ==========================================
// VENDOR DASHBOARD & INVENTORY CONTROL
// ==========================================

export function renderVendorDashboard(params = {}) {
  const user = db.getCurrentUser();
  if (!user || (user.role !== 'vendor' && user.role !== 'admin')) {
    showToast('Vendor access required. Please sign in or register as a partner.', 'warning');
    navigate('/vendor-signup');
    return '';
  }

  const currentTab = params.tab || 'inventory';
  const allProducts = db.getProducts();
  const storeName = user.storeName || (user.name + ' Studio');
  const vendorCode = user.vendorId || user.id;

  // STRICT PER-VENDOR ISOLATION:
  // For new vendors: initial state is 100% empty (clean slate).
  // Demo vendor retains PawStyle Studio products for testing.
  const isDemoVendor = user.email === 'vendor@pawstyle.com' || user.id === 'vendor1';

  const myProducts = allProducts.filter(p => {
    if (p.vendorId && (p.vendorId === user.id || p.vendorId === user.vendorId)) return true;
    if (isDemoVendor && (p.vendorId === 'vendor1' || p.seller === 'PawStyle Studio')) return true;
    return false;
  });

  const allOrders = db.getOrders();
  const myOrders = allOrders.filter(o => {
    if (!o.items || !Array.isArray(o.items)) return false;
    return o.items.some(item => {
      if (item.vendorId && (item.vendorId === user.id || item.vendorId === user.vendorId)) return true;
      if (isDemoVendor && (item.vendorId === 'vendor1' || item.seller === 'PawStyle Studio')) return true;
      return myProducts.some(mp => mp.id === item.id);
    });
  });

  const storeRevenue = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalStockUnits = myProducts.reduce((sum, p) => sum + (p.stockCount || 0), 0);
  const pendingOrdersCount = myOrders.filter(o => o.status === 'Processing').length;

  return `
    <div class="page-header" style="background: linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(245, 158, 11, 0.08));">
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1280px; margin: 0 auto; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
            <span class="card-badge badge-verified" style="background: #2DD4BF; color: #042F2E; font-weight: 800;">
              <i class="fas fa-store"></i> VERIFIED VENDOR
            </span>
            <span style="background: rgba(20, 184, 166, 0.15); color: #0D9488; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; border: 1px solid rgba(20, 184, 166, 0.3);">
              <i class="fas fa-id-card"></i> Vendor ID: <strong>${vendorCode}</strong>
            </span>
            <span style="font-size: 13px; color: var(--text-muted);"><i class="fab fa-google" style="color: #4285F4;"></i> Google 4.9 Rating</span>
          </div>
          <h1 style="margin: 0; font-size: 30px;">${storeName}</h1>
          <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">
            ${user.businessType || 'Wearables & Pet Care'} · ${user.city || 'Bangalore'} · Payout UPI: <strong>${user.payoutUpi || 'pay@upi'}</strong>
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" onclick="window.vendorOpenAddProduct()">
            <i class="fas fa-plus"></i> Add New Product
          </button>
          <button class="btn btn-outline" onclick="window.location.hash='/shop'">
            <i class="fas fa-eye"></i> View Live Store
          </button>
        </div>
      </div>
    </div>

    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <!-- Vendor Metric Overview -->
      <div class="portal-stats-grid" style="margin-bottom: var(--space-xl);">
        <div class="portal-stat-card">
          <div class="portal-stat-icon teal"><i class="fas fa-indian-rupee-sign"></i></div>
          <div>
            <div class="portal-stat-val">₹${Math.round(storeRevenue * 0.9).toLocaleString()}</div>
            <div class="portal-stat-lbl">Store Earnings</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon gold"><i class="fas fa-boxes-stacked"></i></div>
          <div>
            <div class="portal-stat-val">${myProducts.length}</div>
            <div class="portal-stat-lbl">Active Listings</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon blue"><i class="fas fa-warehouse"></i></div>
          <div>
            <div class="portal-stat-val">${totalStockUnits}</div>
            <div class="portal-stat-lbl">Units in Stock</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon rose"><i class="fas fa-truck-fast"></i></div>
          <div>
            <div class="portal-stat-val">${pendingOrdersCount}</div>
            <div class="portal-stat-lbl">Pending Dispatch</div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="portal-tabs">
        <button class="portal-tab-btn ${currentTab === 'inventory' ? 'active' : ''}" onclick="window.location.hash='/vendor?tab=inventory'">
          <i class="fas fa-boxes-stacked"></i> Inventory & Stock Control (${myProducts.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'orders' ? 'active' : ''}" onclick="window.location.hash='/vendor?tab=orders'">
          <i class="fas fa-receipt"></i> Orders & Delivery (${myOrders.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'settings' ? 'active' : ''}" onclick="window.location.hash='/vendor?tab=settings'">
          <i class="fas fa-sliders"></i> Store Profile & UPI Payouts
        </button>
      </div>

      <!-- TAB 1: Inventory & Stock Control -->
      ${currentTab === 'inventory' ? `
        ${myProducts.length === 0 ? `
          <div class="clean-slate-card" style="padding: 60px 24px; text-align: center; background: var(--bg-card); border-radius: var(--radius-xl); border: 2px dashed var(--border-color); margin-top: 16px;">
            <div style="width: 80px; height: 80px; margin: 0 auto 18px; background: rgba(20, 184, 166, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; color: #2DD4BF;">
              <i class="fas fa-boxes-stacked"></i>
            </div>
            <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Your Inventory is Clean & Ready</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px; font-size: 15px; line-height: 1.6;">
              You have a fresh, separate vendor inventory. No products have been added yet. Click below to add your first product listing with pricing, category, and initial stock!
            </p>
            <button class="btn btn-secondary" onclick="window.vendorOpenAddProduct()" style="font-weight: 700; padding: 14px 28px; font-size: 15px;">
              <i class="fas fa-plus"></i> Add Your First Product
            </button>
          </div>
        ` : `
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category / Subcategory</th>
                  <th>Price</th>
                  <th>Stock Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${myProducts.map(p => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${p.image}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px;">
                        <div>
                          <div style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${p.name}</div>
                          <div style="font-size: 11px; color: var(--text-muted);">${p.seller}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div><span class="table-badge ${p.category}">${p.category}</span></div>
                      <div style="font-size: 12px; color: var(--secondary); margin-top: 4px; font-weight: 600;">${p.subcategory || 'General'}</div>
                    </td>
                    <td style="font-weight: 700; color: var(--primary); font-size: 15px;">₹${p.price.toLocaleString()}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="qty-btn" onclick="window.vendorAdjustStock('${p.id}', -1)">−</button>
                        <span style="font-weight: 700; min-width: 24px; text-align: center;">${p.stockCount || 10}</span>
                        <button class="qty-btn" onclick="window.vendorAdjustStock('${p.id}', 1)">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="stock-badge-live ${p.inStock ? 'in-stock' : 'out-stock'}" style="cursor: pointer; border: none;" onclick="window.vendorToggleStock('${p.id}')">
                        <i class="fas ${p.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${p.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td>
                      <div class="table-actions">
                        <button class="btn-table-action" onclick="window.vendorEditProductModal('${p.id}')" title="Edit Listing">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-table-action danger" onclick="window.vendorDeleteProductAction('${p.id}', '${p.name}')" title="Delete Listing">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      ` : ''}

      <!-- TAB 2: Orders & Fulfillment -->
      ${currentTab === 'orders' ? `
        ${myOrders.length === 0 ? `
          <div class="clean-slate-card" style="padding: 60px 24px; text-align: center; background: var(--bg-card); border-radius: var(--radius-xl); border: 2px dashed var(--border-color); margin-top: 16px;">
            <div style="width: 80px; height: 80px; margin: 0 auto 18px; background: rgba(59, 130, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; color: #3B82F6;">
              <i class="fas fa-receipt"></i>
            </div>
            <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">No Customer Orders Yet</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px; font-size: 15px; line-height: 1.6;">
              Orders placed for your store products will appear here with customer delivery address, order items, and dispatch controls.
            </p>
            <button class="btn btn-outline" onclick="window.location.hash='/shop'">
              <i class="fas fa-eye"></i> View Live Marketplace
            </button>
          </div>
        ` : `
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order ID & Date</th>
                  <th>Customer & Address</th>
                  <th>Purchased Items</th>
                  <th>Order Total</th>
                  <th>Fulfillment Status</th>
                </tr>
              </thead>
              <tbody>
                ${myOrders.map(order => `
                  <tr>
                    <td>
                      <div style="font-weight: 700; color: var(--primary);">#${order.id}</div>
                      <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${new Date(order.date).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <div style="font-weight: 600; color: var(--text-primary);">${order.name || 'Pet Parent'}</div>
                      <div style="font-size: 12px; color: var(--text-secondary); max-width: 240px; margin-top: 2px;">
                        ${order.address || 'HSR Layout Sector 2'}, ${order.city || 'Bangalore'}
                      </div>
                      <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;"><i class="fas fa-phone"></i> ${order.phone || '9876543210'}</div>
                    </td>
                    <td>
                      <div style="display: flex; flex-direction: column; gap: 4px;">
                        ${(order.items || []).map(i => `
                          <div style="font-size: 12px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                            <span>•</span> <span>${i.name}</span> <span style="color: var(--text-muted); font-weight: 600;">x${i.quantity}</span>
                          </div>
                        `).join('')}
                      </div>
                    </td>
                    <td style="font-weight: 700; color: var(--primary); font-size: 15px;">
                      ₹${Math.round(order.total * 0.9).toLocaleString()}
                    </td>
                    <td>
                      <select class="form-input btn-sm" style="padding: 6px 10px; font-weight: 700; width: auto;" onchange="window.vendorChangeOrderStatus('${order.id}', this.value)">
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>⏳ Processing</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
                      </select>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      ` : ''}

      <!-- TAB 3: Store Settings -->
      ${currentTab === 'settings' ? `
        <div style="max-width: 700px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: var(--space-2xl);">
          <h3 style="font-family: var(--font-heading); font-size: 20px; margin-bottom: var(--space-lg);"><i class="fas fa-store"></i> Store & Payout Configuration</h3>
          <form id="vendor-settings-form">
            <div class="form-group">
              <label class="form-label">Vendor ID (Use to Login)</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" class="form-input" value="${vendorCode}" readonly style="background: var(--bg-secondary); font-family: monospace; font-weight: 700; color: #2DD4BF;">
                <button type="button" class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('${vendorCode}'); showToast('Vendor ID copied to clipboard! 📋', 'success');">Copy</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Store / Brand Name</label>
              <input type="text" class="form-input" id="v-set-name" value="${storeName}" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Business Category</label>
                <input type="text" class="form-input" id="v-set-cat" value="${user.businessType || 'Wearables & Pet Fashion'}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Operating City</label>
                <select class="form-input" id="v-set-city">
                  ${db.getCities().map(c => `<option value="${c}" ${c === user.city ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">UPI ID for Automated Weekly Payouts</label>
              <input type="text" class="form-input" id="v-set-upi" value="${user.payoutUpi || ''}" placeholder="e.g. storename@okaxis" required>
            </div>
            <div class="form-group">
              <label class="form-label">Store Bio / Description</label>
              <textarea class="form-input" id="v-set-desc" rows="3" placeholder="Tell pet parents about your specialty, fabrics, craftsmanship, or organic recipes...">${user.storeDescription || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-secondary" style="padding: 12px 24px; font-weight: 700;">
              <i class="fas fa-save"></i> Save Store Settings
            </button>
          </form>
        </div>
      ` : ''}
    </div>
  `;
}

export function initVendorEvents() {
  window.vendorAdjustStock = function(productId, delta) {
    const products = db.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      const current = prod.stockCount || 10;
      const next = Math.max(0, current + delta);
      db.updateVendorProduct(productId, { stockCount: next, inStock: next > 0 });
      showToast(`Stock updated to ${next} units! 📦`, 'success');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.vendorToggleStock = function(productId) {
    const products = db.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      const next = !prod.inStock;
      db.updateVendorProduct(productId, { inStock: next });
      showToast(`Product is now ${next ? 'In Stock' : 'Out of Stock'}!`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.vendorDeleteProductAction = function(productId, name) {
    if (confirm(`Are you sure you want to delete listing "${name}"?`)) {
      db.deleteVendorProduct(productId);
      showToast(`Listing "${name}" removed.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.vendorChangeOrderStatus = function(orderId, newStatus) {
    db.updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} marked as ${newStatus}! 🚚`, 'success');
  };

  window.vendorOpenAddProduct = function() {
    const user = db.getCurrentUser();
    showModal('Add New Listing to Store', `
      <form id="vendor-add-prod-form">
        <div class="form-group">
          <label class="form-label">Product Title</label>
          <input type="text" class="form-input" id="vp-name" placeholder="e.g. Silk Brocade Festive Sherwani for Dogs" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-input" id="vp-cat" required>
              <option value="Clothing">Clothing & Wearables</option>
              <option value="Food">Food & Nutrition</option>
              <option value="Medicine">Pharmacy & First Aid</option>
              <option value="Accessories">Toys & Accessories</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Subcategory</label>
            <select class="form-input" id="vp-sub" required>
              <option value="Festive & Ethnic">Festive & Ethnic Wear</option>
              <option value="Raincoats & Jackets">Raincoats & Waterproof Jackets</option>
              <option value="Scarfs & Bandanas">Scarfs & Printed Bandanas</option>
              <option value="Harnesses & Leashes">Designer Harnesses & Leashes</option>
              <option value="Fresh & Home-Cooked">Fresh Chef & Home-Cooked Meals</option>
              <option value="Treats & Jerky">Natural Treats & Jerky</option>
              <option value="Beds & Furniture">Comfort Beds & Cushions</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (₹)</label>
            <input type="number" class="form-input" id="vp-price" placeholder="799" required min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Initial Stock Units</label>
            <input type="number" class="form-input" id="vp-stock" value="20" required min="1">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Image URL</label>
          <input type="url" class="form-input" id="vp-image" value="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop" required>
        </div>
        <div class="form-group">
          <label class="form-label">Product Description</label>
          <textarea class="form-input" id="vp-desc" rows="2" placeholder="Hand-stitched breathable festive wear with soft cotton lining..."></textarea>
        </div>
        <button type="submit" class="btn btn-secondary" style="width: 100%; padding: 14px; font-weight: 700;">
          <i class="fas fa-plus"></i> Publish Listing
        </button>
      </form>
    `);

    document.getElementById('vendor-add-prod-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newProd = {
        name: document.getElementById('vp-name').value,
        category: document.getElementById('vp-cat').value,
        subcategory: document.getElementById('vp-sub').value,
        price: Number(document.getElementById('vp-price').value),
        stockCount: Number(document.getElementById('vp-stock').value),
        inStock: true,
        image: document.getElementById('vp-image').value,
        description: document.getElementById('vp-desc').value,
        seller: user?.storeName || user?.name || 'My Store',
        sellerType: 'small',
        vendorId: user?.id,
        vendorCode: user?.vendorId || user?.id,
        rating: 5.0,
        reviews: 0
      };

      db.addVendorProduct(newProd);
      document.getElementById('active-modal')?.remove();
      showToast(`Listing "${newProd.name}" published successfully! 🚀`, 'success');
      window.dispatchEvent(new Event('hashchange'));
    });
  };

  window.vendorEditProductModal = function(productId) {
    const prod = db.getProducts().find(p => p.id === productId);
    if (!prod) return;

    showModal(`Edit Listing: ${prod.name}`, `
      <form id="vendor-edit-prod-form">
        <div class="form-group">
          <label class="form-label">Product Name</label>
          <input type="text" class="form-input" id="vep-name" value="${prod.name}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Price (₹)</label>
            <input type="number" class="form-input" id="vep-price" value="${prod.price}" required min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Stock Units</label>
            <input type="number" class="form-input" id="vep-stock" value="${prod.stockCount || 10}" required min="0">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Subcategory</label>
          <input type="text" class="form-input" id="vep-sub" value="${prod.subcategory || 'Festive & Ethnic'}" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
          <i class="fas fa-save"></i> Save Changes
        </button>
      </form>
    `);

    document.getElementById('vendor-edit-prod-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      db.updateVendorProduct(productId, {
        name: document.getElementById('vep-name').value,
        price: Number(document.getElementById('vep-price').value),
        stockCount: Number(document.getElementById('vep-stock').value),
        subcategory: document.getElementById('vep-sub').value,
        inStock: Number(document.getElementById('vep-stock').value) > 0
      });
      document.getElementById('active-modal')?.remove();
      showToast('Product updated successfully! ⭐', 'success');
      window.dispatchEvent(new Event('hashchange'));
    });
  };

  // Vendor settings save
  document.getElementById('vendor-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const updates = {
      storeName: document.getElementById('v-set-name').value,
      businessType: document.getElementById('v-set-cat').value,
      city: document.getElementById('v-set-city').value,
      payoutUpi: document.getElementById('v-set-upi').value,
      storeDescription: document.getElementById('v-set-desc').value,
    };
    db.updateCurrentUser(updates);
    showToast('Store settings and UPI payout details updated! 💾', 'success');
    window.dispatchEvent(new Event('hashchange'));
  });
}

// ==========================================
// ADMIN DASHBOARD & FULL PLATFORM CONTROL
// ==========================================

export function renderAdminDashboard(params = {}) {
  const currentUser = db.getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('Administrator privileges required.', 'error');
    navigate('/login');
    return '';
  }

  const currentTab = params.tab || 'users';
  const allUsers = db.adminGetAllUsers();
  const allProducts = db.getProducts();
  const allOrders = db.getOrders();
  const allDoctors = db.getDoctors();
  const allBookings = db.getBookings();
  const allStrays = db.getStrayReports();

  const platformRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const vendorCount = allUsers.filter(u => u.role === 'vendor').length;

  return `
    <div class="page-header" style="background: linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(245, 158, 11, 0.1));">
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1280px; margin: 0 auto; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <span class="card-badge badge-urgent" style="background: #F43F5E; color: white; font-weight: 800;">
              <i class="fas fa-shield-halved"></i> MASTER ADMIN PANEL
            </span>
            <span style="font-size: 13px; color: var(--text-muted);">Full Database & User Control</span>
          </div>
          <h1 style="margin: 0; font-size: 32px;">PawCare Operations Control</h1>
          <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">
            Manage all user profiles, inject perks/credits, oversee vendor listings & stock, override orders, and track strays.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-primary" onclick="window.adminOpenAddUserModal()">
            <i class="fas fa-user-plus"></i> Add User / Vendor
          </button>
          <button class="btn btn-secondary" onclick="window.adminOpenAddProductModal()">
            <i class="fas fa-plus"></i> Add Product
          </button>
        </div>
      </div>
    </div>

    <div style="max-width: 1280px; margin: 0 auto; padding: 0 var(--space-xl) var(--space-3xl);">
      <!-- Platform Macro Metrics -->
      <div class="portal-stats-grid" style="margin-bottom: var(--space-xl);">
        <div class="portal-stat-card">
          <div class="portal-stat-icon gold"><i class="fas fa-indian-rupee-sign"></i></div>
          <div>
            <div class="portal-stat-val">₹${Math.round(platformRevenue * 0.9).toLocaleString()}</div>
            <div class="portal-stat-lbl">Platform Gross Volume</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon rose"><i class="fas fa-users"></i></div>
          <div>
            <div class="portal-stat-val">${allUsers.length}</div>
            <div class="portal-stat-lbl">Registered Accounts</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon teal"><i class="fas fa-store"></i></div>
          <div>
            <div class="portal-stat-val">${vendorCount}</div>
            <div class="portal-stat-lbl">Verified Vendors</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon blue"><i class="fas fa-boxes-stacked"></i></div>
          <div>
            <div class="portal-stat-val">${allProducts.length}</div>
            <div class="portal-stat-lbl">Marketplace Items</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon gold"><i class="fas fa-receipt"></i></div>
          <div>
            <div class="portal-stat-val">${allOrders.length}</div>
            <div class="portal-stat-lbl">Orders Fulfilled</div>
          </div>
        </div>
        <div class="portal-stat-card">
          <div class="portal-stat-icon rose"><i class="fas fa-paw"></i></div>
          <div>
            <div class="portal-stat-val">${allStrays.length}</div>
            <div class="portal-stat-lbl">Stray Animal Cases</div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="portal-tabs">
        <button class="portal-tab-btn ${currentTab === 'users' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=users'">
          <i class="fas fa-users-gear"></i> User Profiles & Roles (${allUsers.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'products' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=products'">
          <i class="fas fa-boxes-stacked"></i> Global Catalog & Stock (${allProducts.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'vets' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=vets'">
          <i class="fas fa-user-doctor"></i> Vets & Clinics (${allDoctors.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'orders' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=orders'">
          <i class="fas fa-truck-ramp-box"></i> Orders Override (${allOrders.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'bookings' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=bookings'">
          <i class="fas fa-calendar-check"></i> Bookings (${allBookings.length})
        </button>
        <button class="portal-tab-btn ${currentTab === 'strays' ? 'active' : ''}" onclick="window.location.hash='/admin?tab=strays'">
          <i class="fas fa-shield-dog"></i> Stray Reports (${allStrays.length})
        </button>
      </div>

      <!-- TAB 1: User Profiles Control -->
      ${currentTab === 'users' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>User / Store</th>
                <th>Contact Details</th>
                <th>Role & Permissions</th>
                <th>City</th>
                <th>Injected Perks / Items</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allUsers.map(u => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div class="nav-user-avatar role-${u.role || 'user'}" style="width: 36px; height: 36px; font-size: 16px;">
                        ${u.avatar?.startsWith('http') ? `<img src="${u.avatar}" class="avatar-img-circle">` : (u.avatar || '🐾')}
                      </div>
                      <div>
                        <div style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${u.name}</div>
                        ${u.storeName ? `<div style="font-size: 11px; color: var(--secondary); font-weight: 600;"><i class="fas fa-store"></i> ${u.storeName}</div>` : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="font-size: 13px; color: var(--text-secondary);">${u.email}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${u.phone || 'No phone'}</div>
                  </td>
                  <td>
                    <select class="form-input btn-sm" style="padding: 4px 8px; font-weight: 700; width: auto;" onchange="window.adminChangeUserRole('${u.id}', this.value)">
                      <option value="user" ${u.role === 'user' ? 'selected' : ''}>Pet Parent (User)</option>
                      <option value="vendor" ${u.role === 'vendor' ? 'selected' : ''}>Vendor Partner</option>
                      <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Super Administrator</option>
                    </select>
                  </td>
                  <td>${u.city || 'Bangalore'}</td>
                  <td>
                    ${(u.customItems && u.customItems.length > 0) ? `
                      <span class="table-badge active">${u.customItems.length} custom item(s)</span>
                    ` : `<span style="font-size: 12px; color: var(--text-muted);">Standard Profile</span>`}
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="btn-table-action" onclick="window.adminInjectItemModal('${u.id}', '${u.name}')" title="Inject custom item or credit to user profile">
                        <i class="fas fa-gift" style="color: var(--primary);"></i> Add Item
                      </button>
                      <button class="btn-table-action" onclick="window.adminEditUserModal('${u.id}')" title="Edit Profile Details">
                        <i class="fas fa-edit"></i>
                      </button>
                      ${u.id !== currentUser.id ? `
                        <button class="btn-table-action danger" onclick="window.adminDeleteUserAction('${u.id}', '${u.name}')" title="Delete User">
                          <i class="fas fa-trash"></i>
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- TAB 2: Global Catalog & Stock Control -->
      ${currentTab === 'products' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category / Subcategory</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Stock Units</th>
                <th>In Stock Toggle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allProducts.map(p => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${p.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;">
                      <div style="font-weight: 700; color: var(--text-primary); font-size: 13px; max-width: 220px;">${p.name}</div>
                    </div>
                  </td>
                  <td>
                    <span class="table-badge ${p.category}">${p.category}</span>
                    <div style="font-size: 11px; color: var(--secondary); margin-top: 2px;">${p.subcategory || 'General'}</div>
                  </td>
                  <td>
                    <div style="font-size: 13px; font-weight: 600;">${p.seller}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${p.sellerType === 'small' ? '🏠 Indie' : '🏢 Brand'}</div>
                  </td>
                  <td style="font-weight: 700; color: var(--primary);">₹${p.price.toLocaleString()}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <button class="qty-btn" onclick="window.adminAdjustStock('${p.id}', -1)">−</button>
                      <span style="font-weight: 700; min-width: 20px; text-align: center;">${p.stockCount || 10}</span>
                      <button class="qty-btn" onclick="window.adminAdjustStock('${p.id}', 1)">+</button>
                    </div>
                  </td>
                  <td>
                    <button class="stock-badge-live ${p.inStock ? 'in-stock' : 'out-stock'}" style="cursor: pointer; border: none;" onclick="window.adminToggleStock('${p.id}')">
                      ${p.inStock ? '🟢 In Stock' : '🔴 Out'}
                    </button>
                  </td>
                  <td>
                    <div class="table-actions">
                      <button class="btn-table-action" onclick="window.vendorEditProductModal('${p.id}')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn-table-action danger" onclick="window.adminDeleteProductAction('${p.id}', '${p.name}')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- TAB 3: Doctors & Clinics -->
      ${currentTab === 'vets' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Hospital & City</th>
                <th>Fee</th>
                <th>24x7 Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allDoctors.map(doc => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${doc.image}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                      <div style="font-weight: 700;">${doc.name}</div>
                    </div>
                  </td>
                  <td>${doc.specialty}</td>
                  <td>${doc.hospital}, ${doc.city}</td>
                  <td style="font-weight: 700; color: var(--primary);">₹${doc.fee}</td>
                  <td>
                    <span class="table-badge ${doc.available24x7 ? 'active' : 'Cancelled'}">
                      ${doc.available24x7 ? '24/7 Yes' : 'Scheduled'}
                    </span>
                  </td>
                  <td>
                    <button class="btn-table-action danger" onclick="window.adminDeleteDoctorAction('${doc.id}', '${doc.name}')">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- TAB 4: Orders Override -->
      ${currentTab === 'orders' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Info</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status Override</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allOrders.map(order => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--primary);">#${order.id}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${new Date(order.date).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div style="font-weight: 600;">${order.name || 'Customer'}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${order.address || 'Address'}, ${order.city || 'Bangalore'}</div>
                  </td>
                  <td>
                    <div style="font-size: 12px;">
                      ${(order.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </div>
                  </td>
                  <td style="font-weight: 700; color: var(--primary);">₹${Math.round(order.total * 0.9).toLocaleString()}</td>
                  <td>
                    <select class="form-input btn-sm" style="padding: 4px 8px; font-weight: 700; width: auto;" onchange="window.adminChangeOrderStatus('${order.id}', this.value)">
                      <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>⏳ Processing</option>
                      <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
                      <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
                      <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button class="btn-table-action danger" onclick="window.adminDeleteOrderAction('${order.id}')">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- TAB 5: Bookings -->
      ${currentTab === 'bookings' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Service / Doctor</th>
                <th>Pet Name</th>
                <th>Date & Time</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allBookings.map(b => `
                <tr>
                  <td>#${b.id}</td>
                  <td style="font-weight: 700;">${b.doctorName || b.type}</td>
                  <td>${b.petName}</td>
                  <td>${b.date?.split('T')[0]} ${b.time ? '· ' + b.time : ''}</td>
                  <td style="color: var(--primary); font-weight: 700;">₹${b.fee || 500}</td>
                  <td><span class="table-badge active">${b.status}</span></td>
                  <td>
                    <button class="btn-table-action danger" onclick="window.adminDeleteBookingAction('${b.id}')">
                      <i class="fas fa-trash"></i> Cancel
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- TAB 6: Stray Animal Reports -->
      ${currentTab === 'strays' ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Animal & Image</th>
                <th>Location & Area</th>
                <th>Reported By</th>
                <th>Urgency</th>
                <th>Status Update</th>
              </tr>
            </thead>
            <tbody>
              ${allStrays.map(s => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${s.image}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px;">
                      <div>
                        <div style="font-weight: 700;">${s.animalType}</div>
                        <div style="font-size: 11px; color: var(--text-muted); max-width: 200px;">${s.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>${s.location}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${s.area}</div>
                  </td>
                  <td>${s.reportedBy}</td>
                  <td>
                    <span class="table-badge ${s.urgency === 'critical' ? 'Cancelled' : 'Processing'}">
                      ${s.urgency.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <select class="form-input btn-sm" style="padding: 4px 8px; font-weight: 700; width: auto;" onchange="window.adminUpdateStrayStatusAction('${s.id}', this.value)">
                      <option value="reported" ${s.status === 'reported' ? 'selected' : ''}>📋 Reported</option>
                      <option value="in_progress" ${s.status === 'in_progress' ? 'selected' : ''}>🔄 Rescue In Progress</option>
                      <option value="rescued" ${s.status === 'rescued' ? 'selected' : ''}>✅ Rescued & Sheltered</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

export function initAdminEvents() {
  window.adminChangeUserRole = function(userId, newRole) {
    db.adminUpdateUserRole(userId, newRole);
    showToast(`User role updated to ${newRole.toUpperCase()}! 🛡️`, 'success');
  };

  window.adminDeleteUserAction = function(userId, name) {
    if (confirm(`Are you sure you want to delete user account "${name}"? This action is permanent.`)) {
      db.adminDeleteUser(userId);
      showToast(`User account "${name}" deleted.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminDeleteProductAction = function(productId, name) {
    if (confirm(`Delete product "${name}" from platform catalog?`)) {
      db.adminDeleteProduct(productId);
      showToast(`Product "${name}" deleted.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminAdjustStock = function(productId, delta) {
    const products = db.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      const current = prod.stockCount || 10;
      const next = Math.max(0, current + delta);
      db.adminUpdateProduct(productId, { stockCount: next, inStock: next > 0 });
      showToast(`Stock updated to ${next} units!`, 'success');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminToggleStock = function(productId) {
    const products = db.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      const next = !prod.inStock;
      db.adminUpdateProduct(productId, { inStock: next });
      showToast(`Product is now ${next ? 'In Stock' : 'Out of Stock'}!`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminDeleteDoctorAction = function(docId, name) {
    if (confirm(`Remove vet doctor "${name}"?`)) {
      db.adminDeleteDoctor(docId);
      showToast(`Doctor removed.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminChangeOrderStatus = function(orderId, status) {
    db.updateOrderStatus(orderId, status);
    showToast(`Order #${orderId} status set to ${status}! 📦`, 'success');
  };

  window.adminDeleteOrderAction = function(orderId) {
    if (confirm(`Delete order record #${orderId}?`)) {
      db.adminDeleteOrder(orderId);
      showToast(`Order deleted.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminDeleteBookingAction = function(bookingId) {
    if (confirm(`Cancel and delete booking #${bookingId}?`)) {
      db.adminDeleteBooking(bookingId);
      showToast(`Booking cancelled.`, 'info');
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  window.adminUpdateStrayStatusAction = function(strayId, status) {
    db.adminUpdateStrayStatus(strayId, status);
    showToast(`Stray case status set to ${status}! 🐾`, 'success');
  };

  // Inject Item / Credit Modal for User
  window.adminInjectItemModal = function(userId, userName) {
    showModal(`Add Custom Item / Benefit to ${userName}`, `
      <form id="admin-inject-item-form">
        <div class="form-group">
          <label class="form-label">Item / Perk Type</label>
          <select class="form-input" id="inj-type">
            <option value="Platform Credit">Wallet / Platform Credit (₹)</option>
            <option value="Free Vaccination Voucher">Free Vaccination Voucher</option>
            <option value="VIP Daycare Pass">VIP Pet Daycare Pass</option>
            <option value="Custom Gift Package">Festive Gift Package</option>
            <option value="Complimentary Consultation">Complimentary Vet Consult</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description / Code</label>
          <input type="text" class="form-input" id="inj-desc" placeholder="e.g. ₹500 Diwali festive gift credit" required>
        </div>
        <div class="form-group">
          <label class="form-label">Benefit Value</label>
          <input type="text" class="form-input" id="inj-val" placeholder="e.g. 500" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
          <i class="fas fa-gift"></i> Inject into Profile
        </button>
      </form>
    `);

    document.getElementById('admin-inject-item-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      db.adminAddUserItem(userId, {
        type: document.getElementById('inj-type').value,
        description: document.getElementById('inj-desc').value,
        value: document.getElementById('inj-val').value,
      });
      document.getElementById('active-modal')?.remove();
      showToast(`Benefit successfully added to ${userName}'s profile! 🎁`, 'success');
      window.dispatchEvent(new Event('hashchange'));
    });
  };

  // Edit User Profile Modal
  window.adminEditUserModal = function(userId) {
    const user = db.adminGetAllUsers().find(u => u.id === userId);
    if (!user) return;

    showModal(`Edit Profile: ${user.name}`, `
      <form id="admin-edit-user-form">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="aeu-name" value="${user.name}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="aeu-email" value="${user.email}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" id="aeu-phone" value="${user.phone || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role</label>
            <select class="form-input" id="aeu-role">
              <option value="user" ${user.role === 'user' ? 'selected' : ''}>Pet Parent</option>
              <option value="vendor" ${user.role === 'vendor' ? 'selected' : ''}>Vendor Partner</option>
              <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrator</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <select class="form-input" id="aeu-city">
              ${db.getCities().map(c => `<option value="${c}" ${c === user.city ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Store Name (For Vendors)</label>
          <input type="text" class="form-input" id="aeu-store" value="${user.storeName || ''}">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
          <i class="fas fa-save"></i> Save Profile
        </button>
      </form>
    `);

    document.getElementById('admin-edit-user-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      db.adminUpdateUser(userId, {
        name: document.getElementById('aeu-name').value,
        email: document.getElementById('aeu-email').value,
        phone: document.getElementById('aeu-phone').value,
        role: document.getElementById('aeu-role').value,
        city: document.getElementById('aeu-city').value,
        storeName: document.getElementById('aeu-store').value
      });
      document.getElementById('active-modal')?.remove();
      showToast(`User profile "${user.name}" updated! 🛡️`, 'success');
      window.dispatchEvent(new Event('hashchange'));
    });
  };

  // Add Product Modal for Admin
  window.adminOpenAddProductModal = function() {
    window.vendorOpenAddProduct();
  };

  // Add User Modal for Admin
  window.adminOpenAddUserModal = function() {
    showModal('Create User / Vendor Account', `
      <form id="admin-add-user-form">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="aau-name" placeholder="Name" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="aau-email" placeholder="email@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" id="aau-phone" placeholder="9876543210" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role</label>
            <select class="form-input" id="aau-role">
              <option value="user">Pet Parent (User)</option>
              <option value="vendor">Vendor Partner</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <select class="form-input" id="aau-city">
              ${db.getCities().map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="aau-password" value="password123" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
          <i class="fas fa-plus"></i> Create Account
        </button>
      </form>
    `);

    document.getElementById('admin-add-user-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const res = db.signup({
        name: document.getElementById('aau-name').value,
        email: document.getElementById('aau-email').value,
        phone: document.getElementById('aau-phone').value,
        role: document.getElementById('aau-role').value,
        city: document.getElementById('aau-city').value,
        password: document.getElementById('aau-password').value
      });

      if (res.success) {
        document.getElementById('active-modal')?.remove();
        showToast(`Account "${res.user.name}" created! 🎉`, 'success');
        window.dispatchEvent(new Event('hashchange'));
      } else {
        showToast(res.error, 'error');
      }
    });
  };
}

