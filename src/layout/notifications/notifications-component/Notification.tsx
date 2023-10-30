
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import NotificationType from "../../../types/notificationType";
import EmployeeType from "../../../types/employeeType";
import "../notifications.css";

type NotificationProps = {
  data: NotificationType | null;
};

const Notification: React.FC<NotificationProps> = ({ data = null }) => {
  const selectedEmployee: EmployeeType | undefined = useAppSelector((state)=> state.employeesControl.employees).find((employee)=> employee.id === data?.requestedEmployee);
  // const dispatch = useAppDispatch();

  useEffect(()=>{
  },[]);

  
  if(!data) return <></>
  else return (
    <div>
      <div>
        User: {data.user}
      </div>
      <div>
        Employee Requested: {selectedEmployee?.name}
      </div>
    </div>
  );
};

export default Notification;