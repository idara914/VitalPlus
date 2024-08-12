import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className={styles.containerRightInner}>{children}</div>
      <Footer />
    </div>
  );
}
