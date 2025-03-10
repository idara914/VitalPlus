import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";

export default function MainLayout({ children, isSignedIn = false }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
        components: {
          Dropdown: {
            paddingBlock: 10,
            /* here is your component tokens */
          },
        },
      }}
    >
      <div>
        <Navbar isSignedIn={isSignedIn} />
        {children && (
          <div className={styles.containerRightInner}>{children}</div>
        )}
        {!children && <div style={{ height: "100vh" }}></div>}
        <Footer />
      </div>
    </ConfigProvider>
  );
}
