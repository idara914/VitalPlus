import Image from "next/image";
import MainLayout from "../../components/layouts/MainLayout";
import CalendarComponent from "./CalendarComponent.jsx";
import { Plus, RotateCcw } from "lucide-react";
import Button from "../../components/common/Button/Button";
export default function Features() {
  return (
    <main>
      <MainLayout isSignedIn={true}>
        <CalendarComponent />
      </MainLayout>
    </main>
  );
}
