import Navbar from "../Navbar Component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer Component/Footer";
import { useState } from "react";

export default function Layout() {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

  return (
    <>
      <Navbar setIsFooterVisible={setIsFooterVisible} />
      <Outlet />
      <Footer
        isFooterVisible={isFooterVisible}
        setIsFooterVisible={setIsFooterVisible}
      />
    </>
  );
}
