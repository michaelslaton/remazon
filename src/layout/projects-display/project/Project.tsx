import ProjectType from "../../../types/projectType";
import "./project.css";

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {

  return (
    <div className="project__wrapper">
      <h2>{data.name}</h2>
      <ul className="project__info">
        <li>Host: {data.host}</li>
        <li>Description:
          <article>
            {data.description}
          </article>
        </li>
      </ul>
    </div>
  );
};

export default Project;