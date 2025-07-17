"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { ChevronDownIcon, ChevronUpIcon, UserIcon, ShareIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface FormData {
  socialHistory: {
    smoke: string
    alcohol: string
    vegetarian: string
    exercise: string
  }
  allergies: {
    [key: string]: string
  }
  medicalHistory: {
    [key: string]: {
      myself: boolean
      motherSide: boolean
      fatherSide: boolean
    }
  }
}

export default function MedicalHistoryPage() {
  const [allergiesOpen, setAllergiesOpen] = useState(false)
  const [medicalHistoryOpen, setMedicalHistoryOpen] = useState(false)

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      socialHistory: {
        smoke: "",
        alcohol: "",
        vegetarian: "",
        exercise: "",
      },
      allergies: {},
      medicalHistory: {},
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
  }

  const allergyTypes = ["Barley", "Barley", "Barley", "Barley", "Barley"]
  const medicalConditions = ["Barley", "Barley", "Barley", "Barley", "Barley"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                ← Back
              </Button>
            </Link>
            <h1 className="text-lg font-medium">hfiles</h1>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-white text-blue-600">
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Subheader */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Your complete medical history, always at your fingertips with hfiles
              </p>
              <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
                <ShareIcon className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-gray-200">
                  <UserIcon className="h-8 w-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Ankit K.</h2>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Social History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Social History</CardTitle>
              <p className="text-sm text-gray-600">Track your Social History to help with better health</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Do You Smoke?</Label>
                    <Controller
                      name="socialHistory.smoke"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="smoke-yes" />
                            <Label htmlFor="smoke-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="smoke-no" />
                            <Label htmlFor="smoke-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Do You Consume Alcohol?</Label>
                    <Controller
                      name="socialHistory.alcohol"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="yes"
                              id="alcohol-yes"
                              className="border-orange-400 text-orange-400"
                            />
                            <Label htmlFor="alcohol-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="alcohol-no" />
                            <Label htmlFor="alcohol-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Are You Vegetarian?</Label>
                    <Controller
                      name="socialHistory.vegetarian"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="veg-yes" className="border-orange-400 text-orange-400" />
                            <Label htmlFor="veg-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="veg-no" />
                            <Label htmlFor="veg-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Do You Exercise Regularly?</Label>
                    <Controller
                      name="socialHistory.exercise"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="yes"
                              id="exercise-yes"
                              className="border-orange-400 text-orange-400"
                            />
                            <Label htmlFor="exercise-yes" className="text-sm">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="exercise-no" />
                            <Label htmlFor="exercise-no" className="text-sm">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* View Medical Prescription */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">View Medical Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Easily access your family's prescriptions whenever you need.</p>
              <Button variant="outline" className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200">
                Medical prescriptions
              </Button>
            </CardContent>
          </Card>

          {/* Update your Allergies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Update your Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible open={allergiesOpen} onOpenChange={setAllergiesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="text-sm text-gray-600">
                    Know your allergies and take control. Add them here for safer healthcare living!
                  </span>
                  {allergiesOpen ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Type</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Yes</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">No</th>
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Type</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Yes</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">No</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: Math.ceil(allergyTypes.length / 2) }).map((_, rowIndex) => (
                          <tr key={rowIndex} className="border-b">
                            {/* First column group */}
                            <td className="py-3 px-4 text-sm">{allergyTypes[rowIndex * 2]}</td>
                            <td className="text-center py-3 px-4">
                              <Controller
                                name={`allergies.${allergyTypes[rowIndex * 2]}`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroupItem
                                    value="yes"
                                    checked={field.value === "yes"}
                                    onClick={() => field.onChange("yes")}
                                    className="border-orange-400 text-orange-400"
                                  />
                                )}
                              />
                            </td>
                            <td className="text-center py-3 px-4">
                              <Controller
                                name={`allergies.${allergyTypes[rowIndex * 2]}`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroupItem
                                    value="no"
                                    checked={field.value === "no"}
                                    onClick={() => field.onChange("no")}
                                  />
                                )}
                              />
                            </td>
                            {/* Second column group */}
                            {allergyTypes[rowIndex * 2 + 1] && (
                              <>
                                <td className="py-3 px-4 text-sm">{allergyTypes[rowIndex * 2 + 1]}</td>
                                <td className="text-center py-3 px-4">
                                  <Controller
                                    name={`allergies.${allergyTypes[rowIndex * 2 + 1]}`}
                                    control={control}
                                    render={({ field }) => (
                                      <RadioGroupItem
                                        value="yes"
                                        checked={field.value === "yes"}
                                        onClick={() => field.onChange("yes")}
                                        className="border-orange-400 text-orange-400"
                                      />
                                    )}
                                  />
                                </td>
                                <td className="text-center py-3 px-4">
                                  <Controller
                                    name={`allergies.${allergyTypes[rowIndex * 2 + 1]}`}
                                    control={control}
                                    render={({ field }) => (
                                      <RadioGroupItem
                                        value="no"
                                        checked={field.value === "no"}
                                        onClick={() => field.onChange("no")}
                                      />
                                    )}
                                  />
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Your Allergy isn't here? Add your own.</p>
                  <div className="flex justify-end mt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Save
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Update your Medical History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Update your Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible open={medicalHistoryOpen} onOpenChange={setMedicalHistoryOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="text-sm text-gray-600">
                    Stay ahead with your family health history. Update now for better care.
                  </span>
                  {medicalHistoryOpen ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Type</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">My Self</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Mother's Side</th>
                          <th className="text-center py-2 px-4 text-sm font-medium text-gray-600">Father's Side</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalConditions.map((condition, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4 text-sm">{condition}</td>
                            <td className="text-center py-3 px-4">
                              <Controller
                                name={`medicalHistory.${condition}.myself`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroupItem
                                    value="myself"
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                    className={index === 2 ? "border-orange-400 text-orange-400" : ""}
                                  />
                                )}
                              />
                            </td>
                            <td className="text-center py-3 px-4">
                              <Controller
                                name={`medicalHistory.${condition}.motherSide`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroupItem
                                    value="mother"
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                    className={index === 4 ? "border-orange-400 text-orange-400" : ""}
                                  />
                                )}
                              />
                            </td>
                            <td className="text-center py-3 px-4">
                              <Controller
                                name={`medicalHistory.${condition}.fatherSide`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroupItem
                                    value="father"
                                    checked={field.value}
                                    onClick={() => field.onChange(!field.value)}
                                  />
                                )}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Your Disease isn't here? Add your own.</p>
                  <div className="flex justify-end mt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Save
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Surgical History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600 text-center">Surgical History</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                If you've had a surgery, add it now to keep a complete track of your medical history - because every
                detail matters when it comes to your health.
              </p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Your First Surgery
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 h-20 mt-8"></div>
    </div>
  )
}
