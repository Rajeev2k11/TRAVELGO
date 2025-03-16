'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    }  else if (!/^\d{10}$/.test(formData.contact)){
      newErrors.contact = "Contact number must be 10 digits.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      sendData()
    } else {
      setErrors(validationErrors);
    }
  };
  const sendData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/formdata`, formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.status >= 200 && response.status < 300) {
        
        toast.success("Event has been created", {
          title: "✅ Success!",
          description: "Your form has been submitted successfully.",
          duration: 4000,
        })
        setFormData({ name: "", contact: "", email: "", message: "" });
      } 
     
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to submit form: " + (error.response?.data?.error || error.message));
    }
  };
  return (
    <div className="w-100 border p-6 rounded-xl shadow md:mr-10">
    
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Plan Your Dream Trip ✈️
        </h2>
        

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your travel plans"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"

            className="w-full py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Submit Request
          </motion.button>
        </form>

    </div>
  );
};

export default ContactForm;
