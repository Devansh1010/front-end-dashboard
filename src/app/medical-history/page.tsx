"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MedicalHistory() {

  const [name, setName] = useState("Vivek");

  const form = useForm()
  const onSubmit = () => {

  }

  const onSubmitAllergies = () => {

  }


  const allergiesForm = useForm({
    defaultValues: {
      allergies: {
        peanuts: "",
        dairy: "",
        gluten: "",
        shellfish: ""
      }
    }
  });
  const habitQuestions = [
    "Do you exercise regularly?",
    "Do you consume alcohol?",
    "Do you smoke?",
    "Do you drink caffeine?",
    "Do you get enough sleep?",
  ]

  return (
    <div className="main-body flex flex-col h-full max-w-400 justify-center items-center p-5">
      <div className="main-card flex w-300  h-full shadow-xl rounded-lg">
        <div className="left-part w-1/3 bg-blue-200 p-4">

          <div className="flex flex-col items-center justify-center mb-5">
            <Avatar className="h-40 w-40">  {/* Default is h-10 w-10 */}
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-center font-bold text-blue-700 text-2xl"> {name}</h1>
          </div>
          <div className="form-container">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>Blood Group:</FormLabel>
                      <FormControl>
                        <Input placeholder={name} {...field} className="w-20" />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>Weight:</FormLabel>
                      <FormControl>
                        <Input placeholder={name} {...field} className="w-20" />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height" // This will be an object containing feet and inches
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>Height:</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          {/* Feet input */}
                          <Input
                            type="number"
                            placeholder="Feet"
                            className="w-20"
                            value={field.value?.feet || ''}
                            onChange={(e) => {
                              field.onChange({
                                ...field.value,
                                feet: e.target.value
                              });
                            }}
                          />
                          <span>ft</span>

                          {/* Inches input */}
                          <Input
                            type="number"
                            placeholder="Inches"
                            className="w-20"
                            value={field.value?.inches || ''}
                            onChange={(e) => {
                              field.onChange({
                                ...field.value,
                                inches: e.target.value
                              });
                            }}
                          />
                          <span>in</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>BMI:</FormLabel>
                      <FormControl>
                        <Input placeholder={name} {...field} className="w-20" />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="right-part w-2/3 p-4">
          <h1 className="text-center font-bold text-3xl text-blue-700">Social History</h1>
          <p className="text-center mt-2 text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
          <hr className="border-1 m-2" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs text-blue-500 font-bold uppercase tracking-wider">
                        Lifestyle Habit Questions
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Daily
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequently
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Never
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {habitQuestions.map((question, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {question}
                        </td>
                        {["daily", "frequently", "never"].map((frequency) => (
                          <td key={frequency} className="px-6 py-4 whitespace-nowrap text-center">
                            <FormField
                              control={form.control}
                              name={`habits.${question.toLowerCase().replace(/\?/g, '').replace(/\s+/g, '_')}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="flex justify-center"
                                    >
                                      <RadioGroupItem value={frequency} />
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div >

      <div className="mt-5">
        <h1 className="mt-5 font-bold text-xl text-blue-600">View medical Precrisption</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="flex gap-3 justify-center items-center">
              <FormField
                control={form.control}
                name="preciption"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} className="w-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Medical Pricription</Button>
            </div>
          </form>
        </Form>

      </div>

      <div className="flex h-full w-300 gap-6 p-6">
        {/* Left Section - Lifestyle Habits */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Lifestyle Habits</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Yes</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">No</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      "Smoking",
                      "Alcohol",
                      "Drug Use",
                      "Exercise",
                      "Caffeine",
                      "Vegetarian"
                    ].map((habit) => {
                      const fieldName = `habits.${habit.toLowerCase().replace(' ', '_')}`;
                      return (
                        <tr key={habit}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {habit}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={form.control}
                              name={fieldName}
                              render={({ field }) => (
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="yes" />
                                </RadioGroup>
                              )}
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={form.control}
                              name={fieldName}
                              render={({ field }) => (
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="no" />
                                </RadioGroup>
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Section - Allergies */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Allergies (4 Common)</h2>
          <Form {...allergiesForm}>
            <form onSubmit={allergiesForm.handleSubmit(onSubmitAllergies)} className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Allergen</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Yes</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">No</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      "Peanuts",
                      "Dairy",
                      "Gluten",
                      "Shellfish"
                    ].map((allergy) => {
                      const fieldName = `allergies.${allergy.toLowerCase()}`;
                      return (
                        <tr key={allergy}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {allergy}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={allergiesForm.control}
                              name='allergies.peanuts'
                              render={({ field }) => (
                                <RadioGroup
                                  // value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="yes" />
                                </RadioGroup>
                              )}
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={allergiesForm.control}
                              name='allergies.dairy'
                              render={({ field }) => (
                                <RadioGroup
                                  // value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="no" />
                                </RadioGroup>
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </Form>
        </div>
      </div>


      <div className="right-part w-2/3 p-4">
        <h1 className="text-center font-bold text-3xl text-blue-700">Social History</h1>
        <p className="text-center mt-2 text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
        <hr className="border-1 m-2" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-blue-500 font-bold uppercase tracking-wider">
                      Lifestyle Habit Questions
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Daily
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequently
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Never
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {habitQuestions.map((question, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {question}
                      </td>
                      {["daily", "frequently", "never"].map((frequency) => (
                        <td key={frequency} className="px-6 py-4 whitespace-nowrap text-center">
                          <FormField
                            control={form.control}
                            name={`habits.${question.toLowerCase().replace(/\?/g, '').replace(/\s+/g, '_')}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex justify-center"
                                  >
                                    <RadioGroupItem value={frequency} />
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    
      {/* = Last */ }
    </div >


  )
}
