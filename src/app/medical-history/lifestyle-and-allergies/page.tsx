import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";

const habitKeys = [
    { label: "Smoking", key: "smoking" },
    { label: "Alcohol", key: "alcohol" },
    { label: "Exercise", key: "exercise" },
    { label: "Sleep Quality", key: "sleepQuality" },
    { label: "Water Intake", key: "waterIntake" },
    { label: "Mindfulness", key: "mindfulness" },
    { label: "Diet", key: "diet" },
];

export default function LifestyleAllergyPage() {
    const lifeStyle = useForm();
    const allergiesForm = useForm();

    const onLifeStyleSubmit = async (data: any) => {
        console.log("Lifestyle Data", data);

        try {
            const response = await axios.post("/api/lifestyle", data);

            console.log("Saved Lifestyle:", response.data);

            alert("Lifestyle details saved successfully!");
            // Optionally move to next step or reset form
        } catch (error) {
            console.error("Error saving lifestyle data:", error);
            alert("Failed to save lifestyle data.");
        }
    };

    const onSubmitAllergies = async (data: any) => {
        console.log("Allergy Data", data);

        try {
            const response = await axios.post("/api/allergies", data);

            console.log("Saved Allergies:", response.data);

            alert("Allergy information saved successfully!");
            // Optionally move to next step or reset form
        } catch (error) {
            console.error("Error saving allergy data:", error);
            alert("Failed to save allergy info.");
        }
    };

    return (
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
                                        const fieldName = `habits.${key}`;
                                        return (
                                            <tr key={key}>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
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
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Allergen</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Yes</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">No</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {["Peanuts", "Dairy", "Gluten", "Shellfish"].map((allergy) => {
                                        const fieldName = `allergies.${allergy.toLowerCase()}`;
                                        return (
                                            <tr key={allergy}>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{allergy}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                                    <FormField
                                                        control={allergiesForm.control}
                                                        name={fieldName}
                                                        render={({ field }) => (
                                                            <RadioGroup
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                className="flex justify-center"
                                                            >
                                                                <RadioGroupItem value="yes" id={`${fieldName}_yes`} />
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-center">
                                                    <FormField
                                                        control={allergiesForm.control}
                                                        name={fieldName}
                                                        render={({ field }) => (
                                                            <RadioGroup
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                className="flex justify-center"
                                                            >
                                                                <RadioGroupItem value="no" id={`${fieldName}_no`} />
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
    );
}