import ProjectType from "../../../types/projectType";
import { useNavigate } from "react-router-dom";
import "./project.css";

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {
  const navigate = useNavigate();

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
      <button className="button" onClick={()=> navigate(`/projects/edit/${data.id}`)}>Edit</button>
    </div>
  );
};

export default Project;