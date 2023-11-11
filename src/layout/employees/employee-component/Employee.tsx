import EmployeeType from "../../../types/employeeType";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankType from "../../../types/rankType";
import { ReactNode } from "react";
import "../employees.css";

type EmployeeProps = {
  data: EmployeeType;
};

const months: string[] = [ `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];

const Employee: React.FC<EmployeeProps> = ({ data }) => {
  const navigate: NavigateFunction = useNavigate();
  const ranks: RankType[] = useAppSelector((state)=> state.ranksControl.ranks);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranks.find((rank)=> rank.id === data.rank);
  
  let birthday: Date | null = null;
  if(data.birthday) birthday = new Date(data.birthday); 

  // editButtonRender checks all the conditions to see if access is permitted to edit an employee.
  // An Admin may always edit, otherwise employees can only edit their own employee profile if an admin has not locked it.
  const editButtonRender = (): ReactNode | null => {
    if ( data.locked && !currentEmployee?.admin ) return;
    else if (currentEmployee?.admin || currentEmployee?.uid === data.uid) return (
      <button className="button" onClick={()=> navigate(`/employees/edit/${data.id}`)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    );
  };

  return (
    <div className="employee__wrapper" style={{borderColor: currentEmployeesRank?.color}}>
      <h2 className="title">{data.name}<div className={`status-dot ${data.status ? "active" : ""}`}/></h2>
      <ul className="employee__info">
        <li>Rank: 
          <div className="employee__rank" style={{color: currentEmployeesRank?.color}}>
            {currentEmployeesRank!.name}
          </div>
        </li>
        { birthday ?
          <li>Birthday: {birthday.getDate()} - {months[birthday.getMonth()]}</li>
          : 
          <></> }
        <li>Bio:
          <article>
            {data.description}
          </article>
        </li>
      </ul>
      <div className="employee__edit-button_wrapper">
        {editButtonRender()}
      </div>
    </div>
  );
};

export default Employee;