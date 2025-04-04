import fs from "fs/promises";
import Path from "path";
import { opendir } from "fs/promises";

const STATES = [
  "Andhra_Pradesh",
  "Arunachal_Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal_Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya_Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil_Nadu",
  "Telangana",
  "Tripura",
  "Uttar_Pradesh",
  "Uttarakhand",
  "West_Bengal",
];

// State-specific data mapping
const STATE_INFO = {
  Andhra_Pradesh: {
    attractions: [
      "Tirupati Temple",
      "Araku Valley",
      "Visakhapatnam Beach",
      "Lepakshi Temple",
      "Amaravati Stupa",
    ],
    cities: [
      "Hyderabad",
      "Visakhapatnam",
      "Tirupati",
      "Vijayawada",
      "Rajahmundry",
      "Kakinada",
    ],
    keywords:
      "Andhra Pradesh, Tirupati, Visakhapatnam, Telugu, Godavari, Krishna River",
    hotels: [
      "The Park Visakhapatnam",
      "Taj Gateway Tirupati",
      "Novotel Vijayawada",
      "Fortune Murali Park",
      "Green Park Vizag",
    ],
    activities: [
      "Temple Tours",
      "Beach Visits",
      "Historical Sites",
      "River Cruises",
      "Cultural Experiences",
    ],
    landscape: "Coastal Plains and Eastern Ghats",
  },
  Arunachal_Pradesh: {
    attractions: [
      "Tawang Monastery",
      "Ziro Valley",
      "Namdapha National Park",
      "Sela Pass",
      "Talley Valley",
    ],
    cities: ["Itanagar", "Tawang", "Ziro", "Bomdila", "Pasighat", "Tezu"],
    keywords: "Arunachal Pradesh, Tawang, Ziro, Northeast, Himalayan, Tribal",
    hotels: [
      "Tawang Resort",
      "Ziro Valley Camp",
      "Itanagar Grand",
      "Arunachal Guest House",
      "Donyi Polo Ashok",
    ],
    activities: [
      "Trekking",
      "Monastery Visits",
      "Wildlife Safaris",
      "Tribal Culture Experiences",
      "River Rafting",
    ],
    landscape: "Mountainous Himalayan",
  },
  Assam: {
    attractions: [
      "Kaziranga National Park",
      "Kamakhya Temple",
      "Majuli Island",
      "Manas National Park",
      "Dibru-Saikhowa",
    ],
    cities: ["Guwahati", "Jorhat", "Dibrugarh", "Tezpur", "Silchar", "Nagaon"],
    keywords:
      "Assam, Kaziranga, Guwahati, Tea Gardens, Brahmaputra, One-horned Rhino",
    hotels: [
      "Vivanta Guwahati",
      "Kaziranga Resort",
      "Jorhat Tea Bungalow",
      "Radisson Blu Guwahati",
      "Brahmaputra Jungle Resort",
    ],
    activities: [
      "Wildlife Safari",
      "Tea Garden Tours",
      "River Cruises",
      "Cultural Festivals",
      "Bihu Dance",
    ],
    landscape: "Brahmaputra Valley and Hills",
  },
  Bihar: {
    attractions: [
      "Mahabodhi Temple",
      "Nalanda Ruins",
      "Golghar",
      "Patna Museum",
      "Bodhi Tree",
    ],
    cities: ["Patna", "Gaya", "Bodh Gaya", "Rajgir", "Nalanda", "Muzaffarpur"],
    keywords:
      "Bihar, Bodh Gaya, Patna, Buddhist Circuit, Ganges, Nalanda University",
    hotels: [
      "Patna Maurya",
      "Bodh Gaya Resort",
      "Nalanda Heritage Hotel",
      "Rajgir Resort",
      "The Panache Patna",
    ],
    activities: [
      "Buddhist Pilgrimage",
      "Historical Tours",
      "Ganges River Visits",
      "Archaeological Explorations",
      "Spiritual Journeys",
    ],
    landscape: "Gangetic Plains",
  },
  Chhattisgarh: {
    attractions: [
      "Chitrakote Falls",
      "Barnawapara Wildlife Sanctuary",
      "Bastar Tribal Art",
      "Tirathgarh Falls",
      "Kanger Valley",
    ],
    cities: ["Raipur", "Bilaspur", "Jagdalpur", "Bhilai", "Korba", "Durg"],
    keywords:
      "Chhattisgarh, Bastar, Raipur, Tribal Culture, Waterfalls, Forest",
    hotels: [
      "Babylon International Raipur",
      "Courtyard Marriott Raipur",
      "Hyatt Raipur",
      "Bastar Jungle Resort",
      "Maikal Resort",
    ],
    activities: [
      "Tribal Village Tours",
      "Waterfall Visits",
      "Cave Explorations",
      "Wildlife Safaris",
      "Handicraft Shopping",
    ],
    landscape: "Forests and Plateaus",
  },
  Goa: {
    attractions: [
      "Calangute Beach",
      "Fort Aguada",
      "Basilica of Bom Jesus",
      "Dudhsagar Falls",
      "Anjuna Flea Market",
    ],
    cities: [
      "Panaji",
      "Margao",
      "Vasco da Gama",
      "Mapusa",
      "Calangute",
      "Candolim",
    ],
    keywords: "Goa, Beaches, Portuguese, Seafood, Nightlife, Churches",
    hotels: [
      "Taj Fort Aguada",
      "Grand Hyatt Goa",
      "The Leela Goa",
      "W Goa",
      "Cidade de Goa",
    ],
    activities: [
      "Beach Relaxation",
      "Water Sports",
      "Heritage Tours",
      "Nightlife",
      "Spice Plantation Tours",
    ],
    landscape: "Coastal",
  },
  Gujarat: {
    attractions: [
      "Rann of Kutch",
      "Gir National Park",
      "Sabarmati Ashram",
      "Somnath Temple",
      "Statue of Unity",
    ],
    cities: ["Ahmedabad", "Vadodara", "Surat", "Rajkot", "Gandhinagar", "Bhuj"],
    keywords: "Gujarat, Rann of Kutch, Gir, Lion, Statue of Unity, Kutchi",
    hotels: [
      "The Leela Palace Gandhinagar",
      "Hyatt Ahmedabad",
      "Radisson Blu Vadodara",
      "The Gateway Hotel Gir Forest",
      "Courtyard Marriott Surat",
    ],
    activities: [
      "Cultural Festivals",
      "Wildlife Safari",
      "Heritage Walks",
      "Desert Camping",
      "Temple Tours",
    ],
    landscape: "Desert, Coastal, and Plains",
  },
  Haryana: {
    attractions: [
      "Kingdom of Dreams",
      "Surajkund Lake",
      "Sultanpur Bird Sanctuary",
      "Kurukshetra",
      "Pinjore Gardens",
    ],
    cities: ["Gurugram", "Faridabad", "Hisar", "Panipat", "Ambala", "Karnal"],
    keywords: "Haryana, Gurugram, Kurukshetra, Mahabharata, IT Hub, Aravalli",
    hotels: [
      "The Oberoi Gurgaon",
      "ITC Grand Bharat",
      "Radisson Blu Gurugram",
      "Park Plaza Faridabad",
      "Fortune Park Panipat",
    ],
    activities: [
      "Historical Tours",
      "Bird Watching",
      "Corporate Retreats",
      "Cultural Shows",
      "Shopping",
    ],
    landscape: "Plains and Aravalli Foothills",
  },
  Himachal_Pradesh: {
    attractions: [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Dalhousie",
      "Spiti Valley",
    ],
    cities: [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Kullu",
      "McLeod Ganj",
      "Solan",
    ],
    keywords:
      "Himachal Pradesh, Shimla, Manali, Hiking, Mountain, Snow, Adventure",
    hotels: [
      "The Oberoi Cecil Shimla",
      "Span Resort Manali",
      "Club Mahindra Kandaghat",
      "The Himalayan Kasauli",
      "Fortune Resort Ridge Dalhousie",
    ],
    activities: [
      "Trekking",
      "Skiing",
      "Paragliding",
      "River Rafting",
      "Mountain Biking",
    ],
    landscape: "Mountainous Himalayan",
  },
  Jharkhand: {
    attractions: [
      "Netarhat",
      "Betla National Park",
      "Hundru Falls",
      "Jamshedpur",
      "Dassam Falls",
    ],
    cities: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh",
      "Deoghar",
    ],
    keywords: "Jharkhand, Tribal, Waterfalls, Mining, Forest, Ranchi",
    hotels: [
      "Radisson Blu Ranchi",
      "The Sonnet Jamshedpur",
      "Fortune Hotel Ranchi",
      "Panoramic Resort Netarhat",
      "The Capitol Residency",
    ],
    activities: [
      "Tribal Cultural Tours",
      "Waterfall Visits",
      "Wildlife Safaris",
      "Industrial Tours",
      "Cave Explorations",
    ],
    landscape: "Plateau and Forests",
  },
  Karnataka: {
    attractions: [
      "Mysore Palace",
      "Hampi Ruins",
      "Coorg Hills",
      "Jog Falls",
      "Gokarna Beach",
    ],
    cities: ["Bangalore", "Mysore", "Hampi", "Mangalore", "Coorg", "Belgaum"],
    keywords:
      "Karnataka, Bangalore, Mysore, IT Capital, Coffee, Hampi, Western Ghats",
    hotels: [
      "Taj West End Bangalore",
      "ITC Windsor Bangalore",
      "Royal Orchid Metropole Mysore",
      "Orange County Coorg",
      "Evolve Back Hampi",
    ],
    activities: [
      "Heritage Tours",
      "Coffee Plantation Visits",
      "Coastal Retreats",
      "Wildlife Safaris",
      "City Exploration",
    ],
    landscape: "Plateaus, Coastal, and Hills",
  },
  Kerala: {
    attractions: [
      "Alleppey Backwaters",
      "Munnar Tea Gardens",
      "Kovalam Beach",
      "Thekkady Wildlife",
      "Fort Kochi",
    ],
    cities: [
      "Kochi",
      "Thiruvananthapuram",
      "Kozhikode",
      "Alleppey",
      "Munnar",
      "Thrissur",
    ],
    keywords:
      "Kerala, Backwaters, Ayurveda, Tea Gardens, Kathakali, God's Own Country",
    hotels: [
      "Kumarakom Lake Resort",
      "Taj Malabar Kochi",
      "The Leela Kovalam",
      "Spice Village Thekkady",
      "Zuri Kumarakom",
    ],
    activities: [
      "Houseboat Cruises",
      "Ayurvedic Treatments",
      "Beach Relaxation",
      "Tea Estate Tours",
      "Cultural Performances",
    ],
    landscape: "Coastal and Western Ghats",
  },
  Madhya_Pradesh: {
    attractions: [
      "Khajuraho Temples",
      "Bandhavgarh National Park",
      "Sanchi Stupa",
      "Orchha Fort",
      "Ujjain Temples",
    ],
    cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Khajuraho"],
    keywords:
      "Madhya Pradesh, Khajuraho, Tiger, Temple, Heart of India, Buddhist",
    hotels: [
      "Taj Usha Kiran Palace Gwalior",
      "Radisson Indore",
      "Jehan Numa Palace Bhopal",
      "Samode Safari Lodge Bandhavgarh",
      "The Lalit Temple View Khajuraho",
    ],
    activities: [
      "Tiger Safaris",
      "Temple Tours",
      "Historical Explorations",
      "River Cruises",
      "Cultural Experiences",
    ],
    landscape: "Central Plateau and Forests",
  },
  Maharashtra: {
    attractions: [
      "Gateway of India",
      "Ajanta and Ellora Caves",
      "Lonavala Hills",
      "Mahabaleshwar",
      "Shirdi",
    ],
    cities: ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Lonavala"],
    keywords: "Maharashtra, Mumbai, Ajanta, Ellora, Western Ghats, Bollywood",
    hotels: [
      "The Taj Mahal Palace Mumbai",
      "The Oberoi Mumbai",
      "JW Marriott Pune",
      "The Leela Mumbai",
      "Conrad Pune",
    ],
    activities: [
      "City Tours",
      "Beach Visits",
      "Heritage Exploration",
      "Hill Station Retreats",
      "Wine Tasting",
    ],
    landscape: "Coastal, Western Ghats, and Plateau",
  },
  Manipur: {
    attractions: [
      "Loktak Lake",
      "Kangla Fort",
      "Keibul Lamjao National Park",
      "INA Memorial",
      "Imphal War Cemetery",
    ],
    cities: [
      "Imphal",
      "Thoubal",
      "Bishnupur",
      "Ukhrul",
      "Churachandpur",
      "Senapati",
    ],
    keywords: "Manipur, Loktak Lake, Imphal, Northeast, Phumdis, Martial Arts",
    hotels: [
      "Classic Hotel Imphal",
      "Hotel Imphal by The Classic",
      "Sangai Continental",
      "Royal Palace Imphal",
      "Sendra Resort",
    ],
    activities: [
      "Boat Rides",
      "Cultural Shows",
      "Wildlife Viewing",
      "Historical Tours",
      "Traditional Sports",
    ],
    landscape: "Valley and Hills",
  },
  Meghalaya: {
    attractions: [
      "Cherrapunji",
      "Mawsynram",
      "Living Root Bridges",
      "Shillong Peak",
      "Umiam Lake",
    ],
    cities: [
      "Shillong",
      "Cherrapunji",
      "Mawsynram",
      "Jowai",
      "Dawki",
      "Nongpoh",
    ],
    keywords:
      "Meghalaya, Shillong, Rain, Living Root Bridges, Scotland of the East, Clouds",
    hotels: [
      "Ri Kynjai Resort Shillong",
      "Polo Towers Shillong",
      "Coniferous Resort",
      "Cherrapunjee Holiday Resort",
      "The Habitat Shillong",
    ],
    activities: [
      "Waterfall Tours",
      "Caving",
      "Trekking",
      "Village Walks",
      "Cultural Experiences",
    ],
    landscape: "Mountainous Plateau",
  },
  Mizoram: {
    attractions: [
      "Phawngpui Peak",
      "Vantawng Falls",
      "Dampa Tiger Reserve",
      "Reiek Peak",
      "Solomon's Temple",
    ],
    cities: [
      "Aizawl",
      "Lunglei",
      "Champhai",
      "Kolasib",
      "Serchhip",
      "Lawngtlai",
    ],
    keywords: "Mizoram, Aizawl, Northeast, Tribal, Mountains, Blue Mountain",
    hotels: [
      "Aizawl Club",
      "Hotel Chief",
      "Riah International",
      "Hotel Millennium",
      "Tourist Lodge Aizawl",
    ],
    activities: [
      "Hiking",
      "Cultural Tours",
      "Wildlife Exploration",
      "Village Visits",
      "Bamboo Crafts",
    ],
    landscape: "Mountainous",
  },
  Nagaland: {
    attractions: [
      "Dzukou Valley",
      "Kohima War Cemetery",
      "Hornbill Festival",
      "Mount Saramati",
      "Kachari Ruins",
    ],
    cities: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto", "Phek"],
    keywords:
      "Nagaland, Kohima, Hornbill Festival, Tribal, Head Hunters, Northeast",
    hotels: [
      "Niathu Resort",
      "Hotel Japfu",
      "The Heritage Kohima",
      "Kohima Camp",
      "De Oriental Grand",
    ],
    activities: [
      "Tribal Village Tours",
      "Festival Celebrations",
      "Trekking",
      "Historical Tours",
      "Cultural Immersion",
    ],
    landscape: "Mountainous",
  },
  Odisha: {
    attractions: [
      "Jagannath Temple",
      "Konark Sun Temple",
      "Chilika Lake",
      "Puri Beach",
      "Udayagiri and Khandagiri Caves",
    ],
    cities: [
      "Bhubaneswar",
      "Puri",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Berhampur",
    ],
    keywords:
      "Odisha, Puri, Konark, Jagannath, Temple, Classical Dance, Beaches",
    hotels: [
      "Mayfair Lagoon Bhubaneswar",
      "Swosti Premium",
      "Trident Bhubaneswar",
      "Mayfair Heritage Puri",
      "Toshali Sands Puri",
    ],
    activities: [
      "Temple Tours",
      "Beach Visits",
      "Cultural Performances",
      "Craft Village Tours",
      "Bird Watching",
    ],
    landscape: "Coastal and Eastern Ghats",
  },
  Punjab: {
    attractions: [
      "Golden Temple",
      "Jallianwala Bagh",
      "Wagah Border",
      "Kapurthala Palace",
      "Bhakra Nangal Dam",
    ],
    cities: [
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Chandigarh",
    ],
    keywords: "Punjab, Amritsar, Golden Temple, Sikhs, Agricultural, Bhangra",
    hotels: [
      "Taj Swarna Amritsar",
      "Hyatt Regency Ludhiana",
      "Radisson Blu Amritsar",
      "Welcom Hotel Amritsar",
      "JW Marriott Chandigarh",
    ],
    activities: [
      "Religious Pilgrimages",
      "Border Ceremonies",
      "Farm Tourism",
      "Food Tours",
      "Historical Sites",
    ],
    landscape: "Plains",
  },
  Rajasthan: {
    attractions: [
      "Amber Fort",
      "Hawa Mahal",
      "Lake Palace",
      "Mehrangarh Fort",
      "Jaisalmer Fort",
      "Ranthambore",
    ],
    cities: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Jaisalmer",
      "Bikaner",
      "Ajmer",
      "Pushkar",
    ],
    keywords:
      "Rajasthan, Jaipur, Udaipur, Desert, Marwari, Palaces, Forts, Royal",
    hotels: [
      "Taj Lake Palace",
      "Umaid Bhawan Palace",
      "Rambagh Palace",
      "The Oberoi Udaivilas",
      "RAAS Jodhpur",
      "Suryagarh Jaisalmer",
    ],
    activities: [
      "Desert Safari",
      "Palace Tours",
      "Folk Music and Dance",
      "Heritage Walks",
      "Camel Rides",
      "Village Experiences",
    ],
    landscape: "Desert and Aravalli Range",
  },
  Sikkim: {
    attractions: [
      "Nathula Pass",
      "Tsomgo Lake",
      "Pelling",
      "Gangtok",
      "Yumthang Valley",
    ],
    cities: ["Gangtok", "Pelling", "Ravangla", "Namchi", "Lachung", "Yuksom"],
    keywords: "Sikkim, Gangtok, Himalayan, Monastery, Kanchenjunga, Buddhist",
    hotels: [
      "Mayfair Spa Resort Gangtok",
      "The Elgin Nor-Khill",
      "Summit Norling Resort",
      "The Hidden Forest Retreat",
      "Orange Village Resort",
    ],
    activities: [
      "Mountain Trekking",
      "Monastery Visits",
      "Yak Rides",
      "Hot Springs",
      "Mountain Biking",
    ],
    landscape: "Himalayan Mountains",
  },
  Tamil_Nadu: {
    attractions: [
      "Meenakshi Temple",
      "Marina Beach",
      "Ooty",
      "Thanjavur Big Temple",
      "Mahabalipuram",
    ],
    cities: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Ooty",
      "Kanyakumari",
    ],
    keywords:
      "Tamil Nadu, Chennai, Madurai, Temple, Classical Music, Bharatanatyam",
    hotels: [
      "ITC Grand Chola Chennai",
      "The Leela Palace Chennai",
      "Taj Coromandel",
      "Heritage Madurai",
      "Savoy Ooty",
    ],
    activities: [
      "Temple Tours",
      "Hill Station Retreats",
      "Cultural Performances",
      "Beach Visits",
      "Culinary Experiences",
    ],
    landscape: "Coastal Plains and Western Ghats",
  },
  Telangana: {
    attractions: [
      "Charminar",
      "Golconda Fort",
      "Ramoji Film City",
      "Hussain Sagar",
      "Warangal Fort",
    ],
    cities: [
      "Hyderabad",
      "Warangal",
      "Karimnagar",
      "Nizamabad",
      "Khammam",
      "Secunderabad",
    ],
    keywords: "Telangana, Hyderabad, Charminar, Biryani, Technology, Nizams",
    hotels: [
      "Taj Falaknuma Palace",
      "Trident Hyderabad",
      "ITC Kohenur",
      "Novotel Hyderabad",
      "The Westin Hyderabad",
    ],
    activities: [
      "Heritage Tours",
      "Food Trails",
      "Shopping",
      "Film City Tours",
      "Lake Activities",
    ],
    landscape: "Deccan Plateau",
  },
  Tripura: {
    attractions: [
      "Ujjayanta Palace",
      "Neermahal",
      "Sepahijala Wildlife Sanctuary",
      "Unakoti",
      "Jampui Hills",
    ],
    cities: [
      "Agartala",
      "Udaipur",
      "Dharmanagar",
      "Kailashahar",
      "Belonia",
      "Ambassa",
    ],
    keywords: "Tripura, Agartala, Northeast, Palace, Rock Carvings, Bengali",
    hotels: [
      "Ginger Agartala",
      "Hotel Welcome Palace",
      "Parkline Hotel",
      "Sonar Tori Resort",
      "Hotel Polo Towers",
    ],
    activities: [
      "Palace Tours",
      "Archaeological Explorations",
      "Wildlife Viewing",
      "Hill Visits",
      "Handicraft Shopping",
    ],
    landscape: "Hills and Plains",
  },
  Uttar_Pradesh: {
    attractions: [
      "Taj Mahal",
      "Varanasi Ghats",
      "Fatehpur Sikri",
      "Sarnath",
      "Lucknow Imambara",
    ],
    cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Mathura"],
    keywords:
      "Uttar Pradesh, Agra, Varanasi, Taj Mahal, Ganga, Spiritual, Mughal",
    hotels: [
      "The Oberoi Amarvilas Agra",
      "Taj Gateway Varanasi",
      "Vivanta Lucknow",
      "Radisson Agra",
      "The Lalit Grand Agra",
    ],
    activities: [
      "Historical Tours",
      "Spiritual Experiences",
      "River Cruises",
      "Culinary Tours",
      "Architectural Explorations",
    ],
    landscape: "Gangetic Plains",
  },
  Uttarakhand: {
    attractions: [
      "Nainital Lake",
      "Rishikesh",
      "Haridwar",
      "Valley of Flowers",
      "Jim Corbett National Park",
    ],
    cities: [
      "Dehradun",
      "Haridwar",
      "Rishikesh",
      "Nainital",
      "Mussoorie",
      "Almora",
    ],
    keywords:
      "Uttarakhand, Rishikesh, Himalayan, Spiritual, Yoga, Adventure, National Parks",
    hotels: [
      "The Claridges Nabha Palace Mussoorie",
      "Ananda in the Himalayas",
      "Taj Rishikesh",
      "Jim's Jungle Retreat",
      "The Naini Retreat",
    ],
    activities: [
      "Yoga and Meditation",
      "Wildlife Safaris",
      "River Rafting",
      "Trekking",
      "Pilgrimage Tours",
    ],
    landscape: "Himalayan Mountains",
  },
  West_Bengal: {
    attractions: [
      "Victoria Memorial",
      "Darjeeling",
      "Sundarbans",
      "Howrah Bridge",
      "Shantiniketan",
    ],
    cities: [
      "Kolkata",
      "Darjeeling",
      "Siliguri",
      "Durgapur",
      "Asansol",
      "Kharagpur",
    ],
    keywords:
      "West Bengal, Kolkata, Darjeeling, Tea, Royal Bengal Tiger, Durga Puja",
    hotels: [
      "The Oberoi Grand Kolkata",
      "ITC Sonar Kolkata",
      "Taj Bengal",
      "Mayfair Darjeeling",
      "Glenburn Tea Estate",
    ],
    activities: [
      "Cultural Tours",
      "Tea Estate Visits",
      "Tiger Safaris",
      "Heritage Walks",
      "River Cruises",
    ],
    landscape: "Gangetic Plains and Eastern Himalayas",
  },
};

