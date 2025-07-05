const medicalRecord = [{
    "patientId": "P12345",
    "personalInfo": {
        "name": "Devansh Prajapati",
        "age": 28,
        "gender": "Male",
        "bloodGroup": "B+",
        "weightKg": 70,
        "height": {
            "feet": 5,
            "inches": 8
        },
        "BMI": 23.2
    },

    "socialHistory": {
        "smoking": "No",
        "alcoholConsumption": "Occasionally",
        "drugUse": "No",
        "exerciseFrequency": "3 times a week",
        "dietType": "Vegetarian"
    },

    "classicalHealthQuestions": [
        {
            "question": "Do you have any chronic illnesses?",
            "answer": "Yes"
        },
        {
            "question": "Do you have a history of surgery?",
            "answer": "Yes"
        },
        {
            "question": "Are you currently on any medication?",
            "answer": "Yes"
        },
        {
            "question": "Do you have any known allergies?",
            "answer": "Yes"
        },
        {
            "question": "Do you experience shortness of breath during physical activity?",
            "answer": "No"
        }
    ],

    "medicalPrescription": [
        {
            "date": "2025-06-25",
            "doctor": "Dr. Suresh Shah",
            "hospital": "Apollo Clinic, Ahmedabad",
            "medications": [
                {
                    "name": "Metformin 500mg",
                    "frequency": "Twice a day",
                    "duration": "30 days",
                    "purpose": "Type 2 Diabetes"
                },
                {
                    "name": "Vitamin D3",
                    "frequency": "Once a day",
                    "duration": "60 days",
                    "purpose": "Vitamin deficiency"
                }
            ],
            "instructions": "Check blood sugar weekly. Follow up in 1 month."
        }
    ],

    "knownAllergies": {
        "drugAllergies": [
            {
                "name": "Penicillin",
                "severity": "High"
            }
        ],
        "foodAllergies": [
            {
                "name": "Peanuts",
                "severity": "Moderate"
            }
        ],
        "environmentalAllergies": [
            {
                "name": "Pollen",
                "severity": "Low"
            }
        ]
    },

    "medicalHistory": [
        {
            "condition": "Type 2 Diabetes",
            "diagnosedOn": "2021-08-10",
            "status": "Ongoing",
            "notes": "Under control with medication"
        },
        {
            "condition": "Chickenpox",
            "diagnosedOn": "2005-03-15",
            "status": "Resolved"
        }
    ],

    "surgicalHistory": [
        {
            "surgery": "Appendectomy",
            "date": "2019-12-20",
            "hospital": "Sterling Hospital, Ahmedabad",
            "surgeon": "Dr. Ravi Mehta",
            "notes": "Recovery was smooth, no complications."
        },
        {
            "surgery": "LASIK Eye Surgery",
            "date": "2023-04-10",
            "hospital": "ClearView Eye Centre",
            "surgeon": "Dr. Neha Parikh",
            "notes": "Vision improved, follow-up completed."
        }
    ]
}
]