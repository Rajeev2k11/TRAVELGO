import React from "react";
import { Card } from "@/components/ui/card";

const destinations = [
    { id: 1, src: "/singapore.jpg", alt: "Kashmir", size: "sm" },
    { id: 2, src: "/maldive.jpg", alt: "Kerala", size: "lg" },
    { id: 3, src: "/thailand.jpg", alt: "Ladakh", size: "md" },
    { id: 4, src: "/london.jpg", alt: "Rajastahn", size: "sm" },
    { id: 5, src: "/singapore.jpg", alt: "Andaman", size: "sm" },
    { id: 6, src: "/london.jpg", alt: "Himachal", size: "sm" },
  ];

const Gallery = () => {
  return (
    <section className="bg-sky-100 px-2 py-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center p-4 ">Top Destinations For Activities</h2>
        <div className="grid gap-4 sm:grid-cols-3 sm:grid-rows-2 sm:h-[80vh] grid-cols-2 grid-rows-3">
          {destinations.map((destination) => (
            <a href={`/pages/${destination.alt}`} key={destination.id}>
            <Card
              
              className="rounded-2xl overflow-hidden shadow-md "
            >
              <div className="relative w-full h-full ">
                <img
                  src={destination.src}
                  alt={destination.alt}
                  className="w-full h-full object-cover max-h-[270px]"
                />
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-md">
                  {destination.alt}
                </h3>
              </div>
            </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
