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


const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().min(4, { message: "Fill valid email ID" }).email("This is not a valid email."),
  phone: z.string().min(10, { message: "Phone no must have 10 digits" }).regex(phoneRegex, "Invalid Number!"),
})

export function BookForm() {


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", phone: "" },
  })

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5001/api/formdata", values, {
        headers: { "Content-Type": "application/json" },
      });

      toast({ title: "Success", description: "Form submitted successfully!", status: "success" });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast({ title: "Error", description: "Failed to submit form. Try again!", status: "error" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
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
          name="phone"
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
