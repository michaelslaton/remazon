import { useAppSelector } from "../../redux/hooks";
import CollapseButton from "./collapse-button/CollapseButton";
import LinkButton from "./link-button/LinkButton";
import { faHouse, faProjectDiagram, faUsers, faRankingStar, faSignIn, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "./navbar.css";

export type LinkButtonData = {
  id: number;
  name: string;
  url: string;
  icon: IconDefinition;
}

const navData: LinkButtonData[] = [
  {
    id: 0,
    name: "Home",
    url: "/",
    icon: faHouse,
  },
  {
    id: 1,
    name: "Employees",
    url: "/employees",
    icon: faUsers,
  },
  {
    id: 2,
    name: "Projects",
    url: "/projects",
    icon: faProjectDiagram,
  },
  {
    id: 3,
    name: "Ranks",
    url: "/ranks",
    icon: faRankingStar,
  },
  {
    id: 4,
    name: "Applications",
    url: "/applications",
    icon: faNewspaper,
  },
  {
    id: 5,
    name: "Log In",
    url: "/login",
    icon: faSignIn,
  },
];

const Navbar: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);

  return (
    <div className={`navbar__wrapper ${ navActive ? "active" : ""}`}>
      <CollapseButton/>
      {navData.map((data)=>(
        <LinkButton key={data.id} data={data}/>
      ))}
    </div>
  );
};

export default Navbar;