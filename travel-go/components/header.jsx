"use client";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaAngleDown, FaAngleUp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("Navbar", menuOpen);
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-50 backdrop-blur-md bg-gradient-to-b from-black/40 via-black/10 to-transparent shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between ">
        {/* Logo */}
        <a href="/" className="text-white font-bold text-2xl flex items-center">
          <span className="text-white">MYTRAVEL</span>
          <span className="text-red-500">GO✈️</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-[16px]">
          <a href="/" className="hover:text-violet-500">Home</a>
          <Dropdown title="Destinations" />
          <Dropdown title="Themes" />
          <a href="/blogs" className="hover:text-violet-500">Blogs</a>
          <a href="/trip-planner" className="relative hover:text-violet-500">
            Trip Planner
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
          </a>
          <a href="/contact" className="hover:text-violet-500">Contact Us</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Sidebar  */}
      <div className={`md:hidden w-[85%] fixed inset-0 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ backgroundColor: 'white' }}>
        <div className="flex justify-end p-4 border-b">
          <button onClick={() => setMenuOpen(false)} className="text-black">
            <FiX size={24} />
          </button>
        </div>

        <MobileSidebar onClose={() => setMenuOpen(false)} />
      </div>
    </nav>
  );
};

// Mobile Sidebar Component
const MobileSidebar = ({ onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  // Define dropdown items
  const destinations = [
    { name: "Ladakh", link: "/pages/Ladakh", trending: true },
    { name: "Kerala", link: "/pages/Kerala" },
    { name: "Kashmir", link: "/pages/Kashmir" },
    { name: "Andaman", link: "/pages/Andaman" },
    { name: "Rajasthan", link: "/pages/Rajasthan" },
    { name: "Himachal", link: "/pages/Himachal" },
  ];

  const themes = [
    { name: "Groups", link: "/pages/Groups" },
    { name: "Friends", link: "/pages/Friends" },
    { name: "Honeymoon", link: "/pages/Honeymoon" },
    { name: "Family", link: "/pages/Family" },
  ];

  return (
    <div className="h-full bg-white">
      <nav className="flex flex-col bg-white">
        {/* Home */}
        <div className="border-b">
          <a href="/" className="flex items-center px-4 py-3" onClick={onClose}>
            <span className="text-md font-medium">Home</span>
          </a>
        </div>

        {/* Destinations */}
        <div className="border-b">
          <div 
            className="flex items-center justify-between px-4 py-3 cursor-pointer"
            onClick={() => toggleMenu('destinations')}
          >
            <div className="flex items-center">
              <span className="text-md font-medium">Destinations</span>
            </div>
            {expandedMenu === 'destinations' ? <FaAngleUp /> : <FaAngleDown />}
          </div>

          {expandedMenu === 'destinations' && (
            <div className="bg-gray-50 px-8 py-2">
              <ul>
                {destinations.map((dest, index) => (
                  <li key={index} className="py-3 border-b border-gray-200 last:border-0">
                    <a href={dest.link} className="block flex items-center" onClick={onClose}>
                      {dest.name}
                      {dest.trending && (
                        <span className="ml-2 bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Trending
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Themes */}
        <div className="border-b">
          <div 
            className="flex items-center justify-between px-4 py-3 cursor-pointer"
            onClick={() => toggleMenu('themes')}
          >
            <div className="flex items-center">
              <span className="text-md font-medium">Themes</span>
            </div>
            {expandedMenu === 'themes' ? <FaAngleUp /> : <FaAngleDown />}
          </div>

          {expandedMenu === 'themes' && (
            <div className="bg-gray-50 px-8 py-2">
              <ul>
                {themes.map((theme, index) => (
                  <li key={index} className="py-3 border-b border-gray-200 last:border-0">
                    <a href={theme.link} className="block" onClick={onClose}>
                      {theme.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Blogs */}
        <div className="border-b">
          <a href="/blogs" className="flex items-center px-4 py-3" onClick={onClose}>
            <span className="text-md font-medium">Blogs</span>
          </a>
        </div>

        {/* Trip Planner */}
        <div className="border-b">
          <a href="/trip-planner" className="flex items-center px-4 py-3" onClick={onClose}>
            <div className="flex items-center">
              <span className="text-md font-medium">Trip Planner</span>
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
                New
              </span>
            </div>
          </a>
        </div>

        {/* Contact Us */}
        <div className="border-b">
          <a href="/contact" className="flex items-center px-4 py-3" onClick={onClose}>
            <span className="text-md font-medium">Contact Us</span>
          </a>
        </div>


      <div className="mt-8 px-4 pb-8 h-[100vh] bg-white">
        <div className="flex items-center justify-center mb-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Ask AI</button>
        </div>
        <h3 className="text-center text-md font-medium text-violet-800 mb-6">Follow us on</h3>
        <div className="flex justify-center space-x-3">
          <a href="#" className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center text-white">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center text-white">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center text-white">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center text-white">
            <FaYoutube size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center text-white">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
      </nav>
    </div>
  );
};

// Dropdown Component for Desktop
const Dropdown = ({ title, isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const destinations = {
    Destinations: [
      { name: "Ladakh", link: "/pages/Ladakh", trending: true },
      { name: "Kerala", link: "/pages/Kerala" },
      { name: "Kashmir", link: "/pages/Kashmir" },
      { name: "Andaman", link: "/pages/Andaman" },
      { name: "Rajasthan", link: "/pages/Rajasthan" },
      { name: "Himachal", link: "/pages/Himachal" },
    ],
    Themes: [
      { name: "Groups", link: "/pages/Groups" },
      { name: "Friends", link: "/pages/Friends" },
      { name: "Honeymoon", link: "/pages/Honeymoon" },
      { name: "Family", link: "/pages/Family" },
    ],
  };

  // Calculate and update height when content changes or when opened/closed
  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open, destinations]);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      // Clear any existing timeout to prevent closing
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Use a ref to store the timeout ID so it can be cleared if needed
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative text-[16px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="hover:text-gray-300 flex items-center transition-colors duration-300"
        onClick={() => isMobile && setOpen(!open)}
      >
        {title} {open ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}
      </button>
      
      <div 
        className={`absolute left-0 mt-2 w-60 bg-white text-black shadow-md overflow-hidden transition-all duration-300 z-50`}
        style={{ 
          maxHeight: `${height}px`, 
          opacity: height > 0 ? 1 : 0,
          visibility: height > 0 ? 'visible' : 'hidden'
        }}
      >
        <div ref={contentRef} className="w-full px-2 py-2">
          {destinations[title] && destinations[title].map((dest) => (
            <a
              key={dest.name}
              href={dest.link}
              className="block px-4 py-2 hover:bg-violet-200 items-center text-[16px] transition-colors duration-200"
            >
              {dest.name}
              {dest.trending && (
                <span className="ml-2 bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  Trending
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;