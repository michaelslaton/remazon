import ProjectType from '../../../../types/project.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import RankType from '../../../../types/rank.type';
import EmployeeType from '../../../../types/employee.type';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../../projects.css';
import { deleteProjectThunk } from '../../../../redux/slices/projectsSlice';
import { setUiError } from '../../../../redux/slices/controlsSlice';

type ProjectProps = {
  data: ProjectType;
  expanded: number | null;
  setExpanded: Function;
};

const Project: React.FC<ProjectProps> = ({data, expanded, setExpanded}) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const hostEmployee: EmployeeType | undefined = employeesList.find((employee)=> employee.id === data.host);
  const hostRankColor = ranksList.find((rank)=> rank.id === hostEmployee?.rank)?.color;
  const projectDate: Date = new Date(data.date);

  const renderAttending = (): JSX.Element[] => {
    let results: JSX.Element[] = [];
    const attendingList: string[] | undefined = data.attending?.split(',');
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
          <button
            className='button'
          >
            Attend
          </button>
          <button
            className='button'
            onClick={(e)=> {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
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
          <div className='project__info-value'>{renderAttending()}</div>
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