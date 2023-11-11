import { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../redux/hooks";
import RankType from "../../../types/rankType";
import ProjectType from "../../../types/projectType";
import "../projects.css";
import EmployeeType from "../../../types/employeeType";

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const employees: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const host: EmployeeType | undefined = employees.find((employee)=> employee.id === data.hostId);
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const currentHostsRank: RankType | undefined = ranks.find((rank)=> rank.id === host?.rank);

  // editButtonRender checks all the conditions to see if access is permitted to edit a project.
  // An Admin may always edit, otherwise employees can only edit their hosted projects if an admin has not locked it.
  const editButtonRender = (): ReactNode | null => {
    if ( data.locked && !currentEmployee?.admin ) return;
    else if (currentEmployee?.admin || currentEmployee?.id === data.hostId) return (
      <button className="button" onClick={()=> navigate(`/projects/edit/${data.id}`)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    );
  };

  return (
    <div className="project__wrapper">
      <h2 className="title project-title">{data.name}<div className={`status-dot ${data.status ? "active" : ""}`}/></h2>
      <ul className="project__info">

        <li>
          <div className="project-data__key">
            Host:
          </div> 
          <div className="project-data__value" style={{display: "inline", color: currentHostsRank?.color}}>
            {data.host}
          </div>
        </li>

        <li>
          <div className="project-data__key">
            Type:
          </div>
          <div className="project-data__value">
            {data.type}
          </div>
        </li>

        <li>
          <div className="project-data__key">
            Description:
          </div>
          <article className="project-data__description">
            {data.description}
          </article>
        </li>

      </ul>
      <div className="project__edit-button_wrapper">
        {editButtonRender()}
      </div>
    </div>
  );
};

export default Project;