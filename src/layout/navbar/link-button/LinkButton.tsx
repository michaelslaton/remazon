import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkButtonData } from "../Navbar";
import "./linkButton.css";

type LinkButtonProps = {
  data: LinkButtonData,
};

const LinkButton: React.FC<LinkButtonProps> = ({ data }) => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const navigate: NavigateFunction = useNavigate();

  return (
    <button className={`link-button ${ navActive ? "active" : "" }`} onClick={()=> navigate(data.url)}>
      { navActive ?
        <><FontAwesomeIcon icon={data.icon}/> {data.name}</>
        :
        <FontAwesomeIcon icon={data.icon}/>
      }
    </button>
  );
};

export default LinkButton;