import { useAppSelector } from "../../../../redux/hooks";
import Project from "../../../projects/project-component/Project";
import ProjectType from "../../../../types/projectType";
import "./mostRecentProject.css";

const MostRecentProject: React.FC = () => {
  const projectList: ProjectType[] = useAppSelector((state)=> state.projectsControl.projects);
  const mostRecentProject: ProjectType = projectList.reduce((prev, current)=> { return prev.id > current.id ? prev : current });


  if(!projectList.length) return <></>;

  return (
    <div>
      <Project data={mostRecentProject}/>
    </div>
  )
};

export default MostRecentProject;