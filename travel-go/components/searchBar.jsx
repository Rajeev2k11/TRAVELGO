"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

const handleChange =(value)=>{
    const newvalue=value.toLowerCase()
    setQuery(value)
    fetchSuggestions(newvalue)
}

  const fetchSuggestions = async (value) => {
  
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/locations");
      const data = await response.json();
      const results = data.filter((location,index)=>{
       return(
        value && location && location.name &&
        location.name.toLowerCase().includes(value)
       );
       
      })
      setSuggestions(results)
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };
console.log(suggestions,"suggestions")
  return (
    <div className="relative w-full max-w-2xl mx-auto mt-[-30px]">
      <div className="flex items-center border-4 border-violet-500 rounded-full bg-white px-4 py-2 shadow-md ">
        <input
          type="text"
          placeholder="Search destinations 'Kashmir' "
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-transparent outline-none text-lg placeholder-gray-500 p-2"
        />
        {loading ? (
          <div className="animate-spin border-t-2 border-gray-500 rounded-full w-5 h-5"></div>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
          </svg>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-md mt-2 rounded-lg overflow-hidden border border-violet-500">
          {suggestions.map((item, index) => (
          <a href={`/pages/${item.name}`}><li key={index} className="px-4 py-2 cursor-pointer hover:bg-violet-100 text-lg text-gray-900">
              {item.name}
            </li></a> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
