# 🐾 PawCare - Complete All-in-One Pet Care Platform

A full-featured modern pet care web application built from real-world brainstorming notes and user scribbles. Featuring an end-to-end localStorage database, instant reactive routing, glassmorphic UI design, and comprehensive features for every pet parent.

---

## 🌟 Key Features Implemented (From Notepad Scribbles)

1. **🩺 Vet Care & Directory (`#/vets`)**
   - Verified veterinarian listings with doctor photo, specialty, experience, rating, consultation fees.
   - Filter by **24/7 availability**, **Video consultation**, and **Specialty**.
   - Interactive appointment booking modal with pet name, date, time slot, and reason.
   - Hospital & emergency clinics directory with 24/7 emergency tags and amenities.

2. **🛍️ Pet Accessories & Essentials Shop (`#/shop`)**
   - Filter by categories: **Accessories**, **Pet Food**, **Medicine**, **Toys**, **Beds**, **Clothing**.
   - Filter between **Homemade / Small Businesses** and **Big Brands**.
   - Live search by product title.
   - Instant "Add to Cart" with quantity management and badge counters.

3. **❤️ Pet Adoption & Rehoming (`#/adoption`)**
   - Adoptable pets (Dogs, Cats, Rabbits, Birds) with breed, age, size, gender, vaccination, and neutered status.
   - Tagged as **Free Adoption** or rehoming fee.
   - Direct shelter or owner contact phone and details.
   - "List a Pet for Adoption" modal with instant database persistence.

4. **🏡 Pet Boarding & Day Care (`#/boarding`)**
   - Day care facilities, luxury pet resorts, and homely stays run by individual caretakers (college students, IT professionals).
   - Filter by **Resort / Facility** vs **Home Stay / Pet Sitter**.
   - Book boarding with check-in, check-out dates, and special pet needs.

5. **🔍 Lost & Found Animals (`#/lost-found`)**
   - Community board for lost and found pets with photos, last seen location, date, description, and reward.
   - "Report Lost or Found Pet" form with automatic badge status.

6. **🚨 Stray Animal Reports (`#/stray-reports`)**
   - Community-powered reporting for injured or stray animals.
   - Status tracking (`Reported`, `In Progress`, `Rescued`) to coordinate shelter response.

7. **📍 Pet-Friendly Places & Events (`#/places`)**
   - Dog-friendly restaurants, cafés, resorts, weekend trails, and annual pet festivals across India (Bangalore, Mumbai, Delhi, Coorg, Ooty, etc.).
   - Filter by **Café / Restaurant**, **Resort**, or **Festival / Event**.

8. **🥗 Fresh Food Suppliers (`#/food-suppliers`)**
   - Directory of home-cooked meal providers and organic raw food delivery services with weekly subscription options.

9. **🕊️ Dignified Pet Cremation & Memorials (`#/cremation`)**
   - Respectful farewell services, private cremation, urn keepsakes, and memorial options with direct helpline numbers.

10. **📋 Pet Health & Vaccination Tracker (`#/health`)**
    - Complete medical dashboard: vaccine history with next due date alerts (`Completed`, `Upcoming`).
    - Past vet visits with diagnoses, prescriptions, weight, temperature, and doctor notes.
    - "Add Vaccination Record" and "Log Vet Visit" forms.

11. **🛒 Cart & Multi-Step Checkout (`#/cart`, `#/checkout`)**
    - Cart summary with item increment/decrement and removal.
    - 10% instant checkout discount.
    - Delivery address form + multiple payment options (UPI / QR, Credit/Debit Card, Net Banking, Cash on Delivery).
    - Order confirmation screen and order history page (`#/orders`).

12. **🔐 User Authentication & Profiles (`#/login`, `#/signup`)**
    - Sign in, registration, and logout with automatic session persistence.
    - Demo credentials provided:
      - **Email:** `sandeep@example.com`
      - **Password:** `password123`
    - User dropdown with quick access to **My Pet Health**, **My Bookings**, and **My Orders**.

13. **🏙️ Multi-City Location Selector**
    - Instant city switcher in the header to filter services for Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, etc.

---

## 🚀 Running Locally

1. Install dependencies (already installed):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. Build production bundle:
   ```bash
   npm run build
   ```
   Output is generated in the `dist/` folder.

---

## 🌐 How to Host for Free & Share Link

The project has been configured with relative asset paths (`base: './'`) in `vite.config.js`, meaning the `dist/` folder can be hosted for free on any platform without breaking routes or images.

### Option 1: Netlify Drop (Easiest - Drag & Drop, No Code Needed!)
1. Run `npm run build` to generate the latest `dist/` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the `c:\Users\Sandeep\Documents\pet_website\dist` folder onto the page.
4. Netlify will instantly provide a live URL (e.g. `https://pawcare-demo.netlify.app`) that you can share with anyone for free!

### Option 2: Vercel CLI (1-Command Instant Deploy)
1. Open PowerShell in `c:\Users\Sandeep\Documents\pet_website` and run:
   ```bash
   npx vercel
   ```
2. Follow the 2-step prompt (hit Enter for default settings).
3. Vercel will give you a live production URL (e.g. `https://pet-website.vercel.app`).

### Option 3: GitHub Pages
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/pawcare-platform.git
   git branch -M main
   git push -u origin main
   ```
2. In GitHub repository settings -> **Pages** -> Source: Select **GitHub Actions** -> Choose Static HTML / Vite.
