import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";

export default function MainLayout({ children, isSignedIn = false }) {
  return (
    <div>
      <Navbar isSignedIn={isSignedIn} />
      <div className={styles.containerRightInner}>{children}</div>
      <Footer />
    </div>
  );
}
