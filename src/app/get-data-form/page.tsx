'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useEffect ,useState} from 'react';
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



export default function Page() {

    const form = useForm({
        defaultValues: {
            personalInfo: {
                name: '',
                age: '',
                gender: 'M',
                bloodGroup: '',
                weightKg: '',
                height: { feet: '', inches: '' },
                BMI: ''
            },
            smoking: "No",
            alcoholConsumption: "No",
            drugUse: "No",
            exerciseFrequency: '',
            dietType: '',
            medicalPrescription: [
                {
                    date: '',
                    doctor: '',
                    hospital: '',
                    instructions: '',
                    medications: [{ name: '', frequency: '', duration: '', purpose: '' }]
                }
            ],
            knownAllergies: {
                drugAllergies: [{ name: '', severity: 'Low' }],
                foodAllergies: [{ name: '', severity: 'Low' }],
                environmentalAllergies: [{ name: '', severity: 'Low' }]
            },
            medicalHistory: [{ condition: '', diagnosedOn: '', status: 'Ongoing', notes: '' }],
            surgicalHistory: [{ surgery: '', date: '', hospital: '', surgeon: '', notes: '' }]
        }
    });

    const { control } = form;

    const {
        fields: prescriptionFields,
        append: addPrescription,
        remove: removePrescription
    } = useFieldArray({
        control,
        name: "medicalPrescription"
    });

    const {
        fields: drugAllergyFields,
        append: addDrugAllergy,
        remove: removeDrugAllergy
    } = useFieldArray({
        control,
        name: "knownAllergies.drugAllergies"
    });

    const {
        fields: surgicalFields,
        append: addSurgery,
        remove: removeSurgery
    } = useFieldArray({
        control,
        name: "surgicalHistory"
    });

    type Detail = {
    personalInfo: {
        name: string;
        age?: number;
        gender?: string;
        bloodGroup?: string;
        weightKg?: number;
        height?: {
            feet: number;
            inches: number;
        };
        BMI?: number;
    };
};
    console.log("form options: - ", form)
 const [details, setDetails] = useState<Detail[]>([])
    const GetData = async () => {
        try {
            const res = await axios.get("/api/get-records")
            setDetails(res.data.patients)
            console.log(res.data.patients)
        } catch (error) {
            alert("❌ Server error")
            console.error("API error:", error)
        }
    }

    useEffect(() => {
        GetData()
    }, [])
    return (
        
        <div className="max-w-5xl mx-auto px-4 py-10 bg-muted rounded-xl shadow-md">

            <h2 className="text-3xl font-semibold font-serif text-center text-gray-800 tracking-wide mb-6 border-b pb-2">
                🩺 Medical Information
            </h2>

            <div className="bg-white p-6 md:p-10 rounded-lg shadow-inner space-y-8">
                <Form {...form}>
                    <form>

                        <div className='flex gap-10'>
                            <FormField
                                control={form.control}
                                name="personalInfo.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Patient Name: </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Patient Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="personalInfo.age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Patient Age: </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Patient Age" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="personalInfo.gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            className="flex gap-6"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Male" id="gender-male" />
                                                </FormControl>
                                                <FormLabel htmlFor="gender-male">Male</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Female" id="gender-female" />
                                                </FormControl>
                                                <FormLabel htmlFor="gender-female">Female</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Other" id="gender-other" />
                                                </FormControl>
                                                <FormLabel htmlFor="gender-other">Other</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className='flex gap-10'>
                            <FormField
                                control={form.control}
                                name="personalInfo.bloodGroup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Patient BloodGroup: </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Blood Group: " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="personalInfo.weightKg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight : </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Weignt" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="personalInfo.height.feet"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (Feet)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g., 5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="personalInfo.height.inches"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (Inches)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g., 8" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="smoking"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Smoking: </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="Yes" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Yes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="No" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alcoholConsumption"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Alcohol Consumption: </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="Yes" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Yes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="No" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="drugUse"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Drug Use: </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="Yes" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Yes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value="No" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="exerciseFrequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exercise Frequency</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Daily" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dietType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diet Type</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Daily" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold">🩺 Medical Prescriptions</h2>

                            {form.watch("medicalPrescription")?.map((_, presIndex) => (
                                <div
                                    key={presIndex}
                                    className="border p-4 rounded-xl space-y-4 shadow-sm bg-white"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Prescription Date */}
                                        <FormField
                                            control={form.control}
                                            name={`medicalPrescription.${presIndex}.date`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Doctor */}
                                        <FormField
                                            control={form.control}
                                            name={`medicalPrescription.${presIndex}.doctor`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Doctor</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Dr. Smith" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Hospital */}
                                        <FormField
                                            control={form.control}
                                            name={`medicalPrescription.${presIndex}.hospital`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hospital</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="ABC Hospital" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Instructions */}
                                        <FormField
                                            control={form.control}
                                            name={`medicalPrescription.${presIndex}.instructions`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Instructions</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Take after meal..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Medications */}
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Medications</h4>
                                        {form.watch(`medicalPrescription.${presIndex}.medications`)?.map(
                                            (_, medIndex) => (
                                                <div
                                                    key={medIndex}
                                                    className="grid grid-cols-1 md:grid-cols-4 gap-3"
                                                >
                                                    <Input
                                                        placeholder="Name"
                                                        {...form.register(
                                                            `medicalPrescription.${presIndex}.medications.${medIndex}.name`
                                                        )}
                                                    />
                                                    <Input
                                                        placeholder="Frequency"
                                                        {...form.register(
                                                            `medicalPrescription.${presIndex}.medications.${medIndex}.frequency`
                                                        )}
                                                    />
                                                    <Input
                                                        placeholder="Duration"
                                                        {...form.register(
                                                            `medicalPrescription.${presIndex}.medications.${medIndex}.duration`
                                                        )}
                                                    />
                                                    <Input
                                                        placeholder="Purpose"
                                                        {...form.register(
                                                            `medicalPrescription.${presIndex}.medications.${medIndex}.purpose`
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                form.setValue(
                                                    `medicalPrescription.${presIndex}.medications`,
                                                    [
                                                        ...form.watch(
                                                            `medicalPrescription.${presIndex}.medications`
                                                        ),
                                                        { name: "", frequency: "", duration: "", purpose: "" },
                                                    ]
                                                )
                                            }
                                        >
                                            ➕ Add Medication
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                onClick={() =>
                                    form.setValue("medicalPrescription", [
                                        ...form.watch("medicalPrescription"),
                                        {
                                            date: "",
                                            doctor: "",
                                            hospital: "",
                                            instructions: "",
                                            medications: [{ name: "", frequency: "", duration: "", purpose: "" }],
                                        },
                                    ])
                                }
                            >
                                ➕ Add Prescription
                            </Button>
                        </div>

                        <h2 className="text-lg font-semibold mt-6">Drug Allergies</h2>
                        {drugAllergyFields.map((field, index) => (
                            <div key={field.id} className="flex gap-3 items-end mb-4">
                                <FormField
                                    control={control}
                                    name={`knownAllergies.drugAllergies.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Allergy Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Penicillin" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`knownAllergies.drugAllergies.${index}.severity`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Severity</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Low / Medium / High" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="destructive" onClick={() => removeDrugAllergy(index)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => addDrugAllergy({ name: '', severity: 'Low' })}>
                            + Add Drug Allergy
                        </Button>

                        <h2 className="text-lg font-semibold mt-6">Surgical History</h2>
                        {surgicalFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-2 gap-4 mb-6">
                                <FormField
                                    control={control}
                                    name={`surgicalHistory.${index}.surgery`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Surgery Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Appendix Removal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`surgicalHistory.${index}.date`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`surgicalHistory.${index}.hospital`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hospital</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Apollo Hospital" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`surgicalHistory.${index}.surgeon`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Surgeon</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dr. Sharma" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`surgicalHistory.${index}.notes`}
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Extra info (optional)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="destructive" onClick={() => removeSurgery(index)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() =>
                            addSurgery({ surgery: '', date: '', hospital: '', surgeon: '', notes: '' })
                        }>
                            + Add Surgery
                        </Button>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}