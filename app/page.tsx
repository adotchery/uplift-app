"use client"


import SubmitForm from "../components/forms/submit-form";
import ContactForm from "../components/forms/contact-form"
import Image from "next/image";
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [isB2C, setIsB2C] = useState(false)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      {/* <img src="/Huronlogo.svg" alt="Huron Logo" className="w-32 h-8 mb-8" /> */}
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center">Uplift</h1>
          <div className="flex items-center space-x-2 mb-6 justify-end">
            <Label htmlFor="b2c-mode" className="cursor-pointer">
              B2C
            </Label>
            <Switch id="b2c-mode" checked={isB2C} onCheckedChange={setIsB2C} />
          </div>
          {!isB2C && <SubmitForm />}
        {isB2C && <ContactForm />}
        <footer className="flex items-center justify-center mt-8 w-full text-center">
        <a
          href="https://www.huronconsultinggroup.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Image
            aria-hidden
            src="/Huron_Vertical-Black.svg"
            alt="Huron Logo"
            width={32}
            height={32}
          />
          <h1>Powered by Global Data Management & Analytics</h1>
        </a>
      </footer>
    </div>
    </div>
  );
}
