import { ReactNode, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { deleteProjectThunk, fetchProjectsThunk } from '../../../redux/slices/projectsSlice';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RankType from '../../../types/rankType';
import ProjectType from '../../../types/projectType';
import '../projects.css';
import EmployeeType from '../../../types/employeeType';

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const employees: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const host: EmployeeType | undefined = employees.find((employee)=> employee.id === data.host);
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const currentHostsRank: RankType | undefined = ranks.find((rank)=> rank.id === host?.rank);
  const projectDate: Date = new Date(data.date);

  const months: string[] = [ `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];

  const deleteButtonHandler = (): void => {
    if (window.confirm(`Are you sure you want to delete the project ${data.name} ?`)) {
    dispatch(deleteProjectThunk(data.id))
      .then(() => dispatch(fetchProjectsThunk()))
      .then(() => setShowConfirm(!showConfirm));
    }
  };

  // editButtonRender checks all the conditions to see if access is permitted to edit a project.
  // An Admin may always edit, otherwise employees can only edit their hosted projects if an admin has not locked it.
  const editButtonRender = (): ReactNode | null => {
    if ( data.locked && !currentEmployee?.admin ) return;
    else if (currentEmployee?.admin || currentEmployee?.id === data.host) return (
      <button className='button card-button' onClick={()=> navigate(`/projects/edit/${data.id}`)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    );
  };
  
  const deleteButtonRender = (): ReactNode | null => {
    if ( data.locked && !currentEmployee?.admin ) return;
    else if (currentEmployee?.admin || currentEmployee?.id === data.host) return (
      <button className='button delete card-button' onClick={()=> deleteButtonHandler()}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>
    );
  };

  return (
    <div className={`project__wrapper ${ !data.status ? 'deactivated' : '' }`}>
      <h2 className={`title project-title ${ !data.status ? 'deactivated' : '' }`}>{data.name}</h2>
      <div className='project__info-wrapper'>
        <ul className='project__info'>

          <li>
            <div className='project-data__key'>
              Host:
            </div> 
            <div className='project-data__value' style={{display: 'inline', color: currentHostsRank?.color}}>
              {host!.name}
            </div>
          </li>

          <li>
            <div className='project-data__key'>
              Date:
            </div> 
            <div className='project-data__value'>
              {months[projectDate.getMonth()]} {projectDate.getDate()}
            </div>
          </li>

          <li>
            <div className='project-data__key'>
              Type:
            </div>
            <div className='project-data__value'>
              {data.type}
            </div>
          </li>

          <li>
            <div className='project-data__key'>
              Description:
            </div>
            <article className='project-data__description'>
              {data.description}
            </article>
          </li>

          { !data.status &&
            <li>
              <div className='project-data__key'>
                Status:
              </div>
              <div className='project-data__value deactivated'>
                Deactivated
              </div>
            </li>
          }

        </ul>
        <div className='project__buttons_wrapper'>
          {editButtonRender()}
          {deleteButtonRender()}
        </div>
      </div>
    </div>
  );
};

export default Project;