import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchProjectsThunk } from '../../redux/slices/projectsSlice';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from '../../redux/slices/ranksSlice';
import Calendar from './project-components/calendar/Calendar';
import './projects.css';

const ProjectsDisplay: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchProjectsThunk);
    dispatch(fetchEmployeesListThunk);
    dispatch(fetchRanksThunk);
  },[]);

  return (
    <>
      <div className='display__header'>
        <h2>Projects</h2>
      </div>

      <div className='display__controls'>
      </div>
      
      <div>
        <Calendar/>
      </div>
    </>
  );
};

export default ProjectsDisplay;