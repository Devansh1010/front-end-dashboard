"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { MedicalPrescription, MedicalRecord } from "@/models/Patient"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import MainInfoPage from "./main-info/page"
import MedicalPrescriptionPage from "./medical-precription/page"
import LifestyleAllergyPage from "./lifestyle-and-allergies/page"
import AllergySelectorPage from "./allergies/page"


export default function MedicalHistory(id: any) {

  return (
    <div className="main-body flex flex-col h-full max-w-400 justify-center items-center p-5">
      <MainInfoPage />

      <MedicalPrescriptionPage />

      <LifestyleAllergyPage />

      <AllergySelectorPage />


      {/* ! last */}
    </div>
  )
}
