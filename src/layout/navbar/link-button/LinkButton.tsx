import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { LinkButtonData } from "../Navbar";
import "./linkButton.css";

type LinkButtonProps = {
  data: LinkButtonData,
};

const LinkButton: React.FC<LinkButtonProps> = ({data}) => {
  const navActive: boolean = useAppSelector((state)=> state.navControl.navOpen);
  const navigate: NavigateFunction = useNavigate();

  return (
    <button className={`link-button ${ navActive ? "active" : "" }`} onClick={()=> navigate(data.url)}>
      { navActive ?
        data.name
        :
        data.name.slice(0,1)
      }
    </button>
  );
};

export default LinkButton;