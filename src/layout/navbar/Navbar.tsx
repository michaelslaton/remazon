import { useAppSelector } from "../../redux/hooks";
import CollapseButton from "./collapse-button/CollapseButton";
import LinkButton from "./link-button/LinkButton";
import "./navbar.css";

export type LinkButtonData = {
  id: number;
  name: string;
  url: string;
}

const navData: LinkButtonData[] = [
  {
    id: 0,
    name: "Home",
    url: "/",
  },
  {
    id: 1,
    name: "Employees",
    url: "/employees",
  },
  {
    id: 2,
    name: "Projects",
    url: "/projects",
  },
  {
    id: 3,
    name: "Ranks",
    url: "/ranks",
  },
  {
    id: 4,
    name: "Log In",
    url: "/login",
  },
];

const Navbar: React.FC = () => {
  const navActive = useAppSelector((state)=> state.navControl.navOpen);

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