import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { navToggle } from "../../redux/slices/controls";
import "./navbar.css";

const Navbar: React.FC = () => {
  const navActive = useAppSelector((state)=> state.navControl.navOpen)
  const dispatch = useAppDispatch();

  return (
    <div className={`navbar__wrapper ${ navActive ? "active" : ""}`}>
      <button onClick={()=>dispatch(navToggle())}>O</button>
    </div>
  );
};

export default Navbar;