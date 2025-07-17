"use client"

import { useState } from "react"
import {
    PlusIcon,
    FileTextIcon,
    SyringeIcon,
    HeartIcon,
    EyeIcon,
    PillIcon,
    ActivityIcon,
    ClipboardIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { medicalRecord } from "@/medical-records"
import Link from "next/link"

const medicalServices = [
    { id: "lab-reports", name: "LAB REPORTS", icon: FileTextIcon, position: { top: "15%", left: "15%" }, color: "bg-blue-100 text-blue-600" },
    { id: "immunization", name: "IMMUNIZATION", icon: SyringeIcon, position: { top: "15%", left: "75%" }, color: "bg-green-100 text-green-600" },
    { id: "medication", name: "MEDICATION MANAGEMENT", icon: PillIcon, position: { top: "35%", left: "5%" }, color: "bg-purple-100 text-purple-600" },
    { id: "dental", name: "DENTAL REPORT", icon: HeartIcon, position: { top: "35%", right: "5%" }, color: "bg-pink-100 text-pink-600" },
    { id: "radiology", name: "RADIOLOGY", icon: ActivityIcon, position: { bottom: "35%", left: "5%" }, color: "bg-orange-100 text-orange-600" },
    { id: "special-reports", name: "SPECIAL REPORTS", icon: ClipboardIcon, position: { bottom: "35%", right: "5%" }, color: "bg-red-100 text-red-600" },
    { id: "ophthalmology", name: "OPHTHALMOLOGY", icon: EyeIcon, position: { bottom: "15%", left: "15%" }, color: "bg-teal-100 text-teal-600" },
    { id: "medicine-vaccine", name: "MEDICINE & VACCINE", icon: HeartIcon, position: { bottom: "15%", right: "15%" }, color: "bg-indigo-100 text-indigo-600" },
]

export default function MedicalDashboard() {
    const [selectedMember, setSelectedMember] = useState(medicalRecord[0].personalInfo.name)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col min-w-full">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
                    <h1 className="text-xl font-semibold">hfiles</h1>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-white text-blue-600">P</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row flex-1 max-w-full mx-auto w-full">
                {/* Left Sidebar */}
                {/* Sidebar for Desktop */}
                <div className="hidden lg:block w-full lg:w-1/5 bg-white border-r p-4 flex-shrink-0 drop-shadow-2xl">
                    <div className="space-y-4">
                        {medicalRecord.map((member) => (
                            <div
                                key={member.personalInfo.name}
                                className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-colors ${selectedMember === member.personalInfo.name ? "bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setSelectedMember(member.personalInfo.name)}
                            >
                                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 mb-1">
                                    {member.personalInfo.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs text-gray-600 text-center">
                                    {member.personalInfo.name}
                                </span>
                            </div>
                        ))}

                        {/* Add New Member */}
                        <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                            <Link href="/medical-history" className="flex flex-col items-center">
                                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                    <PlusIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <span className="text-xs text-gray-600">Add</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Dropdown for Mobile */}
                <div className="block lg:hidden w-full bg-white border-b p-4 shadow-md">
                    <select
                        className="w-full p-2 border rounded-md text-sm"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Member
                        </option>
                        {medicalRecord.map((member) => (
                            <option key={member.personalInfo.name} value={member.personalInfo.name}>
                                {member.personalInfo.name}
                            </option>
                        ))}
                    </select>

                    {/* Add Button for Mobile */}
                    <div className="mt-2">
                        <Link href="/medical-history">
                            <button className="w-full text-sm mt-2 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                                ➕ Add New Member
                            </button>
                        </Link>
                    </div>
                </div>


                {/* Middle Content */}
                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {/* Desktop View */}
                    <div className="hidden md:flex justify-center items-center h-96 relative">
                        {/* Center Icon */}
                        <div className=" min-h-screen w-full bg-fixed bg-center bg-[url('/images/cartoon.avif')]">
                            {/* Circular Buttons */}
                            {medicalServices.map((service) => (
                                <Button
                                    key={service.id}
                                    variant="outline"
                                    className={`absolute ${service.color} border-2 px-3 py-2 text-xs font-medium hover:scale-105 transition-transform`}
                                    style={service.position}
                                >
                                    <service.icon className="h-4 w-4 mr-2" />
                                    {service.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden mt-4">
                        <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">Medical Services</h3>
                        <div className="grid grid-cols-3 gap-4 px-2">
                            {medicalServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                                >
                                    <service.icon className="h-6 w-6 mb-2 text-orange-500" />
                                    <span className="text-xs text-center text-gray-700">{service.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Member Name */}
                    <div className="text-center mt-50">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedMember}</h2>
                    </div>
                </div>


                {/* Right Sidebar */}
                <div className="w-full lg:w-1/5 bg-white border-l p-4 flex-shrink-0 flex flex-col justify-between drop-shadow-2xl mt-4 lg:mt-0">
                    <div className="space-y-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add Reports</Button>
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Create Folder</Button>
                        <Button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black">All Reports</Button>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-600 mb-2">52 GB of 100 GB Left</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "48%" }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-600 mb-2">Need Storage?</p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
