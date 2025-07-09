import { dbConnect } from "@/lib/dbConnect";
import Patient from "@/models/Patient";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { id } = await req.json();
    const PatientNameGetData = await Patient.findOne(id);

    if (!PatientNameGetData) {
      return Response.json(
        {
          success: false,
          message: "Patient record Not found",
          PatientNameGetData: {}
        },
        { status: 401 }
      );
    }

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
        success: false,
        message: "Error getting patients details",
      },
      { status: 500 }
    );
  }
}
