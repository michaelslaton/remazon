import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProjectsThunk } from "../../redux/slices/projectsSlice";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Project from "./project-component/Project";
import ProjectType from "../../types/projectType";
import EmployeeType from "../../types/employeeType";
import "./projects.css";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";

const Projects: React.FC = () => {
  const projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const employees: EmployeeType[] = useAppSelector((state) => state.employeesControl.employees);
  const loadingProjects: boolean = useAppSelector((state) => state.projectsControl.loading);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(()=>{
    dispatch(fetchProjectsThunk());
    if (employees.length < 1) dispatch(fetchEmployeesListThunk);
    if (ranks.length < 1) dispatch(fetchRanksThunk);
  },[]);

  if(loadingProjects || loadingEmployees) return <>Loading...</>;

  return (
    <div className="projects-display__wrapper">
      <div className="projects__header">
        <h2 className="title projects-title">Projects</h2>
        { currentEmployee?.uid && currentEmployee.rank < 5 &&
          <button className="button create-project-button" onClick={()=> navigate("/projects/create")}><FontAwesomeIcon icon={faPlus}/></button>
        }
      </div>
      {projects.map((project)=>(
        <Project key={project.id} data={project}/>
      ))}
    </div>
  );
};

export default Projects;