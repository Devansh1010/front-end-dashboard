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
                enum: ['Male', 'Female', 'Other'],
                required: true,
                default: "Male"
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

        },

        socialHistory: {
            smoking: { type: String,  },
            alcoholConsumption: { type: String,  },
            drugUse: { type: String,  },
            exerciseFrequency: { type: String,  },
            dietType: { type: String,  }
        },


        medicalPrescription: [
            {
                date: { type: String,  },
                doctor: { type: String,  },
                hospital: { type: String,  },
                medications: [
                    {
                        name: { type: String,  },
                        frequency: { type: String,  },
                        duration: { type: String,  },
                        purpose: { type: String,  }
                    }
                ],
                instructions: { type: String,  }
            }
        ],

        knownAllergies: {
            drugAllergies: [
                {
                    name: { type: String,  },
                    severity: { type: String, enum: ['Low', 'Moderate', 'High'],  }
                }
            ],
            foodAllergies: [
                {
                    name: { type: String,  },
                    severity: { type: String, enum: ['Low', 'Moderate', 'High'],  }
                }
            ],
            environmentalAllergies: [
                {
                    name: { type: String, },
                    severity: { type: String, enum: ['Low', 'Moderate', 'High'],  }
                }
            ]
        },

        medicalHistory: [
            {
                condition: { type: String,  },
                diagnosedOn: { type: String,  },
                status: { type: String, enum: ['Ongoing', 'Resolved'],  },
                notes: { type: String }
            }
        ],

        surgicalHistory: [
            {
                surgery: { type: String,  },
                date: { type: String,  },
                hospital: { type: String,  },
                surgeon: { type: String,  },
                notes: { type: String }
            }
        ]
    })

    export default mongoose.models.MedicalRecord ||
        mongoose.model<MedicalRecord>("MedicalRecord", patientSchema);