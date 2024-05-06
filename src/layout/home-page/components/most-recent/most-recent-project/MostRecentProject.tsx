import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../redux/hooks';
import ProjectType from '../../../../../types/project.type';
import months from '../../../../../data/months';
import '../mostRecent.css';

const MostRecentProject: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  let projectList: ProjectType[] = useAppSelector((state) => state.projectsControl.projects);
  projectList = [...projectList].filter((project) => project.status === true);
  let mostRecentProject: ProjectType | null = null;
  let projectDate: Date | null = null;

  if(projectList.length){
    mostRecentProject = projectList.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
    projectDate = new Date(mostRecentProject.date);
  }

  if (!projectList.length) return <></>;

  return (
    <div className='most-recent__cel'>
      <div className='most-recent__cel-title'>
        New Project
      </div>
      <div
        data-testid='most recent project wrapper'
        className='most-recent__content-wrapper'
        onClick={()=> navigate('/projects')}
      >
        <h2 className='most-recent__item-title'>
          {mostRecentProject?.name}
        </h2>
        <ul className='most-recent__info-list'>
          <li>
            Type:
            <div className='most-recent__info-value'>
              {` ${mostRecentProject?.type}`}
            </div>
          </li>
          <li>
            Date:
            <div className='most-recent__info-value'>
              {` ${months[projectDate!.getMonth()]} ${projectDate!.getDate()}`}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MostRecentProject;