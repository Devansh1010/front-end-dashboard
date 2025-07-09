import { dbConnect } from "@/lib/dbConnect";
import Patient from "@/models/Patient";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { name,_id } = await req.json();
    const PatientNameGetData = await Patient.findOne({
      name,
      _id,
    });

    return Response.json(
      {
        success: true,
        message: "Patient record saved successfully",
        PatientNameGetData
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: true,
        message: "Error getting patients",
      },
      { status: 500 }
    );
  }
}
