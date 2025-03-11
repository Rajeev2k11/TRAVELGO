// components/TabsComponent.jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FaCheckCircle } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function TabsData({ Package }) {
  return (
    <div className="w-full p-4 mt-4">
      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="flex justify-between">
          <TabsTrigger
            value="itinerary"
            className="data-[state=active]:bg-violet-500 md:w-[180px] w-[110px] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-violet-300 rounded-lg md:px-6 py-1 md:text-lg font-semibold transition-colors hover:bg-violet-200"
          >
            Itinerary
          </TabsTrigger>
          <Separator orientation="vertical" />
          <TabsTrigger
            value="things"
            className="data-[state=active]:bg-violet-500 md:w-[180px] w-[110px] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-violet-300 rounded-lg md:px-6 py-1 md:text-lg font-semibold transition-colors hover:bg-violet-200"
          >
            Things to do
          </TabsTrigger>
          <Separator orientation="vertical" />
          <TabsTrigger
            value="inclusions"
            className="data-[state=active]:bg-violet-500 md:w-[180px] w-[110px] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-violet-300 rounded-lg md:px-6 py-1 md:text-lg font-semibold transition-colors hover:bg-violet-200"
          >
            Inclusions
          </TabsTrigger>
          <Separator orientation="vertical" />
          <TabsTrigger
            value="location"
            className="data-[state=active]:bg-violet-500 md:w-[180px] w-[110px] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-violet-300 rounded-lg md:px-6 py-1 md:text-lg font-semibold transition-colors hover:bg-violet-200 hidden md:block"
          >
            Location
          </TabsTrigger>
        </TabsList>
        <TabsContent value="things">
          <div className="p-4">
            <h1 className="text-lg font-bold py-2">Things to do</h1>
            {Package?.thingstodo?.map((points,index)=>
            
            <div>
              <h1 className="font-bold py-2"> 🎯 {points.title}</h1>
              {points?.details?.map((detail,index)=><p className="px-4 py-1">✅{detail}</p>)}
            </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="itinerary">
          <Accordion type="multiple" collapsible="true" className="py-4 max-w-[730px]">
            {Package?.itinerary?.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.title}
                className="border border-violet-600 rounded-sm p-1 px-3 my-3 shadow-lg"
              >
                <AccordionTrigger className="decoration-neutral-50 text-md">
                  Day {index+1}: {item.title}
                </AccordionTrigger>
                <AccordionContent>
                 {item.details.map((point)=><li className="ml-2 text-[15px]">{point}</li>)} 
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="inclusions">
        <div className="p-4">
            <h1 className="text-lg font-bold py-2">Inclusions</h1>
            {Package?.inclusions.map((points)=><p className="flex py-1"> <span className="p-1 text-green-500"><FaCheckCircle /></span> {points}</p>)}
          </div>
        </TabsContent>
        <TabsContent value="location">
          <p className="p-4">This is the Location content.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
