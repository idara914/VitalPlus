import VerifyForm from "./VerifyForm";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
