import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { deleteProjectThunk, editProjectThunk, fetchProjectsThunk } from '../../../../redux/slices/projectsSlice';
import { setUiError } from '../../../../redux/slices/controlsSlice';
import EmployeeType from '../../../../types/employee.type';
import ProjectType from '../../../../types/project.type';
import RankType from '../../../../types/rank.type';
import '../../projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type ProjectProps = {
  data: ProjectType;
  expanded: number | null;
  setExpanded: Function;
};

const Project: React.FC<ProjectProps> = ({data, expanded, setExpanded}) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const currentEmployee: EmployeeType | null | undefined = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const hostEmployee: EmployeeType | undefined = employeesList.find((employee)=> employee.id === data.host);
  const hostRankColor = ranksList.find((rank)=> rank.id === hostEmployee?.rank)?.color;
  const projectDate: Date = new Date(data.date);
  let attendingList: string[] = []
  if(data.attending?.length) attendingList = data.attending?.split(',');

  const renderAttendingList = (): JSX.Element[] => {
    let results: JSX.Element[] = [];
    const sortedEmployeesList: EmployeeType[] = [...employeesList].sort((a,b)=>{
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    if(attendingList){
      sortedEmployeesList.forEach((employee)=>{
        if(attendingList.includes(employee.uid)){
          const employeesRank = ranksList.find((rank)=> rank.id === employee.rank);
          results.push(
            <div className='attending-employee' key={employee.id}>
              <div
                onClick={()=> navigate('/employees')}
                style={{color: `${employeesRank?.color !== '#ffa500'? `${employeesRank?.color}` : '#DCE1DE' }`, display: 'inline-block', cursor: 'pointer'}}
              >
                {employee.name}
              </div>
              { results.length < attendingList.length - 1 ? ', ' : '' }
            </div>
          );
        };
      });
    };
    return results;
  };

  const renderAttendanceButton = (): JSX.Element => {
    if(!currentEmployee) return <></>;
    if(data.host === currentEmployee?.id) return <></>;

    const today = new Date();
    const projectDate = new Date(data.date);

    // attendButtonHandler handles the functionality of the button to add or remove a user from attendance.
    // Type = 'add' or 'remove'
    // attendGuttonHandler adjusted the attendance list accordingly and sends an api call to adjust the project.
    const attendButtonHandler = (type: string): void => {
      let updatedProject: ProjectType = {...data};
      
      if (type === 'add') attendingList = [ ...attendingList, currentEmployee!.uid ];
      else if (type === 'remove') {
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
    
    if(projectDate.getDate() < today.getDate()){
      if(projectDate.getFullYear() < today.getFullYear()) return <></>;
      if(projectDate.getMonth() <= today.getMonth()) return <></>;
    };

    if(attendingList?.includes(currentEmployee!.uid)) return (
      <button
        className='button'
        onClick={(e)=> {
          e.stopPropagation();
          attendButtonHandler('remove');
        }}
      >
        <span className="unattend">
          <FontAwesomeIcon icon={faMinus} />
        </span>
        {` Unattend`}
      </button>
    );

    return (
      <button
        className='button'
        onClick={(e)=>{ 
          e.stopPropagation();
          attendButtonHandler('add');
        }}
      >
        <span className="attend">
          <FontAwesomeIcon icon={faPlus} />
        </span>
        {` Attend`}
      </button>
    );
  };

  const handleDelete = (): void => {
    if(window.confirm(`Are you sure you want to delete ${data.name} ?`)){
      dispatch(deleteProjectThunk(data.id))    
        .catch((error) => {
        dispatch(setUiError(`Error: ${error.code}`));
        console.error(error.code);
        console.error(error.message);
      });
    };
  };

  const renderDeleteButton = (): JSX.Element => {
    if(!currentEmployee) return <></>;
    if(!currentEmployee.admin){
      if(currentEmployee.id !== data.host) return <></>
    }
    
    return (
      <button
        className='button'
        onClick={(e)=> {
          e.stopPropagation();
          handleDelete();
        }}
      >
        Delete
      </button>
    );
  };

  return (
    <div
      className="project"
      onClick={()=> {
        if(expanded !== data.id) setExpanded(data.id);
        else setExpanded(null);
      }}
    >
      <div className='project__header'>
        <h2 className='project__title'>
          {data.name}
        </h2>

        <div className="project__controls">
          {renderAttendanceButton()}
          {renderDeleteButton()}
        </div>

        <div className='project__date-time'>
          {`${projectDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
        </div>
      </div>
      
      <ul className={`project__info ${expanded === data.id && 'expanded'}`}>
        <li>
          <div className='project__info-key'>{`Host: `}</div>
          <div className='project__info-value' style={{color: hostRankColor}}>{hostEmployee?.name}</div>
        </li>
        
        <li>
          <div className='project__info-key'>{`Type: `}</div>
          <div className='project__info-value'>{data.type}</div>
        </li>
        
        <li>
          <div className='project__info-key'>{`Attending: `}</div>
          <div className='project__info-value'>{`(${attendingList.length}) `}{renderAttendingList()}</div>
        </li>

        <li>
          <div className='project__info-key'>{`Description: `}</div>
          <div className='project__info-value'>{data.description}</div>
        </li>
      </ul>
    </div>
  );
};

export default Project;