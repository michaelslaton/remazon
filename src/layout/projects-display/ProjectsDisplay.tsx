import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProjects } from "../../redux/slices/projectsSlice";
import { getProjects } from "../../utils/api/api";
import Project from "./project/Project";
import "./projectsDisplay.css";
import ProjectType from "../../types/projectType";

const Projects: React.FC = () => {
  const projects = useAppSelector((state) => state.projectsControl.projects);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(projects.length === 0) {
      const data: ProjectType[] = getProjects();
      dispatch(setProjects(data));
    };
  },[projects]);

  return (
      <div className="projects-display__wrapper">
        {projects.map((project)=>(
          <Project key={project.id} data={project}/>
        ))}
      </div>
  );
};

export default Projects;