'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios'

export default function CreateMedicalRecordPage() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            personalInfo: {
                name: '',
                age: '',
                gender: 'M',
                bloodGroup: '',
                weightKg: '',
                height: {
                    feet: '',
                    inches: ''
                },
                BMI: ''
            },
            smoking: '',
            alcoholConsumption: '',
            drugUse: '',
            exerciseFrequency: '',
            dietType: '',
            medicalPrescription: [
                {
                    date: '',
                    doctor: '',
                    hospital: '',
                    instructions: '',
                    medications: [
                        { name: '', frequency: '', duration: '', purpose: '' }
                    ]
                }
            ],
            knownAllergies: {
                drugAllergies: [{ name: '', severity: 'Low' }],
                foodAllergies: [],
                environmentalAllergies: []
            },
            medicalHistory: [],
            surgicalHistory: []
        }
    });

    const {
        fields: prescriptionFields,
        append: addPrescription
    } = useFieldArray({
        control,
        name: 'medicalPrescription'
    });

    const {
        fields: medicationFields,
        append: addMedication
    } = useFieldArray({
        control,
        name: 'medicalPrescription.0.medications'
    });

    const onSubmit = async (data: any) => {
      try {
         const res = await axios.post('/api/add-record', data)
  
         if(!res){
          return
         } 
         
         alert(res.data)
      } catch (error) {
        alert(`Failed: ${error}`)
      }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <input {...register('personalInfo.name')} placeholder="Name" />
            <input type="number" {...register('personalInfo.age')} placeholder="Age" />
            <select {...register('personalInfo.gender')}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>
            <input {...register('personalInfo.bloodGroup')} placeholder="Blood Group" />
            <input type="number" {...register('personalInfo.weightKg')} placeholder="Weight (kg)" />
            <input type="number" {...register('personalInfo.height.feet')} placeholder="Height Feet" />
            <input type="number" {...register('personalInfo.height.inches')} placeholder="Height Inches" />
            <input type="number" {...register('personalInfo.BMI')} placeholder="BMI" />

            <h2 className="text-xl font-semibold">Social History</h2>
            <input {...register('smoking')} placeholder="Smoking" />
            <input {...register('alcoholConsumption')} placeholder="Alcohol Consumption" />
            <input {...register('drugUse')} placeholder="Drug Use" />
            <input {...register('exerciseFrequency')} placeholder="Exercise Frequency" />
            <input {...register('dietType')} placeholder="Diet Type" />

            <h2 className="text-xl font-semibold">Medical Prescription</h2>
            {prescriptionFields.map((field, index) => (
                <div key={field.id} className="border p-2">
                    <input {...register(`medicalPrescription.${index}.date`)} placeholder="Date" />
                    <input {...register(`medicalPrescription.${index}.doctor`)} placeholder="Doctor" />
                    <input {...register(`medicalPrescription.${index}.hospital`)} placeholder="Hospital" />
                    <input {...register(`medicalPrescription.${index}.instructions`)} placeholder="Instructions" />

                    <h4>Medications:</h4>
                    {medicationFields.map((med, mIndex) => (
                        <div key={med.id} className="pl-4">
                            <input {...register(`medicalPrescription.${index}.medications.${mIndex}.name`)} placeholder="Name" />
                            <input {...register(`medicalPrescription.${index}.medications.${mIndex}.frequency`)} placeholder="Frequency" />
                            <input {...register(`medicalPrescription.${index}.medications.${mIndex}.duration`)} placeholder="Duration" />
                            <input {...register(`medicalPrescription.${index}.medications.${mIndex}.purpose`)} placeholder="Purpose" />
                        </div>
                    ))}
                    <button type="button" onClick={() => addMedication({ name: '', frequency: '', duration: '', purpose: '' })}>
                        ➕ Add Medication
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => addPrescription({
                date: '',
                doctor: '',
                hospital: '',
                instructions: '',
                medications: [{ name: '', frequency: '', duration: '', purpose: '' }]
            })}>
                ➕ Add Prescription
            </button>

            <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save Record</button>
        </form>
    );
}
