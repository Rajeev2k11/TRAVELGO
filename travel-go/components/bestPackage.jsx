import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {PackageCard} from './packageCard'
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "@/app/redux/slices/destinationSlice";
import { setPackage } from "@/app/redux/slices/packageSlice";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const BestPackage = () => {
  const Packagess = useSelector((state) => state.package);
  const dispatch = useDispatch();
  const [bestPackages,setBestPackage] = useState([])

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
    const fetchData = async () => {
      await fetchPackages();  // Ensures API data is fetched before setting loading to false
      dispatch(setLoading(false)); // Only set loading after fetching
    };
    fetchData();
  }, [dispatch]); 
 
  
  useEffect(()=>{
    if (Packagess?.packages && Packagess.packages.length > 0) {
    const setbestPackages = Packagess?.packages?.filter((pkg)=>pkg.rating>4.8)
    setBestPackage(setbestPackages)}
  },[Packagess])
    

  console.log("bestpkg", bestPackages,Packagess)


  return (
    <div className=" w-full max-w-7xl py-4 mx-auto">
      
     { Packagess?.loading && <div className="w-full max-w-6xl py-6 mx-auto px-4">
      <div className="h-[200px] flex items-center justify-center">
      <div className="flex flex-col space-y-3">
      
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
      </div>
    </div>}
    <Carousel>
     


    
 <CarouselContent>
   {bestPackages?.map((pkg, index) => (
     <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
       <div className="p-1">
        <PackageCard pkg={pkg}/>
       </div>
     </CarouselItem>
   ))}
 </CarouselContent>
 <CarouselPrevious className="ml-12 z-10"/>
 <CarouselNext className="md:mr-9 mr-17 z-10 "/>
</Carousel>
 </div>
  );
};

export default BestPackage;