STATES.forEach((state) => {
  if (!STATE_INFO[state]) {
    STATE_INFO[state] = {
      attractions: [
        `${state.replace("_", " ")} Famous Spot 1`,
        `${state.replace("_", " ")} Famous Spot 2`,
      ],
      cities: [
        `${state.replace("_", " ")} Major City 1`,
        `${state.replace("_", " ")} Major City 2`,
      ],
      keywords: `${state.replace("_", " ")}, Tourism, Travel, India`,
      hotels: [
        `${state.replace("_", " ")} Grand Hotel`,
        `${state.replace("_", " ")} Resort`,
      ],
      activities: ["Sightseeing", "Cultural Tours"],
      landscape: "Varied",
    };
  }
});

// Helper function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random number within range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper functions to generate random dates
function getRandomFutureDate(daysAhead = 30) {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * daysAhead));
  return futureDate.getTime();
}

function getRandomFutureDateRange(startDays = 30, duration = 7) {
  const startDate = getRandomFutureDate(startDays);
  const endDate = new Date(startDate);
  endDate.setDate(
    new Date(startDate).getDate() + Math.floor(Math.random() * duration) + 1
  );
  return { startDate, endDate };
}

// Months array for random selection
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TOUR_TYPES = ["Group", "Single", "Couple", "Family"];

