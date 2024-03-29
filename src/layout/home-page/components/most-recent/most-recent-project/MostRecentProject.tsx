import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import ProjectType from '../../../../../types/project.type';
import months from '../../../../../data/months';
import '../mostRecent.css';

const MostRecentProject: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  let projectList: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  projectList = [...projectList].filter((project) => project.status === true);
  
  const mostRecentProject: ProjectType = projectList.reduce((prev, current) => {
    return prev.id > current.id ? prev : current;
  });
  const projectDate: Date = new Date(mostRecentProject.date);

  if (!projectList.length) return <></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        New Project
      </div>
      <div
        className='most-recent__content-wrapper'
        onClick={()=> navigate('/projects')}
      >
        <div className='most-recent__item-title'>
          {mostRecentProject.name}
        </div>
        <ul className='most-recent__info-list'>
          <li>
            Type:
            <div className='most-recent__info-value'>
              {` ${mostRecentProject.type}`}
            </div>
          </li>
          <li>
            Date:
            <div className='most-recent__info-value'>
              {` ${months[projectDate.getMonth()]} ${projectDate.getDate()}`}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MostRecentProject;