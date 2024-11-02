import styles from "../../../assets/care-provider.module.css";
import MainLayout from "../../../components/layouts/MainLayout";
import Image from "next/image";
import EmailIcon from "../../../../public/imgs/email-icon.png";
import Button from "@/app/components/common/Button/Button";
import Link from "next/link";
import TextField from "@/app/components/common/TextField/TextField";

export default function EmailAdd() {
  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.emailPageContainer}>
          <div className={styles.emailPageMiniContainer}>
            <Image src={EmailIcon} alt="Manual Provider" />
            <h1>Email New Provider</h1>
            <TextField
              label="Enter Email Address"
              placeholder={"name@gmail.com"}
              customStyle={{
                backgroundColor: "#fff",
              }}
              containerStyles={{ margin: "20px 0" }}
            />
            <Link href="/care-provider/new/manual">
              <Button
                text={"Cancel"}
                customStyle={{
                  padding: "10px 14px",
                  backgroundColor: "#fff",
                  color: "#000",
                  marginRight: 20,
                  marginTop: 30,
                }}
              />
            </Link>
            <Link href="/care-provider/new/manual">
              <Button text={"Submit"} customStyle={{ padding: "10px 14px" }} />
            </Link>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
