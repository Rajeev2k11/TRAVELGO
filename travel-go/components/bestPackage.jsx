import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {PackageCard} from './packageCard'
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "@/app/redux/slices/destinationSlice";
import { setPackage } from "@/app/redux/slices/packageSlice";
import axios from "axios";

const BestPackage = () => {
  const Packagess = useSelector((state) => state.package);
  const dispatch = useDispatch();

  const fetchPackages = async () => {
    try {
      const packages = await axios.get("http://localhost:5001/api/packages/");
      const data = await packages.data;
      dispatch(setPackage(data));
    } catch (error) {
      dispatch(setError(error));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchPackages();  // Ensures API data is fetched before setting loading to false
      dispatch(setLoading(false)); // Only set loading after fetching
    };
    fetchData();
  }, [dispatch]); 
  console.log("bestpkg", Packagess)
  return (
    <div className=" w-full max-w-7xl py-4 mx-auto">
        
    <Carousel>
     


    
 <CarouselContent>
   {Packagess.packages.map((pkg, index) => (
     <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
       <div className="p-1">
        <PackageCard pkg={pkg}/>
       </div>
     </CarouselItem>
   ))}
 </CarouselContent>
 <CarouselPrevious className="ml-12 z-10"/>
 <CarouselNext className="mr-12 z-10 "/>
</Carousel>
 </div>
  );
};

export default BestPackage;
