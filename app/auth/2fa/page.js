"use client";

import { useEffect, useState } from "react";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import styles from './TwoFactorAuth.module.css';

export default function TwoFactorAuthenticator(props) {
  const router = useRouter();
  const [code, setCode] = useState(new Array(6).fill(''));
  const [qrCode, setQrCode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loggedInUser = JSON.parse(window.localStorage.getItem('user'));
    if (!loggedInUser) {
      toast.error('Not logged in!');
      router.push('/auth/login')
    } else {
      setUser(loggedInUser);
    }
  }, []);

  const handleChange = (element, index) => {
    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Move focus to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    } else {
      let token = newCode.join("");
      handleVerify(token);
    }
  };

  // 1. Request MFA setup (QR Code generation)
  const handleSetup = async () => {
    const response = await instance.post('/auth/mfa/setup', { email: user.Email });
    setQrCode(response.data.qrCode);
  };

  // 2. Verify the MFA token
  const handleVerify = async (token) => {
    await instance.post('/auth/mfa/verify', { email: user.Email, token }).then(response => {
      if (response.status == 200 || response.status == 201 && response.data.success) {
        toast.success(response.data.message);
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        setIsAuthenticated(true);
        router.push('/member/new')

      }
    }).catch(error => {
      toast.error(error.response.data.message);
    })
  };
  return (
    <AuthLayout
      heading="Two Factor Authentication"
      text="Please scan app to connect your account with 2FA. Enter the six digit code from your authentication app!"
    >
      {!(user && user.mfa_authenticated) && !qrCode && <button onClick={handleSetup}>Setup MFA</button>}
      {!(user && user.mfa_authenticated) && qrCode && (
        <>
          <h3>Scan the QR Code</h3>
          <img src={qrCode} alt="Scan the QR Code" />
          <h3>Enter the Authentor Code</h3>
          <div className={styles.inputContainer}>
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={styles.inputBox}
                value={num}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
        </>
      )}

      {(user && user.mfa_authenticated == 1) && (
        <>
          <h3>Enter the Authentor Code</h3>
          <div className={styles.inputContainer}>
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={styles.inputBox}
                value={num}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
        </>
      )}
      {isAuthenticated && <p>Authenticated successfully!</p>}
    </AuthLayout>
  );
}
