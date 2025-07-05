import { medicalRecord } from "@/medical-records"
export async function GET(req: Request) {
    return Response.json({
        medicalRecord
    })
}