const LUXURY_LEVELS = ["Standard", "Premium", "Luxury", "Ultra Luxury"];

async function createDestination() {
  let allDestinations = [];

  for (const state of STATES) {
    const stateName = state.replace("_", " ");
    const stateInfo = STATE_INFO[state];

    let destination = {
      id: `D${STATES.indexOf(state) + 1}`.padStart(4, "0"),
      type: "State",
      title: stateName,
      idealTime: getRandomItem(MONTHS),
      priceStarts: (getRandomNumber(1000, 5000) * 100).toString(),
      bestAttraction:
        getRandomItem(stateInfo.attractions) +
        ", " +
        getRandomItem(stateInfo.cities),
      description: `Explore the beautiful state of ${stateName} with its rich culture, diverse landscapes, and historical heritage.`,
      shortPackageDesc: `Experience the best of ${stateName} in a short but memorable tour.`,
      longPackageDesc: `Immerse yourself in the beauty and culture of ${stateName}. This comprehensive package lets you discover the hidden gems and famous attractions of this magnificent Indian state, from ${stateInfo.cities.join(
        ", "
      )} to the natural wonders and cultural heritage sites.`,
      faqs: [
        {
          question: `What is the best time to visit ${stateName}?`,
          answer: `The ideal time to visit ${stateName} is during ${getRandomItem(
            MONTHS
          )} to ${getRandomItem(
            MONTHS
          )} when the weather is pleasant and perfect for sightseeing.`,
        },
        {
          question: `What are the main attractions in ${stateName}?`,
          answer: `${stateName} is famous for ${stateInfo.attractions.join(
            ", "
          )} and many other beautiful spots.`,
        },
      ],
      status: 1,
      insertDate: Date.now(),
      updateDate: Date.now(),
    };

    allDestinations.push(destination);
  }

  try {
    await fs.writeFile(
      Path.join(process.cwd(), "/data/destination/destination.json"),
      JSON.stringify(allDestinations)
    );
    console.log("Destinations created successfully");
  } catch (error) {
    console.log("Error creating destinations:", error);
  }
}

