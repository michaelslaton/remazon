import { useAppSelector } from '../../../redux/hooks';
import AwardType from '../../../types/award.type';
import EmployeeType from '../../../types/employee.type';
import months from '../../../data/months';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../awards.css';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type AwardProps = {
  awardData: AwardType;
}

const Award: React.FC<AwardProps> = ({ awardData }) => {
  const employeeList = useAppSelector((state)=> state.employeesControl.employees);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentHolder: EmployeeType | undefined = employeeList.find((employee)=> employee.id === awardData.holder);
  const navigate: NavigateFunction = useNavigate();
  const awardDate: Date = new Date(awardData.date);

  return (
    <div className='award__wrapper'>
      <div className='award__plate'>
        <div className='belt__title'>
          {awardData.name}
        </div>
        { awardData.type === 'belt' ?
            <>
              <div className='belt__strap'/>
              <div className='belt__buckle'>
                <div className='belt__top-plate'/>
              </div>
            </>
            :
            <>
              <div className='trophy__plate'>
                <div className='trophy__top-plate'/>
              </div>
              <div className='belt__strap'/>
            </>
        }
      </div>

      <div className='award__info-wrapper'>
        <ul className='award__info-list'>
          <li>
            <div className='award__info-key'>
              Type:
            </div>
            <div className='award__info-value'>
              {awardData.type}
            </div>
          </li>

          <li>
            <div className='award__info-key'>
              Awarded to:
            </div>
            <div className='award__info-value'>
              {
                currentHolder?.name ?
                  <>
                    {currentHolder.name}
                  </>
                :
                  <>
                    Unawarded
                  </>
              }
            </div>
          </li>
          { awardData.date &&
            <li>
              <div className='award__info-key'>
                Date:
              </div>
              <div className='award__info-value'>
                {months[awardDate.getMonth()]} {awardDate.getDate()}, {awardDate.getFullYear()}
              </div>
            </li>
          }

          { awardData.awardedFor &&
            <li>
              <div className='award__info-key awarded-for'>
                Awarded for:
              </div>
              <div className='award__info-value'>
                {awardData.awardedFor}
              </div>
            </li>
          }
        </ul>
      </div>
      
      { currentEmployee?.rank === 1 &&
        <button
          className='award__edit-button'
          onClick={()=> navigate(`/awards/edit/${awardData.id}`)}
        >
          <FontAwesomeIcon icon={faEdit}/>
        </button>
      }
      
    </div>
  );
};

export default Award;