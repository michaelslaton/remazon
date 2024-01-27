import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import Loading from '../../utils/loading/Loading';
import Notification from './notifications-component/Notification';
import NotificationType from '../../types/notificationType';
import EmployeeType from '../../types/employeeType';
import './notifications.css';
import { fetchNotificationsThunk } from '../../redux/slices/notificationsSlice';

const NotificationsDisplay: React.FC = () => {
  const [ selectedNotification, setSelectedNotification ] = useState<NotificationType | null>(null);
  const dispatch = useAppDispatch();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const notificationsList: NotificationType[] = useAppSelector((state)=> state.notificationsControl.notifications);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  useEffect(()=>{
    if(currentEmployee) { dispatch(fetchNotificationsThunk(currentEmployee.uid)) }
    if(employeesList.length < 1) dispatch(fetchEmployeesListThunk());
  },[]);

  if(!notificationsList.length) return ( <Loading/> )

  return (
    <div className='notifications-display__wrapper'>
      <div>
        {notificationsList.map((notification)=>(
          <div
            className={`notification__list-item ${selectedNotification?.id === notification.id ? 'active' : ''}`}
            onClick={()=> setSelectedNotification(notification)}
          >
            {notification.title}
          </div>
        ))}
      </div>
      <div>
        { selectedNotification &&
          <Notification data={selectedNotification}/>
        }
      </div>
    </div>
  );
};

export default NotificationsDisplay;