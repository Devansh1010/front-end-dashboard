"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  FileTextIcon,
  SyringeIcon,
  HeartIcon,
  EyeIcon,
  PillIcon,
  ActivityIcon,
  ClipboardIcon,
} from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "../Navbar/page";

type Details = {
  name: string
  id: string
}



export default function MedicalDashboard() {
  const [patientNames, setPatientNames] = useState<Details[]>([]);
  const [patientIds, setPatientIds] = useState<Details[]>([]);
  const [selectedMember, setSelectedMember] = useState<Details | null>(null);

  const GetData = async () => {
    try {
      const res = await axios.get("/api/get-records-details");
      setPatientNames(res.data.names);
      setPatientIds(res.data.ids);

      if (res.data.names?.length) {
        setSelectedMember(res.data.names[0]);
      }
    } catch (error) {
      alert("❌ Server error");
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1 w-full">
        <div className="w-full lg:w-64 bg-white border-r p-4 drop-shadow-2xl">
          <div className="space-y-4">
            {/* Mobile Dropdown (shown only on mobile) */}
            <div className="lg:hidden">
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50"
                  onClick={() => document.getElementById('patient-dropdown')?.classList.toggle('hidden')}
                >
                  <span className="text-black">
                    {selectedMember?.name || "Select Patient"}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id="patient-dropdown"
                  className="hidden absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {patientNames.map((member: any, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${selectedMember?.name === member ? "bg-blue-50" : ""
                        }`}
                      onClick={() => {
                        setSelectedMember(member);
                        document.getElementById('patient-dropdown')?.classList.add('hidden');
                      }}
                    >
                      <span className="text-black">{member}</span>
                    </div>
                  ))}
                  <Link href="/add-data-form">
                    <div className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-t border-gray-200 flex items-center">
                      <PlusIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Add Patient</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Sidebar (shown only on desktop) */}
            <div className="hidden lg:block">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-4">
                  {selectedMember?.name}
                </p>
              </div>
              {patientNames.map((member: any, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center cursor-pointer p-2 m-2 rounded-lg transition-colors ${selectedMember?.name === member ? "bg-blue-100" : "hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="h-10">
                    <h2 className="text-black">{member}</h2>
                  </div>
                  <span className="text-xs text-gray-600 underline underline-offset-2">
                    {member}
                  </span>
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
        </div>

        {/* Middle Section (Desktop only) */}
        <div className="hidden md:flex flex-1 items-center justify-center p-8 overflow-y-auto bg-white">
          <div className="relative w-full max-w-5xl h-[28rem] flex items-center justify-center">
            {/* Left Column */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-6 text-left">
              <div className="flex items-center space-x-3 text-purple-600">
                <div className="text-3xl">📈</div>
                <div className="text-sm font-medium">Lab Report</div>
              </div>
              <div className="flex items-center space-x-3 text-blue-600">
                <div className="text-3xl">💉</div>
                <div className="text-sm font-medium">Immunisation</div>
              </div>
              <div className="flex items-center space-x-3 text-green-600">
                <div className="text-3xl">⚖️</div>
                <div className="text-sm font-medium">Medications</div>
              </div>
              <div className="flex items-center space-x-3 text-red-600">
                <div className="text-3xl">🩻</div>
                <div className="text-sm font-medium">Radiology</div>
              </div>
            </div>

            {/* Center Circle */}
            <div className="w-52 h-52 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-xl flex flex-col items-center justify-center text-white z-10">
              <div className="text-6xl mb-2">👤</div>
              <div className="text-base font-semibold text-center">
                {selectedMember?.name || "No Name"}
              </div>
            </div>

            {/* Right Column */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-6 text-right">
              <div className="flex items-center space-x-3 text-pink-600 justify-end">
                <div className="text-sm font-medium">Ophthalmology</div>
                <div className="text-3xl">👁️</div>
              </div>
              <div className="flex items-center space-x-3 text-yellow-600 justify-end">
                <div className="text-sm font-medium">Dental Report</div>
                <div className="text-3xl">🦷</div>
              </div>
              <div className="flex items-center space-x-3 text-blue-500 justify-end">
                <div className="text-sm font-medium">Special Report</div>
                <div className="text-3xl">🧬</div>
              </div>
              <div className="flex items-center space-x-3 text-indigo-500 justify-end">
                <div className="text-sm font-medium">Mediclaim & Invoice</div>
                <div className="text-3xl">💰</div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="flex md:hidden flex-wrap justify-center items-center gap-4 p-4 bg-white">
          {[
            { icon: "📈", label: "Lab Report" },
            { icon: "💉", label: "Immunisation" },
            { icon: "⚖️", label: "Medications" },
            { icon: "🩻", label: "Radiology" },
            { icon: "👁️", label: "Ophthalmology" },
            { icon: "🦷", label: "Dental Report" },
            { icon: "🧬", label: "Special Report" },
            { icon: "💰", label: "Mediclaim & Invoice" },
            { icon: "📂", label: "Folders" },
          ].map((item, index) => (
            <div
              key={index}
              className="w-24 h-24 flex flex-col items-center justify-center border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="text-xs text-center font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-64 bg-white border-l p-4 flex flex-col justify-between drop-shadow-2xl px-6 py-4">
          <div className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white">
              Add Reports
            </Button>
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
              Create Folder
            </Button>
            <Button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black">
              All Reports
            </Button>

            <div className="pt-4 border-t">
              <div className="mb-2 text-sm text-gray-600">52 GB of 100 GB</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "48%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-black bg-white border border-gray-300 hover:bg-gray-100"
            >
              <div className="flex-col">
                <p className="text-sm text-gray-600 mb-1">Need Storage?</p>
                Contact Us
              </div>
            </Button>
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white">
        <div className="w-full mx-auto max-w-screen-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="pr-4">Terms & Conditions</span>
            <span>| Privacy Policy</span>
          </div>
          <div>
            <span className="pr-4">FAQs</span>
            <span>| Copyright © 2024</span>
          </div>
          <div>
            <span className="pr-4">9999999999</span>
            <span>| contact@hfiles.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
