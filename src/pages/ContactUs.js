import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Contact = ({ isDarkMode, setCurrentPage }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('M45CIlOONt20h0vTk'); // Your User ID
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus(null);

    console.log('Form data:', {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
    });

    emailjs
      .sendForm(
        'service_829d9io',
        'template_x2l178l',
        form.current,
        'M45CIlOONt20h0vTk'
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSendStatus('success');
        form.current.reset();
      }, (error) => {
        console.error('Failed to send message:', error.text || error.message || error);
        setSendStatus('error');
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setSendStatus(null), 5000);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className={`py-32 min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      } relative overflow-hidden`}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Section header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <div className="inline-block mb-6">
              <div
                className={`flex items-center justify-center space-x-2 ${
                  isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-700'
                } backdrop-blur-md rounded-full px-6 py-3 border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg`}
              >
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold">Get in Touch</span>
              </div>
            </div>
            <h2
              className={`text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-200 via-blue-400 to-purple-400' : 'from-gray-800 via-blue-600 to-purple-600'
              } bg-clip-text text-transparent leading-tight`}
            >
              Contact Me
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } max-w-4xl mx-auto leading-relaxed font-light`}
            >
              Have questions or want to work together? Drop me a message!
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-8 justify-center">
            {/* Contact Info */}
            <motion.div
              className={`flex-1 min-w-[300px] p-8 rounded-xl ${
                isDarkMode
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              } backdrop-blur-md border shadow-lg`}
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <FaEnvelope className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email
                    </h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>thanseyha2002@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Phone
                    </h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>+885 186-323-203</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Location
                    </h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              ref={form}
              onSubmit={sendEmail}
              className={`flex-1 min-w-[300px] p-8 rounded-xl space-y-6 ${
                isDarkMode
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              } backdrop-blur-md border shadow-lg`}
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className={`block text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    placeholder="John Doe"
                    className={`w-full p-4 rounded-xl ${
                      isDarkMode
                        ? 'bg-gray-800/80 text-white border-gray-700'
                        : 'bg-white/80 text-gray-900 border-gray-200'
                    } backdrop-blur-md border focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className={`block text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    placeholder="john@example.com"
                    className={`w-full p-4 rounded-xl ${
                      isDarkMode
                        ? 'bg-gray-800/80 text-white border-gray-700'
                        : 'bg-white/80 text-gray-900 border-gray-200'
                    } backdrop-blur-md border focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="message"
                    className={`block text-lg font-semibold mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Hello, I'd like to talk about..."
                    className={`w-full p-4 rounded-xl ${
                      isDarkMode
                        ? 'bg-gray-800/80 text-white border-gray-700'
                        : 'bg-white/80 text-gray-900 border-gray-200'
                    } backdrop-blur-md border focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
                    isSending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  {isSending ? (
                    'Sending...'
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                {sendStatus === 'success' && (
                  <motion.div
                    className="text-green-500 bg-green-100/80 backdrop-blur-md p-4 rounded-xl text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Message sent successfully!
                  </motion.div>
                )}
                {sendStatus === 'error' && (
                  <motion.div
                    className="text-red-500 bg-red-100/80 backdrop-blur-md p-4 rounded-xl text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ❌ Failed to send message. Please try again.
                  </motion.div>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Contact;