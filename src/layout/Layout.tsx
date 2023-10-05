import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";
import "./layout.css";



const Layout: React.FC = () => {
  const [ navActive, setNavActive ] = useState(false);

  return (
    <>
      <Navbar active={navActive} setActive={setNavActive}/>
      <div className={`main-screen ${ navActive ? "active" : ""}`}>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;