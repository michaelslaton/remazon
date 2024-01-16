import { useAppSelector } from '../../../redux/hooks';
import AwardType from '../../../types/awardType';
import EmployeeType from '../../../types/employeeType';
import '../awards.css';

type AwardProps = {
  awardData: AwardType;
}

const Award: React.FC<AwardProps> = ({ awardData }) => {
  const employeeList = useAppSelector((state)=> state.employeesControl.employees);
  const currentHolder: EmployeeType | undefined = employeeList.find((employee)=> employee.id === awardData.holder);

  return (
    <div className='award__wrapper'>
      <div className='award__plate'>
        <div className='belt__title'>
          {awardData.name}
        </div>
        { awardData.type === 'belt' ?
            <>
              <div className='belt__buckle'>
                <div className='belt__top-plate'/>
                <div className='belt__plaque'/>
              </div>
              <div className='belt__strap'/>
            </>
            :
            <>
              <div className='trophy__plate'>
                <div className='trophy__top-plate'/>
                <div className='belt__plaque'/>
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
          { awardData.holder &&
            <li>
              <div className='award__info-key'>
                Holder:
              </div>
              <div className='award__info-value'>
                {currentHolder?.name}
              </div>
            </li>
          }
        </ul>
      </div>
      
    </div>
  );
};

export default Award;