async function createPackages(count = 10) {
  try {
    // Create packages directory if it doesn't exist
    const packagesDir = Path.join(process.cwd(), "/data/packages");
    try {
      await fs.mkdir(packagesDir, { recursive: true });
    } catch (err) {
      // Directory already exists, continue
    }

    // Process each state
    for (const state of STATES) {
      const stateName = state.replace("_", " ");
      const stateInfo = STATE_INFO[state];
      let packages = [];

      for (let i = 0; i < count; i++) {
        const dateRange = getRandomFutureDateRange();
        const duration = getRandomNumber(2, 10);
        const packageName = `${stateName} ${getRandomItem([
          "Adventure",
          "Explorer",
          "Discovery",
          "Heritage",
          "Cultural",
          "Scenic",
        ])} Tour`;

        // Generate slug from package name
        const slug = packageName.toLowerCase().replace(/\s+/g, "-");

        // Select cities specific to this state
        const selectedCities = stateInfo.cities
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.min(3, stateInfo.cities.length))
          .join(", ");

        let pack = {
          id: `${state.substring(0, 3).toUpperCase()}${(i + 1)
            .toString()
            .padStart(3, "0")}`,
          name: packageName,
          description: `Explore the beautiful landscapes and rich cultural heritage of ${stateName} with our specially designed tour package.`,
          adult: getRandomNumber(1, 4),
          child: getRandomNumber(0, 2),
          dateAdded: Date.now(),
          relateKey: stateName,
          keywords: stateInfo.keywords,
          destinationType: "India",
          destinationSearch: [stateName, ...stateInfo.cities.slice(0, 2)],
          tourType: getRandomItem(TOUR_TYPES),
          activityType: getRandomItem(stateInfo.activities),
          landscapeType: stateInfo.landscape,
          tags: [
            getRandomItem([
              "Budget",
              "Luxury",
              "Adventure",
              "Cultural",
              "Religious",
              "Wildlife",
            ]),
            "Guided Tour",
          ],
          webPackPrice: getRandomNumber(10, 50) * 1000,
          starRating: getRandomNumber(3, 5),
          hotel: getRandomItem(stateInfo.hotels),
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          duration: duration,
          monthLevelSelect: getRandomItem(MONTHS),
          destination: `${stateName}, ${selectedCities}`,
          location: state.toLowerCase(),
          dayWiseDuration: duration,
          hotelFacility: [
            "Wifi",
            "Breakfast",
            ...(Math.random() > 0.5 ? ["Lunch"] : []),
            ...(Math.random() > 0.5 ? ["Dinner"] : []),
          ],
          luxuryPackage: getRandomItem(LUXURY_LEVELS),
          coverImage: `${state.toLowerCase()}.png`,
          badges:
            Math.random() > 0.7
              ? ["Top Rated"]
              : Math.random() > 0.5
              ? ["Best Seller"]
              : [],
          dataImages: [
            `${state.toLowerCase()}_1.png`,
            `${state.toLowerCase()}_2.png`,
          ],
          slug: `${slug}-${i + 1}`,
          notes: `Special notes for travelers visiting ${stateName}: ${getRandomItem(
            [
              "Carry sunscreen",
              "Light clothing recommended",
              "Winter wear essential",
              "Rain protection advised",
            ]
          )}`,
          departureCity: getRandomItem([
            "New Delhi",
            "Mumbai",
            "Bangalore",
            "Kolkata",
            ...stateInfo.cities,
          ]),
          onArrivalVisa: "Required",
          groupDates: [getRandomFutureDate(), getRandomFutureDate(60)],
        };

        packages.push(pack);
      }

      // Save to state-specific file
      const fileName = `${state.toLowerCase()}.json`;
      await fs.writeFile(
        Path.join(packagesDir, fileName),
        JSON.stringify(packages, null, 2)
      );
      console.log(`Created packages for ${state}`);
    }

    console.log("All packages created successfully");
  } catch (error) {
    console.log("Error creating packages:", error);
    process.exit(1);
  }
}

