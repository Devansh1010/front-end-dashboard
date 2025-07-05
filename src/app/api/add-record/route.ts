import { medicalRecord } from "@/medical-records"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data?.patientId || !data?.personalInfo) {
      return new Response(JSON.stringify({ error: "Invalid data format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    medicalRecord.push(data)

    return new Response(JSON.stringify({ message: "Record added", data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong", details: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
