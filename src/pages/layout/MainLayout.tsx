import { Outlet } from "react-router-dom";
import Footer from "../../ui/Footer";
import Header from "../../ui/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
