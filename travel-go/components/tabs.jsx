// components/TabsComponent.jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TabsData() {
  return (
    <div className="w-full p-4 bg-red-50 rounded-lg shadow-md">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex justify-between">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-red-300 rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-200"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="itinerary"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-red-300 rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-200"
          >
            Itinerary
          </TabsTrigger>
          <TabsTrigger
            value="inclusions"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-red-300 rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-200"
          >
            Inclusions & Exclusion
          </TabsTrigger>
          <TabsTrigger
            value="location"
            className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-red-300 rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-200"
          >
            Location
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="p-4">This is the Overview content.</p>
        </TabsContent>
        <TabsContent value="itinerary">
          <p className="p-4">This is the Itinerary content.</p>
        </TabsContent>
        <TabsContent value="inclusions">
          <p className="p-4">This is the Inclusions & Exclusion content.</p>
        </TabsContent>
        <TabsContent value="location">
          <p className="p-4">This is the Location content.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
