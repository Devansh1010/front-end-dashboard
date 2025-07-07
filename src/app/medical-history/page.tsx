import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function MedicalHistory() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-5">

      {/* Header */}
      <div className="mb-4 text-center">
        <Link href="/api/dashboard">
          <Button variant="link" className="absolute left-4 top-5 p-0 h-6 text-lg">Back</Button>
        </Link>

        <h2 className="text-xl font-bold font-serif mt-2">
          Your Complete Medical History, always at your fingertips with <span className="text-blue-800">HFiles</span>
        </h2>
        <hr className="w-24 h-[2px] mx-auto bg-black border-0 rounded my-2" />

        <Button variant="outline" className="w-24 h-8 mt-2">Share</Button>
      </div>

      {/* Main Card */}
      <div className="flex justify-center">
        <Card className="w-full shadow-lg max-w-6xl">
          <CardContent className="flex flex-col lg:flex-row gap-6 p-0">

            {/* LEFT SIDE: PROFILE (40%) */}
            <div className="w-full lg:w-2/5 bg-blue-50 py-8 px-6 flex flex-col items-center justify-start space-y-6">
              {/* Avatar + Name */}
              <div className="flex flex-col items-center">
                <Avatar className="w-40 h-40">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-3xl">AN</AvatarFallback>
                </Avatar>
                <p className="text-2xl font-bold mt-4">Ankit</p>
              </div>

              {/* Profile Info with Inputs */}
              <div className="w-full max-w-md grid grid-cols-2 gap-6">
                {/* Labels */}
                <div className="text-right space-y-4 pr-4">
                  <p><strong>Age:</strong></p>
                  <p><strong>Gender:</strong></p>
                  <p><strong>Blood Group:</strong></p>
                  <p><strong>Weight:</strong></p>
                  <p><strong>Height:</strong></p>
                  <p><strong>BMI:</strong></p>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <Input type="number" placeholder="28" />
                  <Input type="text" placeholder="Male" />
                  <Input type="text" placeholder="B+" />
                  <Input type="number" placeholder="70" />
                  <Input type="text" placeholder="5'8&quot;" />
                  <Input type="text" placeholder="23.2" />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: SOCIAL HISTORY (60%) */}
            <div className="w-full lg:w-3/5 py-8 px-6 flex flex-col justify-start">
              <h3 className="text-2xl font-semibold text-center mb-6">🩺 Social History</h3>

              {/* Answer Header */}
              <div className="grid grid-cols-4 font-medium text-sm text-gray-600 mb-4 px-2">
                <div className="col-span-1"></div>
                <div className="text-center">Yes</div>
                <div className="text-center">No</div>
                <div className="text-center">Occasionally</div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {[
                  { id: "smoke", label: "Do you smoke?" },
                  { id: "alcohol", label: "Do you consume alcohol?" },
                  { id: "exercise", label: "Do you exercise regularly?" },
                  { id: "diet", label: "Do you follow a specific diet?" }
                ].map((question) => (
                  <div key={question.id} className="mb-4">
                    <Label className="block text-md font-medium mb-1">{question.label}</Label>
                    <RadioGroup defaultValue="no" className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                        <Label htmlFor={`${question.id}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${question.id}-no`} />
                        <Label htmlFor={`${question.id}-no`}>No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasionally" id={`${question.id}-occasionally`} />
                        <Label htmlFor={`${question.id}-occasionally`}>Occasionally</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>

            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
