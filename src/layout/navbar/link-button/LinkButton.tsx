import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { LinkButtonData } from "../Navbar";
import "./linkButton.css";

type LinkButtonProps = {
  data: LinkButtonData,
};

const LinkButton: React.FC<LinkButtonProps> = ({data}) => {
  const navActive = useAppSelector((state)=> state.navControl.navOpen);
  const navigate: NavigateFunction = useNavigate();

  return (
    <button className={`link-button ${ navActive ? "active" : "" }`} onClick={()=> navigate(data.url)}>
      {data.name}
    </button>
  );
};

export default LinkButton;