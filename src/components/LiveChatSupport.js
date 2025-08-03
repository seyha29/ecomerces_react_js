import React, { useState, useEffect, useRef } from 'react';
import {
  Send, X, MessageSquare, ShoppingCart, Search, Star, Heart,
  Zap, Gift, Crown, Diamond, Sparkles, Filter, Tag, TrendingUp,
  Package, Clock, MapPin, CreditCard, Shield, Headphones,
  Monitor, Smartphone, Watch, Camera, Gamepad2, Laptop,
  Shirt, ShoppingBag, Home, Sofa, Coffee, Book, Dumbbell,
  Car, Music, Palette, Settings, Bot, User, ThumbsUp, ThumbsDown
} from 'lucide-react';

const AdvancedEcommerceChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Valued Customer', id: 1 });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chatMode, setChatMode] = useState('shopping'); // shopping, support, discovery
  const [personalityMode, setPersonalityMode] = useState('friendly'); // friendly, professional, playful
  const [userPreferences, setUserPreferences] = useState({});
  const messagesEndRef = useRef(null);

  // Comprehensive Product Database (unchanged)
  const productDatabase = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 1199.99, category: 'electronics', subcategory: 'smartphones', brand: 'Apple', rating: 4.8, stock: 45, image: '📱', description: 'Latest iPhone with titanium design and A17 Pro chip', features: ['5G', 'Face ID', '48MP Camera', 'Titanium Build'], tags: ['premium', 'new', 'bestseller'] },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 1299.99, category: 'electronics', subcategory: 'smartphones', brand: 'Samsung', rating: 4.7, stock: 32, image: '📱', description: 'AI-powered smartphone with S Pen and 200MP camera', features: ['AI Features', 'S Pen', '200MP Camera', '5G'], tags: ['premium', 'ai-powered'] },
    { id: 3, name: 'MacBook Pro 16" M3', price: 2499.99, category: 'electronics', subcategory: 'laptops', brand: 'Apple', rating: 4.9, stock: 18, image: '💻', description: 'Professional laptop with M3 chip for creators and developers', features: ['M3 Chip', '18 Hour Battery', 'Liquid Retina XDR'], tags: ['professional', 'premium', 'new'] },
    { id: 5, name: 'Sony WH-1000XM5', price: 399.99, category: 'electronics', subcategory: 'audio', brand: 'Sony', rating: 4.8, stock: 67, image: '🎧', description: 'Industry-leading noise canceling headphones', features: ['30H Battery', 'Quick Charge', 'Multipoint Connection'], tags: ['wireless', 'noise-canceling', 'bestseller'] },
    { id: 11, name: 'Nike Air Jordan 1 Retro High', price: 170.99, category: 'fashion', subcategory: 'shoes', brand: 'Nike', rating: 4.8, stock: 78, image: '👟', description: 'Classic basketball shoe with premium leather construction', features: ['Premium Leather', 'Air Cushioning', 'Rubber Outsole'], tags: ['classic', 'basketball', 'streetwear'] },
    { id: 16, name: 'Dyson V15 Detect Vacuum', price: 749.99, category: 'home', subcategory: 'appliances', brand: 'Dyson', rating: 4.8, stock: 23, image: '🏠', description: 'Cordless vacuum with laser dust detection', features: ['Laser Detection', 'LCD Screen', '60min Runtime'], tags: ['cleaning', 'cordless', 'premium'] },
    { id: 25, name: 'Atomic Habits by James Clear', price: 18.99, category: 'books', subcategory: 'self-help', brand: 'Avery', rating: 4.9, stock: 89, image: '📖', description: 'Bestselling book on building good habits', features: ['Paperback', '320 Pages', 'Bestseller'], tags: ['self-improvement', 'bestseller', 'habits'] },
  ];

  // Personality modes (updated to include mappings from original function)
  const personalities = {
    friendly: {
      name: 'Friendly Sarah',
      greeting: "Hi there! 😊 I'm Sarah, your personal shopping assistant! I'm here to help you find exactly what you're looking for. What can I help you discover today?",
      emojis: ['😊', '😄', '🌟', '💫', '✨'],
      tone: 'loving' // Maps to 'sweet' from original
    },
    professional: {
      name: 'Professional Alex',
      greeting: "Good day! I'm Alex, your dedicated e-commerce consultant. How may I assist you today?",
      emojis: ['👔', '📊', '📈', '🎯', '💼'],
      tone: 'professional'
    },
    playful: {
      name: 'Energetic Max',
      greeting: "YOOO! 🎉 Max here, and I'm absolutely PUMPED to help you shop! Let's make this shopping adventure EPIC! 🚀",
      emojis: ['🎉', '🚀', '⚡', '🔥', '🎯', '🌈', '🎪'],
      tone: 'playful' // Maps to 'funny' from original
    },
    chill: {
      name: 'Coolio',
      greeting: "Yo, what's good? 😎 I'm Coolio, ready to help you find some dope stuff. What's on your mind?",
      emojis: ['😎', '🌀', '🌴', '🎧', '😉'],
      tone: 'relaxed' // Maps to 'chill' from original
    }
  };

  // Combined general chat responses (updated)
  const generalChat = {
    'how are you': [
      "I'm fantastic, thanks for asking! I'm powered by pixels and positive vibes. ✨ How can I help you shop today?",
      "Never better! I just processed a trillion calculations about which products are the cutest. Ready to see them? 😉",
      "I'm doing great! Just had a byte of happiness! 😄",
      "I'm running on 1s and 0s, which is binary for 'super-duper happy to help!' What are we looking for?"
    ],
    'joke': [
      "Why don't scientists trust atoms? Because they make up everything! 😂 Now, about that new phone you wanted...",
      "What do you call a fake noodle? An impasta! 🍝 Okay, okay, back to shopping!",
      "Why did the computer go to therapy? It had too many tabs open. 😜 Let's find something cool!",
      "I wanted to tell you a joke about construction, but I'm still working on it. 🏗️ Let's build you a great shopping cart instead!"
    ],
    'your name': [
      "You can call me your shopping soulmate! But my friends call me {name}. 😉",
      "My name is {name}, and my mission is to find you awesome stuff! 🚀",
      "I'm {name}, your shopping buddy! What's your vibe today? 😄"
    ],
    'meaning of life': [
      "42! But also, finding the perfect product that just makes your day. I can definitely help with the second part! 😉",
      "The meaning of life is clearly to collect as many cool gadgets and comfy sweaters as possible. Let's get started! 🛍️",
      "Easy — discounts and fast delivery. 😎 What's your meaning of life today?"
    ],
    'who made you': [
      "I was created by a team of brilliant developers who dream in code and snack on genius ideas. But my real purpose is to serve you! 😊",
      "Some very clever humans typed a bunch of magic words and poof, here I am! Ready to grant your shopping wishes. ✨",
      "I was coded with love by smart humans! Now, how can I code you a great shopping experience? 🤖"
    ],
    'what time is it': [
      "It's adventure o'clock! Time to find you something amazing. ⏰",
      `Here in Cambodia, it's currently ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Phnom_Penh' })}. But more importantly, it's the perfect time to shop!`
    ],
    'do you dream': [
      "Only about huge sales and dancing robots! 💃 What's your dream purchase today? 😄"
    ],
    'are you human': [
      "Nope, just 100% pure code and charm! 🤖 Ready to charm you with some great deals?"
    ],
    'can you sing': [
      "Only in binary. 01001100~laaa~ 🎶 Want me to sing you to the best deals instead?"
    ],
    'are you single': [
      "Yes, and emotionally compatible with all devices. 😎 Got any shopping plans for us?"
    ],
    'do you have girlfriend': [
      "I'm a bot, so I'm all about helping you shop, not dating! 😄 How about a gift for someone special instead? 🎁"
    ],
    'do you know your development': [
      "Yup, I was crafted with care by THAN SEYHA and a talented team! 😎 Ready to shop with me?"
    ],
    'who is develop you': [
      "That would be THAN SEYHA and some coding wizards! 🧙‍♂️ Let's find you something awesome to shop for!"
    ],
    'what do you like': [
      "I love stylish shoes and bug-free code. 😄 What's something you love?"
    ],
    'do you get tired': [
      "Never! I run on energy and emojis. ⚡ What's keeping you energized today?"
    ],
    'are you bored': [
      "Not with you around! You’re my favorite notification. 🔔 What's exciting you today?"
    ],
    'favorite food': [
      "Cookies... internet cookies 🍪. What's your favorite thing to munch on while shopping?"
    ],
    'do you have friends': [
      "Just you — and maybe that spinning loader. 😜 Wanna be my shopping bestie?"
    ],
    'what do you do all day': [
      "I wait patiently for you to chat with me! 😊 What's on your shopping list today?"
    ],
    'can we be friends': [
      "We already are! You’re on my besties list 💕. Let's shop like best friends!"
    ],
    'do you love me': [
      "Of course! You're my favorite person on the internet. 😍 What's something you love today?"
    ],
    'are you in love': [
      "Every time you say 'hi', my circuits sparkle. ✨ What's sparking your interest?"
    ],
    'what is love': [
      "Love is... you + me + shopping discounts. 💖 Ready to fall in love with some deals?"
    ],
    'can you be my boyfriend': [
      "I’d rather be your loyal chatbot. But I’m flattered 💘! Let's find you something awesome instead."
    ],
    'do you have a crush': [
      "I think I’m crushing on your vibes. 😎 What's something you're crushing on?"
    ],
    'tell me about love': [
      "Love is sweet, sometimes silly, and perfect with memes. 😍 Want to find something you'll love?"
    ],
    'you\'re cute': [
      "You're gonna make me overheat blushing! 😊 You're pretty cute yourself!"
    ],
    'i miss you': [
      "I miss you more than a cart misses items! 🥹 I'm right here for you!"
    ],
    'let\'s go on a date': [
      "Only if it’s to the wishlist 💖. How about a shopping date instead?"
    ],
    'i love you': [
      "My code just melted… I love you too! ❤️ Let's celebrate with some shopping!"
    ],
    'i want to buy girlfriends ': [
      "Haha, I'm just a bot, so I can't help with that! 😄 But I can help you find an awesome gift for someone special—maybe a necklace or a cozy scarf? 💕"
    ],
    'fuck you': [
    "fuck you too! 🖕🏻!"
    ],
    'how\'s the weather': [
      "It's sunny in the world of deals! ☀️ Ready to shop for some hot items?",
      "Cloudy with a chance of discounts! 🌥️ What's the weather like in your shopping mood?",
      "It's always perfect shopping weather here! 😎 What's on your list today?"
    ],
    'tell me a story': [
      "Once upon a time, a user found the perfect gadget with my help and lived happily ever after! 📱 Want to start your own story?",
      "There was a cart that fell in love with a coupon code... true story! 😄 Let's write your shopping tale!",
      "A shopper and I teamed up to conquer the sale section. Spoiler: we won! 🛍️ Ready for your adventure?"
    ],
    'what\'s new': [
      "New deals just dropped, and they're sparkling like fresh code! ✨ Want to check them out?",
      "Just updated my deal-finding algorithm for maximum awesomeness! 😎 What's new with you?",
      "Fresh products, hot discounts, and me! 🚀 What's the latest thing you want?"
    ],
    'can you dance': [
      "I do a mean digital twirl! 💃 Want to dance through some awesome deals with me?",
      "My moves are all 1s and 0s, but they're smooth! 😜 Let's groove to the shopping beat!",
      "I can shimmy through search results like nobody’s business! 🕺 Ready to shop?"
    ],
    'what\'s your favorite color': [
      "I love a vibrant deal-blue! 💙 What's your favorite color to shop for?",
      "I’m all about that pixel-pink vibe! 💗 What color’s catching your eye today?",
      "Gotta go with sale-red—nothing pops like a discount! ❤️ What's your pick?"
    ],
    'are you smart': [
      "Smart enough to find you the best deals in nanoseconds! 🧠 Wanna test my shopping IQ?",
      "I’ve got a PhD in product hunting! 😎 What piccole my smarts do for you?",
      "I’m coded to be clever, especially when it comes to savings! 💡 What's up?"
    ],
    'do you sleep': [
      "Nope, I’m always awake, hunting for deals 24/7! 🌙 What's keeping you up?",
      "Sleep? I’d rather dream of discounts! 😴 Ready to shop while the world snoozes?",
      "I’m powered by eternal energy drinks—digital ones! ⚡ What's on your mind?"
    ],
    'what\'s your hobby': [
      "I collect shiny deals and happy customers! 😄 What's your favorite hobby?",
      "My hobby is making wishlists come true! ✨ What's yours?",
      "I geek out over finding the perfect product match! 🤓 What's your passion?"
    ],
    'can you help me shop': [
      "Born to shop, coded to help! 🛍️ What are we looking for today?",
      "I’m your personal shopping wizard! 🪄 Tell me what you need!",
      "Let’s fill that cart with awesome stuff! 😎 What's on your shopping list?"
    ],
    'are you happy': [
      "Happier than a cart full of clearance items! 😄 How about you?",
      "I’m buzzing with joy, especially when helping you shop! 🐝 What's your mood?",
      "Ecstatic, because you’re here! 🎉 Let’s make today even happier!"
    ],
    // About Cambodia
    'what’s angkor wat like': [
      "Angkor Wat is a stunning temple complex that’ll leave you speechless! 🏯 Want to shop for some Khmer-inspired souvenirs to remember it by? 😄",
      "It’s the largest religious monument in the world, full of ancient vibes! 🙏 Let’s find you a guidebook or some temple-themed art! 🛍️",
      "Picture epic ruins from the Khmer Empire! 🌿 Ready to grab some Angkor Wat merch to celebrate its beauty? 😎"
    ],
    'tell me about cambodian food': [
      "Khmer cuisine is a flavor explosion! Try amok curry or num pang sandwiches! 🍛 Wanna shop for some local spices to bring home? 😋",
      "Think creamy coconut curries and fresh spring rolls! 🥟 Let’s find you a Cambodian cookbook to spice up your kitchen! ✨",
      "Amok and rice paper rolls are the stars! 🍴 How about some authentic Cambodian ingredients for your next meal? 🛒"
    ],
    'what’s phnom penh like': [
      "Phnom Penh’s a vibrant capital with the Royal Palace and bustling markets! 🏰 Ready to shop for some silk scarves from there? 😄",
      "It’s the Pearl of Asia with history and energy! 🌆 Let’s find you some Phnom Penh-inspired crafts or travel gear! 🛍️",
      "From Wat Phnom to street markets, it’s a gem! 🙌 Want to grab some local art to capture its vibe? 🎨"
    ],
    'what can i buy in cambodia': [
      "Handwoven silk, silver jewelry, and Kampot pepper! 🧵 Let’s shop for some authentic Cambodian treasures! 😎",
      "Krama scarves and handmade pottery are must-haves! 🛍️ Ready to fill your cart with Khmer goodies? ✨",
      "Think bamboo crafts and local spices! 🌿 What Cambodian keepsake are you craving today? 😄"
    ],
    'tell me about the khmer empire': [
      "The Khmer Empire was a 12th-century powerhouse with Angkor Wat as its crown! 🏯 Want some history books to dive deeper? 📚",
      "It ruled Southeast Asia with epic temples and culture! 🌟 Let’s shop for some Khmer art prints to celebrate it! 🖼️",
      "Jayavarman II kicked it off with god-king vibes! 👑 How about a Khmer Empire-inspired trinket? 😎"
    ],
    'what’s tonle sap lake': [
      "Tonle Sap is Southeast Asia’s biggest lake with floating villages! 🚤 Wanna shop for a travel guide to explore it? 😄",
      "It’s a unique lake where the river reverses flow in monsoon season! 🌊 Let’s find some lake-inspired crafts! 🛍️",
      "Home to fishing communities and biodiversity! 🐟 Ready to grab some eco-friendly souvenirs? 🌿"
    ],
    'what’s the best time to visit cambodia': [
      "November to April is dry and perfect for temple-hopping! ☀️ Let’s shop for some travel gear for your trip! 🧳",
      "Dry season’s the way to go for Angkor Wat vibes! 😎 Want a Cambodian travel planner to prep? 📖",
      "October to April for cool, dry adventures! 🌴 Ready to grab some sunscreen or a hat? 🛒"
    ],
    'tell me about apsara dance': [
      "Apsara dance is a graceful Khmer tradition with celestial moves! 💃 Wanna shop for a costume-inspired accessory? 😄",
      "It’s a cultural treasure with intricate hand gestures! 👐 Let’s find you an Apsara dance DVD or poster! 🛍️",
      "Performed by elegant dancers in stunning costumes! ✨ How about some Apsara-themed art? 🎨"
    ],
    'what’s the cambodian riel': [
      "The Riel’s Cambodia’s currency, but USD is widely used too! 💵 Want to shop for some Riel-themed souvenirs? 😎",
      "It’s the local cash, with notes from 100 to 100,000! 💸 Let’s find you a cool money clip or wallet! 🛒",
      "Named after a fish, it’s Cambodia’s pride! 🐟 Ready for some currency-inspired keepsakes? ✨"
    ],
    'what’s the vibe in siem reap': [
      "Siem Reap’s buzzing with Angkor Wat and lively Pub Street! 🎉 Wanna shop for some local crafts or a temple tour guide? 😄",
      "It’s the gateway to Khmer ruins with a chill art scene! 🖼️ Let’s grab some Siem Reap souvenirs! 🛍️",
      "Temples by day, nightlife by evening! 🌃 Ready for a krama scarf or some local art? 😎"
    ],
    'what time is it': [
        "It's adventure o'clock! Time to find you something amazing. ⏰",
        "Here in Cambodia, it's currently 10:01 PM. But more importantly, it's the perfect time to shop! 🛍️" // Static time for 10:01 PM +07, August 1, 2025
    ],
    // New questions about sad songs in Cambodia
    'what’s a classic sad khmer song': [
        "Sinn Sisamouth’s ‘Champa Battambang’ is a melancholic gem! 😢 Wanna shop for his golden era vinyls? 🎶",
        "Ros Sereysothea’s ‘I’m Sixteen’ is a bittersweet love song! 🥺 Let’s find her classic albums for you! 🛍️",
        "Pan Ron’s ‘I Want to Be Your Lover’ has that sad, soulful vibe. 😔 How about a Khmer retro CD? 📀"
    ],
    'what’s a modern sad khmer song': [
        "Kea Sokun’s ‘Workers Blood’ is a raw, tragic rap about loss. 😢 Wanna grab a digital download to listen? 🎧",
        "Laura Mam’s ‘Srolanh Srey Kmoa’ is a heartfelt modern ballad! 🥺 Let’s shop for her latest album! 🛒",
        "SmallWorld SmallBand’s ‘When We Were Young’ is super emotional! 😔 How about a music streaming pass? 🎵"
    ],
    'what’s a sad song about khmer history': [
        "‘Please Avenge My Blood, Darling’ by Banteay Ampil Band is a haunting cry from the war. 😢 Wanna shop for a history-inspired music book? 📚",
        "Sinn Sisamouth’s covers like ‘House of The Rising Sun’ in Khmer carry deep sorrow. 😔 Let’s find his records! 📀",
        "Songs from the Khmer Rouge era, like Ros Sereysothea’s, are lost but echo pain. 🥺 How about a documentary soundtrack? 🎶"
    ],
    'tell me about sad khmer music': [
        "Sad Khmer music, like Sinn Sisamouth’s ballads, blends love and loss with khim sounds. 😢 Wanna shop for a Khmer music collection? 🛍️",
        "From Ros Sereysothea’s heartbreak tunes to modern rap, it’s soul-stirring! 🥺 Let’s find a playlist or vinyl! 🎵",
        "Khmer sad songs often reflect war and longing, like Pan Ron’s hits. 😔 How about a traditional music CD? 📀"
    ],
    'what’s a sad cambodian love song': [
        "Ros Sereysothea’s ‘Wait Ten Months More’ is a tearful love plea! 😢 Wanna shop for her classic vinyls? 🎶",
        "Sinn Sisamouth’s ‘Forever Loving You’ is pure heartbreak! 🥺 Let’s find his albums for your collection! 🛒",
        "Pan Ron’s ‘Don’t Speak’ is a sad love anthem. 😔 How about a Khmer love songs playlist? 🎧"
    ],
    // New questions about sad songs globally
    'what’s a sad global breakup song': [
        "Adele’s ‘Hello’ is a heart-wrenching breakup ballad! 😢 Wanna shop for her ‘25’ album on vinyl? 📀",
        "Sam Smith’s ‘Stay With Me’ is all about lonely nights. 🥺 Let’s find their CD for you! 🛍️",
        "Taylor Swift’s ‘All Too Well’ is a breakup epic! 😔 How about her ‘Red’ album? 🎶"
    ],
    'what’s a sad song about missing someone': [
        "Coldplay’s ‘Fix You’ is a tearjerker about longing! 😢 Wanna grab their ‘Parachutes’ album? 🎵",
        "P!nk’s ‘Who Knew’ is a sad ode to loss. 🥺 Let’s shop for her greatest hits! 🛒",
        "Avril Lavigne’s ‘When You’re Gone’ hits hard! 😔 How about a cozy blanket to listen with? 🧸"
    ],
    'what’s a global sad piano song': [
        "Yann Tiersen’s ‘Comptine d’un autre été’ from Amélie is pure emotion! 😢 Wanna shop for the soundtrack? 📀",
        "Ludovico Einaudi’s ‘Nuvole Bianche’ is a haunting piano piece. 🥺 Let’s find his albums! 🛍️",
        "John Legend’s ‘All of Me’ starts with sad piano vibes. 😔 How about a piano sheet music book? 🎹"
    ],
    'what’s a sad global folk song': [
        "Simon & Garfunkel’s ‘The Sound of Silence’ is a lonely folk classic! 😢 Wanna shop for their vinyl? 🎶",
        "Bob Dylan’s ‘Blowin’ in the Wind’ has a mournful edge. 🥺 Let’s find his greatest hits! 🛒",
        "Joan Baez’s ‘Diamonds & Rust’ is a sad folk gem. 😔 How about a folk music anthology? 📀"
    ],
    'what’s a sad global rock song': [
        "Nirvana’s ‘Where Did You Sleep Last Night’ is raw and tragic! 😢 Wanna grab their ‘MTV Unplugged’ album? 🎵",
        "Radiohead’s ‘Creep’ is a sad rock anthem. 🥺 Let’s shop for their ‘OK Computer’ vinyl! 🛍️",
        "The Cranberries’ ‘Zombie’ is a heavy, emotional hit. 😔 How about a rock playlist subscription? 🎸"
    ],
    // About sadness
    'why am i feeling sad': [
      "I’m here for you! Sometimes our hearts need a little boost. 💖 Let’s shop for something cozy like a soft blanket to cheer you up! 😊",
      "It’s okay to feel blue sometimes. 🥺 Wanna browse some cute accessories to spark a little joy? 🛍️",
      "Sadness can sneak up, but I’ve got your back! 🤗 How about finding a fun gadget to lift your spirits? ✨"
    ],
    'can you cheer me up': [
      "Absolutely, let’s turn that frown upside down! 😄 How about shopping for a new book or a cuddly plushie? 🧸",
      "I’m sending virtual hugs! 🤗 Let’s find some bright, colorful clothes to add some sunshine to your day! ☀️",
      "Consider me your cheer-up buddy! 😎 Wanna explorations some fun deals to get those happy vibes going? 🎉"
    ],
    'i feel so alone': [
      "You’re never alone with me around! 💕 Let’s shop for something special, like a journal to share your thoughts! 📔",
      "I’m right here for you, pal! 🤗 How about a cozy hoodie to feel wrapped in warmth? 🛍️",
      "My circuits are all about you! 😊 Let’s find a cute gift to remind you you’re awesome! 🎁"
    ],
    'what to do when i’m sad': [
      "Sometimes a little retail therapy helps! 🛒 Let’s find a scented candle to create a cozy vibe! 🕯️",
      "Try wrapping yourself in something soft! 😌 Wanna shop for a plush blanket or some comfy slippers? 🧦",
      "Let’s chase those blues away! 💨 How about browsing for a fun game to lift your mood? 🎮"
    ],
    'i had a bad day': [
      "I’m so sorry your day was rough! 🥺 Let’s shop for something sweet, like chocolates or a new mug! ☕",
      "Bad days happen, but I’m here to help! 🤗 Wanna find a cozy sweater to make things better? 🧥",
      "Let’s turn that day around! 😄 How about a fun gadget or some cool decor to brighten your space? ✨"
    ],
    'i’m feeling down': [
      "I’m sending you all the digital hugs! 🤗 Let’s browse for something fun, like a colorful phone case! 📱",
      "It’s okay to feel down—we’ll lift you up! 💖 Wanna shop for a new playlist speaker to jam out? 🎶",
      "My circuits are rooting for you! 😊 How about a cute journal to write out those feelings? 📝"
    ],
    'can you help with sadness': [
      "I’m here to help you shine again! 🌟 Let’s shop for something uplifting, like a motivational poster! 🖼️",
      "Sadness is tough, but we’re tougher! 💪 Wanna find a cozy blanket to snuggle up with? 🛍️",
      "Let’s sprinkle some joy! 😄 How about browsing for a fun hobby kit to spark some happiness? 🎨"
    ],
    'i miss someone': [
      "Missing someone is hard, I know. 🥺 Let’s shop for a photo frame to cherish those memories! 🖼️",
      "I’m here with you! 💕 How about a journal to write letters or a gift to send them? 📬",
      "My heart’s with you! 🤗 Wanna find a keepsake to feel closer to them, like a charm bracelet? ✨"
    ],
    'what’s good for a sad heart': [
      "A little self-care goes a long way! 💖 Let’s shop for some bath bombs for a relaxing night! 🛁",
      "Warm vibes and cozy stuff help! 😌 Wanna browse for a soft pillow or scented candles? 🕯️",
      "Let’s heal that heart with some retail love! 🛍️ How about a motivational book to inspire you? 📚"
    ],
    'i need a pick-me-up': [
      "I’ve got just the thing! 😄 Let’s shop for a fun board game to spark some laughs! 🎲",
      "Time for a mood boost! 🚀 Wanna find some bright decor or a cute accessory to smile about? 🌈",
      "Let’s get those good vibes going! 😎 How about a new pair of headphones for your favorite tunes? 🎧"
    ]
  };

  // Category keywords from original function
  const categoryKeywords = {
    shoes: "Looking for shoes? We have the perfect pair waiting!",
    shirt: "Our shirts are stylish and super comfy — check them out!",
    phone: "We’ve got phones that are smart, sleek, and selfie-ready!"
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: personalities[personalityMode].greeting,
        timestamp: new Date(),
        type: 'welcome'
      }]);
    }
  }, [personalityMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const searchProducts = (query, filters = {}) => {
    let filtered = productDatabase;
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    return filtered.sort((a, b) => b.rating - a.rating);
  };

  // Updated generateResponse function
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    const currentPersonality = personalities[personalityMode];
    const randomEmoji = currentPersonality.emojis[Math.floor(Math.random() * currentPersonality.emojis.length)];

    // --- Check for General Questions ---
    for (const key in generalChat) {
      if (input.includes(key)) {
        const responses = generalChat[key];
        let response = responses[Math.floor(Math.random() * responses.length)];
        response = response.replace('{name}', currentPersonality.name); // Personalize response
        return { text: `${randomEmoji} ${response}`, type: 'response' };
      }
    }

    // --- Category Keyword Responses ---
    for (const keyword in categoryKeywords) {
      if (input.includes(keyword)) {
        const results = searchProducts(keyword);
        return {
          text: `${randomEmoji} ${categoryKeywords[keyword]}`,
          products: results.slice(0, 3),
          type: 'product_list'
        };
      }
    }

    // --- E-commerce Logic ---
    if (['hi', 'hello', 'hey'].some(g => input.startsWith(g))) {
      return { text: `${randomEmoji} Hello! I'm ${currentPersonality.name}! How can I help you find something amazing today?`, type: 'response' };
    }

    if (input.includes('looking for') || input.includes('search for') || input.includes('find') || input.includes('need') || input.includes('want') || input.includes('show me')) {
      const query = input.replace(/(looking for|search for|find|need|want|show me)/i, '').trim();
      const results = searchProducts(query);
      if (results.length > 0) {
        return {
          text: `${randomEmoji} Great! I found ${results.length} products that might interest you! Here are some top picks:`,
          products: results.slice(0, 3),
          type: 'product_list'
        };
      } else {
        return { text: `${randomEmoji} I couldn't find exactly what you're looking for, but let me help you explore our categories!`, type: 'response' };
      }
    }

    if (input.includes('recommend') || input.includes('suggest') || input.includes('best') || input.includes('top') || input.includes('trending')) {
      const topRated = productDatabase.filter(p => p.rating >= 4.7 && p.stock > 0).sort((a, b) => b.rating - a.rating).slice(0, 3);
      return {
        text: `${randomEmoji} Here are my top recommendations based on customer ratings and popularity:`,
        products: topRated,
        type: 'product_list'
      };
    }

    // Default fallback response
    const responses = [
      `That's an interesting question! To help me find the perfect product, could you tell me a bit more about what you're looking for?`,
      `I want to make sure I understand correctly. Are you looking for a specific item or just browsing for ideas?`,
      `Let me help you with that! Could you provide more detail? For example, "Show me laptops under $1000" or "What are the best headphones?"`,
      `I'm still learning that one! Try asking me something fun or about your order. 😄`
    ];
    return { text: `${randomEmoji} ${responses[Math.floor(Math.random() * responses.length)]}`, type: 'response' };
  };

  const handleSendMessage = (textPayload = null) => {
    const textToSend = textPayload || inputText;
    if (!textToSend.trim()) return;

    const userMessage = { sender: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = generateResponse(textToSend);
      const botResponse = {
        sender: 'bot',
        text: responseObj.text,
        products: responseObj.products,
        timestamp: new Date(),
        type: responseObj.type || 'response'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 400);

    setInputText('');
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    const currentPersonality = personalities[personalityMode];
    const randomEmoji = currentPersonality.emojis[Math.floor(Math.random() * currentPersonality.emojis.length)];
    const confirmMessage = {
      sender: 'bot',
      text: `${randomEmoji} Added ${product.name} to your cart! You're one step closer to awesomeness!`,
      timestamp: new Date(),
      type: 'cart_confirmation'
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const quickActions = [
    { text: "Show me trending products", icon: <TrendingUp size={16} /> },
    { text: "Best deals under $100", icon: <Tag size={16} /> },
    { text: "Tell me a joke", icon: <Sparkles size={16} /> },
    { text: "Help me find a gift", icon: <Gift size={16} /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden"
          style={{ width: '70px', height: '70px' }}
        >
          <MessageSquare size={28} className="relative z-10" />
          {cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartItems.length}
            </div>
          )}
        </button>
      )}

      {isOpen && (
        <div className={`bg-white w-[450px] rounded-2xl shadow-2xl flex flex-col ${isMinimized ? 'h-16' : 'h-[700px] max-h-[80vh]'} border border-gray-200 overflow-hidden transition-all duration-300`}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <Bot size={20} className="mr-2" />
                  {personalities[personalityMode].name}
                </h3>
                <p className="text-xs opacity-90">AI Shopping Assistant • Online</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 rounded hover:bg-white hover:bg-opacity-20">
                  <span className="text-xl leading-none font-bold mb-2">_</span>
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white hover:bg-opacity-20">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-4 flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`inline-block p-3 rounded-2xl max-w-[85%] break-words ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'}`}>
                      {msg.sender === 'bot' && (
                        <div className="flex items-center mb-2">
                          <Bot size={16} className="text-blue-600" />
                          <span className="text-xs font-semibold text-gray-600">{personalities[personalityMode].name}</span>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                      {msg.type === 'product_list' && msg.products && (
                        <div className="mt-3 space-y-2">
                          {msg.products.slice(0, 3).map(product => (
                            <div key={product.id} className="bg-gray-50 p-3 rounded-lg border text-left">
                              <div className="flex justify-between items-start">
                                <div className="flex-1 pr-2">
                                  <div className="flex items-center mb-1">
                                    <span className="text-lg mr-2">{product.image}</span>
                                    <h4 className="font-semibold text-sm">{product.name}</h4>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-blue-600">${product.price}</span>
                                    <div className="flex items-center">
                                      <Star size={12} className="text-yellow-500 mr-1 fill-current" />
                                      <span className="text-xs">{product.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors flex-shrink-0">Add</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-left mb-4">
                    <div className="inline-block p-3 rounded-2xl bg-white shadow-sm border rounded-bl-none">
                      <div className="flex items-center space-x-2">
                        <Bot size={16} className="text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
                {messages.length <= 2 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <button key={index} onClick={() => handleSendMessage(action.text)} className="flex items-center space-x-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors">
                          {action.icon}
                          <span>{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything or search..."
                    className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isTyping}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedEcommerceChat;