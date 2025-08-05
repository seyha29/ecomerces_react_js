import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Handshake, ArrowRight, Star, Users, TrendingUp, Award, ExternalLink, ChevronDown } from 'lucide-react';

// Enhanced partners data with more details
export const partners = [
  {
    id: 1,
    name: "TechFlow Innovations",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=60&fit=crop&crop=center",
    description: "Leading the digital transformation with cutting-edge AI solutions and cloud technologies that power the future.",
    website: "https://techflow-innovations.com",
    category: "Technology",
    rating: 4.9,
    projects: 150,
    founded: "2019",
    partnership_year: "2022",
    stats: { projects: 150, revenue: "$5M", satisfaction: 98 },
    tags: ["AI", "Cloud", "Innovation"]
  },
  {
    id: 2,
    name: "EcoVision Studios",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=60&fit=crop&crop=center",
    description: "Sustainable design pioneers creating eco-friendly solutions that harmonize innovation with environmental responsibility.",
    website: "https://ecovision-studios.com",
    category: "Design",
    rating: 4.8,
    projects: 200,
    founded: "2020",
    partnership_year: "2021",
    stats: { projects: 200, revenue: "$3.2M", satisfaction: 96 },
    tags: ["Sustainable", "Design", "Eco-friendly"]
  },
  {
    id: 3,
    name: "Quantum Dynamics",
    logo: "https://th.bing.com/th/id/OIP.-CZzN-X82D5ePMynueVxQQHaEB?w=310&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    description: "Next-generation quantum computing solutions revolutionizing data processing and computational capabilities.",
    website: "https://quantum-dynamics.com",
    category: "Science",
    rating: 5.0,
    projects: 75,
    founded: "2021",
    partnership_year: "2023",
    stats: { projects: 75, revenue: "$4.8M", satisfaction: 99 },
    tags: ["Quantum", "Computing", "Innovation"]
  },
  {
    id: 4,
    name: "GreenTech Solutions",
    logo: "https://th.bing.com/th/id/R.530e9452089ec18aedb9ec7acbe80d99?rik=DyTsJ4tr%2fg4XUA&pid=ImgRaw&r=0",
    description: "Environmental technology leaders creating sustainable solutions for a greener tomorrow.",
    website: "https://greentech-solutions.com",
    category: "Clean Energy",
    rating: 4.7,
    projects: 15,
    founded: "2020",
    partnership_year: "2023",
    stats: { projects: 15, revenue: "$4.2M", satisfaction: 97 },
    tags: ["Sustainable", "Clean Energy", "Innovation"]
  }
];

const stats = [
  { icon: Users, value: "50+", label: "Global Partners" },
  { icon: TrendingUp, value: "$12M+", label: "Combined Revenue" },
  { icon: Award, value: "98%", label: "Satisfaction Rate" },
  { icon: Star, value: "4.9/5", label: "Partner Rating" }
];

const Partnerships = ({ setCurrentPage }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Handshake className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Trusted by Industry Leaders</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Meet Our Partners
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              We collaborate with industry-leading brands to bring you the best in quality, innovation, and sustainable growth. Together, we're shaping the future of business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                onClick={() => setCurrentPage('contact')}
              >
                <span className="flex items-center justify-center">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                onClick={() => document.getElementById('partners-section').scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center justify-center">
                  Explore Partners
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 mx-auto">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Partners Section */}
      <section id="partners-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building lasting relationships with brands that share our vision for excellence and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${hoveredCard === partner.id ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredCard(partner.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-8 relative z-10">
                  {/* Partner Logo */}
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto object-contain rounded-xl shadow-md"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {partner.category}
                      </span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        Since {partner.partnership_year}
                      </span>
                    </div>
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{partner.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{partner.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{partner.stats.projects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{partner.stats.revenue}</div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{partner.stats.satisfaction}%</div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    Learn More
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Join Our Network?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Partner with us to unlock new opportunities, drive innovation, and create extraordinary value together. 
              Let's build the future of business collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                className="group bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                onClick={() => setCurrentPage('contact')}
              >
                <span className="flex items-center justify-center">
                  <Handshake className="mr-3 w-6 h-6" />
                  Start Partnership
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm opacity-75">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span>Join 50+ successful partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold">{selectedPartner.name}</h3>
                <button 
                  onClick={() => setSelectedPartner(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedPartner.logo}
                alt={selectedPartner.name}
                className="h-20 w-auto object-contain mb-6"
              />
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedPartner.description}</p>
              <div className="space-y-4">
                <div><strong>Category:</strong> {selectedPartner.category}</div>
                <div><strong>Partnership Since:</strong> {selectedPartner.partnership_year}</div>
                <div><strong>Completed Projects:</strong> {selectedPartner.stats.projects}</div>
                <div><strong>Generated Revenue:</strong> {selectedPartner.stats.revenue}</div>
                <div><strong>Satisfaction Rate:</strong> {selectedPartner.stats.satisfaction}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Partnerships.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Partnerships;