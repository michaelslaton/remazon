import { Outlet } from "react-router-dom";
import "./layout.css";



const Layout: React.FC = () => {

  return (
    <>
      <Outlet/>
    </>
  );
};

export default Layout;