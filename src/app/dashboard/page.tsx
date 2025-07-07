"use client"

import { useState, useEffect } from "react"
import {
    PlusIcon,
    FileTextIcon,
    SyringeIcon,
    HeartIcon,
    EyeIcon,
    PillIcon,
    ActivityIcon,
    ClipboardIcon,
} from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

type Detail = {
    personalInfo: {
        name: string;
        age?: number;
        gender?: string;
        bloodGroup?: string;
        weightKg?: number;
        height?: {
            feet: number;
            inches: number;
        };
        BMI?: number;
    };
};

export default function MedicalDashboard() {
    const [details, setDetails] = useState<Detail[]>([])
    const [selectedMember, setSelectedMember] = useState<Detail | null>(null)

    const GetData = async () => {
        try {
            const res = await axios.get("/api/get-records")
            setDetails(res.data.patients)
            setSelectedMember(res.data.patients[0]) // default selection
        } catch (error) {
            alert("❌ Server error")
            console.error("API error:", error)
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col min-w-full">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">hfiles</h1>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-1 max-w-full mx-auto w-full">
                {/* Sidebar */}
                <div className="w-50 bg-white border-r p-4 flex-shrink-0 drop-shadow-2xl">
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-600 mb-4">
                                {selectedMember?.personalInfo.name}
                            </p>
                        </div>

                        {details.map((member) => (
                            <div
                                key={member.personalInfo.name}
                                className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-colors 
              ${selectedMember?.personalInfo.name === member.personalInfo.name ? "bg-blue-100" : "hover:bg-gray-50"}`}
                                onClick={() => setSelectedMember(member)}
                            >
                                <div className="h-10 w-10 bg-gray-300 rounded-full mb-1 flex items-center justify-center text-white font-bold">
                                    {member.personalInfo.name.charAt(0)}
                                </div>
                                <span className="text-xs text-gray-600">{member.personalInfo.name}</span>
                            </div>
                        ))}

                        <Link href="/add-data-form">
                            <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                    <PlusIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <span className="text-xs text-gray-600">Add</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="flex justify-center items-center h-96 relative">
                        {/* Center circle with avatar */}
                        <div className="w-48 h-48 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl">
                            <div className="text-5xl mb-2">👤</div>
                            <div className="text-md font-semibold">
                                {selectedMember?.personalInfo.name || "No Name"}
                            </div>
                        </div>

                        {/* Top Center - Blood Group */}
                        <div className="absolute top-2 text-center text-sm font-medium text-blue-600">
                            🩸 Blood: {selectedMember?.personalInfo.bloodGroup || "N/A"}
                        </div>

                        {/* Top Left - BMI */}
                        <div className="absolute top-10 left-10 text-sm font-medium text-purple-600">
                            📊 BMI: {selectedMember?.personalInfo.BMI || "N/A"}
                        </div>

                        {/* Top Right - Height */}
                        <div className="absolute top-10 right-10 text-sm font-medium text-pink-600">
                            📏 Height: {selectedMember?.personalInfo.height?.feet}'{selectedMember?.personalInfo.height?.inches}"
                        </div>

                        {/* Bottom Left - Weight */}
                        <div className="absolute bottom-10 left-10 text-sm font-medium text-green-600">
                            ⚖️ Weight: {selectedMember?.personalInfo.weightKg || "N/A"} kg
                        </div>

                        {/* Bottom Right - Gender */}
                        <div className="absolute bottom-10 right-10 text-sm font-medium text-red-600">
                            👤 Gender: {selectedMember?.personalInfo.gender || "N/A"}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-55 bg-white border-l p-4 flex-shrink-2 flex flex-col justify-between drop-shadow-2xl">
                    <div className="p-4 space-y-5">
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

                    <div className="">
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
