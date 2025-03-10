import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdOutlineFlightTakeoff } from "react-icons/md";
import { BookForm } from "./bookForm";

export function DialogForm({ showDialog, setShowDialog, name,data }) {
  console.log("modal",name)

 if(data==="package"){
  return(
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
    <DialogContent className="sm:max-w-[425px] py-12 ">
      <DialogHeader>
        <DialogTitle className="">
        <div className="flex">
          <p className="text-4xl">
           Get A Quote !  </p>
          <span className=" pb-2"> <img src="/airplane.png" width={50} height={50} /></span>
         </div>
        </DialogTitle>
        <DialogDescription className="flex text-lg text-blue-500 font-bold">
          <span className="px-2 text-2xl">
            <MdOutlineFlightTakeoff />
          </span>
          {name}
        </DialogDescription>
        <DialogDescription>
          Don't worry we will not spam you. 
        </DialogDescription>
      </DialogHeader>

      <BookForm />
    </DialogContent>
  </Dialog>
  )

 }else{
  return(
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
    <DialogContent className="sm:max-w-[425px] py-12">
      <DialogHeader>
        <DialogTitle className="">
          <div className="flex py-3">
            <img src="/discount.png" width={80} height={80} />
            <span className="text-6xl items-center p-2 font-bold">10%</span>
          </div>
          <p className="text-2xl">
            Last Chance To Get Your Discount On {name} Packages !
          </p>
        </DialogTitle>
        <DialogDescription className="flex text-md text-red-500">
          <span className="p-1">
            <MdOutlineFlightTakeoff />
          </span>
          {name}
        </DialogDescription>
        <DialogDescription>
          Kindly share the details to avail offer.
        </DialogDescription>
      </DialogHeader>

      <BookForm />
    </DialogContent>
  </Dialog>
  )
 }

}
