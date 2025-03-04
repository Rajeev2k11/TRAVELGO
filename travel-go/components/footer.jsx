import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between gap-8">
        {/* Company Info */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold">Easy Travel</h2>
          <p className="flex items-center mt-2"><FaWhatsapp className="mr-2" /> +918340287491</p>
          <p className="flex items-center mt-1"><FaPhone className="mr-2" /> +917209236123</p>
          <p className="flex items-center mt-1"><FaMapMarkerAlt className="mr-2" /> H.Q. - 3rd Floor, Landmark Tower, Plot no-2</p>
          <p className="flex items-center mt-1"><FaEnvelope className="mr-2" /> info@tripzygo.in</p>
          <div className="flex space-x-4 mt-4">
            <FaInstagram className="text-2xl cursor-pointer" />
            <FaFacebookF className="text-2xl cursor-pointer" />
            <FaLinkedinIn className="text-2xl cursor-pointer" />
            <FaXTwitter className="text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul>
            <li>About us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cancellation Policy</li>
          </ul>
        </div>
        
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Tour</h3>
          <ul>
            <li>Maldives</li>
            <li>Manali</li>
            <li>Bali</li>
            <li>Leh Ladakh</li>
          </ul>
        </div>
        
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul>
            <li>Partnerships</li>
            <li>Get in touch</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center mt-8 text-gray-400">&copy; 2025 Easy Travel Private Limited</div>
    </footer>
  );
};

export default Footer;
