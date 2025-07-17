import mongoose from "mongoose";
import Patient from "@/models/Patient";


export async function PATCH(request: Request) {
    const { id, bloodGroup, weight, height, bmi } = await request.json();

    if (!id || !bloodGroup || !weight || !height || !bmi) {
        return new Response("Missing required fields", { status: 400 });
    }

    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return new Response("Patient not found", { status: 404 });
        }
        patient.bloodGroup = bloodGroup;
        patient.weight = weight;
        patient.height = height;
        patient.bmi = bmi;
        await patient.save();

        return new Response("Patient updated successfully", { status: 200 });

    } catch (error) {
        console.error("Error updating patient:", error);
        return new Response("Internal Server Error", { status: 500 });

    }
}