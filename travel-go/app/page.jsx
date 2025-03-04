
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
import { useState } from "react";
import { Toaster } from "sonner";

const categories = [{name:"Family",image:"/1.png"},{name:"Honeymoon",image:"/maldive.jpg"},{name:"Couple",image:"singapore.jpg"},{name:"Friends",image:"3.png"}]
const steps = [
  {
    step: 1,
    title: "Say Hello to Easy Travel",
    description:
      "Start your journey by sharing your travel plans with us through our website or a simple message.",
    color: "red-500",
  },
  {
    step: 2,
    title: "Let’s Plan Together",
    description:
      "Our team will connect with you to understand your travel goals and customize your experience.",
    color: "blue-500",
  },
  {
    step: 3,
    title: "Tailored Packages Just for You",
    description:
      "We’ll craft a package that perfectly suits your needs and preferences for an unforgettable trip.",
    color: "yellow-500",
  },
  {
    step: 4,
    title: "Relax and Enjoy!",
    description:
      "Sit back as we handle the details. Pack your bags and embark on your dream journey with Easy Travel.",
    color: "orange-500",
  },
];
export default function Home() {
  const [Offer, setOffer] = useState(["/1.png","/2.png","/3.png"])
  return (
    <div className="">
    <Hero />
    
    <SearchBar />
    <section className="mt-4">
      <div className=" container md:ml-10">
        <h2 className="text-2xl font-bold text-center p-4">
          Top Rated Destinations
        </h2>
        <TopDestination title="Top Rated Destinations"/>
        </div>
        </section>
   
    <section className="bg-violet-100 p-4">
      <div className=" container md:ml-10">
        <h2 className="text-2xl font-bold text-center p-4">
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
      <div className=" container md:ml-10">
        <h2 className="text-2xl font-bold text-center p-4">
          In Demand Category
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 sm:h-[80vh] container md:flex md:gap-6 md:ml-[130px] p-2 ">
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

    <div className="bg-yellow-100 py-10 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Easy & Simple Process With Easy Travel
        </h1>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
          {steps.map((step) => (
            <Card
              key={step.step}
              className={`bg-white p-6 flex md:flex-row md:items-center md:gap-4 md:border border-gray-300 rounded-lg shadow-lg`}
            >
              <div
                className={`bg-${step.color} p-4 text-white font-bold text-3xl rounded-lg`}
              >
                Step #{step.step}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {step.title}
                </h2>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <Toaster className="size-10 p-6"/>
    <div className="container items-center p-6">

    <ContactForm />
    
    <div>
      
    </div>
    </div >
          
    </div>
  );
}
