import { medicalRecord } from "@/medical-records"
export async function GET(req: Request) {

    console.log(medicalRecord)
    return Response.json({
        medicalRecord
    })
}