import "@/assets/styles/global.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "myTilt",
  keywords: "독일 방 구하기, 독일 집 구하기, 독일 방",
  description:
    "myTilt는 독일에서 살 방을 구하는 사람과 방을 내 놓는 사람을 연결해주는 플랫폼입니다.",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html>
        <body className="bg-slate-100 ">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
