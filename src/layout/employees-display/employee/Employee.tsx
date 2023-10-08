import EmployeeType from "../../../types/employeeType";
import "./employee.css";

type EmployeeProps = {
  data: EmployeeType;
}

const Employee: React.FC<EmployeeProps> = ({ data }) => {

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
    </div>
  );
};

export default Employee;