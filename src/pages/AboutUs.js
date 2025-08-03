import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df')] bg-cover bg-center opacity-20"></div>
        <div className="relative text-center text-white px-6 py-16 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl animate-slideInDown">
            MODERNSTORE
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed animate-slideInUp">
            Pioneering the future of eCommerce with cutting-edge technology, unparalleled quality, and a passion for customer satisfaction.
          </p>
          <a
            href="#mission"
            className="mt-8 inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
          >
            Discover Our Mission
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At MODERNSTORE, we are committed to transforming the shopping experience by offering a curated selection of premium products, seamless navigation, and innovative solutions tailored to your needs. Our platform combines style, convenience, and trust to deliver a shopping journey like no other.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-600">Innovation</h3>
            <p className="mt-4 text-gray-600">
              Leveraging the latest technology to create a fast, intuitive, and secure shopping platform.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-600">Quality</h3>
            <p className="mt-4 text-gray-600">
              Curating only the best products from trusted brands to ensure customer satisfaction.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-600">Customer First</h3>
            <p className="mt-4 text-gray-600">
              Building a community-driven platform with exceptional support and personalized experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline CSS for animations and smooth scroll
const styles = `
  html {
    scroll-behavior: smooth;
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideInDown {
    animation: slideInDown 0.6s ease-out forwards;
  }

  .animate-slideInUp {
    animation: slideInUp 0.6s ease-out forwards;
    animation-delay: 0.2s;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default AboutUs;