import React from 'react';
import PropTypes from 'prop-types';
import { Handshake, ArrowRight } from 'lucide-react';

// Mock partners data
const partners = [
  {
    id: 1,
    name: "Brand A",
    logo: "https://via.placeholder.com/150x50?text=Brand+A",
    description: "Pioneers in sustainable fashion, delivering eco-friendly apparel to conscious consumers.",
  },
  {
    id: 2,
    name: "Brand B",
    logo: "https://via.placeholder.com/150x50?text=Brand+B",
    description: "Innovators in tech gadgets, crafting cutting-edge devices for modern lifestyles.",
  },
  {
    id: 3,
    name: "Brand C",
    logo: "https://via.placeholder.com/150x50?text=Brand+C",
    description: "Leaders in home essentials, offering premium quality for everyday living.",
  },
];

const Partnerships = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Partners</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We collaborate with industry-leading brands to bring you the best in quality and innovation.
          </p>
          <button 
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-all duration-300"
            onClick={() => setCurrentPage('contact')} // Navigate to contact page
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Network</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Interested in partnering with us? Let's create something extraordinary together.
          </p>
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={() => setCurrentPage('contact')} // Navigate to contact page
          >
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
};

// PropTypes for Partnerships
Partnerships.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Partnerships;