import styles from "../../assets/care-provider.module.css";
import MainLayout from "../../components/layouts/MainLayout";
import EmailProvider from "../../../public/imgs/email-provider.png";
import ManualProvider from "../../../public/imgs/manual-provider.png";
import Image from "next/image";
import Button from "@/app/components/common/Button/Button";
import Link from "next/link";

export default function Features() {
  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.newPageContainer}>
          <div className={styles.newPageMiniContainer}>
            <Image src={ManualProvider} alt="Manual Provider" />
            <h1>Manual Care provider</h1>
            <Link href="/care-provider/new/manual">
              <Button
                text={"+ Add Provider"}
                customStyle={{ padding: "10px 14px" }}
              />
            </Link>
          </div>
          <div className={styles.newPageMiniContainer}>
            <Image src={EmailProvider} alt="Email Provider" />
            <h1>Email Provider Form</h1>{" "}
            <Link href="/care-provider/new/email">
              <Button
                text={"+ Add Email"}
                customStyle={{ padding: "10px 14px" }}
              />
            </Link>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
