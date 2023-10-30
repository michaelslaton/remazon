import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchApplicationsThunk } from "../../redux/slices/applicationsSlice";
import Application from "./applications-component/Application";
import ApplicationType from "../../types/applicationType";
import "./applications.css";
import { fetchEmployeesThunk } from "../../redux/slices/employeesSlice";
import EmployeeType from "../../types/employeeType";

const ApplicationsDisplay: React.FC = () => {
  const [ selectedApplication, setSelectedApplication ] = useState<ApplicationType | null>(null);
  const applicationsList: ApplicationType[] = useAppSelector((state)=> state.applicationsControl.applications);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchApplicationsThunk());
    if(!employeesList.length) dispatch(fetchEmployeesThunk());
  },[]);

  if(!applicationsList.length) return <>"Loading..."</>

  return (
    <>
      <h2 className="title">Applications</h2>
      <div className="applications-display__container">
        <div className="applications__list">
          {applicationsList.map((application)=>(
            <div
              key={application.id}
              className={`applications__list-item ${ selectedApplication?.id === application.id ? "active" : ""}`}
              onClick={()=> setSelectedApplication(application)}>
              { application.type === "employee" ? "Employee Claim Request" : "Somethin Else"}
            </div>
          ))}
        </div>
        <div className={`${ selectedApplication ? "applications__selected-application" : ""}`}>
          <Application data={selectedApplication}/>
        </div>
      </div>
    </>
  );
};

export default ApplicationsDisplay;