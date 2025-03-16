
"use client"

import BestPackage from "@/components/bestPackage";

import ContactForm from "@/components/contactForm";

import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import SearchBar from "@/components/searchBar";
import TopDestination from "@/components/topDestination";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";



const categories = [{name:"Family",image:"/1.png"},{name:"Honeymoon",image:"/maldive.jpg"},{name:"Couple",image:"singapore.jpg"},{name:"Friends",image:"3.png"}]

export default function Home() {
  const [Offer, setOffer] = useState(["/1.png","/2.png","/3.png"])

  
  return (
    <div className="">
    <Hero />
   
    <SearchBar />
    <section className="mt-4">
      <div className="">
        <h2 className="text-2xl font-bold text-center p-4">
          Top Rated Destinations
        </h2>
        <TopDestination title="Top Rated Destinations"/>
        </div>
        </section>
   
    <section className="bg-violet-100 p-4">
      <div className="md:ml-10">
        <h2 className="text-2xl font-bold text-center md:p-4">
          Best Packages for You
        </h2>
          <BestPackage />
        </div>
        </section>
    <Gallery />
    <section className="md:container md:ml-18">

    <div className=" md:px-16 p-6 ">
       
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
                <CarouselContent className="h-[40vh]">
                  {Offer?.map((imageurl, index) => (
                    <CarouselItem key={index} className="rounded-md">
                      <Image
                        width={600}
                        height={400}
                        src={imageurl}
                        alt={imageurl}
                        className="w-full h-[400px] md:h-[400px] object-fit rounded-md"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            
    </div>
    </section>
    <section className="mt-4  py-4 pb-10 md:h-[50vh]">
      <div className=" ">
        <h2 className="text-2xl font-bold text-center p-4">
          In Demand Category
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 sm:h-[80vh] md:flex md:gap-6 p-2 justify-center">
        {categories.map((cat,index)=>
        <Card key={index} className="relative overflow-hidden rounded-2xl shadow-lg md:h-[250px] md:w-[250px] h-[170] w-[170px] my-2" >
      <CardContent className="p-0 h-full">
        <img
          src={cat.image}
          alt={cat.name}
          className=" object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
          {cat.name}
        </div>
      </CardContent>
    </Card>)}
    </div>
        </div>
        </section>
    {/* Our process */}

    <div className="py-10 px-6 flex justify-center">
   
  <p>Your browser does not support HTML video.</p>

   
    </div>

    {/* Contact Form */}
    <Toaster className="size-10 p-6"/>
    <div className=" flex justify-evenly p-6 md:px-16">
    <div className="hidden md:block">
      <img src="/4563.jpg" alt="image" className="w-200 h-120"/>
      </div>
    <ContactForm />
    
    </div >
          
    </div>
  );
}
