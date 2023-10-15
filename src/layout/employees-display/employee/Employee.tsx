import EmployeeType from "../../../types/employeeType";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import "./employee.css";

type EmployeeProps = {
  data: EmployeeType;
}

const Employee: React.FC<EmployeeProps> = ({ data }) => {
  const navigate = useNavigate();
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const currentEmployeesRank = ranks.find((rank)=> rank.id === data.rank);

  return (
    <div className="employee__wrapper">
      <h2 className="title">{data.name}<div className={`status-dot ${data.status ? "active" : ""}`}/></h2>
      <ul className="employee__info">
        <li>Rank: {currentEmployeesRank!.name}</li>
        <li>Bio:
          <article>
            {data.description}
          </article>
        </li>
      </ul>
      <button className="button" onClick={()=> navigate(`/employees/edit/${data.id}`)}>Edit</button>
    </div>
  );
};

export default Employee;