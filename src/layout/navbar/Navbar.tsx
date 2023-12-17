import { useAppSelector } from "../../redux/hooks";
import CollapseButton from "./collapse-button/CollapseButton";
import LinkButton from "./link-button/LinkButton";
import { faHouse, faProjectDiagram, faUsers, faRankingStar, faStar } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import EmployeeType from "../../types/employeeType";
import "./navbar.css";

export type LinkButtonData = {
  id: number;
  name: string;
  url: string;
  icon: IconDefinition;
};

const navData: LinkButtonData[] = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: faHouse,
  },
  {
    id: 2,
    name: "Employees",
    url: "/employees",
    icon: faUsers,
  },
  {
    id: 3,
    name: "Projects",
    url: "/projects",
    icon: faProjectDiagram,
  },
];

const Navbar: React.FC = () => {
  const navActive: boolean = useAppSelector((state)=> state.mainControl.navOpen);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  return (
    <div className={`navbar__wrapper ${ navActive ? "active" : ""}`}>
      <CollapseButton/>
      {navData.map((data)=>(
        <LinkButton key={data.id} data={data}/>
      ))}
      { currentEmployee?.admin &&
        <>
          <LinkButton data={{
            id: 4,
            name: "Ranks",
            url: "/ranks",
            icon: faRankingStar,
          }}/>
          <LinkButton data={{
            id: 5,
            name: "Admin",
            url: "/admin",
            icon: faStar,
          }}/>
        </>
      }
    </div>
  );
};

export default Navbar;