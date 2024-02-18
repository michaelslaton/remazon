import { useEffect, useState } from 'react';
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
  const [ sortType, setSortType ] = useState<string>('');
  const [ showDeactivated, setShowDeactivated ] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  let projects: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  const loadingProjects: boolean = useAppSelector((state) => state.projectsControl.loading);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  useEffect(()=>{
    dispatch(fetchProjectsThunk);
    dispatch(fetchEmployeesListThunk);
    dispatch(fetchRanksThunk);
  },[]);

  if (loadingProjects || loadingEmployees) return ( <Loading/> );

  if (sortType === 'alphabetical')
   projects = [...projects].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
  });

  if (sortType === 'host')
  projects = [...projects].sort((a, b) => {
     if (a.host < b.host) return -1;
     if (a.host > b.host) return 1;
     return 0;
 });

  if(!projects.length) return ( <>No projects to show.</> )

  return (
    <>
      <div className='display__header'>
        <h2>Projects</h2>
      </div>

      <div className='display__controls'>
        <select
          id='projects sort'
          name='projects sort'
          defaultValue=''
          onChange={(e)=> setSortType(e.target.value)}
        >
          <option
            disabled={true}
            value=''
          >
              Sort By
          </option>
          <option value='alphabetical'>
            Alphabetical
          </option>
          <option value='host'>
            Host
          </option>
        </select>
        
        <div className='display__controls--deactivated'>
          Show deactivated ? 
          <input
            type='checkbox'
            defaultChecked={false}
            onChange={(e)=> setShowDeactivated(e.target.checked)}
          />
        </div>
        {currentEmployee?.uid && currentEmployee.rank < 5 &&
          <button
            className='button card-button'
            onClick={()=> navigate('/projects/create')}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        }
      </div>
      
      <div className='projects__section-wrapper'>
        <div className='projects__section dark'>
          <h2 className='projects__section-title'>Special Events...</h2>
          <div className='projects__cards-wrapper'>
            {projects.map((project) =>
              project.status && project.regularity === 'special' && (
                <Project key={project.id} data={project}/>
              )
            )}
          </div>
        </div>

        <div className='projects__section light'>
          <h2 className='projects__section-title'>Recurring...</h2>
          <div className='projects__cards-wrapper'>
            {projects.map((project) =>
              project.status && project.regularity === 'recurring' && (
                <Project key={project.id} data={project}/>
              )
            )}
          </div>
        </div>

        { showDeactivated &&
          <div className='projects__section dark'>
            <h2 className='projects__section-title'>Deactivated</h2>
            <div className='projects__cards-wrapper'>
              {showDeactivated &&
                projects.map((project) =>
                  !project.status && (
                    <Project key={project.id} data={project}/>
                  )
              )}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Projects;