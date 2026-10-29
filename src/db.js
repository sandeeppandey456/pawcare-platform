// ==========================================
// PAWCARE - LocalStorage Database Layer
// ==========================================

const DB_PREFIX = 'pawcare_';

// Utility to get/set from localStorage
function dbGet(key) {
  try {
    const data = localStorage.getItem(DB_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

function dbSet(key, value) {
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ==========================================
// SEED DATA
// ==========================================

const SEED_USERS = [
  { id: 'user1', name: 'Sandeep Kumar', email: 'sandeep@example.com', password: 'password123', phone: '9876543210', city: 'Bangalore', avatar: 'SK', role: 'user' },
  { id: 'user2', name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', phone: '9876543211', city: 'Mumbai', avatar: 'PS', role: 'user' },
];

const SEED_DOCTORS = [
  { id: 'doc1', name: 'Dr. Anjali Verma', specialty: 'General Veterinary', hospital: 'PetCare Hospital', city: 'Bangalore', rating: 4.8, reviews: 234, experience: '12 years', available24x7: true, videoCall: true, phone: '9988776655', fee: 500, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop', tags: ['Dogs', 'Cats', 'Birds'] },
  { id: 'doc2', name: 'Dr. Rajesh Nair', specialty: 'Orthopedic Surgeon', hospital: 'Animal Life Clinic', city: 'Bangalore', rating: 4.9, reviews: 189, experience: '15 years', available24x7: false, videoCall: true, phone: '9988776656', fee: 800, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop', tags: ['Surgery', 'Orthopedics', 'Dogs'] },
  { id: 'doc3', name: 'Dr. Meena Iyer', specialty: 'Dermatologist', hospital: 'Happy Paws Clinic', city: 'Mumbai', rating: 4.7, reviews: 156, experience: '8 years', available24x7: true, videoCall: false, phone: '9988776657', fee: 600, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop', tags: ['Skin', 'Allergies', 'Cats', 'Dogs'] },
  { id: 'doc4', name: 'Dr. Vikram Singh', specialty: 'Emergency Care', hospital: 'VetEmergency 24/7', city: 'Delhi', rating: 4.9, reviews: 312, experience: '20 years', available24x7: true, videoCall: true, phone: '9988776658', fee: 1000, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop', tags: ['Emergency', 'Critical Care', 'All Animals'] },
  { id: 'doc5', name: 'Dr. Kavitha Reddy', specialty: 'Vaccination Specialist', hospital: 'PawShield Clinic', city: 'Hyderabad', rating: 4.6, reviews: 98, experience: '6 years', available24x7: false, videoCall: true, phone: '9988776659', fee: 400, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop', tags: ['Vaccination', 'Deworming', 'Puppies'] },
  { id: 'doc6', name: 'Dr. Arjun Menon', specialty: 'Dental Care', hospital: 'Pet Smile Dental', city: 'Chennai', rating: 4.8, reviews: 145, experience: '10 years', available24x7: false, videoCall: false, phone: '9988776660', fee: 700, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop', tags: ['Dental', 'Oral Health', 'Dogs', 'Cats'] },
];

const SEED_HOSPITALS = [
  { id: 'hosp1', name: 'PetCare Multi-Specialty Hospital', city: 'Bangalore', area: 'Koramangala', rating: 4.8, reviews: 456, phone: '080-12345678', emergency: true, image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop', features: ['24/7 Emergency', 'Surgery', 'ICU', 'Lab', 'Pharmacy'], priceRange: '₹500 - ₹5000' },
  { id: 'hosp2', name: 'Happy Paws Veterinary Center', city: 'Mumbai', area: 'Bandra', rating: 4.7, reviews: 328, phone: '022-87654321', emergency: true, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', features: ['Emergency', 'Vaccination', 'Dental', 'Grooming'], priceRange: '₹400 - ₹3000' },
  { id: 'hosp3', name: 'Animal Life Care Hospital', city: 'Delhi', area: 'Vasant Kunj', rating: 4.9, reviews: 567, phone: '011-56789012', emergency: true, image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop', features: ['24/7', 'All Animals', 'Advanced Surgery', 'Rehab'], priceRange: '₹600 - ₹8000' },
  { id: 'hosp4', name: 'VetCare Wellness Clinic', city: 'Hyderabad', area: 'Jubilee Hills', rating: 4.6, reviews: 198, phone: '040-34567890', emergency: false, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', features: ['Wellness', 'Vaccination', 'Check-ups', 'Diet Plans'], priceRange: '₹300 - ₹2000' },
];

const SEED_PRODUCTS = [
  // Accessories
  { id: 'prod1', name: 'Premium Leather Dog Collar', category: 'Accessories', subcategory: 'Collars', price: 899, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1599839619722-537739e5e11a?w=400&h=400&fit=crop', rating: 4.5, reviews: 89, seller: 'PawStyle', sellerType: 'small', description: 'Handcrafted genuine leather collar with brass buckle. Comfortable and durable for daily use.', inStock: true, tag: 'Bestseller' },
  { id: 'prod2', name: 'Adjustable Dog Harness Set', category: 'Accessories', subcategory: 'Harnesses', price: 1299, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop', rating: 4.7, reviews: 156, seller: 'PetGear Pro', sellerType: 'big', description: 'No-pull adjustable harness with reflective strips for night walks.', inStock: true, tag: 'New' },
  { id: 'prod3', name: 'Interactive Puzzle Toy', category: 'Accessories', subcategory: 'Toys', price: 599, originalPrice: 799, image: 'https://images.unsplash.com/photo-1535008652995-e95986556e32?w=400&h=400&fit=crop', rating: 4.3, reviews: 67, seller: 'BrainPaw', sellerType: 'small', description: 'Keep your pet mentally stimulated with this treat-dispensing puzzle toy.', inStock: true },
  { id: 'prod4', name: 'Cozy Fleece Pet Bed', category: 'Accessories', subcategory: 'Beds', price: 2499, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop', rating: 4.8, reviews: 234, seller: 'ComfyPet', sellerType: 'big', description: 'Ultra-soft fleece bed with memory foam base. Machine washable cover.', inStock: true, tag: 'Top Rated' },
  { id: 'prod5', name: 'Cat Scratching Post Tower', category: 'Accessories', subcategory: 'Cat Furniture', price: 3999, originalPrice: 5999, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=400&fit=crop', rating: 4.6, reviews: 112, seller: 'CatWorld', sellerType: 'big', description: 'Multi-level cat tree with scratching posts, hammock, and play areas.', inStock: true, tag: 'Sale' },
  { id: 'prod6', name: 'Handmade Pet Bandana Set', category: 'Accessories', subcategory: 'Clothing', price: 399, originalPrice: 599, image: 'https://images.unsplash.com/photo-1583337130417-13104dec14a8?w=400&h=400&fit=crop', rating: 4.4, reviews: 78, seller: 'Craft Paws (Home)', sellerType: 'small', description: 'Set of 4 hand-stitched cotton bandanas. Perfect for photoshoots!', inStock: true },
  // Food
  { id: 'prod7', name: 'Organic Chicken & Rice Dog Food', category: 'Food', subcategory: 'Dry Food', price: 1899, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop', rating: 4.7, reviews: 345, seller: 'NutriPet', sellerType: 'big', description: 'Premium grain-free organic dog food. Rich in protein and nutrients.', inStock: true, tag: 'Organic' },
  { id: 'prod8', name: 'Fresh Home-Cooked Meals (Weekly)', category: 'Food', subcategory: 'Fresh Food', price: 2999, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop', rating: 4.9, reviews: 89, seller: "Meera's Kitchen", sellerType: 'small', description: 'Freshly prepared balanced meals delivered weekly. Customized for your pet.', inStock: true, tag: 'Fresh' },
  { id: 'prod9', name: 'Grain-Free Cat Treats', category: 'Food', subcategory: 'Treats', price: 349, originalPrice: 449, image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=400&fit=crop', rating: 4.5, reviews: 167, seller: 'TreatFactory', sellerType: 'big', description: 'Crunchy, grain-free treats made with real salmon. Cats love them!', inStock: true },
  // Medicine
  { id: 'prod10', name: 'Flea & Tick Prevention Drops', category: 'Medicine', subcategory: 'Flea Control', price: 799, originalPrice: 999, image: 'https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=400&h=400&fit=crop', rating: 4.6, reviews: 234, seller: 'VetPharm', sellerType: 'big', description: 'Monthly spot-on treatment for fleas and ticks. Safe for dogs 8 weeks+.', inStock: true },
  { id: 'prod11', name: 'Joint Support Supplement', category: 'Medicine', subcategory: 'Supplements', price: 1299, originalPrice: 1599, image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=400&h=400&fit=crop', rating: 4.4, reviews: 112, seller: 'PetHealth+', sellerType: 'big', description: 'Glucosamine & chondroitin supplement for joint health. Ideal for senior dogs.', inStock: true },
  { id: 'prod12', name: 'Pet First Aid Kit', category: 'Medicine', subcategory: 'First Aid', price: 1499, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop', rating: 4.8, reviews: 89, seller: 'SafePaws', sellerType: 'small', description: 'Complete first aid kit with bandages, antiseptic, scissors, and guide.', inStock: true, tag: 'Essential' },
  // Grooming
  { id: 'prod13', name: 'Professional Grooming Kit', category: 'Accessories', subcategory: 'Grooming', price: 1799, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=400&fit=crop', rating: 4.5, reviews: 145, seller: 'GroomPro', sellerType: 'big', description: 'Complete grooming set with clippers, brushes, nail trimmer, and scissors.', inStock: true },
  { id: 'prod14', name: 'Natural Oatmeal Dog Shampoo', category: 'Accessories', subcategory: 'Grooming', price: 449, originalPrice: 599, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop', rating: 4.6, reviews: 198, seller: 'NaturePet', sellerType: 'small', description: 'Gentle, soap-free shampoo with oatmeal and aloe vera for sensitive skin.', inStock: true },
];

const SEED_LOST_FOUND = [
  { id: 'lf1', type: 'lost', petType: 'Dog', breed: 'Golden Retriever', name: 'Buddy', description: 'Lost near MG Road, Bangalore. Golden Retriever, male, wearing a red collar with name tag. Very friendly.', location: 'MG Road, Bangalore', date: '2024-10-20', contactName: 'Rahul Mehta', contactPhone: '9876501234', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop', status: 'active', userId: 'user1' },
  { id: 'lf2', type: 'found', petType: 'Cat', breed: 'Persian', name: 'Unknown', description: 'Found a white Persian cat near Indiranagar park. Well-groomed, seems domesticated. Has a blue collar.', location: 'Indiranagar, Bangalore', date: '2024-10-22', contactName: 'Sneha Patil', contactPhone: '9876501235', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop', status: 'active', userId: 'user2' },
  { id: 'lf3', type: 'lost', petType: 'Dog', breed: 'Labrador', name: 'Rocky', description: 'Black Labrador lost near Central Park during morning walk. Has a microchip. Reward offered.', location: 'Central Park, Delhi', date: '2024-10-18', contactName: 'Amit Joshi', contactPhone: '9876501236', image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop', status: 'active' },
  { id: 'lf4', type: 'found', petType: 'Dog', breed: 'Indian Spitz', name: 'Unknown', description: 'Found a white Spitz puppy wandering near bus stand. Looks about 3-4 months old. No collar.', location: 'Majestic, Bangalore', date: '2024-10-24', contactName: 'Deepa Rao', contactPhone: '9876501237', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop', status: 'active' },
];

const SEED_STRAY_REPORTS = [
  { id: 'str1', animalType: 'Dog', description: 'Pack of 5-6 stray dogs near the school area. They seem aggressive during night. Need animal control.', location: 'HSR Layout, Bangalore', area: 'HSR Layout Sector 2', date: '2024-10-22', reportedBy: 'Kiran Kumar', status: 'reported', urgency: 'high', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop' },
  { id: 'str2', animalType: 'Cow', description: 'Injured cow lying on the main road. Seems to have a leg injury. Needs immediate medical attention.', location: 'Jayanagar, Bangalore', area: 'Jayanagar 4th Block', date: '2024-10-23', reportedBy: 'Lakshmi Devi', status: 'in_progress', urgency: 'critical', image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop' },
  { id: 'str3', animalType: 'Cat', description: 'Multiple stray kittens found abandoned in a box near the garbage dump. They need foster care.', location: 'Whitefield, Bangalore', area: 'Whitefield Main Road', date: '2024-10-24', reportedBy: 'Ananya Singh', status: 'reported', urgency: 'medium', image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop' },
];

const SEED_ADOPTION = [
  { id: 'adopt1', name: 'Luna', type: 'Dog', breed: 'Indie (Indian Pariah)', age: '2 years', gender: 'Female', size: 'Medium', vaccinated: true, neutered: true, description: 'Luna is a sweet, playful indie who loves cuddles. She is house-trained, good with kids, and gets along with other dogs.', city: 'Bangalore', contactName: 'ABC Animal Shelter', contactPhone: '9876509876', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', status: 'available', fee: 0, listedBy: 'Shelter' },
  { id: 'adopt2', name: 'Simba', type: 'Dog', breed: 'Golden Retriever', age: '8 months', gender: 'Male', size: 'Large', vaccinated: true, neutered: false, description: 'Energetic Golden Retriever puppy looking for an active family. Great with children, loves water and fetch.', city: 'Mumbai', contactName: 'Ravi Patel', contactPhone: '9876509877', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop', status: 'available', fee: 15000, listedBy: 'Breeder' },
  { id: 'adopt3', name: 'Whiskers', type: 'Cat', breed: 'British Shorthair', age: '1 year', gender: 'Male', size: 'Medium', vaccinated: true, neutered: true, description: 'Calm and affectionate British Shorthair. Indoor cat, loves lounging and gentle play.', city: 'Delhi', contactName: 'Cat Haven Rescue', contactPhone: '9876509878', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop', status: 'available', fee: 0, listedBy: 'Shelter' },
  { id: 'adopt4', name: 'Max', type: 'Dog', breed: 'German Shepherd', age: '3 years', gender: 'Male', size: 'Large', vaccinated: true, neutered: true, description: 'Trained German Shepherd, excellent guard dog. Gentle with family but protective. Needs a house with yard.', city: 'Bangalore', contactName: 'Deepak Shetty', contactPhone: '9876509879', image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop', status: 'available', fee: 5000, listedBy: 'Owner' },
  { id: 'adopt5', name: 'Coco', type: 'Dog', breed: 'Shih Tzu', age: '4 months', gender: 'Female', size: 'Small', vaccinated: true, neutered: false, description: 'Adorable Shih Tzu puppy! Perfect apartment dog. Very playful and loves being carried around.', city: 'Hyderabad', contactName: 'Happy Tails Kennel', contactPhone: '9876509880', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop', status: 'available', fee: 25000, listedBy: 'Breeder' },
  { id: 'adopt6', name: 'Mittens', type: 'Cat', breed: 'Indian Domestic', age: '6 months', gender: 'Female', size: 'Small', vaccinated: true, neutered: false, description: 'Rescued tabby kitten, very curious and playful. Loves climbing and chasing toys. Litter trained.', city: 'Chennai', contactName: 'CARE Shelter', contactPhone: '9876509881', image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop', status: 'available', fee: 0, listedBy: 'Shelter' },
  { id: 'adopt7', name: 'Charlie', type: 'Rabbit', breed: 'Holland Lop', age: '1 year', gender: 'Male', size: 'Small', vaccinated: true, neutered: true, description: 'Friendly and docile Holland Lop rabbit. Perfect for families. Low maintenance pet.', city: 'Bangalore', contactName: 'Bunny World', contactPhone: '9876509882', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', status: 'available', fee: 3000, listedBy: 'Breeder' },
  { id: 'adopt8', name: 'Tweety', type: 'Bird', breed: 'Budgerigar', age: '6 months', gender: 'Female', size: 'Small', vaccinated: false, neutered: false, description: 'Beautiful blue budgie. Hand-tamed and can step up. Comes with cage and accessories.', city: 'Pune', contactName: 'Wings & Things', contactPhone: '9876509883', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop', status: 'available', fee: 1500, listedBy: 'Owner' },
];

const SEED_BOARDING = [
  { id: 'board1', name: 'Paws Paradise Resort', type: 'Premium', city: 'Bangalore', area: 'Electronic City', rating: 4.9, reviews: 234, pricePerDay: 1500, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop', features: ['AC Rooms', 'CCTV', 'Vet on Call', 'Play Area', 'Grooming', 'Pool'], description: 'Luxury pet boarding with spacious AC rooms, personal attendants, and daily activity reports.', ownerType: 'big' },
  { id: 'board2', name: 'Happy Tails Home Stay', type: 'Home Stay', city: 'Bangalore', area: 'BTM Layout', rating: 4.7, reviews: 89, pricePerDay: 600, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop', features: ['Home Environment', 'Personal Care', 'Garden', 'Webcam'], description: 'Homely stay by a professional pet sitter. Your pet gets personal attention and love. Run by a college student who loves animals!', ownerType: 'individual' },
  { id: 'board3', name: 'WoofBnB Premium Boarding', type: 'Premium', city: 'Mumbai', area: 'Andheri', rating: 4.8, reviews: 178, pricePerDay: 2000, image: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=600&h=400&fit=crop', features: ['Suite Rooms', 'Swimming', 'Training', 'Live Updates', 'Organic Food'], description: 'Five-star experience for your furry friend. Individual suites with beds, toys, and constant supervision.', ownerType: 'big' },
  { id: 'board4', name: "Priya's Pet Sitting", type: 'Home Stay', city: 'Delhi', area: 'Saket', rating: 4.6, reviews: 45, pricePerDay: 500, image: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&h=400&fit=crop', features: ['Home Stay', 'Daily Walks', 'Photo Updates', 'Medicines Given'], description: 'IT professional who loves pets! Available for day boarding and overnight stays. Your pet will be treated like family.', ownerType: 'individual' },
];

const SEED_PLACES = [
  { id: 'place1', name: 'The Bark House Café', type: 'Restaurant', city: 'Bangalore', area: 'Koramangala', rating: 4.7, reviews: 312, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop', features: ['Pet Menu', 'Outdoor Seating', 'Water Bowls', 'Pet Photos'], description: 'Dog-friendly café with a special pet menu. Beautiful outdoor seating area where dogs can play.', priceRange: '₹500 - ₹1500' },
  { id: 'place2', name: 'Pawfect Getaway Resort', type: 'Resort', city: 'Coorg', area: 'Madikeri', rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', features: ['Pet Suites', 'Nature Trails', 'Pet Spa', 'No Extra Charge'], description: 'Luxury pet-friendly resort in the hills of Coorg. Pets stay free! Includes nature trails and a dedicated pet spa.', priceRange: '₹5000 - ₹12000/night' },
  { id: 'place3', name: 'Indie Street Food Festival', type: 'Event', city: 'Bangalore', area: 'Palace Grounds', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1464965913620-b943082537f5?w=600&h=400&fit=crop', features: ['Pet Zone', 'Adoption Camp', 'Pet Contest', 'Free Entry for Pets'], description: 'Annual food festival with a dedicated pet zone. Features adoption camps, contests, and pet-friendly food stalls.', priceRange: '₹200 entry' },
  { id: 'place4', name: 'Mountain Trail Eco Lodge', type: 'Resort', city: 'Ooty', area: 'Coonoor', rating: 4.8, reviews: 98, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop', features: ['Pet Cottages', 'Trekking', 'Bonfire', 'Pet Photographer'], description: 'Eco-friendly lodge that welcomes all pets. Stunning mountain views, trekking trails, and bonfires.', priceRange: '₹3000 - ₹8000/night' },
  { id: 'place5', name: 'Paws & Brews Pub', type: 'Restaurant', city: 'Mumbai', area: 'Lower Parel', rating: 4.6, reviews: 201, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop', features: ['Dog-Friendly', 'Live Music', 'Pet Treats', 'Instagram Wall'], description: 'Trendy pub where your dog is the VIP. Live music weekends, special pet treats, and an Instagram-worthy pet wall.', priceRange: '₹800 - ₹2000' },
  { id: 'place6', name: 'Woofstock Music & Pet Festival', type: 'Event', city: 'Bangalore', area: 'JP Nagar', rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=400&fit=crop', features: ['Live Music', 'Dog Shows', 'Agility Course', 'Vendors'], description: 'Annual pet festival with live music, dog shows, agility courses, food stalls, and pet product vendors.', priceRange: '₹500 entry' },
];

const SEED_FOOD_SUPPLIERS = [
  { id: 'food1', name: "Meera's Fresh Pet Kitchen", type: 'Home Cook', city: 'Bangalore', rating: 4.9, reviews: 78, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop', description: 'Home-cooked balanced meals for dogs and cats. Uses organic ingredients. Weekly meal plans available.', priceRange: '₹150 - ₹300/meal', delivery: true, phone: '9876512345' },
  { id: 'food2', name: 'RawPaws Natural Foods', type: 'Company', city: 'Multiple Cities', rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=300&fit=crop', description: 'Raw and natural pet food delivery service. Grain-free, preservative-free options available.', priceRange: '₹200 - ₹500/meal', delivery: true, phone: '9876512346' },
  { id: 'food3', name: "Grandma's Pet Treats", type: 'Home Cook', city: 'Mumbai', rating: 4.8, reviews: 56, image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?w=400&h=300&fit=crop', description: 'Homemade treats and biscuits for dogs. No preservatives, no artificial flavors. Made with love!', priceRange: '₹100 - ₹400/pack', delivery: true, phone: '9876512347' },
];

const SEED_CREMATION = [
  { id: 'crem1', name: 'Rainbow Bridge Pet Cremation', city: 'Bangalore', rating: 4.9, reviews: 67, image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop', services: ['Individual Cremation', 'Group Cremation', 'Urn Selection', 'Memorial Service', 'Paw Print Keepsake'], priceRange: '₹3000 - ₹15000', phone: '9876554321', description: 'Dignified and compassionate pet cremation services. We help you say goodbye with love and respect.' },
  { id: 'crem2', name: 'Eternal Paws Memorial', city: 'Mumbai', rating: 4.8, reviews: 45, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop', services: ['Private Cremation', 'Witness Cremation', 'Custom Urns', 'Garden Burial', 'Photo Memorial'], priceRange: '₹5000 - ₹20000', phone: '9876554322', description: 'Premium pet memorial services with personalized farewell ceremonies and beautiful memorial options.' },
];

const SEED_VACCINATIONS = [
  { id: 'vac1', petName: 'Buddy', petType: 'Dog', vaccineName: 'Rabies', date: '2024-08-15', nextDue: '2025-08-15', doctor: 'Dr. Anjali Verma', hospital: 'PetCare Hospital', status: 'completed', userId: 'user1' },
  { id: 'vac2', petName: 'Buddy', petType: 'Dog', vaccineName: 'DHPP (Distemper)', date: '2024-06-10', nextDue: '2025-06-10', doctor: 'Dr. Anjali Verma', hospital: 'PetCare Hospital', status: 'completed', userId: 'user1' },
  { id: 'vac3', petName: 'Buddy', petType: 'Dog', vaccineName: 'Deworming', date: '2024-09-20', nextDue: '2024-12-20', doctor: 'Dr. Kavitha Reddy', hospital: 'PawShield Clinic', status: 'upcoming', userId: 'user1' },
  { id: 'vac4', petName: 'Milo', petType: 'Cat', vaccineName: 'FVRCP', date: '2024-07-01', nextDue: '2025-07-01', doctor: 'Dr. Meena Iyer', hospital: 'Happy Paws Clinic', status: 'completed', userId: 'user1' },
];

const SEED_VET_VISITS = [
  { id: 'visit1', petName: 'Buddy', petType: 'Dog', date: '2024-10-15', doctor: 'Dr. Anjali Verma', hospital: 'PetCare Hospital', reason: 'Annual checkup', diagnosis: 'Healthy - all vitals normal', prescription: 'Continue current diet. Monthly deworming tablet.', weight: '28 kg', temperature: '38.5°C', notes: 'Coat is healthy. Teeth need cleaning in next visit.', userId: 'user1' },
  { id: 'visit2', petName: 'Buddy', petType: 'Dog', date: '2024-09-01', doctor: 'Dr. Rajesh Nair', hospital: 'Animal Life Clinic', reason: 'Limping on right front leg', diagnosis: 'Minor sprain - no fracture', prescription: 'Rest for 1 week. Meloxicam 0.1mg/kg once daily for 5 days.', weight: '27.5 kg', temperature: '38.8°C', notes: 'X-ray done. No structural damage. Follow up in 2 weeks.', userId: 'user1' },
  { id: 'visit3', petName: 'Milo', petType: 'Cat', date: '2024-08-20', doctor: 'Dr. Meena Iyer', hospital: 'Happy Paws Clinic', reason: 'Skin irritation', diagnosis: 'Mild allergic dermatitis', prescription: 'Antihistamine drops. Medicated shampoo twice a week.', weight: '4.2 kg', temperature: '38.2°C', notes: 'Likely food allergy. Switch to hypoallergenic diet for 4 weeks.', userId: 'user1' },
];

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Coorg', 'Ooty'];

// ==========================================
// DATABASE INITIALIZATION
// ==========================================

export function initDB() {
  if (!dbGet('initialized')) {
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
    dbSet('cart', []);
    dbSet('bookings', []);
    dbSet('orders', []);
    dbSet('cities', CITIES);
    dbSet('selectedCity', 'Bangalore');
    dbSet('initialized', true);
  }
}

// ==========================================
// CRUD OPERATIONS
// ==========================================

// Auth
export function getCurrentUser() {
  return dbGet('currentUser');
}

export function login(email, password) {
  const users = dbGet('users') || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...safeUser } = user;
    dbSet('currentUser', safeUser);
    return { success: true, user: safeUser };
  }
  return { success: false, error: 'Invalid email or password' };
}

export function signup(userData) {
  const users = dbGet('users') || [];
  if (users.find(u => u.email === userData.email)) {
    return { success: false, error: 'Email already registered' };
  }
  const newUser = {
    id: generateId(),
    ...userData,
    avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    role: 'user'
  };
  users.push(newUser);
  dbSet('users', users);
  const { password: _, ...safeUser } = newUser;
  dbSet('currentUser', safeUser);
  return { success: true, user: safeUser };
}

export function logout() {
  localStorage.removeItem(DB_PREFIX + 'currentUser');
}

// Generic getters
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

// Cart
export function getCart() { return dbGet('cart') || []; }

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }
  dbSet('cart', cart);
  return cart;
}

export function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(item => item.id === productId);
    if (item) item.quantity = qty;
  }
  dbSet('cart', cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
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

// Bookings
export function getBookings() { return dbGet('bookings') || []; }

export function addBooking(booking) {
  const bookings = getBookings();
  const newBooking = { id: generateId(), ...booking, date: new Date().toISOString(), status: 'confirmed' };
  bookings.push(newBooking);
  dbSet('bookings', bookings);
  return newBooking;
}

// Orders
export function getOrders() { return dbGet('orders') || []; }

export function placeOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: generateId(),
    ...orderData,
    items: getCart(),
    total: getCartTotal(),
    date: new Date().toISOString(),
    status: 'confirmed'
  };
  orders.push(newOrder);
  dbSet('orders', orders);
  clearCart();
  return newOrder;
}

// Lost & Found
export function addLostFound(report) {
  const reports = getLostFound();
  const newReport = { id: generateId(), ...report, date: new Date().toISOString().split('T')[0], status: 'active' };
  reports.push(newReport);
  dbSet('lostFound', reports);
  return newReport;
}

// Stray Reports
export function addStrayReport(report) {
  const reports = getStrayReports();
  const newReport = { id: generateId(), ...report, date: new Date().toISOString().split('T')[0], status: 'reported' };
  reports.push(newReport);
  dbSet('strayReports', reports);
  return newReport;
}

// Vaccinations
export function addVaccination(record) {
  const records = getVaccinations();
  const newRecord = { id: generateId(), ...record };
  records.push(newRecord);
  dbSet('vaccinations', records);
  return newRecord;
}

// Vet Visits
export function addVetVisit(visit) {
  const visits = getVetVisits();
  const newVisit = { id: generateId(), ...visit };
  visits.push(newVisit);
  dbSet('vetVisits', visits);
  return newVisit;
}

// Adoption listing
export function addAdoptionListing(pet) {
  const listings = getAdoption();
  const newListing = { id: generateId(), ...pet, status: 'available' };
  listings.push(newListing);
  dbSet('adoption', listings);
  return newListing;
}

export { generateId, CITIES };
