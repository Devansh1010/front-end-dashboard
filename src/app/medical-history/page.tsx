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
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { MedicalPrescription, MedicalRecord } from "@/models/Patient"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"


export default function MedicalHistory(id: any) {

  const [patientRecord, setPatientRecord] = useState<MedicalRecord>({
    personalInfo: {
      name: "",
      age: "",
      gender: '',
      bloodGroup: '',
      weightKg: "",
      height: {
        feet: "",
        inches: ""
      },
      BMI: ""
    },
    socialHistory: {
      smoking: '',
      alcoholConsumption: '',
      drugUse: '',
      exerciseFrequency: '',
      dietType: '',
    },
    medicalPrescription: [
      {
        date: new Date().toISOString().split('T')[0],
        doctor: '',
        hospital: '',
        medications: [],
        instructions: '',
      }
    ],

    knownAllergies: {
      drugAllergies: [],
      foodAllergies: [],
      environmentalAllergies: []
    },
    medicalHistory: [],
    surgicalHistory: []
  });

  const [precriptionRecord, setPrecriptionRecord] = useState<MedicalPrescription>({
    date: '',
    doctor: '',
    hospital: '',
    medications: [],
    instructions: ''
  });



  // TODO: display this data to appripriat form
  // TODO: create forms for different section of the full form part
  useEffect(() => {
    const getPatientData = async () => {
      try {
        const res = await axios.post(`/api/user-record`, id);
        if (res.data.PatientNameGetData) {
          setPatientRecord(res.data.PatientNameGetData)
          console.log(res.data.PatientNameGetData)
        }
      } catch (error) {
        console.log("error getting patient Data", error)
      }
    }

    getPatientData()
  }, [id])

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

  // * Medical Preciption form

  interface Medication {
    name: string;
    frequency: string;
    duration: string;
    purpose: string;
  }

  interface PrescriptionFormData {
    date: string;
    doctor: string;
    hospital: string;
    medications: Medication[];
    instructions: string;
  }

  // Medical Pricription


  const [showForm, setShowForm] = useState(false);
  const precriptionForm = useForm<PrescriptionFormData>({
    defaultValues: {
      date: '',
      doctor: '',
      hospital: '',
      medications: [],
      instructions: ''
    }
  });


  const onPrecriptionSubmit = async (data: PrescriptionFormData) => {
    try {
      const res = await axios.post('/api/add-record', data);

      if (res.status === 200) {
        toast.success('Prescription added successfully!');
        setPrecriptionRecord(res.data); // assuming it's the updated list or object
        precriptionForm.reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }

    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to submit prescription');
    }
  };

  // LifeStyle
  const habitKeys = [
    { label: "Smoking", key: "smoking" },
    { label: "Alcohol", key: "alcohol" },
    { label: "Drug Use", key: "drug_use" },
    { label: "Exercise", key: "exercise" },
    { label: "Caffeine", key: "caffeine" },
    { label: "Vegetarian", key: "vegetarian" },
  ] as const;

  type HabitKey = typeof habitKeys[number]["key"];

  type HabitsFormData = {
    habits: {
      smoking: 'yes' | 'no' | '';
      alcohol: 'yes' | 'no' | '';
      drug_use: 'yes' | 'no' | '';
      exercise: 'yes' | 'no' | '';
      caffeine: 'yes' | 'no' | '';
      vegetarian: 'yes' | 'no' | '';
    };
  };

  const defaultValues: HabitsFormData = {
    habits: {
      smoking: '',
      alcohol: '',
      drug_use: '',
      exercise: '',
      caffeine: '',
      vegetarian: '',
    },
  };

  const lifeStyle = useForm<HabitsFormData>({
    defaultValues
  });

  const onLifeStyleSubmit = async (data: HabitsFormData) => {
    console.log("Lifestyle Habits Submitted:", data);

    try {
      const res = await axios.post('/api/add-record/life-style', data);

      if (res.status === 200) {
        toast.success('Prescription added successfully!');
        setPrecriptionRecord(res.data); // assuming it's the updated list or object
        precriptionForm.reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }

    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to submit prescription');
    }

  };



  const habitQuestions = [
    "Do you exercise regularly?",
    "Do you consume alcohol?",
    "Do you smoke?",
    "Do you drink caffeine?",
    "Do you get enough sleep?",
  ]

  return (
    <div className="main-body flex flex-col h-full max-w-400 justify-center items-center p-5">
      <div className="main-card flex flex-col md:flex-row w-full md:w-300 h-full shadow-xl rounded-lg">
        {/* Left Part - Avatar and Form */}
        <div className="w-full max-w-4xl  md:w-1/3 bg-white md:bg-blue-100 p-4 order-1 md:order-">
          <div className="flex flex-col items-center justify-center mb-5">
            <Avatar className="h-40 w-40">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-center font-bold text-blue-700 text-2xl">{patientRecord.personalInfo?.name}</h1>
          </div>
          <div className="form-container">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Form fields remain the same */}
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>Blood Group:</FormLabel>
                      <FormControl>
                        <Input placeholder={patientRecord.personalInfo.bloodGroup} {...field} className="w-20" />
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
                      <FormLabel>Weight:</FormLabel>
                      <FormControl>
                        <Input placeholder={patientRecord.personalInfo.weightKg} {...field} className="w-20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>Height:</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder={patientRecord.personalInfo.height.feet}
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
                          <Input
                            type="number"
                            placeholder={patientRecord.personalInfo.height.inches}
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
                        <Input placeholder={patientRecord.personalInfo.BMI} {...field} className="w-20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        {/* Right Part - Social History */}
        <div className="w-full md:w-2/3 p-4 order-3 md:order-2">
          <h1 className="text-center font-bold text-3xl text-blue-700">Social History</h1>
          <p className="text-center mt-2 text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
          <hr className="border-1 m-2" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Desktop: Table Layout */}
              <div className="hidden md:block border rounded-lg overflow-x-auto">
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

              {/* Mobile: List Layout */}
              <div className="md:hidden space-y-4">
                <ol className="list-decimal list-inside space-y-6">
                  {habitQuestions.map((question, index) => (
                    <li key={index} className="pb-4 border-b last:border-b-0">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 mb-3">{question}</span>
                        <div className="flex justify-between items-center">
                          {["daily", "frequently", "never"].map((frequency) => (
                            <div key={frequency} className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2 capitalize">{frequency}</span>
                              <FormField
                                control={form.control}
                                name={`habits.${question.toLowerCase().replace(/\?/g, '').replace(/\s+/g, '_')}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <RadioGroupItem value={frequency} />
                                      </RadioGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <Button type="submit" className="mt-4 w-full md:w-auto bg-blue-700">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Medical Prescription */}
      <div className="flex justify-between items-center w-full p-3 rounded-lg shadow mt-4">
        <p className="font-semibold text-gray-700">Add new medical prescription</p>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-700">
          {showForm ? "Close" : "View Medical Priciption"}
        </Button>
      </div>

      {/* Expandable Form */}
      {showForm && (
        <Form {...precriptionForm}>
          <form onSubmit={precriptionForm.handleSubmit(onPrecriptionSubmit)} className="space-y-4 mt-6 p-4 bg-white rounded-lg shadow">
            <FormField
              control={precriptionForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="date" placeholder={precriptionRecord.date} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={precriptionForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={precriptionRecord.doctor} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={precriptionForm.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={precriptionRecord.hospital} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Simple string list of medications for now */}
            <FormField
              control={precriptionForm.control}
              name="madication"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter medications (comma-separated)"
                      onChange={(e) => {
                        const meds = e.target.value.split(',').map(m => m.trim());
                        field.onChange(meds);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={precriptionForm.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-blue-700">Save Prescription</Button>
          </form>
        </Form>
      )}


      {/* Lifestyle and Allergies */}
      <div className="flex flex-col md:flex-row h-full w-full md:w-300 gap-6 m-5 order-5">
        {/* Lifestyle Habits */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 order-1 md:order-1">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Lifestyle Habits</h2>

          <Form {...lifeStyle}>
            <form onSubmit={lifeStyle.handleSubmit(onLifeStyleSubmit)} className="space-y-6">
              <div className="border rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Yes</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">No</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {habitKeys.map(({ label, key }) => {
                      const fieldName = `habits.${key}` as const;

                      return (
                        <tr key={key}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {label}
                          </td>

                          {/* YES */}
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={lifeStyle.control}
                              name={fieldName}
                              render={({ field }) => (
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="yes" id={`${key}_yes`} />
                                </RadioGroup>
                              )}
                            />
                          </td>

                          {/* NO */}
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <FormField
                              control={lifeStyle.control}
                              name={fieldName}
                              render={({ field }) => (
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex justify-center"
                                >
                                  <RadioGroupItem value="no" id={`${key}_no`} />
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

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Save Lifestyle Habits
                </button>
              </div>
            </form>
          </Form>
        </div>


        {/* Allergies */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 order-2 md:order-2">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Allergies (4 Common)</h2>
          <Form {...allergiesForm}>
            <form onSubmit={allergiesForm.handleSubmit(onSubmitAllergies)} className="space-y-6">
              <div className="border rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Table content remains the same */}
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

      <div className="w-full m-5 md:w-300 order-4">
        <h2 className="font-bold text-blue-600 text-xl m-1">Update your Allergies</h2>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Europe & Africa</SelectLabel>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              <SelectItem value="west">
                Western European Summer Time (WEST)
              </SelectItem>
              <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
              <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
              <SelectItem value="ist_indonesia">
                Indonesia Central Standard Time (WITA)
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Australia & Pacific</SelectLabel>
              <SelectItem value="awst">
                Australian Western Standard Time (AWST)
              </SelectItem>
              <SelectItem value="acst">
                Australian Central Standard Time (ACST)
              </SelectItem>
              <SelectItem value="aest">
                Australian Eastern Standard Time (AEST)
              </SelectItem>
              <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
              <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>South America</SelectLabel>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Social history copy */}
      <div className="w-full order-5 md:order-5 md:w-300">
        <h1 className="text-center font-bold text-3xl text-blue-700">Social History</h1>
        <p className="text-center mt-2 text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
        <hr className="border-1 m-2" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Desktop: Table Layout */}
            <div className="hidden md:block border rounded-lg overflow-x-auto">
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

            {/* Mobile: List Layout */}
            <div className="md:hidden space-y-4">
              <ol className="list-decimal list-inside space-y-6">
                {habitQuestions.map((question, index) => (
                  <li key={index} className="pb-4 border-b last:border-b-0">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 mb-3">{question}</span>
                      <div className="flex justify-between items-center">
                        {["daily", "frequently", "never"].map((frequency) => (
                          <div key={frequency} className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2 capitalize">{frequency}</span>
                            <FormField
                              control={form.control}
                              name={`habits.${question.toLowerCase().replace(/\?/g, '').replace(/\s+/g, '_')}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <RadioGroupItem value={frequency} />
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Button type="submit" className="mt-4 w-full md:w-auto bg-blue-700">
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* ! last */}
    </div>
  )
}
