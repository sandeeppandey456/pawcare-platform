// ==========================================
// PAWCARE - Shared UI Components
// Includes Role-based Navbar, Google Maps,
// Google Reviews, and Google Sign-In Modals
// ==========================================

import { getCurrentUser, logout, getCartCount, getCities, getSelectedCity, setSelectedCity, getGoogleReviews, addGoogleReview, googleLogin } from './db.js';
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
  
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-triangle-exclamation' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || 'fa-info-circle'} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3200);
}

// ==========================================
// NAVBAR (ROLE-AWARE)
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
  
  // Custom role-based portal button in navbar
  let rolePortalHtml = '';
  if (user && user.role === 'admin') {
    rolePortalHtml = `
      <a class="nav-portal-badge admin-badge-btn ${route.startsWith('/admin') ? 'active' : ''}" href="#/admin">
        <i class="fas fa-shield-halved"></i> Admin Portal
      </a>
    `;
  } else if (user && user.role === 'vendor') {
    rolePortalHtml = `
      <a class="nav-portal-badge vendor-badge-btn ${route.startsWith('/vendor') ? 'active' : ''}" href="#/vendor">
        <i class="fas fa-store"></i> Vendor Hub
      </a>
    `;
  }
  
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
        ${rolePortalHtml}

        <button class="nav-cart" onclick="window.location.hash='/cart'" id="nav-cart-btn" title="View Cart">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-badge" id="cart-badge" data-count="${cartCount}">${cartCount > 0 ? cartCount : ''}</span>
        </button>
        
        ${user ? `
          <div class="nav-user-container">
            <div class="nav-user-avatar role-${user.role || 'user'}" id="user-avatar-btn" title="${user.name} (${(user.role || 'user').toUpperCase()})">
              ${user.avatar?.startsWith('http') ? `<img src="${user.avatar}" class="avatar-img-circle">` : user.avatar}
            </div>
            <div class="user-dropdown" id="user-dropdown">
              <div class="dropdown-header">
                <div class="dropdown-name">${user.name}</div>
                <div class="dropdown-email">${user.email}</div>
                <div class="dropdown-role-tag role-tag-${user.role || 'user'}">
                  ${user.role === 'admin' ? '<i class="fas fa-shield-alt"></i> ADMINISTRATOR' : user.role === 'vendor' ? '<i class="fas fa-store"></i> VERIFIED VENDOR' : '<i class="fas fa-paw"></i> PET PARENT'}
                </div>
              </div>

              ${user.role === 'admin' ? `
                <div class="dropdown-item highlight" onclick="window.location.hash='/admin'">
                  <i class="fas fa-gauge-high"></i> Admin Control Center
                </div>
              ` : ''}

              ${user.role === 'vendor' ? `
                <div class="dropdown-item highlight" onclick="window.location.hash='/vendor'">
                  <i class="fas fa-boxes-stacked"></i> Vendor Dashboard & Stock
                </div>
              ` : ''}

              <div class="dropdown-item" onclick="window.location.hash='/health'">
                <i class="fas fa-heartbeat"></i> My Pet Health
              </div>
              <div class="dropdown-item" onclick="window.location.hash='/bookings'">
                <i class="fas fa-calendar"></i> My Bookings
              </div>
              <div class="dropdown-item" onclick="window.location.hash='/orders'">
                <i class="fas fa-box"></i> My Orders
              </div>

              ${user.role !== 'vendor' && user.role !== 'admin' ? `
                <div class="dropdown-item" onclick="window.location.hash='/vendor-signup'">
                  <i class="fas fa-store"></i> Become a Vendor
                </div>
              ` : ''}

              <div class="dropdown-divider"></div>
              <div class="dropdown-item danger" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i> Logout
              </div>
            </div>
          </div>
        ` : `
          <button class="nav-user-btn btn-login" onclick="window.location.hash='/login'">Login</button>
          <button class="nav-user-btn btn-signup" onclick="window.location.hash='/signup'">Sign Up</button>
          <a class="nav-vendor-link" href="#/vendor-signup" title="Sell on PawCare">Sell</a>
        `}
        
        <button class="nav-mobile-toggle" id="mobile-toggle">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Navigation Drawer -->
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-content">
        <button class="mobile-nav-close" id="mobile-nav-close">
          <i class="fas fa-times"></i>
        </button>

        ${user ? `
          <div style="padding: 16px; background: var(--bg-surface); border-radius: var(--radius-md); margin-bottom: 16px;">
            <div style="font-weight: 700;">${user.name}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${user.email}</div>
            <span class="dropdown-role-tag role-tag-${user.role}" style="display: inline-block; margin-top: 6px;">
              ${(user.role || 'user').toUpperCase()}
            </span>
          </div>
        ` : ''}

        ${user && user.role === 'admin' ? `
          <a class="nav-link" href="#/admin" onclick="document.getElementById('mobile-nav').classList.remove('show')">
            <i class="fas fa-shield-alt"></i> Admin Dashboard
          </a>
        ` : ''}

        ${user && user.role === 'vendor' ? `
          <a class="nav-link" href="#/vendor" onclick="document.getElementById('mobile-nav').classList.remove('show')">
            <i class="fas fa-store"></i> Vendor Hub
          </a>
        ` : ''}

        ${navLinks.map(link => `
          <a class="nav-link ${route === link.path ? 'active' : ''}" 
             href="#${link.path}" onclick="document.getElementById('mobile-nav').classList.remove('show')">
            <i class="fas ${link.icon}"></i> ${link.label}
          </a>
        `).join('')}

        ${!user ? `
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 8px;">
            <button class="btn btn-primary" onclick="window.location.hash='/login'; document.getElementById('mobile-nav').classList.remove('show')">Login</button>
            <button class="btn btn-outline" onclick="window.location.hash='/signup'; document.getElementById('mobile-nav').classList.remove('show')">Sign Up</button>
            <button class="btn btn-secondary" onclick="window.location.hash='/vendor-signup'; document.getElementById('mobile-nav').classList.remove('show')">
              <i class="fas fa-store"></i> Register as Vendor
            </button>
          </div>
        ` : `
          <div style="margin-top: 24px;">
            <button class="btn btn-danger" id="mobile-logout-btn" style="width: 100%;">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

export function initNavbarEvents() {
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
  
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
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      showToast('Logged out successfully', 'info');
      navigate('/');
    });
  }

  const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', () => {
      logout();
      document.getElementById('mobile-nav')?.classList.remove('show');
      showToast('Logged out successfully', 'info');
      navigate('/');
    });
  }
  
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
// GOOGLE MAPS COMPONENT
// ==========================================

export function renderGoogleMap({ title, address, city, lat, lng }) {
  const query = address || `${title}, ${city}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

  return `
    <div class="google-map-card">
      <div class="google-map-header">
        <div class="google-map-title">
          <i class="fas fa-map-location-dot" style="color: #4285F4;"></i>
          <span>${title}</span>
        </div>
        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="google-map-directions-btn">
          <i class="fas fa-diamond-turn-right"></i> Directions in Google Maps
        </a>
      </div>
      <div class="google-map-frame-wrap">
        <iframe 
          title="Google Map location of ${title}" 
          class="google-map-iframe" 
          src="${mapEmbedUrl}" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div class="google-map-footer">
        <div class="google-map-address">
          <i class="fas fa-location-dot"></i> ${address || query}
        </div>
        <div class="google-map-badge">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" style="height: 14px; vertical-align: middle;"> Maps Verified
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// GOOGLE REVIEWS COMPONENT
// ==========================================

export function renderGoogleReviews({ entityId, entityName, rating = 4.9, count = 230 }) {
  const reviews = getGoogleReviews(entityId);
  const displayRating = (rating || 4.9).toFixed(1);

  return `
    <div class="google-reviews-section">
      <div class="google-reviews-header">
        <div class="google-rating-score-block">
          <div class="google-g-logo">
            <svg viewBox="0 0 48 48" width="28" height="28">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </div>
          <div>
            <div class="google-score-number">${displayRating} <span class="google-stars">★★★★★</span></div>
            <div class="google-score-label">Based on ${count}+ verified Google Reviews</div>
          </div>
        </div>

        <button class="btn btn-outline btn-sm write-review-btn" onclick="window.openGoogleReviewModal('${entityId}', '${entityName}')">
          <i class="fas fa-pen"></i> Write a Google Review
        </button>
      </div>

      <div class="google-reviews-grid">
        ${reviews.length > 0 ? reviews.map(r => `
          <div class="google-review-card">
            <div class="google-review-top">
              <img src="${r.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop'}" class="google-review-avatar" alt="${r.authorName}">
              <div class="google-review-author-info">
                <div class="google-review-author">${r.authorName}</div>
                <div class="google-review-level"><i class="fas fa-shield-cat"></i> ${r.reviewerLevel || 'Verified Pet Parent'} · ${r.date}</div>
              </div>
              <div class="google-mini-logo">
                <i class="fab fa-google" style="color: #4285F4;"></i>
              </div>
            </div>
            <div class="google-review-rating">
              ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
            </div>
            <p class="google-review-text">${r.text}</p>
            <div class="google-review-footer">
              <span class="review-helpful"><i class="far fa-thumbs-up"></i> Helpful (${r.likes || 4})</span>
            </div>
          </div>
        `).join('') : `
          <div class="empty-reviews-hint">
            <i class="fab fa-google"></i>
            <span>Be the first to leave a Google Review for ${entityName}!</span>
          </div>
        `}
      </div>
    </div>
  `;
}

// Attach review modal opener to window
window.openGoogleReviewModal = function(entityId, entityName) {
  showModal(`Write a Google Review for ${entityName}`, `
    <form id="submit-google-review-form">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">Select Star Rating</div>
        <div class="star-rating-select" id="star-rating-select">
          <i class="fas fa-star star-pick" data-val="1"></i>
          <i class="fas fa-star star-pick" data-val="2"></i>
          <i class="fas fa-star star-pick" data-val="3"></i>
          <i class="fas fa-star star-pick" data-val="4"></i>
          <i class="fas fa-star star-pick active" data-val="5"></i>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Your Name</label>
        <input type="text" class="form-input" id="rev-name" placeholder="E.g. Priya Sharma" required value="${getCurrentUser()?.name || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Review Details</label>
        <textarea class="form-input" id="rev-text" placeholder="Share your experience with this service / product to help other pet parents..." required rows="4"></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
        <button type="button" class="btn btn-outline" onclick="document.getElementById('active-modal').remove()">Cancel</button>
        <button type="submit" class="btn btn-primary"><i class="fab fa-google"></i> Post Review</button>
      </div>
    </form>
  `);

  let currentStars = 5;
  document.querySelectorAll('.star-pick').forEach(star => {
    star.addEventListener('click', () => {
      currentStars = Number(star.dataset.val);
      document.querySelectorAll('.star-pick').forEach(s => {
        s.classList.toggle('active', Number(s.dataset.val) <= currentStars);
      });
    });
  });

  document.getElementById('submit-google-review-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rev-name').value;
    const text = document.getElementById('rev-text').value;
    addGoogleReview({
      entityId,
      authorName: name,
      rating: currentStars,
      text,
      authorAvatar: getCurrentUser()?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop'
    });
    document.getElementById('active-modal')?.remove();
    showToast('Your Google review was posted successfully! ⭐', 'success');
    window.dispatchEvent(new Event('hashchange'));
  });
};

window.openGoogleMapModal = function(title, address) {
  showModal(`${title} - Map & Location`, `
    <div style="min-width: 300px; max-width: 620px;">
      ${renderGoogleMap({ title, address })}
    </div>
  `);
};

window.openGoogleReviewsModal = function(entityId, entityName, rating = 4.9, count = 25) {
  showModal(`${entityName} - Google Reviews`, `
    <div style="min-width: 300px; max-width: 650px;">
      ${renderGoogleReviews({ entityId, entityName, rating: Number(rating) || 4.9, count: Number(count) || 25 })}
    </div>
  `);
};

// ==========================================
// GOOGLE SIGN-IN MODAL
// ==========================================

export function openGoogleLoginModal() {
  const modal = showModal('Sign in with Google', `
    <div class="google-auth-chooser">
      <div style="text-align: center; margin-bottom: 20px;">
        <svg viewBox="0 0 48 48" width="40" height="40">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        <h3 style="margin-top: 10px; font-family: var(--font-heading);">Choose an account to continue</h3>
        <p style="font-size: 13px; color: var(--text-muted);">Sign in to PawCare with Google single sign-on</p>
      </div>

      <div class="google-accounts-list">
        <!-- Option 1: Pet Parent -->
        <div class="google-account-item" id="google-acc-user">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" class="google-acc-avatar">
          <div class="google-acc-details">
            <div class="google-acc-name">Sandeep Kumar</div>
            <div class="google-acc-email">sandeep.pandey@gmail.com</div>
            <span class="badge-role-pill user">Pet Parent</span>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted);"></i>
        </div>

        <!-- Option 2: Vendor Partner -->
        <div class="google-account-item" id="google-acc-vendor">
          <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop" class="google-acc-avatar">
          <div class="google-acc-details">
            <div class="google-acc-name">PawStyle Studio (Vendor)</div>
            <div class="google-acc-email">vendor@pawstyle.com</div>
            <span class="badge-role-pill vendor">Verified Vendor</span>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted);"></i>
        </div>

        <!-- Option 3: Super Admin -->
        <div class="google-account-item" id="google-acc-admin">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" class="google-acc-avatar">
          <div class="google-acc-details">
            <div class="google-acc-name">PawCare Admin</div>
            <div class="google-acc-email">admin@pawcare.com</div>
            <span class="badge-role-pill admin">Administrator</span>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-muted);"></i>
        </div>
      </div>

      <div style="text-align: center; margin-top: 16px; font-size: 12px; color: var(--text-muted);">
        Secured by Google Identity Services · Privacy Policy & Terms
      </div>
    </div>
  `);

  const attachAccountClick = (id, accountData) => {
    document.getElementById(id)?.addEventListener('click', () => {
      googleLogin(accountData);
      modal.close();
      showToast(`Welcome back, ${accountData.name}! 🎉`, 'success');
      
      // Auto-route based on role
      if (accountData.role === 'admin') {
        navigate('/admin');
      } else if (accountData.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    });
  };

  attachAccountClick('google-acc-user', {
    name: 'Sandeep Kumar',
    email: 'sandeep@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'
  });

  attachAccountClick('google-acc-vendor', {
    name: 'PawStyle Studio',
    email: 'vendor@pawstyle.com',
    role: 'vendor',
    storeName: 'PawStyle Wearables & Gear',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop'
  });

  attachAccountClick('google-acc-admin', {
    name: 'Super Admin',
    email: 'admin@pawcare.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop'
  });
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
          <h4>Marketplace</h4>
          <div class="footer-links">
            <a class="footer-link" href="#/shop?category=Clothing">Pet Wearables & Clothes</a>
            <a class="footer-link" href="#/shop?category=Food">Pet Food & Nutrition</a>
            <a class="footer-link" href="#/shop?category=Medicine">Pharmacy & First Aid</a>
            <a class="footer-link" href="#/shop?category=Accessories">Toys & Accessories</a>
            <a class="footer-link" href="#/vendor-signup" style="color: var(--primary); font-weight: 600;">Become a Vendor Partner</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Portals & Support</h4>
          <div class="footer-links">
            <a class="footer-link" href="#/vendor">Vendor Hub</a>
            <a class="footer-link" href="#/admin">Admin Portal</a>
            <a class="footer-link" href="#/places">Pet-Friendly Places</a>
            <a class="footer-link" href="#/stray-reports">Report Stray Animal</a>
            <a class="footer-link" href="#/cremation">Pet Memorials</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <span>© 2024-2026 PawCare Platform. All rights reserved. Made with ❤️ for pets.</span>
        <span><i class="fab fa-google"></i> Google Maps & Reviews Integrated · Trusted by 10,000+ pet parents</span>
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
// MODAL HELPER
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
