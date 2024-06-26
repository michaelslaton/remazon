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
    <div className={`award__wrapper ${awardData.class}`}>
      <div className='award__plate'>
        <div className='belt__title'>
          {awardData.name}
        </div>
        { awardData.type === 'belt' ?
            <>
              <div className={`belt__strap strap ${awardData.class}`}/>
              <div className={`belt__buckle plate ${awardData.class}`}>
                <div className={`belt__top-plate top-plate ${awardData.class}`}/>
              </div>
            </>
            :
            <>
              <div className={`trophy__plate plate ${awardData.class}`}>
                <div className={`trophy__top-plate top-plate ${awardData.class}`}/>
              </div>
              <div className={`belt__strap strap ${awardData.class}`}/>
            </>
        }
      </div>

      <div className='award__info-wrapper'>
        <ul className='award__info-list'>
          <li>
            <div className={`award__info-key font ${awardData.class}`}>
              Type:
            </div>
            <div className='award__info-value'>
              {awardData.type}
            </div>
          </li>

          <li>
            <div className={`award__info-key font ${awardData.class}`}>
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
              <div className={`award__info-key font ${awardData.class}`}>
                Date:
              </div>
              <div className='award__info-value'>
                {months[awardDate.getMonth()]} {awardDate.getDate()}, {awardDate.getFullYear()}
              </div>
            </li>
          }

          { awardData.awardedFor &&
            <li>
              <div className={`award__info-key awarded-for font ${awardData.class}`}>
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
          data-testid='edit award button'
          className={`award__edit-button ${awardData.class}`}
          onClick={()=> navigate(`/awards/edit/${awardData.id}`)}
        >
          <FontAwesomeIcon icon={faEdit}/>
        </button>
      }
      
    </div>
  );
};

export default Award;