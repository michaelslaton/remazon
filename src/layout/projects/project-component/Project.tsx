import ProjectType from "../../../types/projectType";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../projects.css";
import { useAppSelector } from "../../../redux/hooks";

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const currentUser = useAppSelector((state)=> state.userControl.currentUser);

  return (
    <div className="project__wrapper">
      <h2 className="title">{data.name}<div className={`status-dot ${data.status ? "active" : ""}`}/></h2>
      <ul className="project__info">
        <li>Host: {data.host}</li>
        <li>Description:
          <article>
            {data.description}
          </article>
        </li>
      </ul>
      { currentUser?.admin &&
        <button className="button" onClick={()=> navigate(`/projects/edit/${data.id}`)}>
          <FontAwesomeIcon icon={faEdit}/>
        </button>
      }
    </div>
  );
};

export default Project;