// Function to ensure all necessary directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(Path.join(process.cwd(), "/data/destination"), {
      recursive: true,
    });

    await fs.mkdir(Path.join(process.cwd(), "/data/packages"), {
      recursive: true,
    });

    console.log("Directories created successfully");
  } catch (error) {
    console.log("Error creating directories:", error);
    process.exit(1);
  }
}

async function main() {
  try {
    await ensureDirectories();

    await createDestination();

    await createPackages();

    console.log("Data generation completed successfully");
  } catch (error) {
    console.log("Error in main execution:", error);
    process.exit(1);
  }
}

// Execute the main function
main();

/**
 * @deprecated This function is no longer in use.
 * @description This function creates all state based files where we will write our packages data
 */
async function createPackagesFileOnly() {
  try {
    await fs.mkdir(Path.join(process.cwd(), "/data/packages"), {
      recursive: true,
    });

    for (const state of STATES) {
      await fs.writeFile(
        Path.join(
          process.cwd(),
          "/data/packages",
          `${state.toLowerCase()}.json`
        ),
        JSON.stringify([])
      );
    }
    console.log("Empty package files created successfully");
  } catch (error) {
    console.log("Error creating package files:", error);
    process.exit(1);
  }
}

/**
 * @description Reads all the packages files in packages folder
 * @returns {string[]} Name of all of packages file
 */
async function readAllPackagesDirectory() {
  try {
    const dir = await opendir(Path.join(process.cwd(), "/data/packages"));

    let allFiles = [];
    for await (let file of dir) {
      allFiles.push(file.name);
    }
    return allFiles;
  } catch (error) {
    console.log("Error reading packages directory:", error);
    process.exit(1);
  }
}
