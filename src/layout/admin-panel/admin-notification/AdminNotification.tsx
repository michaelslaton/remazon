import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import EmployeeType from '../../../types/employeeType';
import './adminNotification.css';

const AdminNotification: React.FC = () => {
  let employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const [ unlisted, setUnlisted ] = useState<EmployeeType[]>(employeeList);
  const [ listed, setListed ] = useState<EmployeeType[]>([]);
  const [ clickedUnlisted, setClickedUnlisted ] = useState<string[]>([]);
  const [ clickedListed, setClickedListed ] = useState<string[]>([]);

  const alphabetizeEmployees = (arr: EmployeeType[]) => {
    let sorted = [...arr].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    })

    return sorted;
  };

  const handleClickUnlisted = (employee: EmployeeType) => {
    let currentClickedUnlisted = [...clickedUnlisted];

    if(currentClickedUnlisted.includes(employee.uid)) currentClickedUnlisted = currentClickedUnlisted.filter((uid)=> uid !== employee.uid);
    else currentClickedUnlisted = [...currentClickedUnlisted, employee.uid];
    setClickedUnlisted(currentClickedUnlisted);
    return;
  };

  const handleClickListed = (employee: EmployeeType) => {
    let currentClickedListed = [...clickedListed];

    if(currentClickedListed.includes(employee.uid)) currentClickedListed = currentClickedListed.filter((uid)=> uid !== employee.uid);
    else currentClickedListed = [...currentClickedListed, employee.uid];
    setClickedListed(currentClickedListed);
    return;
  };

  const handleMoveRight = (): void => {
    let currentListed = [...listed];
    let currentUnlisted = [...unlisted];

    currentUnlisted.forEach((employee) => {
      if(clickedUnlisted.includes(employee.uid)) currentListed.push(employee);
    });

    currentUnlisted = currentUnlisted.filter((employee)=> !clickedUnlisted.includes(employee.uid));

    setListed([...currentListed]);
    setUnlisted(currentUnlisted);
    setClickedListed([]);
    setClickedUnlisted([]);
    return;
  };

  const handleMoveLeft = (): void => {
    let currentListed = [...listed];
    let currentUnlisted = [...unlisted];

    currentListed.forEach((employee) => {
      if(clickedListed.includes(employee.uid)) currentUnlisted.push(employee);
    });

    currentListed = currentListed.filter((employee)=> !clickedListed.includes(employee.uid));

    setListed(alphabetizeEmployees(currentListed));
    setUnlisted(alphabetizeEmployees(currentUnlisted));
    setClickedListed([]);
    setClickedUnlisted([]);
    return;
  };

  return (
    <div>
      <form className="form-wrapper">
        <div className="title">Admin Notification</div>
        <div className="admin__send-to-grid">
          <ul className="admin__send-to__unlist">
            {alphabetizeEmployees(unlisted).map((employee) => (
              <li
                className={`admin__send-to__listing ${
                  clickedUnlisted.includes(employee.uid) ? "selected" : ""
                }`}
                onClick={() => handleClickUnlisted(employee)}
                key={employee.id}
              >
                {employee.name}
              </li>
            ))}
          </ul>
          <div>
            <button type="button" onClick={() => handleMoveRight()}>
              {`>`}
            </button>

            <button type="button">X</button>

            <button type="button" onClick={() => handleMoveLeft()}>
              {`<`}
            </button>
          </div>
          <div>
            <ul className="admin__send-to__unlist">
              {alphabetizeEmployees(listed).map((employee) => (
                <li
                  className={`admin__send-to__listing ${
                    clickedListed.includes(employee.uid) ? "selected" : ""
                  }`}
                  onClick={() => handleClickListed(employee)}
                  key={employee.id}
                >
                  {employee.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminNotification;