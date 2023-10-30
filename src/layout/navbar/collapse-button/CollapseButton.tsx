import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { navToggle } from "../../../redux/slices/controlsSlice";
import "./collapseButton.css";

const CollapseButton: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const dispatch = useAppDispatch();

  return (
    <div className="collapse-button__wrapper">
      <button className="collapse-button" onClick={()=>dispatch(navToggle())}>{navActive ? "<-" : "->"}</button>
    </div>
  )
}

export default CollapseButton;