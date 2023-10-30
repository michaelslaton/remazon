
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ApplicationType from "../../../types/applicationType";
import EmployeeType from "../../../types/employeeType";
import "../applications.css";

type ApplicationProps = {
  data: ApplicationType | null;
};

const Application: React.FC<ApplicationProps> = ({ data = null }) => {
  const selectedEmployee: EmployeeType | undefined = useAppSelector((state)=> state.employeesControl.employees).find((employee)=> employee.id === data?.requestedEmployee);
  const dispatch = useAppDispatch();

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

export default Application;