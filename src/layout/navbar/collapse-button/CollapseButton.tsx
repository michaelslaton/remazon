import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { navToggle } from "../../../redux/slices/controlsSlice";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./collapseButton.css";

const CollapseButton: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const dispatch = useAppDispatch();

  return (
    <div className="collapse-button__wrapper">
      <button className="collapse-button" onClick={()=>dispatch(navToggle())}>
        {navActive ? <FontAwesomeIcon icon={faArrowLeft}/> : <FontAwesomeIcon icon={faArrowRight}/>}
      </button>
    </div>
  );
};

export default CollapseButton;