import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import Notification from './notifications-component/Notification';
import NotificationType from '../../types/notification.type';
import EmployeeType from '../../types/employee.type';
import { fetchNotificationsThunk } from '../../redux/slices/notificationsSlice';
import './notifications.css';

const NotificationsDisplay: React.FC = () => {
  const [ selectedNotification, setSelectedNotification ] = useState<NotificationType | null>(null);
  const dispatch = useAppDispatch();
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const notificationsList: NotificationType[] = useAppSelector((state)=> state.notificationsControl.notifications);

  useEffect(()=>{
    if (currentEmployee) dispatch(fetchNotificationsThunk(currentEmployee.uid));
    if (employeesList.length < 1) dispatch(fetchEmployeesListThunk());
  },[]);

  return (
    <>
      <div className='display__header'>
        <h2>Notifications</h2>
      </div>

      <div className='display__controls'/>

      <div className='notifications-container'>
        <div data-testid='notifications list' className='notification__list'>
          { notificationsList?.length ?
            <>
              {notificationsList.map((notification)=>(
                <div
                  key={notification.id}
                  className={
                    `notification__list-item ${selectedNotification?.id === notification.id && 'active'} ${notification.type === 'admin' && 'rembo-notification'} `}
                  onClick={()=> setSelectedNotification(notification)}
                >
                  {notification.title}
                </div>
              ))}
            </>
            :
            <div>
              No notifications to display!
            </div>
          }
        </div>

        <div data-testid='notification display' className='notification__list'>
          { selectedNotification &&
            <Notification data={selectedNotification} uid={currentEmployee!.uid} action={setSelectedNotification}/>
          }
        </div>

      </div>
    </>
  );
};

export default NotificationsDisplay;