"use client";

import { useEffect, useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import Divider from "../../components/common/Divider/Divider";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { signIn } from '@/app/user/index';
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
  const [agencyType, setAgencyType] = useState("");
  const [agencyTypeList, setAgencyTypeList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await instance.get('/agency/agency-types').then(response => {
        if (response.status == 200) {
          setAgencyTypeList(response.data.data);
          setAgencyType(response.data.data[0].Id);
        }
      })
        .catch(error => {
          if (error.response.status == 403) {
            toast.success(error.response.data.message);
          } else {
            toast.error(error.response.data.message);
          }
        });
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (false) {
      // setError(emailError || passwordError);
    } else {
      let data = {
        orgName: orgName,
        contactNumber: contactNumber,
        faxNumber: faxNumber,
        taxNumber: taxNumber,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        agencyType: agencyType,
      }
      await instance.post('/user/updateProfile', data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }).then(response => {
        if (response.status == 201) {
          toast.success(response.data.message);
          router.push('/admin/dashboard');
        }
      })
        .catch(error => {
          if (error.response.status == 403) {
            toast.success(error.response.data.message);
          } else {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className={styles.formHeading}>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Organization Name"
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <SelectField
            options={agencyTypeList}
            label="Agency Type"
            value={agencyType}
            onChange={(e) => setAgencyType(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="Contact Number"
            type="contactNumber"
            placeholder="123456789"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="Fax Number"
            type="faxNumber"
            value={faxNumber}
            onChange={(e) => setFaxNumber(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="Tax Number"
            type="taxNumber"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="Address"
            type="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="City"
            type="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="State"
            type="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          <TextField
            label="Zip Code"
            type="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            customStyle={{
              marginBottom: "20px",
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            text="Update Profile"
            customStyle={{
              marginTop: "50px",
              width: "100%",
            }}
          />
        </form>
      </section>
    </AuthLayout>
  );
}
