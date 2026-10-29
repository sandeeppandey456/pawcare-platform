// ==========================================
// PAWCARE - Shared UI Components
// ==========================================

import { getCurrentUser, logout, getCartCount, getCities, getSelectedCity, setSelectedCity } from './db.js';
import { navigate, getCurrentRoute } from './router.js';

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

let toastContainer = null;

export function initToast() {
  if (!document.querySelector('.toast-container')) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  } else {
    toastContainer = document.querySelector('.toast-container');
  }
}

export function showToast(message, type = 'success') {
  if (!toastContainer) initToast();
  
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type]} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==========================================
// NAVBAR
// ==========================================

export function renderNavbar() {
  const user = getCurrentUser();
  const cartCount = getCartCount();
  const route = getCurrentRoute();
  
  const navLinks = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/shop', label: 'Shop', icon: 'fa-shopping-bag' },
    { path: '/vets', label: 'Vets', icon: 'fa-user-doctor' },
    { path: '/adoption', label: 'Adopt', icon: 'fa-heart' },
    { path: '/boarding', label: 'Boarding', icon: 'fa-house' },
    { path: '/lost-found', label: 'Lost & Found', icon: 'fa-search' },
    { path: '/places', label: 'Places', icon: 'fa-map-marker-alt' },
    { path: '/health', label: 'Health', icon: 'fa-heartbeat' },
  ];
  
  return `
    <nav class="navbar" id="main-navbar">
      <div class="nav-brand" onclick="window.location.hash='/'">
        <div class="nav-brand-icon">🐾</div>
        <span class="nav-brand-text">PawCare</span>
      </div>
      
      <div class="nav-links" id="nav-links">
        ${navLinks.map(link => `
          <a class="nav-link ${route === link.path || (link.path !== '/' && route.startsWith(link.path)) ? 'active' : ''}" 
             href="#${link.path}">${link.label}</a>
        `).join('')}
      </div>
      
      <div class="nav-actions">
        <button class="nav-cart" onclick="window.location.hash='/cart'" id="nav-cart-btn">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-badge" id="cart-badge" data-count="${cartCount}">${cartCount > 0 ? cartCount : ''}</span>
        </button>
        
        ${user ? `
          <div class="nav-user-avatar" id="user-avatar-btn" title="${user.name}">
            ${user.avatar}
          </div>
          <div class="user-dropdown" id="user-dropdown">
            <div style="padding: 12px 14px; border-bottom: 1px solid var(--border-color); margin-bottom: 4px;">
              <div style="font-weight: 600; font-size: 14px;">${user.name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${user.email}</div>
            </div>
            <div class="dropdown-item" onclick="window.location.hash='/health'">
              <i class="fas fa-heartbeat"></i> My Pet Health
            </div>
            <div class="dropdown-item" onclick="window.location.hash='/bookings'">
              <i class="fas fa-calendar"></i> My Bookings
            </div>
            <div class="dropdown-item" onclick="window.location.hash='/orders'">
              <i class="fas fa-box"></i> My Orders
            </div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger" id="logout-btn">
              <i class="fas fa-sign-out-alt"></i> Logout
            </div>
          </div>
        ` : `
          <button class="nav-user-btn btn-login" onclick="window.location.hash='/login'">Login</button>
          <button class="nav-user-btn btn-signup" onclick="window.location.hash='/signup'">Sign Up</button>
        `}
        
        <button class="nav-mobile-toggle" id="mobile-toggle">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Nav -->
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-content">
        <button class="mobile-nav-close" id="mobile-nav-close">
          <i class="fas fa-times"></i>
        </button>
        ${navLinks.map(link => `
          <a class="nav-link ${route === link.path ? 'active' : ''}" 
             href="#${link.path}" onclick="document.getElementById('mobile-nav').classList.remove('show')">${link.label}</a>
        `).join('')}
        ${!user ? `
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" onclick="window.location.hash='/login'; document.getElementById('mobile-nav').classList.remove('show')">Login</button>
            <button class="btn btn-outline" onclick="window.location.hash='/signup'; document.getElementById('mobile-nav').classList.remove('show')">Sign Up</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function initNavbarEvents() {
  // Scroll effect
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
  
  // User dropdown
  const avatarBtn = document.getElementById('user-avatar-btn');
  const dropdown = document.getElementById('user-dropdown');
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  }
  
  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      showToast('Logged out successfully', 'info');
      navigate('/');
    });
  }
  
  // Mobile toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => mobileNav.classList.add('show'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('show'));
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) mobileNav.classList.remove('show');
    });
  }
}

