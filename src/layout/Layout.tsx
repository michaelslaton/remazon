import { Outlet } from "react-router-dom";
import "./layout.css";



const Layout: React.FC = () => {

  return (
    <>
      <Outlet/>
      Some stuff
    </>
  );
};

export default Layout;