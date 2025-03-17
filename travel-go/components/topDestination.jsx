"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDestinations, setError, setLoading } from "../app/redux/slices/destinationSlice";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton"

import { Card, CardContent } from "./ui/card";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TopDestination = () => {

  const [isClient, setIsClient] = useState(false);
  const locationData = useSelector((state)=>state.destination)
  const dispatch = useDispatch()
  console.log("topDestinations",locationData)
  const {loading,error,destinations} = locationData

  const fetchDestination = async () => {
    if (destinations && destinations.length > 0) {
      return; // Don't fetch if we already have data
    }

    try {
      dispatch(setLoading(true));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${apiUrl}/api/locations`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Optional
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(setDestinations(data));
    } catch (error) {
      console.error("Error fetching destinations:", error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
    // Handle hydration safely
    useEffect(() => {
      setIsClient(true);
    }, []);

 useEffect(()=>{
  fetchDestination()
 },[dispatch])

 if (loading) {
  return (
    <div className="w-full max-w-6xl py-6 mx-auto px-4 flex justify-center">
      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  );
}
  // Error state
  if (error) {
    return (
      <div className="w-full max-w-6xl py-6 mx-auto px-4 text-red-500">
        Error loading destinations: {error}
      </div>
    );
  }

    // Handle initial render safely
    if (!isClient || !destinations || destinations.length === 0) {
      return (
        <div className="w-full max-w-6xl py-6 mx-auto px-4">
          <div className="h-[200px] flex items-center justify-center">
          <div className="flex flex-col space-y-3">
          
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
          </div>
        </div>
      );
    }

 return (
      <div className=" w-full max-w-6xl py-6 mx-auto px-4">
        
         <Carousel>
          
         <CarouselPrevious className="ml-12 z-10"/>
         <CarouselNext className="mr-12 z-10 "/>

         
      <CarouselContent>
        {destinations.map((location, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
            <Card className="relative overflow-hidden rounded-2xl shadow-lg h-[200px] p-0">
      <CardContent className="p-0 h-full">
        <img
          src={location.images[0]}
          alt={location.name}
          className=" object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
          {location.name}
        </div>
      </CardContent>
    </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
      </div>
    );
}
export default TopDestination;



