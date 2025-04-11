"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layouts/MainLayout";
import TextField from "@/app/components/common/TextField/TextField";
import SelectField from "@/app/components/common/SelectField/SelectField";
import DateSelector from "@/app/components/common/DateSelector/DateSelector";
import Button from "@/app/components/common/Button/Button";
import styles from "@/app/assets/member.module.css";

export default function NewMemberForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    membershipType: "",
    startDate: "",
    endDate: "",
    emergencyContact: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting", form);
    // send to API endpoint or trigger validation
  };

  return (
    <MainLayout isSignedIn={true}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">New Member Registration</h1>
        <p className="text-gray-600 mb-6">Please fill out the form below to register a new member.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="First Name" value={form.firstName} onChange={handleChange("firstName")} />
          <TextField label="Last Name" value={form.lastName} onChange={handleChange("lastName")} />
          <DateSelector label="Date of Birth" onChange={handleChange("dob")} />
          <SelectField
            label="Gender"
            options={[
              { Id: "male", Name: "Male" },
              { Id: "female", Name: "Female" },
              { Id: "other", Name: "Other" },
            ]}
            onChange={handleChange("gender")}
          />
          <TextField label="Email Address" value={form.email} onChange={handleChange("email")} />
          <TextField label="Phone Number" value={form.phone} onChange={handleChange("phone")} />
          <TextField label="Street Address" value={form.address} onChange={handleChange("address")} />
          <TextField label="City" value={form.city} onChange={handleChange("city")} />
          <SelectField
            label="State"
            options={[
              { Id: "TX", Name: "Texas" },
              { Id: "CA", Name: "California" },
              { Id: "NY", Name: "New York" },
            ]}
            onChange={handleChange("state")}
          />
          <TextField label="ZIP Code" value={form.zip} onChange={handleChange("zip")} />
          <SelectField
            label="Membership Type"
            options={[
              { Id: "basic", Name: "Basic" },
              { Id: "premium", Name: "Premium" },
              { Id: "vip", Name: "VIP" },
            ]}
            onChange={handleChange("membershipType")}
          />
          <DateSelector label="Start Date" onChange={handleChange("startDate")} />
          <DateSelector label="End Date" onChange={handleChange("endDate")} />
          <TextField label="Emergency Contact Name" value={form.emergencyContact} onChange={handleChange("emergencyContact")} />
          <TextField label="Relationship" value={form.emergencyRelation} onChange={handleChange("emergencyRelation")} />
          <TextField label="Emergency Phone" value={form.emergencyPhone} onChange={handleChange("emergencyPhone")} />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button text="Cancel" customStyle={{ backgroundColor: "#eee", color: "#000" }} />
          <Button text="Register Member" onClick={handleSubmit} />
        </div>
      </div>
    </MainLayout>
  );
}
