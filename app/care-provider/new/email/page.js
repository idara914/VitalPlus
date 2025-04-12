"use client";

import { useState } from "react";
import styles from "../../../assets/care-provider.module.css";
import MainLayout from "../../../components/layouts/MainLayout";
import Image from "next/image";
import EmailIcon from "../../../../public/imgs/email-icon.png";
import Button from "@/app/components/common/Button/Button";
import TextField from "@/app/components/common/TextField/TextField";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EmailAdd() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Invite sent successfully!");
      router.push("/care-provider/new/manual");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.emailPageContainer}>
          <div className={styles.emailPageMiniContainer}>
            <Image src={EmailIcon} alt="Email Provider" />
            <h1>Email New Provider</h1>
            <TextField
              label="Enter Email Address"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              customStyle={{ backgroundColor: "#fff" }}
              containerStyles={{ margin: "20px 0" }}
            />
            <div style={{ marginTop: 30 }}>
              <Button
                text="Cancel"
                onClick={() => router.push("/care-provider/new/manual")}
                customStyle={{
                  padding: "10px 14px",
                  backgroundColor: "#fff",
                  color: "#000",
                  marginRight: 20,
                }}
              />
              <Button
                text="Submit"
                onClick={handleSubmit}
                customStyle={{ padding: "10px 14px" }}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
