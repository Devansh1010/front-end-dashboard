"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AllergySelectorPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex flex-col items-center justify-start">
            <div className="w-full max-w-md bg-white shadow-md p-6 rounded-xl">
                <h2 className="font-bold text-blue-600 text-2xl mb-4">
                    Update your Allergies
                </h2>

                <Select>
                    <SelectTrigger className="w-full border-blue-500 focus:ring-2 focus:ring-blue-400">
                        <SelectValue placeholder="Select an allergy" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Food Allergies</SelectLabel>
                            <SelectItem value="milk">Milk</SelectItem>
                            <SelectItem value="eggs">Eggs</SelectItem>
                            <SelectItem value="peanuts">Peanuts</SelectItem>
                            <SelectItem value="tree_nuts">Tree Nuts</SelectItem>
                            <SelectItem value="shellfish">Shellfish</SelectItem>
                            <SelectItem value="fish">Fish</SelectItem>
                            <SelectItem value="soy">Soy</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                            <SelectLabel>Environmental Allergies</SelectLabel>
                            <SelectItem value="pollen">Pollen</SelectItem>
                            <SelectItem value="dust">Dust Mites</SelectItem>
                            <SelectItem value="mold">Mold</SelectItem>
                            <SelectItem value="pet_dander">Pet Dander</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                            <SelectLabel>Drug Allergies</SelectLabel>
                            <SelectItem value="penicillin">Penicillin</SelectItem>
                            <SelectItem value="aspirin">Aspirin</SelectItem>
                            <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
                            <SelectItem value="sulfa">Sulfa Drugs</SelectItem>
                        </SelectGroup>

                        <SelectGroup>
                            <SelectLabel>Other Allergies</SelectLabel>
                            <SelectItem value="latex">Latex</SelectItem>
                            <SelectItem value="insect">Insect Stings</SelectItem>
                            <SelectItem value="nickel">Nickel</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
