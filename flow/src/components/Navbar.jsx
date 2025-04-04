import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaSearch } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      {/* Top Contact Bar - Dark Blue */}
      <div className="bg-[#4682c4] text-white text-sm py-2 px-6 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-200" />
              <span>0427-2262889</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-200" />
              <span>flowaircompressor@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:text-blue-200 transition">Support</button>
            <button className="hover:text-blue-200 transition">FAQ</button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.jpg" alt="Flow Air Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setActive(item.name)}
                  className={`relative py-2 px-4 text-sm font-medium transition-colors rounded-md ${
                    active === item.name
                      ? "bg-[#4682c4] text-white font-semibold"
                      : "text-[#4682c4] hover:bg-[#4682c4] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-40"
                />
              </div>
              <Link
                to="/contact"
                className="bg-[#4682c4] hover:bg-[#3a6da3] text-white font-medium py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#4682c4] focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-6 py-4 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    setActive(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-md text-center ${
                    active === item.name
                      ? "bg-[#4682c4] text-white"
                      : "text-[#4682c4] hover:bg-[#4682c4] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="relative mb-4">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                  />
                </div>
                <Link
                  to="/contact"
                  className="block text-center bg-[#4682c4] hover:bg-[#3a6da3] text-white font-medium py-2 px-6 rounded-full transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;