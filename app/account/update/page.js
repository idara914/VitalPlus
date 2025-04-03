"use client";

import { useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SelectField from "@/app/components/common/SelectField/SelectField";

export default function Update() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [agencyType, setAgencyType] = useState("Homehealth");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      orgName,
      contactNumber,
      faxNumber,
      taxNumber,
      address,
      city,
      state,
      zipCode,
      agencyType,
    };

    try {
      const response = await instance.post('/user/updateProfile', data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push('/admin/dashboard');
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className="formHeading">Complete Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <TextField label="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          <SelectField
            options={[{ Id: "Homehealth", Name: "Homehealth" }]}
            label="Agency Type"
            value={agencyType}
            onChange={(e) => setAgencyType(e.target.value)}
          />
          <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          <TextField label="Fax Number" value={faxNumber} onChange={(e) => setFaxNumber(e.target.value)} />
          <TextField label="Tax Number" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} />
          <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField label="State" value={state} onChange={(e) => setState(e.target.value)} />
          <TextField label="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button text="Update Profile" customStyle={{ marginTop: "50px", width: "100%" }} />
        </form>
      </section>
    </AuthLayout>
  );
}
