"use client"; 
import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from 'next/font/google'
import Navbar from "@/components/header";

import store from "./redux/store";
import ReduxProvider from "./redux/ReduxProvider";
import Footer from "@/components/footer";


const inter = Inter({ subsets: ["latin"] });


 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/logo-sm.png" sizes="any" />
    </head>
    
        <body className={`${roboto.className}`}>
        <ReduxProvider store={store}>
          <Navbar />
          
          <main className="min-h-screen">{children}</main>
         

          <Footer />
          </ReduxProvider>
        </body>
        
  </html>
  );
}