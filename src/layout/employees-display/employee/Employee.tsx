import EmployeeType from "../../../types/employeeType";
import { useNavigate } from "react-router-dom";
import "./employee.css";

type EmployeeProps = {
  data: EmployeeType;
}

const Employee: React.FC<EmployeeProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="employee__wrapper">
      <h2>{data.name}</h2>
      <ul className="employee__info">
        <li>Rank: {data.rank}</li>
        <li>Bio:
          <article>
            {data.description}
          </article>
        </li>
      </ul>
      <button onClick={()=> navigate(`/employees/edit/${data.id}`)}>Edit</button>
    </div>
  );
};

export default Employee;