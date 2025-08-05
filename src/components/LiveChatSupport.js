
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { MessageSquare, X, Send, ShoppingCart, Package, User, Bot, Star, Truck, CreditCard, HeadphonesIcon } from "lucide-react";

const LiveChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "សួស្តី! ស្វាគមន៍មកកាន់ហាងអនឡាញរបស់យើង។ តើខ្ញុំអាចជួយអ្វីបានខ្លះ?\n\n🛍️ មើលផលិតផល\n📦 តាមដានការបញ្ជាទិញ\n💳 ពត៌មានការទូទាត់\n🚚 ការដឹកជញ្ជូន\n❓ សួរសំណួរ",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("km");
  const messagesEndRef = useRef(null);

  const products = {
    phones: [
      { id: 1, name: "iPhone 15 Pro Max", price: "$1199", rating: 4.8, stock: "In Stock", image: "📱" },
      { id: 2, name: "iPhone 15", price: "$799", rating: 4.7, stock: "In Stock", image: "📱" },
      { id: 3, name: "Samsung Galaxy S24 Ultra", price: "$1299", rating: 4.6, stock: "In Stock", image: "📱" },
      { id: 4, name: "Samsung Galaxy S24", price: "$899", rating: 4.5, stock: "Limited Stock", image: "📱" },
      { id: 5, name: "Google Pixel 8 Pro", price: "$999", rating: 4.4, stock: "In Stock", image: "📱" },
    ],
    laptops: [
      { id: 6, name: "MacBook Pro 16-inch M3", price: "$2499", rating: 4.9, stock: "In Stock", image: "💻" },
      { id: 7, name: "MacBook Air M2", price: "$1199", rating: 4.8, stock: "In Stock", image: "💻" },
      { id: 8, name: "Dell XPS 13", price: "$1099", rating: 4.6, stock: "In Stock", image: "💻" },
      { id: 9, name: "HP Spectre x360", price: "$1299", rating: 4.5, stock: "In Stock", image: "💻" },
      { id: 10, name: "Lenovo ThinkPad X1", price: "$1499", rating: 4.7, stock: "Limited Stock", image: "💻" },
    ],
    headphones: [
      { id: 11, name: "AirPods Pro 2", price: "$249", rating: 4.7, stock: "In Stock", image: "🎧" },
      { id: 12, name: "Sony WH-1000XM5", price: "$399", rating: 4.8, stock: "In Stock", image: "🎧" },
      { id: 13, name: "Bose QuietComfort", price: "$329", rating: 4.6, stock: "In Stock", image: "🎧" },
    ],
    accessories: [
      { id: 14, name: "Apple Watch Series 9", price: "$399", rating: 4.6, stock: "In Stock", image: "⌚" },
      { id: 15, name: "iPad Pro 12.9", price: "$1099", rating: 4.7, stock: "In Stock", image: "📱" },
      { id: 16, name: "Magic Keyboard", price: "$299", rating: 4.4, stock: "In Stock", image: "⌨️" },
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botResponse.text,
        timestamp: new Date(),
        products: botResponse.products,
        quickReplies: botResponse.quickReplies,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    handleSend();
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "km" ? "en" : "km"));
  };

  const ProductCard = ({ product }) => (
    <div className="border rounded-lg p-4 m-2 flex items-center space-x-4 bg-gray-100">
      <span className="text-2xl">{product.image}</span>
      <div>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-green-600">{product.price}</p>
        <p className="text-sm">Rating: {product.rating} ⭐</p>
        <p className="text-sm">Stock: {product.stock}</p>
      </div>
    </div>
  );

  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      stock: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };

  const QuickReplyButton = ({ reply, onClick }) => (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded-full m-1 hover:bg-blue-600"
      onClick={() => onClick(reply)}
    >
      {reply}
    </button>
  );

  QuickReplyButton.propTypes = {
    reply: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  const getBotResponse = (text) => {
    const q = text.toLowerCase();

    if (language === "en") {
      if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        return {
          text: "Hello! Welcome to our online store. How can I assist you today?\n\n🛍️ Browse products\n📦 Track orders\n💳 Payment info\n🚚 Shipping\n❓ Ask a question",
          quickReplies: ["View all products", "Popular products", "Special offers", "Help me choose"],
        };
      }
      if (q.includes("phone") || q.includes("mobile") || q.includes("smartphone") || q.includes("iphone") || q.includes("samsung")) {
        return {
          text: "📱 Our best phones:\n\nWhich would you like?\n• Latest iPhone?\n• Samsung Galaxy Series?\n• Phones under $500?\n• Best camera phone?",
          products: products.phones.slice(0, 3),
          quickReplies: ["iPhone", "Samsung", "Under $500", "Best camera"],
        };
      }
      if (q.includes("laptop") || q.includes("computer") || q.includes("macbook") || q.includes("pc")) {
        return {
          text: "💻 Our best laptops:\n\nFor:\n• 🎨 Creative work?\n• 💼 Business?\n• 🎮 Gaming?\n• 🎓 Students?",
          products: products.laptops.slice(0, 3),
          quickReplies: ["MacBook", "Business", "Gaming", "Students"],
        };
      }
      if (q.includes("headphone") || q.includes("earphone") || q.includes("audio") || q.includes("airpods")) {
        return {
          text: "🎧 Best headphones for:\n\n• 🎵 High-quality music\n• 🤫 Noise cancellation\n• 🏃‍♀️ Sports\n• 📞 Calls",
          products: products.headphones,
          quickReplies: ["AirPods", "Sony", "Bose", "Under $100"],
        };
      }
      if (q.includes("price") || q.includes("cost") || q.includes("expensive") || q.includes("cheap")) {
        if (q.includes("under") || q.includes("below")) {
          return {
            text: "💰 Affordable products:\n\n🔥 Special offers:\n• iPhone 15: $799 (was $899)\n• Samsung S24: $899 (was $999)\n• MacBook Air: $1199 (was $1299)\n\n⏰ Sale ends in 3 days!",
            quickReplies: ["Budget products", "Today's offers", "Financing options", "Price guarantee"],
          };
        }
        return {
          text: "💵 Please specify which product's price you'd like to know:\n\n📱 Phones: $199 - $1299\n💻 Laptops: $699 - $2499\n🎧 Headphones: $29 - $399\n⌚ Smartwatches: $199 - $799\n\nWhich product are you interested in?",
          quickReplies: ["Phones", "Laptops", "Headphones", "Smartwatches"],
        };
      }
      return { text: "Please provide more details so I can assist you!" };
    }

    // Khmer responses
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("សួស្តី") || q.includes("ជំរាបសួរ")) {
      return {
        text: "សួស្តី! ពិតជាសប្បាយចិត្តដែលបានជួបអ្នក! 😊\n\nតើអ្នកកំពុងស្វែងរក៖\n🔍 ផលិតផលជាក់លាក់មួយ?\n🛒 ការណែនាំផលិតផល?\n💰 ការប្រៀបធៀបតម្លៃ?\n📞 ជំនួយបច្ចេកទេស?",
        quickReplies: ["មើលផលិតផលទាំងអស់", "ផលិតផលពេញនិយម", "ការផ្តល់ជូនពិសេស", "ជួយខ្ញុំជ្រើសរើស"],
      };
    }
    if (q.includes("phone") || q.includes("mobile") || q.includes("smartphone") || q.includes("ទូរស័ព្ទ") || q.includes("iPhone") || q.includes("samsung")) {
      return {
        text: "📱 ទូរស័ព្ទដ៏ល្អបំផុតរបស់យើង៖\n\nតើអ្នកចង់បាន៖\n• iPhone ចុងក្រោយបំផុត?\n• Samsung Galaxy Series?\n• ទូរស័ព្ទថោកជាង $500?\n• ទូរស័ព្ទកាមេរ៉ាល្អបំផុត?",
        products: products.phones.slice(0, 3),
        quickReplies: ["iPhone", "Samsung", "ថោកជាង $500", "កាមេរ៉ាល្អ"],
      };
    }
    if (q.includes("laptop") || q.includes("computer") || q.includes("កុំព្យូទ័រ") || q.includes("macbook") || q.includes("pc")) {
      return {
        text: "💻 កុំព្យូទ័រយួរដៃដ៏ល្អបំផុត៖\n\nសម្រាប់៖\n• 🎨 ការងារច្នៃប្រឌិត?\n• 💼 ការងារធុរកិច្ច?\n• 🎮 ហ្គេម?\n• 🎓 សិស្សនិស្សិត?",
        products: products.laptops.slice(0, 3),
        quickReplies: ["MacBook", "ការងារធុរកិច្ច", "Gaming", "សិស្ស"],
      };
    }
    if (q.includes("headphone") || q.includes("earphone") || q.includes("audio") || q.includes("កាស") || q.includes("airpods")) {
      return {
        text: "🎧 កាសដ៏ល្អបំផុតសម្រាប់៖\n\n• 🎵 តន្ត្រីគុណភាពខ្ពស់\n• 🤫 បដិសេធសំលេង\n• 🏃‍♀️ កីឡា\n• 📞 ការហៅទូរស័ព្ទ",
        products: products.headphones,
        quickReplies: ["AirPods", "Sony", "Bose", "ថោកជាង $100"],
      };
    }
    if (q.includes("apple") || (q.includes("iphone") && (q.includes("15") || q.includes("pro") || q.includes("max")))) {
      return {
        text: "🍎 iPhone 15 Series - ផលិតផលថ្មីបំផុត!\n\n✨ មុខងារពិសេស៖\n• កាមេរ៉ា 48MP\n• Chip A17 Pro\n• USB-C\n• ថ្មអាយុយូរ\n\nតម្លៃចាប់ពី $799 ដល់ $1199",
        products: products.phones.filter((p) => p.name.includes("iPhone 15")),
        quickReplies: ["ប្រៀបធៀបតម្លៃ", "ពណ៌ដែលមាន", "អាចកម្មង់បាន?", "ការធានា"],
      };
    }
    if (q.includes("price") || q.includes("cost") || q.includes("តម្លៃ") || q.includes("expensive") || q.includes("cheap") || q.includes("ថោក")) {
      if (q.includes("under") || q.includes("below") || q.includes("ក្រោម") || q.includes("តិចជាង")) {
        return {
          text: "💰 ផលិតផលតម្លៃសមរម្យ៖\n\n🔥 ការផ្តល់ជូនពិសេស៖\n• iPhone 15: $799 (ពី $899)\n• Samsung S24: $899 (ពី $999)\n• MacBook Air: $1199 (ពី $1299)\n\n⏰ ការបញ្ចុះតម្លៃចប់ក្នុង 3 ថ្ងៃ!",
          quickReplies: ["ផលិតផលតម្លៃទាប", "ការផ្តល់ជូនថ្ងៃនេះ", "បង់រំលស់", "ការធានាតម្លៃ"],
        };
      }
      return {
        text: "💵 សូមបញ្ជាក់ផលិតផលដែលអ្នកចង់ដឹងតម្លៃ៖\n\n📱 ទូរស័ព្ទ: $199 - $1299\n💻 កុំព្យូទ័រ: $699 - $2499\n🎧 កាស: $29 - $399\n⌚ Smartwatch: $199 - $799\n\nតើអ្នកចង់ដឹងតម្លៃផលិតផលណា?",
        quickReplies: ["ទូរស័ព្ទ", "កុំព្យូទ័រ", "កាស", "នាឡិកាឆ្លាត"],
      };
    }
    if (q.includes("order") || q.includes("track") || q.includes("status") || q.includes("ការបញ្ជា") || q.includes("តាមដាន") || q.includes("delivery")) {
      return {
        text: "📦 តាមដានការបញ្ជាទិញ៖\n\n🔍 វិធីពិនិត្យ៖\n1️⃣ ចូលទៅ 'My Account'\n2️⃣ ជ្រើសរើស 'Order History'\n3️⃣ បញ្ចូលលេខបញ្ជាទិញ\n\n📧 ឬផ្ញើលេខបញ្ជាទិញមកខ្ញុំ\n\n🚚 ស្ថានភាពទូទៅ៖\n• កំពុងរៀបចំ: 1-2 ថ្ងៃ\n• កំពុងដឹកជញ្ជូន: 3-5 ថ្ងៃ\n• បានដល់: ទទួលបាន!",
        quickReplies: ["បញ្ចូលលេខបញ្ជា", "ស្ថានភាពដឹកជញ្ជូន", "ផ្លាស់ប្តូរអាសយដ្ឋាន", "ជំនួយបន្ថែម"],
      };
    }
    if (q.includes("shipping") || q.includes("delivery") || q.includes("ដឹកជញ្ជូន") || q.includes("នាំអោយ") || q.includes("អត់ថ្លៃ")) {
      return {
        text: "🚚 ការដឹកជញ្ជូន៖\n\n✅ ឥតគិតថ្លៃ៖\n• ការបញ្ជាលើស $50\n• សមាជិក Premium\n\n⚡ ការដឹកជញ្ជូនលឿន៖\n• រាជធានីភ្នំពេញ: 1-2 ថ្ងៃ ($5)\n• ខេត្តដទៃ: 2-3 ថ្ងៃ ($8)\n• តាមបណ្តាញ: 3-5 ថ្ងៃ (ឥតគិតថ្លៃ)\n\n📋 តម្រូវការ៖\n• អាសយដ្ឋានច្បាស់លាស់\n• លេខទូរស័ព្ទ\n• អត្តសញ្ញាណប័ណ្ណ (តម្លៃខ្ពស់)",
        quickReplies: ["តំបន់ដឹកជញ្ជូន", "ការដឹកជញ្ជូនអន្តរជាតិ", "ការធានាកញ្ចប់", "ផ្លាស់ប្តូរអាសយដ្ឋាន"],
      };
    }
    if (q.includes("payment") || q.includes("pay") || q.includes("card") || q.includes("ការទូទាត់") || q.includes("បង់ប្រាក់") || q.includes("កាត")) {
      return {
        text: "💳 វិធីទូទាត់ដែលទទួលយក៖\n\n🏦 ធនាគារក្នុងស្រុក៖\n• ABA Mobile Banking\n• ACLEDA Mobile\n• Canadia Bank\n• Wing Money\n\n💳 កាតអន្តរជាតិ៖\n• Visa\n• MasterCard\n• American Express\n\n💰 ផ្សេងៗ៖\n• PayPal\n• Cash on Delivery (COD)\n• True Money\n\n🔒 ការទូទាត់មានសុវត្ថិភាព 100%",
        quickReplies: ["ABA Pay", "កាតឥណទាន", "សាច់ប្រាក់", "ភាគតាមបាន?"],
      };
    }
    if (q.includes("warranty") || q.includes("guarantee") || q.includes("ការធានា") || q.includes("support") || q.includes("ជួសជុល")) {
      return {
        text: "🛡️ ការធានា និង ជំនួយបច្ចេកទេស៖\n\n✅ ការធានាផលិតផល៖\n• iPhone/Samsung: 1 ឆ្នាំ\n• MacBook/Laptop: 1-2 ឆ្នាំ\n• កាស/Accessories: 6 ខែ - 1 ឆ្នាំ\n\n🔧 សេវាកម្មគាំទ្រ៖\n• ជំនួយបច្ចេកទេស 24/7\n• ជួសជុលឥតគិតថ្លៃ (ក្នុងការធានា)\n• ផ្លាស់ប្តូរផលិតផល (14 ថ្ងៃ)\n\n📞 ទំនាក់ទំនង៖\n• Hotline: 023 XXX XXX\n• Email: support@shop.com",
        quickReplies: ["ពិនិត្យការធានា", "ការជួសជុល", "ត្រឡប់ផលិតផល", "ទំនាក់ទំនងជំនួយ"],
      };
    }
    if (q.includes("compare") || q.includes("vs") || q.includes("better") || q.includes("ប្រៀបធៀប") || q.includes("ល្អជាង")) {
      return {
        text: "⚖️ ការប្រៀបធៀបផលិតផល៖\n\n🔥 ការប្រៀបធៀបពេញនិយម៖\n\n📱 iPhone 15 vs Samsung S24:\n• iPhone: កាមេរ៉ាល្អ, iOS\n• Samsung: អេក្រង់ធំ, Android\n\n💻 MacBook vs Dell XPS:\n• MacBook: M3 chip, macOS\n• Dell: Windows, តម្លៃសមរម្យ\n\nតើអ្នកចង់ប្រៀបធៀបផលិតផលណា?",
        quickReplies: ["iPhone vs Samsung", "MacBook vs PC", "AirPods vs Sony", "ជ្រើសរើសឲ្យខ្ញុំ"],
      };
    }
    if (q.includes("discount") || q.includes("sale") || q.includes("promotion") || q.includes("offer") || q.includes("បញ្ចុះតម្លៃ") || q.includes("ការផ្តល់ជូន")) {
      return {
        text: "🎉 ការផ្តល់ជូនពិសេស ឥឡូវនេះ!\n\n🔥 Flash Sale - 48 ម៉ោងទៀត!\n• iPhone 15: បញ្ចុះ 15% ($799)\n• MacBook Air: បញ្ចុះ 10% ($1079)\n• Samsung S24: បញ្ចុះ 20% ($719)\n\n🎁 ការផ្តល់ជូនបន្ថែម៖\n• ទិញ 2 បាន 1 ឥតគិតថ្លៃ (កាស)\n• ការដឹកជញ្ជូនឥតគិតថ្លៃ\n• កាដូបន្ថែម 10%\n\n⏰ មិនត្រូវលើកលែងការផ្តល់ជូននេះ!",
        quickReplies: ["Flash Sale", "កុបុងបញ្ចុះតម្លៃ", "សមាជិកភាព", "ការផ្តល់ជូនថ្ងៃនេះ"],
      };
    }
    if (q.includes("spec") || q.includes("technical") || q.includes("feature") || q.includes("លក្ខណៈ") || q.includes("បច្ចេកទេស")) {
      return {
        text: "🔧 លក្ខណៈបច្ចេកទេស៖\n\nសូមជ្រើសរើសផលិតផល៖\n\n📱 iPhone 15 Pro:\n• A17 Pro chip\n• កាមេរ៉ា 48MP\n• អេក្រង់ 6.1 inch\n• ថ្ម 3279mAh\n\n💻 MacBook Pro M3:\n• M3 chip\n• RAM 8-18GB\n• SSD 512GB-8TB\n• អេក្រង់ Retina 16 inch\n\nតើចង់ដឹងលម្អិតផលិតផលណា?",
        quickReplies: ["iPhone specs", "MacBook specs", "Samsung specs", "ប្រៀបធៀប specs"],
      };
    }
    if (q.includes("stock") || q.includes("available") || q.includes("មានក្នុងស្តុក") || q.includes("អស់") || q.includes("នៅមាន")) {
      return {
        text: "📊 ស្ថានភាពស្តុកទំនិញ៖\n\n✅ មានក្នុងស្តុក៖\n• iPhone 15 Series\n• MacBook Air/Pro\n• Samsung Galaxy\n• AirPods Pro\n\n⚠️ ស្តុកមានកម្រិត៖\n• iPhone 15 Pro Max (ពណ៌ Titanium)\n• MacBook Pro 16-inch\n\n❌ អស់ស្តុក៖\n• AirPods Max (ពណ៌ Space Gray)\n\n📅 ស្តុកថ្មីមកដល់រៀងរាល់ថ្ងៃអង្គារ និង សុក្រ",
        quickReplies: ["ពិនិត្យស្តុក", "កម្មង់ជាមុន", "ជូនដំណឹងពេលមានស្តុក", "ផលិតផលដូចគ្នា"],
      };
    }
    if (q.includes("return") || q.includes("refund") || q.includes("exchange") || q.includes("ត្រឡប់") || q.includes("ប្តូរ") || q.includes("ដកប្រាក់")) {
      return {
        text: "🔄 គោលនយោបាយត្រឡប់ផលិតផល៖\n\n✅ លក្ខខណ្ឌត្រឡប់៖\n• រយៈពេល 14 ថ្ងៃ\n• ផលិតផលនៅដដែល\n• មានវិក័យប័ត្រ\n• កញ្ចប់ដើម\n\n💰 ការដកប្រាក់៖\n• ការដកប្រាក់ពេញ (មានលក្ខខណ្ឌ)\n• ត្រឡប់ក្នុង 7-10 ថ្ងៃធ្វើការ\n\n🔄 ការប្តូរ៖\n• ប្តូរផលិតផលដូចគ្នា\n• ប្តូរពណ៌/ទំហំ\n• មិនគិតថ្លៃសេវា\n\n📞 ទំនាក់ទំនងដើម្បីចាប់ផ្តើម",
        quickReplies: ["ចាប់ផ្តើមត្រឡប់", "ស្ថានភាពត្រឡប់", "លក្ខខណ្ឌលម្អិត", "ជំនួយត្រឡប់"],
      };
    }
    if (q.includes("review") || q.includes("rating") || q.includes("feedback") || q.includes("ការវាយតម្លៃ") || q.includes("មតិយោបល់")) {
      return {
        text: "⭐ ការវាយតម្លៃរបស់អតិថិជន៖\n\n🏆 ផលិតផលពេញនិយមបំផុត៖\n\n📱 iPhone 15 Pro: ⭐⭐⭐⭐⭐ (4.8/5)\n\"កាមេរ៉ាអស្ចារ្យ! ដំណើរការលឿន!\"\n\n💻 MacBook Air M2: ⭐⭐⭐⭐⭐ (4.7/5)\n\"ស្រាលបំផុត! ថ្មអាយុយូរ!\"\n\n🎧 AirPods Pro: ⭐⭐⭐⭐⭐ (4.6/5)\n\"គុណភាពសំលេងល្អ! ស្រួលស្វាយ!\"\n\n📊 អតិថិជនរបស់យើង 96% ពេញចិត្ត!",
        quickReplies: ["មើលការវាយតម្លៃទាំងអស់", "ការវាយតម្លៃថ្មីៗ", "សរសេរការវាយតម្លៃ", "រូបថតអតិថិជន"],
      };
    }
    if (q.includes("account") || q.includes("member") || q.includes("register") || q.includes("login") || q.includes("គណនី") || q.includes("សមាជិក")) {
      return {
        text: "👤 គណនី និង សមាជិកភាព៖\n\n🆓 បង្កើតគណនីឥតគិតថ្លៃ៖\n• តាមដានការបញ្ជាទិញ\n• រក្សាទុកបញ្ជីចង់បាន\n• ទទួលការផ្តល់ជូនពិសេស\n• ប្រវត្តិការទិញ\n\n⭐ សមាជិក Premium:\n• បញ្ចុះតម្លៃបន្ថែម 5%\n• ការដឹកជញ្ជូនឥតគិតថ្លៃ\n• ការគាំទ្រអាទិភាព\n• ការយកមុនគេ\n\n🎁 ចូលរួមឥឡូវនេះ ទទួលកាដូ $10!",
        quickReplies: ["បង្កើតគណនី", "ចូលគណនី", "Premium មានទ", "លុបបំភ្លេចពាក្យសម្ងាត់"],
      };
    }
    if (q.includes("help") || q.includes("support") || q.includes("problem") || q.includes("issue") || q.includes("ជំនួយ") || q.includes("បញ្ហា")) {
      return {
        text: "🆘 ជំនួយបច្ចេកទេស៖\n\n⚡ ជំនួយបន្ទាន់ 24/7:\n📞 Hotline: 023-XXX-XXX\n💬 Live Chat: ចុចនេះ\n📧 Email: support@shop.com\n\n🔧 បញ្ហាទូទៅ៖\n• មិនអាចចូលគណនី\n• ការបញ្ជាទិញមានបញ្ហា\n• ផលិតផលមានកំហុស\n• ការទូទាត់បរាជ័យ\n• ការដឹកជញ្ជូនយឺត\n\n📋 សូមរៀបរាប់បញ្ហារបស់អ្នកលម្អិត",
        quickReplies: ["ជំនួយបន្ទាន់", "FAQ", "ទំនាក់ទំនងអ្នកជំនាញ", "ការបណ្តុះបណ្តាល"],
      };
    }
    return { text: "សូមបញ្ជាក់បន្ថែម ដើម្បីឱ្យខ្ញុំអាចជួយបាន!" };
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-white w-96 h-[500px] rounded-lg shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={24} />
              <span>ShopBot</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleLanguage}
                className="text-sm bg-blue-700 px-2 py-1 rounded"
                aria-label="Toggle language"
              >
                {language === "km" ? "EN" : "KM"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot size={16} />
                      <span className="text-sm font-semibold">ShopBot</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.products && (
                    <div className="mt-2">
                      {msg.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  {msg.quickReplies && (
                    <div className="mt-2 flex flex-wrap">
                      {msg.quickReplies.map((reply, index) => (
                        <QuickReplyButton
                          key={index}
                          reply={reply}
                          onClick={handleQuickReply}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-500 text-sm">
                ShopBot is typing...
                <span className="animate-pulse">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={language === "km" ? "វាយបញ្ចូលសាររបស់អ្នក..." : "Type your message..."}
              className="flex-1 p-2 border rounded-lg focus:outline-none"
              aria-label="Chat input"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-lg"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

LiveChatSupport.propTypes = {
  // No props are passed to LiveChatSupport, so no PropTypes needed here
};

export default LiveChatSupport;
