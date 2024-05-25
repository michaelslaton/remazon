import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProjectsThunk } from '../../redux/slices/projectsSlice';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import Loading from '../components/loading/Loading';
import './projects.css';
import ProjectCalendar from './project-components/calendar/ProjectCalendar';

const ProjectsDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingProjects: boolean = useAppSelector((state) => state.projectsControl.loading);
  const loadingEmployees: boolean = useAppSelector((state) => state.employeesControl.loading);

  useEffect(()=>{
    dispatch(fetchProjectsThunk);
    dispatch(fetchEmployeesListThunk);
    dispatch(fetchRanksThunk);
  },[]);

  if (loadingProjects || loadingEmployees) return ( <Loading/> );

  return (
    <>
      <div className='display__header'>
        <h2>Projects</h2>
      </div>

      <div className='display__controls'>
      </div>
      <div>
        <ProjectCalendar/>
      </div>
    </>
  );
};

export default ProjectsDisplay;