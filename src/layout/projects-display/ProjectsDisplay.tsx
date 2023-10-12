import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProjects } from "../../redux/slices/projectsSlice";
import Project from "./project/Project";
import "./projectsDisplay.css";
import ProjectType from "../../types/projectType";

const Projects: React.FC = () => {
  const projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const loading = useAppSelector((state) => state.projectsControl.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchProjects());
  },[]);

  if(loading) return <>Loading...</>;
  return (
      <div className="projects-display__wrapper">
        {loading ? <p>Loading...</p>
        :
        <>
          <button onClick={()=> navigate("/projects/create")}> Create</button>
          {projects.map((project)=>(
            <Project key={project.id} data={project}/>
          ))}
        </>
        }
      </div>
  );
};

export default Projects;