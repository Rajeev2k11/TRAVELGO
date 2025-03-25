"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDestinations, setError, setLoading } from "../app/redux/slices/destinationSlice";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "./ui/card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TopDestination = ({ initialDestinations = null }) => {
  const [isClient, setIsClient] = useState(false);
  const fetchingRef = useRef(false);
  const dispatch = useDispatch();
  const { loading, error, destinations } = useSelector((state) => state.destination);

  // Handle hydration safely
  useEffect(() => {
    setIsClient(true);
    
    // Use initial data if provided (from SSR/SSG)
    if (initialDestinations && initialDestinations.length > 0) {
      dispatch(setDestinations(initialDestinations));
    }
  }, [initialDestinations, dispatch]);

  const fetchDestination = async () => {
    // Don't fetch if we already have data or are currently fetching
    if ((destinations && destinations.length > 0) || fetchingRef.current) {
      return;
    }

    fetchingRef.current = true;
    
    try {
      dispatch(setLoading(true));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      // Check if browser cache has this data
      const response = await fetch(`${apiUrl}/api/locations`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=3600' // Cache for 1 hour
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      dispatch(setDestinations(data));
      
      // Store in localStorage for a quick fallback
      localStorage.setItem('destinations', JSON.stringify(data));
      
    } catch (error) {
      console.error("Error fetching destinations:", error);
      
      // Try to load from localStorage as fallback
      const cachedData = localStorage.getItem('destinations');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        dispatch(setDestinations(parsedData));
      } else {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (isClient) {
      fetchDestination();
    }
  }, [isClient, dispatch]);

  // Loading skeletons
  const renderSkeletons = () => (
    <div className="w-full max-w-6xl py-6 mx-auto px-4 flex justify-center">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[200px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return renderSkeletons();
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
    return renderSkeletons();
  }

  return (
    <div className="w-full max-w-6xl py-6 mx-auto px-4">
      <Carousel className="relative">
        <CarouselPrevious className=" z-10 absolute left-0 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className=" z-10 absolute right-0 top-1/2 transform -translate-y-1/2" />
        
        <CarouselContent>
          {destinations.map((location, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <Card className="relative overflow-hidden rounded-2xl shadow-lg h-[200px] p-0">
                  <CardContent className="p-0 h-full">
                    <img
                      src={location.images[0]}
                      alt={location.name}
                      className="object-cover w-full h-full"
                      loading="lazy" // Lazy load images
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
};

export default TopDestination;