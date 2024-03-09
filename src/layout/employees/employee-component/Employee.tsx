import { ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import EmployeeType from '../../../types/employee.type';
import RankType from '../../../types/rank.type';
import months from '../../../data/months';
import cupcake from '../../../assets/imgs/cupcake.png';
import '../employees.css';

type EmployeeProps = {
  data: EmployeeType;
};

const Employee: React.FC<EmployeeProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const ranksList: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranksList.find((rank)=> rank.id === data.rank);
  const aliasList: string[] = data.aliases?.split(',');
  
  let birthday: Date | null = null;
  if (data.birthday) birthday = new Date(data.birthday); 

  // editButtonRender checks all the conditions to see if access is permitted to edit an employee.
  // An Admin may always edit, otherwise employees can only edit their own employee profile if an admin has not locked it.
  const editButtonRender = (): ReactNode | null => {
    if ( data.locked && !currentEmployee?.admin ) return;
    else if (currentEmployee?.admin || currentEmployee?.uid === data.uid) return (
      <button
        className='button card-button'
        onClick={(e)=> {
          e.stopPropagation();
          navigate(`/employees/edit/${data.id}`)
        }}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    );
  };

  return (
    <div
      className={`employee__wrapper ${data.rank === 0 && 'deactivated'}`}
      style={{borderColor: currentEmployeesRank?.color}}
    >
      <div className='employee__header'>
        <h2 className='employee__name'>{data.name}</h2>
        <div>
          { data.rank > 1 &&
            <>
              {`${data.cupcakes} `}<img src={cupcake} className='cupcake'/>
            </>
          }          
        </div>
      </div>
      <div
        className={`employee__rank ${data.rank === 0 && 'deactivated'}`}
        style={{backgroundColor: currentEmployeesRank?.color}}
      >
        {currentEmployeesRank!.name}
      </div>

      <ul className='employee__info'>
        { birthday &&
          <li>
            <div className='employee__info-key'>
              {`Birthday: `}
            </div>
            {birthday.getDate()} - {months[birthday.getMonth()]}
          </li>
        }

        <li>
          <div className='employee__info-key'>
            {`Bio: `}
          </div>
            {data.description}
        </li>

        { data.aliases &&
          <li>
            <div className='employee__info-key'>
              {`Aliases: `}
            </div>
              { aliasList.map((alias, i)=> i < aliasList.length - 1 ? `${alias}, ` : `${alias}`)}
          </li>
        }

      </ul>
      
      <div className='employee__edit-button_wrapper'>
        {editButtonRender()}
      </div>
    </div>
  );
};

export default Employee;