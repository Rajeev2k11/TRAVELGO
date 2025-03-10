"use client";
import {

  useParams,
} from "next/navigation";
import { DestinationCard } from "../../../components/destinationCard";

import { FaLocationDot } from "react-icons/fa6";
import { IoMdPricetag } from "react-icons/io";
import { GiIndiaGate } from "react-icons/gi";
import { LiaFilterSolid } from "react-icons/lia";
import {DialogForm} from "@/components/modalform"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
// import CardPackage from "@/components/card";
import Filter from "@/components/filter";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/app/redux/slices/destinationSlice";
import { setPackage } from "@/app/redux/slices/packageSlice";
import axios from "axios";
import { setDestinations } from "../../redux/slices/destinationSlice";
import {PackageCard} from "../../../components/packageCard";

const page = () => {
  const location = useParams().location;
const [loading, setLoading] = useState(true);
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const [filters, setFilters] = useState({
  theme: [], 
  duration: [],
  price: [],
});
const [showDialog, setShowDialog] = useState(false);
const hasShownRef = useRef(false);
  const locationData = useSelector((state) => state.destination);
  const Packagess = useSelector((state) => state.package);
  const dispatch = useDispatch();


  // Show Dialog after 2 seconds (only once)
  useEffect(() => {
    if (!hasShownRef.current) {
      const timer = setTimeout(() => {
        setShowDialog(true);
        hasShownRef.current = true;
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Show Dialog when mouse leaves the page (exit intent)
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Only trigger when mouse moves to the top of the page
      e.preventDefault();
      if (e.clientY <= 0 && !hasShownRef.current) {
        setShowDialog(true);
        hasShownRef.current = true;
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  const fetchLocations = async () => {
    try {
      const locations = await axios.get(`${apiUrl}/api/locations/`);
      const data = await locations.data;
      dispatch(setDestinations(data));
    } catch (error) {
      dispatch(setError(error));
    }
  };

  const fetchPackages = async () => {
    try {
      const packages = await axios.get(`${apiUrl}/api/packages/`);
      const data = await packages.data;
      dispatch(setPackage(data));
    } catch (error) {
      dispatch(setError(error));
    }
  };

 

  useEffect(() => {
    fetchLocations();
    fetchPackages();
    setLoading(false)
  }, []);

console.log("dynamic route", location)
 
  const locationfound = locationData.destinations.find(
    (lname) => lname.name.split(" ")[0].toLowerCase() === location.toLowerCase()
  );
  const packagefound = Packagess.packages.filter((pname) => pname.location.split(" ")[0].toLowerCase() === location.toLowerCase());

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredPackages = useMemo(() => {
    return packagefound.filter((pkg) => {
      const matchesTheme = filters.theme.length === 0 || filters.theme.includes(pkg.theme);
      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.some((d) => {
          if (d === "1-3 Days") return pkg.duration.day >= 1 && pkg.duration.day <= 3;
          if (d === "4-7 Days") return pkg.duration.day >= 4 && pkg.duration.day <= 7;
          if (d === "8-10 Days") return pkg.duration.day >= 8 && pkg.duration.day <= 10;
          if (d === "10+ Days") return pkg.duration.day > 10;
          return false;
        });

      const matchesPrice =
        filters.price.length === 0 ||
        filters.price.some((p) => {
          if (p === "0-7999 INR") return pkg.price <= 7999;
          if (p === "7999-17999 INR") return pkg.price > 7999 && pkg.price <= 17999;
          if (p === "17999-24999 INR") return pkg.price > 17999 && pkg.price <= 24999;
          if (p === "24999-33999 INR") return pkg.price > 24999 && pkg.price <= 33999;
          if (p === "Above 34000 INR") return pkg.price > 34000;
          return false;
        });

      return matchesTheme && matchesDuration && matchesPrice;
    });
  },[filters,packagefound]);


  if (loading) return <div>Loading...</div>;
  if (!locationfound)
    return <p className="mt-8">Loading or Location Not Found...</p>;

  
  return (
    <div className=" w-full">
      <div>
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {locationfound.images?.map((imageurl, index) => (
              <CarouselItem key={index}>
                <Image
                  width={800}
                  height={800}
                  src={imageurl}
                  alt={location}
                  className="w-full h-[400px] md:h-[400px] object-cover object-bottom"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <DialogForm showDialog={showDialog} setShowDialog={setShowDialog} name={locationfound?.name} data="location"/>
      <div className="bg-[#2463EB]">
        <div className="container md:px-16 px-4 flex justify-between align-center items-center text-white md:ml-10">
          <div className="p-2">
            <p className="p-1 font-bold text-sm md:text-lg">LOCATION</p>
            <span className="flex">
              <span className="p-1">
                <FaLocationDot />
              </span>
              <h1 className="text-sm md:text-md">{location}</h1>
            </span>
          </div>
          <div className="p-2 px-4">
            <p className="p-1 font-bold text-sm md:text-lg">AVG. PRICE</p>
            <span className="flex">
              <span className="p-1">
                <IoMdPricetag />
              </span>
              <h1 className="text-sm md:text-md">
                INR {locationfound.avg_price}/-*
              </h1>
            </span>
          </div>
          <div className="p-2 sm:block hidden">
            <p className="p-1 font-bold text-sm md:text-lg">TOP ATTRACTION</p>
            <span className="flex">
              <span >
                <GiIndiaGate />
              </span>
              <h1 className="text-sm md:text-md">
                {locationfound.top_attraction}
              </h1>
            </span>
          </div>
        </div>
      </div>
      {/* Details about location */}
      <div className="conatiner bg-violet-100 rounded-sm p-8 m-6 px-10">
        <DestinationCard destination={locationfound.about} />
      </div>
      {/* filter and packages */}

      <div className="flex flex-col md:flex-row md:mx-8 mb-6 mx-4 md:container">
        <div className="flex md:order-2 sm:order-1 border max-h-[700px] shadow-md rounded-md">
          <div className="w-[300px] mt-4">
            <span className="flex px-2">
              <span className="p-1">
                <LiaFilterSolid />
              </span>
              <h1>Filters</h1>
            </span>
            <Filter onFilterChange={handleFilterChange}/>
          </div>
        </div>

        <div className="flex flex-wrap md:order-1 sm:order-2 md:ml-12 md:w-[140vh]">
          {filteredPackages.map((pkg, index) => (
            <div className="px-1 py-3 mx-1" key={index}>
              <PackageCard pkg={pkg}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
