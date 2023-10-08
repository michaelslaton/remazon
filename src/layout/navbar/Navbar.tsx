import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { navToggle } from "../../redux/slices/controlsSlice";
import "./navbar.css";

const Navbar: React.FC = () => {
  const navActive = useAppSelector((state)=> state.navControl.navOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={`navbar__wrapper ${ navActive ? "active" : ""}`}>
      <button onClick={()=>dispatch(navToggle())}>O</button>
      <div onClick={()=> navigate("/")}>Home</div>
      <div onClick={()=> navigate("/login")}>Log In</div>
      <div onClick={()=> navigate("/employees")}>Employees</div>
      <div onClick={()=> navigate("/projects")}>Projects</div>
    </div>
  );
};

export default Navbar;