import { dbConnect } from "@/lib/dbConnect"
import Patient from "@/models/Patient"
import { patchFetch } from "next/dist/server/app-render/entry-base";


export async function GET(req: Request) {

    await dbConnect()
    
    try {

        const patients = await Patient.find()

        if (!patients) {
            return Response.json({
                success: true,
                message: "Patients not found",
                patients: []
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: "Patient record saved successfully",
            patients
        }, { status: 201 });

    } catch (error) {

        return Response.json({
            success: true,
            message: "Error getting patients",
            patients: []
        }, { status: 500 });

    }
}