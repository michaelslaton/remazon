import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchNotificationsThunk } from "../../redux/slices/notificationsSlice";
import Notification from "./notifications-component/Notification";
import NotificationType from "../../types/notificationType";
import "./notifications.css";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import EmployeeType from "../../types/employeeType";

const NotificationsDisplay: React.FC = () => {
  const [ selectedNotification, setSelectedApplication ] = useState<NotificationType | null>(null);
  const notificationsList: NotificationType[] = useAppSelector((state)=> state.notificationsControl.notifications);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchNotificationsThunk());
    if(!employeesList.length) dispatch(fetchEmployeesListThunk());
  },[]);

  if(!notificationsList.length) return <>"Loading..."</>

  return (
    <>
      <h2 className="title">Applications</h2>
      <div className="applications-display__container">
        <div className="applications__list">
          {notificationsList.map((application)=>(
            <div
              key={application.id}
              className={`applications__list-item ${ selectedNotification?.id === application.id ? "active" : ""}`}
              onClick={()=> setSelectedApplication(application)}>
              { application.type === "employee" ? "Employee Claim Request" : "Somethin Else"}
            </div>
          ))}
        </div>
        <div className={`${ selectedNotification ? "applications__selected-application" : ""}`}>
          <Notification data={selectedNotification}/>
        </div>
      </div>
    </>
  );
};

export default NotificationsDisplay;