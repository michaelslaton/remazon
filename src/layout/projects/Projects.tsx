import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProjects } from "../../redux/slices/projectsSlice";
import { getProjects } from "../../utils/api/api";
import "./projects.css";

const Projects: React.FC = () => {
  const projects = useAppSelector((state) => state.projectsControl.projects);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(projects.length === 0) {
      const data = getProjects();
      dispatch(setProjects(data));
    };
  },[projects]);

  return (
    <>
      {projects.map((project)=>(
        <div key={project.id}>{project.name}</div>
      ))}
    </>
  );
};

export default Projects;