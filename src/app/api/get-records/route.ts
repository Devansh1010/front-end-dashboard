import { dbConnect } from "@/lib/dbConnect"
import Patient from "@/models/Patient"
import { patchFetch } from "next/dist/server/app-render/entry-base";


export async function GET(req: Request) {

    await dbConnect()

    try {

        const patients = await Patient.find()

        const names = patients.map((p) => p.name)
        const ids = patients.map((p) => p._id)

        if (!patients) {
            return Response.json({
                success: true,
                message: "Patients not found",
                patients: []
                // names
                // ids
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: "Patient record saved successfully",
            patients
            // names
            // ids
        }, { status: 201 });

    } catch (error) {

        return Response.json({
            success: true,
            message: "Error getting patients",
            patients: []
            // names
            // ids
        }, { status: 500 });

    }
}