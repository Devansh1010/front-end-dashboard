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

  const habitQuestions = [
    "Do you exercise regularly?",
    "Do you consume alcohol?",
    "Do you smoke?",
    "Do you drink caffeine?",
    "Do you get enough sleep?",
  ]

  return (
    <div className="main-body flex flex-col h-full w-full justify-center items-center p-5">
      <div className="main-card flex w-250  h-full shadow-xl rounded-lg">
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
    </div >
  )
}
