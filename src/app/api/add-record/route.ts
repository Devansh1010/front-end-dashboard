import { dbConnect } from "@/lib/dbConnect";
import Patient from "@/models/Patient";


import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const {
    personalInfo,
    smoking,
    alcoholConsumption,
    drugUse,
    exerciseFrequency,
    dietType,
    medicalPrescription,
    knownAllergies,
    medicalHistory,
    surgicalHistory
  } = await req.json();

  if (
    !personalInfo?.name ||
    !personalInfo?.age ||
    !personalInfo?.gender ||
    !personalInfo?.bloodGroup ||
    !personalInfo?.weightKg ||
    !personalInfo?.height?.feet ||
    !personalInfo?.height?.inches ||
    !personalInfo?.BMI
  ) {
    return NextResponse.json({
      success: false,
      message: "Some required personalInfo fields are missing",
    }, { status: 400 });
  }


  await dbConnect();

  try {

    const newPatient = new Patient({
      personalInfo,
      socialHistory: {
        smoking,
        alcoholConsumption,
        drugUse,
        exerciseFrequency,
        dietType
      },
      medicalPrescription,
      knownAllergies,
      medicalHistory,
      surgicalHistory
    });

    const saved = await newPatient.save();

    return NextResponse.json({
      success: true,
      message: "Patient record saved successfully",
      data: saved
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error saving patient record:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to save patient record",
      error: error.message
    }, { status: 500 });
  }
}
