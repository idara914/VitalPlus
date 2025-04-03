export const dynamic = "force-dynamic";
import VerifyForm from "./VerifyForm";
import AuthLayout from "@/app/components/layouts/AuthLayout";

export default function VerifyPage() {
  return (
    <AuthLayout heading="Verify your email" text="Please enter the OTP sent to your email.">
      <VerifyForm />
    </AuthLayout>
  );
}
