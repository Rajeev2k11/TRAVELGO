"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const formSchema = z.object({
  name: z.string().min(2, { message: "name must be at least 2 characters." }),
  email: z.string().min(4, { message: "Fill valid email ID" }).email("This is not a valid email."),
  contact: z.string().min(10, { message: "Phone no must have 10 digits" }).regex(phoneRegex, "Invalid Number!"),
})

export function BookForm() {


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", contact: "" },
  })

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${apiUrl}/api/formdata`, values, {
        headers: { "Content-Type": "application/json" },
      });
  
      toast.success("Success", {
        description: "Form submitted successfully!",
      });
  
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
  
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to submit form. Try again!",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-6" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-6" placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-6" placeholder="Phone no" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-violet-500 hover:bg-violet-600 p-6 text-white text-md font-semibold rounded w-[80%] ml-10">
          Send Enquiry
        </Button>
      </form>
    </Form>
  )
}
