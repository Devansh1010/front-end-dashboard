"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type PrescriptionFormValues = {
  date: string;
  doctor: string;
  hospital: string;
  medications: string[];
  instructions: string;
};

const precriptionRecord = {
  date: "",
  doctor: "",
  hospital: "",
  medications: [],
  instructions: ""
};

export default function MedicalPrescriptionPage() {
  const [showForm, setShowForm] = useState(false);

  const precriptionForm = useForm<PrescriptionFormValues>({
    defaultValues: {
      date: "",
      doctor: "",
      hospital: "",
      medications: [],
      instructions: ""
    }
  });

  const onPrecriptionSubmit = (data: PrescriptionFormValues) => {
    console.log("Submitted Prescription:", data);
    // TODO: Send data to server or Firestore here
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full p-3 rounded-lg shadow bg-white">
        <p className="font-semibold text-gray-700">Add new medical prescription</p>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-700">
          {showForm ? "Close" : "View Medical Prescription"}
        </Button>
      </div>

      {/* Expandable Form */}
      {showForm && (
        <Form {...precriptionForm}>
          <form onSubmit={precriptionForm.handleSubmit(onPrecriptionSubmit)} className="space-y-4 mt-6 p-4 bg-white rounded-lg shadow">
            {/* Date */}
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

            {/* Doctor */}
            <FormField
              control={precriptionForm.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={precriptionRecord.doctor || "Enter Doctor Name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hospital */}
            <FormField
              control={precriptionForm.control}
              name="hospital"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={precriptionRecord.hospital || "Enter Hospital Name"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Medications */}
            <FormField
              control={precriptionForm.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={precriptionRecord.medications.join(', ') || "Enter medications (comma-separated)"}
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

            {/* Instructions */}
            <FormField
              control={precriptionForm.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="bg-blue-700">Save Prescription</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
