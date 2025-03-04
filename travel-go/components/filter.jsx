"use client";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const themes = ["Honeymoon", "Family", "Friends", "Groups"];
const durations = ["1-3 Days", "4-7 Days", "8-10 Days", "10+ Days"];
const prices = ["0-7999 INR", "7999-17999 INR", "17999-24999 INR", "24999-33999 INR", "Above 34000 INR"];

const Filter = ({ onFilterChange }) => {
  const [filteredBy, setFilteredBy] = useState({
    theme: [],
    duration: [],
    price: [],
  });

  // ✅ Use `useEffect` to update the parent component AFTER state updates
  useEffect(() => {
    onFilterChange(filteredBy);
  }, [filteredBy, onFilterChange]); // Runs only when `filteredBy` changes

  const handleCheckboxChange = (category, value) => {
    setFilteredBy((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value]; // Use spread operator to avoid mutation
      }
      return updatedFilters;
    });
  };

  return (
    <Accordion type="multiple" defaultValue={["item-1"]} className="w-full px-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>Theme</AccordionTrigger>
        <AccordionContent>
          {themes.map((theme) => (
            <div key={theme} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={theme}
                checked={filteredBy.theme.includes(theme)}
                onCheckedChange={() => handleCheckboxChange("theme", theme)}
              />
              <label htmlFor={theme} className="text-sm font-medium leading-none px-2">
                {theme}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Duration</AccordionTrigger>
        <AccordionContent>
          {durations.map((duration) => (
            <div key={duration} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={duration}
                checked={filteredBy.duration.includes(duration)}
                onCheckedChange={() => handleCheckboxChange("duration", duration)}
              />
              <label htmlFor={duration} className="text-sm font-medium leading-none px-2">
                {duration}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent>
          {prices.map((price) => (
            <div key={price} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={price}
                checked={filteredBy.price.includes(price)}
                onCheckedChange={() => handleCheckboxChange("price", price)}
              />
              <label htmlFor={price} className="text-sm font-medium leading-none px-2">
                {price}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
