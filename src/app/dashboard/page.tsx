"use client"

import { useState } from "react"
import {
  PlusIcon,
  FolderIcon,
  FileTextIcon,
  SyringeIcon,
  HeartIcon,
  EyeIcon,
  PillIcon,
  ActivityIcon,
  ClipboardIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const familyMembers = [
  { name: "Ankit", avatar: "/placeholder.svg?height=40&width=40", active: false },
  { name: "Palak", avatar: "/placeholder.svg?height=40&width=40", active: true },
  { name: "Oindrila", avatar: "/placeholder.svg?height=40&width=40", active: false },
  { name: "Avani", avatar: "/placeholder.svg?height=40&width=40", active: false },
]

const medicalServices = [
  {
    id: "lab-reports",
    name: "LAB REPORTS",
    icon: FileTextIcon,
    position: { top: "15%", left: "15%" },
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "immunization",
    name: "IMMUNIZATION",
    icon: SyringeIcon,
    position: { top: "15%", left: "75%" },
    color: "bg-green-100 text-green-600",
  },
  {
    id: "medication",
    name: "MEDICATION MANAGEMENT",
    icon: PillIcon,
    position: { top: "35%", left: "5%" },
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "dental",
    name: "DENTAL REPORT",
    icon: HeartIcon,
    position: { top: "35%", right: "5%" },
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "radiology",
    name: "RADIOLOGY",
    icon: ActivityIcon,
    position: { bottom: "35%", left: "5%" },
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "special-reports",
    name: "SPECIAL REPORTS",
    icon: ClipboardIcon,
    position: { bottom: "35%", right: "5%" },
    color: "bg-red-100 text-red-600",
  },
  {
    id: "ophthalmology",
    name: "OPHTHALMOLOGY",
    icon: EyeIcon,
    position: { bottom: "15%", left: "15%" },
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "medicine-vaccine",
    name: "MEDICINE & VACCINE",
    icon: HeartIcon,
    position: { bottom: "15%", right: "15%" },
    color: "bg-indigo-100 text-indigo-600",
  },
]

const reportTypes = [
  { name: "Lab Report", icon: FileTextIcon, count: 12 },
  { name: "Immunization", icon: SyringeIcon, count: 8 },
  { name: "Prescription", icon: PillIcon, count: 15 },
  { name: "Radiology", icon: ActivityIcon, count: 5 },
  { name: "Ophthalmology", icon: EyeIcon, count: 3 },
  { name: "Dental Report", icon: HeartIcon, count: 7 },
  { name: "Medical Report", icon: ClipboardIcon, count: 20 },
  { name: "Medicine & Vaccine", icon: HeartIcon, count: 6 },
  { name: "All Reports", icon: FileTextIcon, count: 76 },
]

export default function MedicalDashboard() {
  const [selectedMember, setSelectedMember] = useState("Palak")
  const [viewMode, setViewMode] = useState<"dashboard" | "reports">("dashboard")

  
}