import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../../redux/hooks';
import RankType from '../../../types/rankType';
import '../authentication.css';

const LoggedIn: React.FC = () => {
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranks?.find((rank)=> rank.id === currentEmployee?.rank);

  return (
    <div className='logged-in-wrapper'>
      <div className='authentication__employee-name' style={{color: currentEmployeesRank?.color}}>{currentEmployee?.name}</div>
      <button className='button card-button' onClick={()=> navigate('/notifications')}><FontAwesomeIcon icon={faNewspaper}/></button>
    </div>
  );
};

export default LoggedIn;