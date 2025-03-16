"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PackageCard = ({pkg}) => {
console.log("pkgcard",pkg )

  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden w-[300px] ml-2 md:w-[300px]">
      {/* Image Section */}
      <div className="w-full">
        <img src={pkg.images[0]} alt={pkg.location} className="w-full h-[200px] object-cover " />
      </div>

      {/* Content Section */}
      <CardContent className="px-4 pb-4">
        {/* Title & Location */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{pkg.package_name}</h3>
         
        </div>
        <div className="flex justify-between items-start">
        <p className="text-blue-500 text-sm mt-1">{pkg.duration.day} Days, {pkg.duration.night} Nights</p>

          <span className="text-blue-500 text-sm">{pkg.location}</span>
        </div>
        {/* Duration */}
       
        <hr className="my-3" />

        {/* Price Section */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-red-500 line-through text-sm">From {pkg.price}</span>
            <p className="text-lg font-bold">INR {pkg.price}</p>
          </div>
          <Link href={`/pages/${pkg.location}/${pkg.package_name}`}><Button className="bg-blue-500 text-white px-4 py-2">View Package</Button></Link>
        </div>
      </CardContent>
    </Card>
  );
};


