import mongoose, { Schema, Document } from "mongoose";

export interface MedicalRecord {
    personalInfo: PersonalInfo;
    socialHistory: SocialHistory;
    medicalPrescription: MedicalPrescription[];
    knownAllergies: KnownAllergies;
    medicalHistory: MedicalHistoryEntry[];
    surgicalHistory: SurgicalHistoryEntry[];
}

export interface PersonalInfo {
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
    weightKg: number;
    height: {
        feet: number;
        inches: number;
    };
    BMI: number;
}

export interface SocialHistory {
    smoking: string;
    alcoholConsumption: string;
    drugUse: string;
    exerciseFrequency: string;
    dietType: string;
}

export interface MedicalPrescription {
    date: string; // ISO format: YYYY-MM-DD
    doctor: string;
    hospital: string;
    medications: Medication[];
    instructions: string;
}

export interface Medication {
    name: string;
    frequency: string;
    duration: string;
    purpose: string;
}

export interface KnownAllergies {
    drugAllergies: Allergy[];
    foodAllergies: Allergy[];
    environmentalAllergies: Allergy[];
}

export interface Allergy {
    name: string;
    severity: 'Low' | 'Moderate' | 'High';
}

export interface MedicalHistoryEntry {
    condition: string;
    diagnosedOn: string; // ISO format
    status: 'Ongoing' | 'Resolved';
    notes?: string;
}

export interface SurgicalHistoryEntry {
    surgery: string;
    date: string; // ISO format
    hospital: string;
    surgeon: string;
    notes?: string;
}


const patientSchema: Schema<MedicalRecord> = new Schema({
    personalInfo: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            enum: ['M', 'F', 'O'],
            required: true,
            default: "M"
        },
        bloodGroup: {
            type: String,
            required: true
        },
        weightKg: {
            type: Number,
            required: true
        },
        height: {
            feet: Number,
            inches: Number
        },

        BMI: {
            type: Number,
            required: true
        }

    },

    socialHistory: {
        smoking: { type: String, required: true },
        alcoholConsumption: { type: String, required: true },
        drugUse: { type: String, required: true },
        exerciseFrequency: { type: String, required: true },
        dietType: { type: String, required: true }
    },


    medicalPrescription: [
        {
            date: { type: String, required: true },
            doctor: { type: String, required: true },
            hospital: { type: String, required: true },
            medications: [
                {
                    name: { type: String, required: true },
                    frequency: { type: String, required: true },
                    duration: { type: String, required: true },
                    purpose: { type: String, required: true }
                }
            ],
            instructions: { type: String, required: true }
        }
    ],

    knownAllergies: {
        drugAllergies: [
            {
                name: { type: String, required: true },
                severity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true }
            }
        ],
        foodAllergies: [
            {
                name: { type: String, required: true },
                severity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true }
            }
        ],
        environmentalAllergies: [
            {
                name: { type: String, required: true },
                severity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true }
            }
        ]
    },

    medicalHistory: [
        {
            condition: { type: String, required: true },
            diagnosedOn: { type: String, required: true },
            status: { type: String, enum: ['Ongoing', 'Resolved'], required: true },
            notes: { type: String }
        }
    ],

    surgicalHistory: [
        {
            surgery: { type: String, required: true },
            date: { type: String, required: true },
            hospital: { type: String, required: true },
            surgeon: { type: String, required: true },
            notes: { type: String }
        }
    ]
})

export default mongoose.models.MedicalRecord ||
    mongoose.model<MedicalRecord>("MedicalRecord", patientSchema);