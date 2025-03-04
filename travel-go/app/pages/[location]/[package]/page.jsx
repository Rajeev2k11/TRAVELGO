"use client";
import TabsData  from "@/components/tabs";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaLocationDot, FaHotel, FaUserGroup, FaStar } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { BookForm } from "@/components/bookForm";
import BestPackage from "@/components/bestPackage";
import { useDispatch, useSelector } from "react-redux";
import { setPackage } from "@/app/redux/slices/packageSlice";
import axios from "axios";
import { setError } from "@/app/redux/slices/destinationSlice";
import { Toaster } from "@/components/ui/sonner"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const Page = () => {
  const  packageName  = useParams().package;
  const dispatch = useDispatch();
  const pkg = useSelector((state) => state.package);
  const [loading, setLoading] = useState(true);
console.log("pkg",packageName)
  useEffect(() => {
    if (!pkg.packages.length) {
      axios
        .get(`${apiUrl}/api/packages/`)
        .then(({ data }) => dispatch(setPackage(data)))
        .catch((error) => dispatch(setError(error)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [pkg.packages.length, dispatch]);

  const packagefound = useMemo(
    () => pkg?.packages?.find((p) => p.package_name === decodeURIComponent(packageName)),
    [pkg.packages, packageName]
  );
console.log("pkgfound",packagefound,decodeURIComponent(packageName))
  if (loading) return <div>Loading...</div>;
  if (!packagefound) return <div>Package not found</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h1 className="md:text-5xl font-serif absolute z-10 text-white max-w-[60%] font-bold md:mt-[250px] mt-[120px] text-center capitalize">
          {decodeURIComponent(packageName) || "Travel Package"}
        </h1>
        <div className="w-full lg:w-3/4">
          <ImageGallery
            items={[...Array(6)].map(() => ({ original: "/thailand.jpg", thumbnail: "/thailand.jpg" }))}
            showNav={false}
            showBullets={false}
            showPlayButton={false}
            showFullscreenButton={true}
            thumbnailPosition="bottom"
          />
        </div>
      </div>
      <div className="md:flex justify-center mt-6 gap-10">
        <div className="max-w-[50rem]">
          <h1 className="text-2xl font-bold p-2 md:p-0 mb-4">{decodeURIComponent(packageName)}</h1>
          <div className="bg-violet-50 rounded-md p-6 m-2 flex justify-between text-blue-600">
            {[{ icon: FaHotel, text: `${packagefound.duration.day}D/${packagefound.duration.night}N` },
              { icon: FaStar, text: packagefound.rating },
              { icon: FaLocationDot, text: packagefound.location },
              { icon: FaUserGroup, text: packagefound.theme }].map(({ icon: Icon, text }, index) => (
              <span key={index} className="flex items-center">
                <Icon className="px-1 text-2xl" />
                <p className="text-sm">{text}</p>
              </span>
            ))}
          </div>
          <div className="p-2 m-2 border bg-gray-50">
            <h1 className="text-xl font-bold p-2">Overview</h1>
            <p className="p-2 text-gray-600">{packagefound.package_description}</p>
          </div>
          <TabsData Package={packagefound} />
        </div>
        <div className="p-4">
          <Card className="px-2 py-4 max-w-[400px]">
            <CardContent>
              <p className="text-sm font-serif mt-3 text-gray-600">Starting from</p>
              <span className="flex py-1">
                <h1 className="text-3xl font-bold text-blue-600">INR {packagefound.price}/-*</h1>
                <span className="text-gray-600 text-xs p-1 mt-1 font-bold">Per Adult</span>
              </span>
              <div className="flex justify-between">
                <span className="flex text-blue-600 my-1">
                  <FaStar className="p-1 text-2xl" />
                  <p className="text-gray-600">{packagefound.rating}</p>
                </span>
                <span className="flex text-red-500 font-bold items-center">
                  <MdOutlineAccessTime className="p-1 font-bold text-2xl" />
                  <p>{packagefound.duration.night}N/{packagefound.duration.day}D</p>
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 mt-6 rounded shadow w-full">
                Book Now
              </button>
            </CardContent>
          </Card>
          <div className="max-w-[400px] border bg-orange-100 p-2 my-2 rounded-md text-xs text-red-500">
            The above rates are subject to change during blackout dates.**
          </div>
          <Card className="max-w-[400px] px-6 py-10 mt-4 shadow-xl">
            <h1 className="max-w-[350px] font-bold text-lg text-center p-2">
              {decodeURIComponent(packageName)}
            </h1>
            <Toaster className="size-10 p-6"/>
            <BookForm />
          </Card>
        </div>
      </div>
      <section className="bg-violet-100 p-4 mb-4">
        <div className="container md:ml-10">
          <h2 className="text-2xl font-bold text-center p-4">Packages You Like</h2>
          <BestPackage />
        </div>
      </section>
    </div>
  );
};
 

export default Page;