// ==========================================
// LOCATION BAR
// ==========================================

export function renderLocationBar() {
  const cities = getCities();
  const selected = getSelectedCity();
  
  return `
    <div class="location-bar" id="location-bar">
      <i class="fas fa-map-marker-alt"></i>
      <span>Showing results for</span>
      <select id="city-selector" onchange="window.dispatchEvent(new CustomEvent('cityChange', {detail: this.value}))">
        <option value="All">All Cities</option>
        ${cities.map(city => `<option value="${city}" ${city === selected ? 'selected' : ''}>${city}</option>`).join('')}
      </select>
    </div>
  `;
}

// ==========================================
// FOOTER
// ==========================================

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="nav-brand">
            <div class="nav-brand-icon">🐾</div>
            <span class="nav-brand-text">PawCare</span>
          </div>
          <p>Your complete pet care platform. From vet visits to pet shopping, adoption to boarding — everything your pet needs, in one place.</p>
          <div class="footer-socials">
            <div class="footer-social"><i class="fab fa-facebook-f"></i></div>
            <div class="footer-social"><i class="fab fa-instagram"></i></div>
            <div class="footer-social"><i class="fab fa-twitter"></i></div>
            <div class="footer-social"><i class="fab fa-youtube"></i></div>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Services</h4>
          <div class="footer-links">
            <a class="footer-link" href="#/vets">Find a Vet</a>
            <a class="footer-link" href="#/boarding">Pet Boarding</a>
            <a class="footer-link" href="#/adoption">Adopt a Pet</a>
            <a class="footer-link" href="#/lost-found">Lost & Found</a>
            <a class="footer-link" href="#/health">Health Tracker</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Shop</h4>
          <div class="footer-links">
            <a class="footer-link" href="#/shop?category=Accessories">Accessories</a>
            <a class="footer-link" href="#/shop?category=Food">Pet Food</a>
            <a class="footer-link" href="#/shop?category=Medicine">Medicine</a>
            <a class="footer-link" href="#/places">Pet-Friendly Places</a>
            <a class="footer-link" href="#/food-suppliers">Fresh Food</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Support</h4>
          <div class="footer-links">
            <a class="footer-link" href="#">Help Center</a>
            <a class="footer-link" href="#">Contact Us</a>
            <a class="footer-link" href="#">Privacy Policy</a>
            <a class="footer-link" href="#">Terms of Service</a>
            <a class="footer-link" href="#/stray-reports">Report Stray</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <span>© 2024 PawCare. All rights reserved. Made with ❤️ for pets.</span>
        <span>🐾 Trusted by 10,000+ pet parents</span>
      </div>
    </footer>
  `;
}

// ==========================================
// STAR RATING
// ==========================================

export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<i class="fas fa-star"></i>';
    else if (i === full && half) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star empty"></i>';
  }
  return `<div class="stars">${html}<span class="rating-text">${rating}</span></div>`;
}

// ==========================================
// MODAL
// ==========================================

export function showModal(title, content, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'active-modal';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close" id="modal-close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  const closeModal = () => {
    overlay.remove();
    document.body.style.overflow = '';
    if (onClose) onClose();
  };
  
  overlay.querySelector('#modal-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  
  return { close: closeModal, overlay };
}

// ==========================================
// UPDATE CART BADGE
// ==========================================

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = getCartCount();
  if (badge) {
    badge.textContent = count > 0 ? count : '';
    badge.dataset.count = count;
  }
}
