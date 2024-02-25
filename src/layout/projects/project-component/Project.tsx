import { ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { deleteProjectThunk, editProjectThunk, fetchProjectsThunk } from '../../../redux/slices/projectsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RankType from '../../../types/rankType';
import ProjectType from '../../../types/projectType';
import EmployeeType from '../../../types/employeeType';
import months from '../../../data/months';
import '../projects.css';

type ProjectProps = {
  data: ProjectType;
};

const Project: React.FC<ProjectProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const host: EmployeeType | undefined = employeesList.find((employee)=> employee.id === data.host);
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const currentHostsRank: RankType | undefined = ranksList.find((rank)=> rank.id === host?.rank);
  const projectDate: Date = new Date(data.date);

  const deleteButtonHandler = (): void => {
    if (window.confirm(`Are you sure you want to delete the project ${data.name} ?`)) {
    dispatch(deleteProjectThunk(data.id))
      .then(() => dispatch(fetchProjectsThunk()))
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
    };
  };

  // attendButtonHandler handles the functionality of the button to add or remove a user from attendance.
  // Type = 'add' or 'remove'
  // attendGuttonHandler adjusted the attendance list accordingly and sends an api call to adjust the project.
  const attendButtonHandler = (type: string): void => {
    let updatedProject: ProjectType = {...data};
    let attendingList: string[] = [];
    if (data.attending?.length) attendingList = [...data.attending.split(',')];
    
    if (type === 'add') {
      attendingList = [ ...attendingList, currentEmployee!.uid ];
    } else if (type === 'remove') {
      if (data.host === currentEmployee!.id) {
        dispatch(setUiError(`The host must attend!`));
        return;
      };
      attendingList = attendingList.filter((currentUid)=> currentUid !== currentEmployee!.uid);
    };

    updatedProject.attending = attendingList.toString();
    dispatch(editProjectThunk(updatedProject))
      .then(() => dispatch(fetchProjectsThunk()))
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
      return;
  };

  // editButtonRender checks all the conditions to see if access is permitted to edit a project.
  // An Admin may always edit, otherwise employees can only edit their hosted projects if an admin has not locked it.
  const editButtonRender = (): ReactNode | null => {
    if ( 
      data.locked && !currentEmployee?.admin ||
      !currentEmployee?.admin && data.host !== currentEmployee?.id
    ) return;
    else if (currentEmployee?.admin || currentEmployee?.id === data.host) return (
      <button className={`button card-button ${data.regularity === 'recurring' && 'dark'}`} onClick={()=> navigate(`/projects/edit/${data.id}`)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    );
  };

  // deleteButtonRender checks all the conditions to see if access is permitted to delete a project.
  // An Admin may always delete, otherwise employees can only delete their hosted projects if an admin has not locked it.
  const deleteButtonRender = (): ReactNode | null => {
    if ( 
      data.locked && !currentEmployee?.admin ||
      !currentEmployee?.admin && data.host !== currentEmployee?.id
    ) return;
    else if (currentEmployee?.admin || currentEmployee?.id === data.host) return (
      <button className={`button delete card-button ${data.regularity === 'recurring' && 'dark'}`} onClick={()=> deleteButtonHandler()}>
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>
    );
  };

  // attendButtonRender checks to make sure a user is logged in.
  // if so, it renders the appropriate button (add or remove) depending on whether the current user is already attending or not.
  const attendButtonRender = (): ReactNode | null => {
    if ( !currentEmployee ) return;
    if (data.attending?.includes(currentEmployee!.uid)) return (
      <button className={`button card-button ${data.regularity === 'recurring' && 'dark'}`} onClick={()=> attendButtonHandler('remove')}>
        <FontAwesomeIcon icon={faMinus}/>
      </button>
    );
    else return (
      <button className={`button card-button ${data.regularity === 'recurring' && 'dark'}`} onClick={()=> attendButtonHandler('add')}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    );
  };

  return (
    <div className={`project__wrapper ${data.regularity === 'recurring' && 'dark'} ${ !data.status && 'deactivated'}`}>
      <h2 className={`title project-title ${ !data.status && 'deactivated'}`}>
        {data.name}
      </h2>
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
              Time:
            </div> 
            <div className='project-data__value'>
              {projectDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
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

          { data.attending?.length &&
            <li>
              <div className='project-data__key'>
                Confirmed Attending:
              </div>
              <div className='project-data__value'>
                {data.attending.split(',').length}
              </div>
            </li>
          }

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
          {attendButtonRender()}
          {editButtonRender()}
          {deleteButtonRender()}
        </div>
      </div>
    </div>
  );
};

export default Project;