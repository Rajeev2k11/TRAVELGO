"use client";

import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDestinations, setError } from "../app/redux/slices/destinationSlice";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import axios from "axios";
import { Card, CardContent } from "./ui/card";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TopDestination = (title) => {


  const locationData = useSelector((state)=>state.destination)
  const dispatch = useDispatch()
  console.log("topDestinations",locationData)

  const fetchDestination=async()=>{
    try {
      const location = await axios.get(`${apiUrl}/api/locations`)
      const data = await location.data
      dispatch(setDestinations(data))
    } catch (error) {
      dispatch(setError(error))
    }
  }
 useEffect(()=>{
  fetchDestination()
 },[])

 return (
      <div className=" w-full max-w-6xl py-6 mx-auto">
        
         <Carousel>
          
         <CarouselPrevious className="ml-12 z-10"/>
         <CarouselNext className="mr-12 z-10 "/>

         
      <CarouselContent>
        {locationData.destinations.map((location, index) => (
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



