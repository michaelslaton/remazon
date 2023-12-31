import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProjectsThunk } from '../../redux/slices/projectsSlice';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../utils/loading/Loading';
import Project from './project-component/Project';
import ProjectType from '../../types/projectType';
import EmployeeType from '../../types/employeeType';
import './projects.css';

const Projects: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const loadingProjects: boolean = useAppSelector((state) => state.projectsControl.loading);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  useEffect(()=>{
    dispatch(fetchProjectsThunk());
    dispatch(fetchEmployeesListThunk);
    dispatch(fetchRanksThunk);
  },[]);

  if(loadingProjects || loadingEmployees) return ( <Loading/> );

  return (
    <div className='projects-display__wrapper'>
      <div className='projects__header'>
        <h2 className='title projects-display-title'>Projects</h2>
        { currentEmployee?.uid && currentEmployee.rank < 5 &&
          <button className='button create-project-button card-button' onClick={()=> navigate('/projects/create')}><FontAwesomeIcon icon={faPlus}/></button>
        }
      </div>
      <div className='projects__cards-wrapper'>
        {projects.map((project)=>(
          <Project key={project.id} data={project}/>
        ))}
      </div>
    </div>
  );
};

export default Projects;