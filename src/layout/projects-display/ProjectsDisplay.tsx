import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProjectsThunk } from "../../redux/slices/projectsSlice";
import Project from "./project/Project";
import "./projects.css";
import ProjectType from "../../types/projectType";

const Projects: React.FC = () => {
  const projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const loading: boolean = useAppSelector((state) => state.projectsControl.loading);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{
    dispatch(fetchProjectsThunk());
  },[]);

  if(loading) return <>Loading...</>;
  return (
      <div className="projects-display__wrapper">
        {loading ? <p>Loading...</p>
        :
        <>
          <button className="button" onClick={()=> navigate("/projects/create")}> Create</button>
          {projects.map((project)=>(
            <Project key={project.id} data={project}/>
          ))}
        </>
        }
      </div>
  );
};

export default Projects;