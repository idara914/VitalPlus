// import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";

export default function MainLayout({
  children,
  isSignedIn = false,
  user = null,
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
        components: {
          Dropdown: {
            paddingBlock: 10,
          },
        },
      }}
    >
      <div>
        <Navbar isSignedIn={isSignedIn} user={user} />
        {children && <div>{children}</div>}
        {!children && <div style={{ height: "100vh" }}></div>}
        <Footer />
      </div>
    </ConfigProvider>
  );
}
