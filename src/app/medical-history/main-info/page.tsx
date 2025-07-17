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
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { on } from "events"

const MainInfoPage: React.FC = () => {

    const mainInfo = useForm({
        defaultValues: {
            bloodGroup: "",
            weight: "",
            height: { feet: "", inches: "" },
            BMI: "",
        }
    })

    const onSubmitMainInfo = (data: any) => {
        const submitData = async () => {
            try {
                const response = await axios.patch('/api/add-records/add-main-info', {
                    id: "patient-id", // Replace with actual patient ID
                    bloodGroup: data.bloodGroup,
                    weight: data.weight,
                    height: data.height,
                    bmi: data.BMI
                });
                console.log("Response:", response.data);
            } catch (error) {
                console.error("Error submitting main info:", error);
            }
        }
    }

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
    const socialHistory = useForm({
        defaultValues: defaultValues
    })

    const habitQuestions = [
        { label: "Do you exercise regularly?", field: "exercise" },
        { label: "Do you consume alcohol?", field: "alcohol" },
        { label: "Do you smoke?", field: "smoking" },
        { label: "Do you drink caffeine?", field: "caffeine" },
        { label: "Are you vegetarian?", field: "vegetarian" },
        { label: "Do you use drugs?", field: "drug_use" },
    ] as const;


    const onSubmitSocialHistory = (data: any) => {
        const submitData = async () => {
            try {
                const response = await axios.patch('/api/add-records/add-social-history', {
                    id: "patient-id",
                    habits: data.habits
                });
                console.log("Response:", response.data);
            } catch (error) {
                console.error("Error submitting social history:", error);
            }
        }
    }



    const [patientRecord, setPatientRecord] = useState<any>({ personalInfo: {} });
    const [patientSocialHistory, setPatientSocialHistory] = useState<any>( { habits: {} });

    const getPatientMainInfo = async () => {
        try {
            const response = await axios.get('/api/get-patient-main-info', {
                params: { id: "patient-id" } // Replace with actual patient ID
            });
            setPatientRecord(response.data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    const getPatientSocialHistory = async () => {
        try {
            const response = await axios.get('/api/get-patient-social-history', {
                params: { id: "patient-id" } // Replace with actual patient ID
            });
            setPatientSocialHistory(response.data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
        }
    }

    useEffect(() => {
        getPatientMainInfo();
    }, [onSubmitMainInfo]);
    
    useEffect(() => {
        getPatientSocialHistory();
    }, [onSubmitSocialHistory]);
    return (
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
                    <Form {...mainInfo}>
                        <form onSubmit={mainInfo.handleSubmit(onSubmitMainInfo)} className="space-y-8">
                            {/* Form fields remain the same */}
                            <FormField
                                control={mainInfo.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2">
                                        <FormLabel>Blood Group:</FormLabel>
                                        <FormControl>
                                            <Input placeholder={""} {...field} className="w-20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mainInfo.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2">
                                        <FormLabel>Weight:</FormLabel>
                                        <FormControl>
                                            <Input placeholder={""} {...field} className="w-20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={mainInfo.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormLabel>Height:</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder={ ''}
                                                    className="w-20"
                                                    value={''}
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
                                                    placeholder={''}
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
                                control={mainInfo.control}
                                name="BMI"
                                render={({ field }) => (
                                    <FormItem className="flex gap-2">
                                        <FormLabel>BMI:</FormLabel>
                                        <FormControl>
                                            <Input placeholder={""} {...field} className="w-20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <Button type="submit" className="mt-4 w-full bg-blue-700">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>

            {/* Right Part - Social History */}
            <div className="w-full md:w-2/3 p-4 order-3 md:order-2">
                <h1 className="text-center font-bold text-3xl text-blue-700">Social History</h1>
                <p className="text-center mt-2 text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
                <hr className="border-1 m-2" />

                <Form {...socialHistory}>
                    <form onSubmit={socialHistory.handleSubmit(onSubmitSocialHistory)}>
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
                                    {habitQuestions.map(({ label, field }, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {label}
                                            </td>
                                            {["yes", "no"].map((option) => (
                                                <td key={option} className="px-6 py-4 whitespace-nowrap text-center">
                                                    <FormField
                                                        control={socialHistory.control}
                                                        name={`habits.${field}`}
                                                        render={({ field: radioField }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        onValueChange={radioField.onChange}
                                                                        value={radioField.value}
                                                                        className="flex justify-center"
                                                                    >
                                                                        <RadioGroupItem value={option} />
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
                                {habitQuestions.map(({ label, field }, index) => (
                                    <li key={index} className="pb-4 border-b last:border-b-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 mb-3">{label}</span>
                                            <div className="flex justify-between items-center">
                                                {["yes", "no"].map((option) => (
                                                    <div key={option} className="flex items-center">
                                                        <span className="text-xs text-gray-500 mr-2 capitalize">{option}</span>
                                                        <FormField
                                                            control={socialHistory.control}
                                                            name={`habits.${field}`}
                                                            render={({ field: radioField }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroup
                                                                            onValueChange={radioField.onChange}
                                                                            value={radioField.value}
                                                                        >
                                                                            <RadioGroupItem value={option} />
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
    );
};

export default MainInfoPage;