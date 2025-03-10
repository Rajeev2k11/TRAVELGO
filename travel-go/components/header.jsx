"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("Navbar",menuOpen)
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
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-md absolute w-full left-0 top-16 p-4 flex flex-col space-y-4 text-white">
          <a href="/" className="hover:text-violet-500">Home</a>
          <Dropdown title="Destinations" isMobile />
          <Dropdown title="Themes" isMobile />
          <a href="/blogs" className="hover:text-violet-500">Blogs</a>
          <a href="/trip-planner" className="relative hover:text-violet-500">
            Trip Planner
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
          </a>
          <a href="/contact" className="hover:text-violet-500">Contact Us</a>
        </div>
      )}
    </nav>
  );
};

// Updated Dropdown Component
const Dropdown = ({ title, isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const destinations = {
    Destinations: [
      { name: "Ladakh", link: "/pages/Ladakh", trending: true },
      { name: "Kerala", link: "/pages/Kerala" },
      { name: "Kashmir", link: "/pages/Kashmir" },
      { name: "Andaman", link: "/pages/Andaman" },
      { name: "Rajasthan", link: "/pages/Rajasthan" },
    ],
    Themes: [
      { name: "Groups", link: "/pages/Groups" },
      { name: "Friends", link: "/pages/Friends" },
      { name: "Honeymoon", link: "/pages/Honeymoon" },
      { name: "Family", link: "/pages/Family" },
    ],
  };

  return (
    <div 
      className="relative text-[16px]"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setTimeout(() => setOpen(false), 400)}
    >
      <button 
        className="hover:text-gray-300 flex items-center"
        onClick={() => isMobile && setOpen(!open)}
      >
        {title} {open ? <FaAngleUp className="ml-1" />:<FaAngleDown className="ml-1" />}
      </button>
      {open && destinations[title] && (
        <div 
          className="absolute left-0 mt-2 w-60 bg-white text-black shadow-md py-2 z-50"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="w-full px-2">
            {destinations[title].map((dest) => (
              <a
                key={dest.name}
                href={dest.link}
                className="block px-4 py-2 hover:bg-violet-200 items-center text-[16px]"
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
      )}
    </div>
  );
};
export default Navbar;