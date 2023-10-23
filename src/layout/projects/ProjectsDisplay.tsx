import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProjectsThunk } from "../../redux/slices/projectsSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Project from "./project-component/Project";
import ProjectType from "../../types/projectType";
import UserType from "../../types/userType";
import "./projects.css";

const Projects: React.FC = () => {
  const projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const loading: boolean = useAppSelector((state) => state.projectsControl.loading);
  const currentUser: UserType | null = useAppSelector((state)=> state.userControl.currentUser);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{
    dispatch(fetchProjectsThunk());
  },[]);

  if(loading) return <>Loading...</>;

  return (
    <div className="projects-display__wrapper">
      <h2 className="title">Projects</h2>
      { currentUser?.admin &&
        <button className="button" onClick={()=> navigate("/projects/create")}><FontAwesomeIcon icon={faPlus}/></button>
      }
      {projects.map((project)=>(
        <Project key={project.id} data={project}/>
      ))}
    </div>
  );
};

export default Projects;