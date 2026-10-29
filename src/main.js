import './style.css';
import { initDB, setSelectedCity } from './db.js';
import { renderNavbar, renderFooter, initNavbarEvents, initToast, updateCartBadge } from './components.js';
import { registerRoute, startRouter } from './router.js';
import {
  renderHome,
  renderLogin, initLoginEvents,
  renderSignup, initSignupEvents,
  renderShop, initShopEvents,
  renderCart, initCartEvents,
  renderCheckout, initCheckoutEvents,
  renderOrderSuccess,
  renderVets, initVetsEvents,
  renderAdoption, initAdoptionEvents,
  renderLostFound, initLostFoundEvents,
  renderBoarding, initBoardingEvents,
  renderPlaces,
  renderHealth, initHealthEvents,
  renderStrayReports, initStrayEvents,
  renderFoodSuppliers,
  renderCremation,
  renderBookings,
  renderOrders
} from './pages.js';

// Initialize Database & Notifications
initDB();
initToast();

const app = document.getElementById('app');

function renderPage(contentHtml, initEventsFn) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  app.innerHTML = `
    ${renderNavbar()}
    <main id="main-content">
      ${contentHtml}
    </main>
    ${renderFooter()}
  `;
  initNavbarEvents();
  if (typeof initEventsFn === 'function') {
    initEventsFn();
  }
  updateCartBadge();
}

// Register all application routes
registerRoute('/', (params) => {
  renderPage(renderHome(params));
});

registerRoute('/login', (params) => {
  renderPage(renderLogin(params), initLoginEvents);
});

registerRoute('/signup', (params) => {
  renderPage(renderSignup(params), initSignupEvents);
});

registerRoute('/shop', (params) => {
  renderPage(renderShop(params), initShopEvents);
});

registerRoute('/cart', (params) => {
  renderPage(renderCart(params), initCartEvents);
});

registerRoute('/checkout', (params) => {
  renderPage(renderCheckout(params), initCheckoutEvents);
});

registerRoute('/order-success', (params) => {
  renderPage(renderOrderSuccess(params));
});

registerRoute('/vets', (params) => {
  renderPage(renderVets(params), initVetsEvents);
});

registerRoute('/adoption', (params) => {
  renderPage(renderAdoption(params), initAdoptionEvents);
});

registerRoute('/lost-found', (params) => {
  renderPage(renderLostFound(params), initLostFoundEvents);
});

registerRoute('/boarding', (params) => {
  renderPage(renderBoarding(params), initBoardingEvents);
});

registerRoute('/places', (params) => {
  renderPage(renderPlaces(params));
});

registerRoute('/health', (params) => {
  renderPage(renderHealth(params), initHealthEvents);
});

registerRoute('/stray-reports', (params) => {
  renderPage(renderStrayReports(params), initStrayEvents);
});

registerRoute('/food-suppliers', (params) => {
  renderPage(renderFoodSuppliers(params));
});

registerRoute('/cremation', (params) => {
  renderPage(renderCremation(params));
});

registerRoute('/bookings', (params) => {
  renderPage(renderBookings(params));
});

registerRoute('/orders', (params) => {
  renderPage(renderOrders(params));
});

// Re-render when selected city changes
window.addEventListener('cityChange', (e) => {
  setSelectedCity(e.detail);
  window.dispatchEvent(new Event('hashchange'));
});

// Start router
startRouter();
