'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

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
        height: { feet: '', inches: '' },
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

  // Prescriptions
  const { fields: prescriptions, append: addPrescription } = useFieldArray({
    control,
    name: 'medicalPrescription'
  });

  // Medical History
  const { fields: medHistory, append: addMedHistory } = useFieldArray({
    control,
    name: 'medicalHistory'
  });

  // Surgical History
  const { fields: surgHistory, append: addSurgHistory } = useFieldArray({
    control,
    name: 'surgicalHistory'
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/api/add-record', data);
      if (res.status === 201 || res.status === 200) {
        alert('✅ Record saved!');
        reset();
      } else {
        alert('❌ Failed to save');
      }
    } catch (error) {
      alert('❌ Server error');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
      {/* Personal Info */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">👤 Personal Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <input {...register('personalInfo.name')} placeholder="Name" className="input" />
          <input type="number" {...register('personalInfo.age')} placeholder="Age" className="input" />
          <select {...register('personalInfo.gender')} className="input">
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <input {...register('personalInfo.bloodGroup')} placeholder="Blood Group" className="input" />
          <input type="number" {...register('personalInfo.weightKg')} placeholder="Weight (kg)" className="input" />
          <input type="number" {...register('personalInfo.height.feet')} placeholder="Height (Feet)" className="input" />
          <input type="number" {...register('personalInfo.height.inches')} placeholder="Height (Inches)" className="input" />
          <input type="number" {...register('personalInfo.BMI')} placeholder="BMI" className="input" />
        </div>
      </section>

      {/* Social History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🏋️ Social History</h2>
        <div className="grid grid-cols-2 gap-4">
          <input {...register('smoking')} placeholder="Smoking" className="input" />
          <input {...register('alcoholConsumption')} placeholder="Alcohol Consumption" className="input" />
          <input {...register('drugUse')} placeholder="Drug Use" className="input" />
          <input {...register('exerciseFrequency')} placeholder="Exercise Frequency" className="input" />
          <input {...register('dietType')} placeholder="Diet Type" className="input" />
        </div>
      </section>

      {/* Medical Prescription */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">💊 Medical Prescriptions</h2>
        {prescriptions.map((presc, i) => (
          <div key={presc.id} className="border p-4 mb-4 rounded bg-gray-50">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <input {...register(`medicalPrescription.${i}.date`)} placeholder="Date" className="input" />
              <input {...register(`medicalPrescription.${i}.doctor`)} placeholder="Doctor" className="input" />
              <input {...register(`medicalPrescription.${i}.hospital`)} placeholder="Hospital" className="input" />
              <input {...register(`medicalPrescription.${i}.instructions`)} placeholder="Instructions" className="input" />
            </div>
            <h4 className="font-semibold mt-2">Medications:</h4>
            <div className="grid grid-cols-4 gap-2">
              {presc.medications.map((_, j) => (
                <div key={j} className="flex flex-col">
                  <input {...register(`medicalPrescription.${i}.medications.${j}.name`)} placeholder="Name" className="input" />
                  <input {...register(`medicalPrescription.${i}.medications.${j}.frequency`)} placeholder="Frequency" className="input" />
                  <input {...register(`medicalPrescription.${i}.medications.${j}.duration`)} placeholder="Duration" className="input" />
                  <input {...register(`medicalPrescription.${i}.medications.${j}.purpose`)} placeholder="Purpose" className="input" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addPrescription({
          date: '', doctor: '', hospital: '', instructions: '',
          medications: [{ name: '', frequency: '', duration: '', purpose: '' }]
        })} className="btn">➕ Add Prescription</button>
      </section>

      {/* Allergies */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">⚠️ Known Allergies</h2>
        <div className="grid grid-cols-3 gap-4">
          <input {...register('knownAllergies.drugAllergies.0.name')} placeholder="Drug Allergy" className="input" />
          <select {...register('knownAllergies.drugAllergies.0.severity')} className="input">
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          <input {...register('knownAllergies.foodAllergies.0.name')} placeholder="Food Allergy" className="input" />
          <select {...register('knownAllergies.foodAllergies.0.severity')} className="input">
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>

          <input {...register('knownAllergies.environmentalAllergies.0.name')} placeholder="Env Allergy" className="input" />
          <select {...register('knownAllergies.environmentalAllergies.0.severity')} className="input">
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
      </section>

      {/* Medical History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📄 Medical History</h2>
        {medHistory.map((entry, i) => (
          <div key={entry.id} className="grid grid-cols-4 gap-4 mb-2">
            <input {...register(`medicalHistory.${i}.condition`)} placeholder="Condition" className="input" />
            <input {...register(`medicalHistory.${i}.diagnosedOn`)} placeholder="Diagnosed On" className="input" />
            <select {...register(`medicalHistory.${i}.status`)} className="input">
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
            <input {...register(`medicalHistory.${i}.notes`)} placeholder="Notes" className="input" />
          </div>
        ))}
        <button type="button" onClick={() => addMedHistory({ condition: '', diagnosedOn: '', status: 'Ongoing', notes: '' })} className="btn">
          ➕ Add Medical History
        </button>
      </section>

      {/* Surgical History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🩺 Surgical History</h2>
        {surgHistory.map((entry, i) => (
          <div key={entry.id} className="grid grid-cols-5 gap-4 mb-2">
            <input {...register(`surgicalHistory.${i}.surgery`)} placeholder="Surgery" className="input" />
            <input {...register(`surgicalHistory.${i}.date`)} placeholder="Date" className="input" />
            <input {...register(`surgicalHistory.${i}.hospital`)} placeholder="Hospital" className="input" />
            <input {...register(`surgicalHistory.${i}.surgeon`)} placeholder="Surgeon" className="input" />
            <input {...register(`surgicalHistory.${i}.notes`)} placeholder="Notes" className="input" />
          </div>
        ))}
        <button type="button" onClick={() => addSurgHistory({ surgery: '', date: '', hospital: '', surgeon: '', notes: '' })} className="btn">
          ➕ Add Surgical History
        </button>
      </section>

      <div className="text-center pt-6">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg">
          ✅ Submit Medical Record
        </button>
      </div>
    </form>
  );
}
