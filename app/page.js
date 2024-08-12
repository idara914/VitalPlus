import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import MainLayout from "./components/layouts/MainLayout";
import CartImage from "../public/icons/cart.png";
import Button from "./components/common/Button/Button";
import RightArrow from "../public/icons/ArrowRight.png";
import TryNow from "../public/imgs/try-now.png";
import ConnSystem from "../public/imgs/conn-system.png";
import Demo from "../public/imgs/demo.png";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainLayout>
        <section className={styles.demo}>
          <div>
            <h1>Tech Solutions for Providers, MCOs & Medicaid Programs</h1>
            <p>
              Enhance proactive homecare and get a better health and well-being
              at home.
            </p>
            <Link href={"/demo"}>
              <Button text={"Book A Demo"} customStyle={{ padding: "14px" }} />
            </Link>
          </div>
          <Image src={Demo} />
        </section>
        <section className={styles.connSystem}>
          <Image src={ConnSystem} />
          <div>
            <h1>The Connected Homecare Ecosystem</h1>
            <p>
              Enhance proactive homecare and improve health outcomes with our
              solutions. We&apos;re here to support better health and well-being
              at home.
            </p>
          </div>
        </section>
        <section className={styles.tryItNow}>
          <div>
            <h1>We know homecare. We know Medicaid</h1>
            <p>
              Enhance proactive homecare and improve health outcomes with our
              solutions. We&apos;re here to support better health and well-being
              at home.
            </p>
            <Link href={"/demo"}>
              <Button text={"Try it Now"} customStyle={{ padding: "14px" }} />
            </Link>
          </div>
          <Image src={TryNow} />
        </section>
        <section className={styles.getStarted}>
          <div className={styles.getStartedBg}></div>
          <Image src={CartImage} className="get-started" />
          <h2>Sounds Interesting</h2>
          <p>
            Whether you are new to the game or a seasoned pro, we have a
            membership option for you. Click here to explore our different
            options.{" "}
          </p>
          <Link href={"/get-started"}>
            <Button
              text={"Let's Get Started"}
              postImage={RightArrow}
              customStyle={{
                display: "flex",
                alignItems: "center",
                padding: "14px",
              }}
            />
          </Link>
        </section>
      </MainLayout>
    </main>
  );
}
