import EmployeeType from "../../../types/employeeType";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rank from "../../../types/rankType";
import "../employees.css";

type EmployeeProps = {
  data: EmployeeType;
}

const months: string[] = [ `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` ];

const Employee: React.FC<EmployeeProps> = ({ data }) => {
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const currentEmployeesRank: Rank | undefined = ranks.find((rank)=> rank.id === data.rank);
  const navigate: NavigateFunction = useNavigate();
  
  let birthday: Date | null = null;
  if(data.birthday) birthday = new Date(data.birthday);

  return (
    <div className="employee__wrapper">
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
      <button className="button" onClick={()=> navigate(`/employees/edit/${data.id}`)}>
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    </div>
  );
};

export default Employee;