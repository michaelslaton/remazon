import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getAuth } from 'firebase/auth';
import { fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
import { fetchNotificationsThunk } from '../../../redux/slices/notificationsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import EmployeeType from '../../../types/employeeType';
import RankType from '../../../types/rankType';
import './userDisplay.css';

const UserDisplay: React.FC = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const notifications = useAppSelector((state)=> state.notificationsControl.notifications);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranks?.find((rank)=> rank.id === currentEmployee?.rank);

  useEffect(()=>{
    if (auth.currentUser && !currentEmployee) dispatch(fetchCurrentEmployeeThunk(auth.currentUser?.uid));
    if (currentEmployee) dispatch(fetchNotificationsThunk(currentEmployee.uid));
  },[]);

  return (
    <div className='user-display__wrapper'>
      { auth.currentUser &&
        currentEmployee && (
          <div className='user-display__user-wrapper'>
            <div
              className='user-display__employee-name'
              style={{ color: currentEmployeesRank?.color }}
            >
              {currentEmployee?.name}
            </div>
              <button
                className={`notification-button ${notifications.length ? 'active' : ''}`}
                onClick={() => navigate('/notifications')}
              >
                <FontAwesomeIcon icon={faNewspaper} />
              </button>
          </div>
        )
      }
    </div>
  );
};

export default UserDisplay;