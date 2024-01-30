import { useRef, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import EmployeeType from '../../../types/employeeType';
import './adminNotification.css';

type InitialStateType = {
  unlisted: EmployeeType[];
  listed: EmployeeType[];
  clickedUnlisted: string[];
  clickedListed: string[];
};

const initialState = {
  unlisted: [],
  listed: [],
  clickedUnlisted: [],
  clickedListed: [],
};

const AdminNotification: React.FC = () => {
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const [ listState, setListState ] = useState<InitialStateType>({
    ...initialState,
    unlisted: employeeList,
  });
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const alphabetizeEmployees = (arr: EmployeeType[]): EmployeeType[] => {
    const sorted = [...arr].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    });

    return sorted;
  };

  const handleClickUnlisted = (employee: EmployeeType): void => {
    let currentClickedUnlisted = [...listState.clickedUnlisted];

    if(currentClickedUnlisted.includes(employee.uid)) currentClickedUnlisted = currentClickedUnlisted.filter((uid)=> uid !== employee.uid);
    else currentClickedUnlisted = [...currentClickedUnlisted, employee.uid];

    setListState({...listState, clickedUnlisted: currentClickedUnlisted});
    return;
  };

  const handleClickListed = (employee: EmployeeType): void => {
    let currentClickedListed = [...listState.clickedListed];

    if(currentClickedListed.includes(employee.uid)) currentClickedListed = currentClickedListed.filter((uid)=> uid !== employee.uid);
    else currentClickedListed = [...currentClickedListed, employee.uid];

    setListState({...listState, clickedListed: currentClickedListed});
    return;
  };

  const handleMoveRight = (): void => {
    let currentListed = [...listState.listed];
    let currentUnlisted = [...listState.unlisted];

    currentUnlisted.forEach((employee) => {
      if(listState.clickedUnlisted.includes(employee.uid)) currentListed.push(employee);
    });

    currentUnlisted = currentUnlisted.filter((employee)=> !listState.clickedUnlisted.includes(employee.uid));

    setListState({
      listed: currentListed,
      unlisted: currentUnlisted,
      clickedListed: [],
      clickedUnlisted: [],
    });
    return;
  };

  const handleMoveLeft = (): void => {
    let currentListed = [...listState.listed];
    let currentUnlisted = [...listState.unlisted];

    currentListed.forEach((employee) => {
      if(listState.clickedListed.includes(employee.uid)) currentUnlisted.push(employee);
    });

    currentListed = currentListed.filter((employee)=> !listState.clickedListed.includes(employee.uid));

    setListState({
      listed: currentListed,
      unlisted: currentUnlisted,
      clickedListed: [],
      clickedUnlisted: [],
    });
    return;
  };

  const handleReset = (): void=> {
    setListState({
      ...initialState,
      unlisted: employeeList,
    });
  };

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  return (
    <div>
      <form className='form-wrapper'>
        <div className='title'>Admin Notification</div>
        <div
          className='form-input-label'
        >
          Send To:
        </div>
        <div className='admin__send-to-grid'>
          <ul className='admin__send-to__unlist'>
            {alphabetizeEmployees(listState.unlisted).map((employee) => (
              <li
                className={`admin__send-to__listing ${
                  listState.clickedUnlisted.includes(employee.uid) ? 'selected' : ''
                }`}
                onClick={() => handleClickUnlisted(employee)}
                key={employee.id}
              >
                {employee.name}
              </li>
            ))}
          </ul>
          <div>
            <button
              type='button'
              className='button'
              onClick={() => handleMoveRight()}
            >
              {`>`}
            </button>

            <button
              type='button'
              className='button'
              onClick={()=> handleReset()}
            >
              X
            </button>

            <button
              type='button'
              className='button'
              onClick={() => handleMoveLeft()}
            >
              {`<`}
            </button>
          </div>

          <div>
            <ul className='admin__send-to__unlist'>
              {alphabetizeEmployees(listState.listed).map((employee) => (
                <li
                  className={`admin__send-to__listing ${
                    listState.clickedListed.includes(employee.uid) ? 'selected' : ''
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

          <label
            htmlFor='title'
            className='form-input-label'
          >
            Title:
          </label>
          <textarea
            id='title'
            name='title'
            ref={titleRef}
          />

          <label
            htmlFor='type'
            className='form-input-label'
          >
            Type:
          </label>
          <select
            id='type'
            name='type'
            ref={typeRef}
          >
          </select>

          <label
            htmlFor='message'
            className='form-input-label'
          >
            Message:
          </label>
          <textarea
            id='message'
            name='message'
            ref={messageRef}
          />

          <button
            className='button'
            type='submit'
            onClick={(e)=> submitHandler(e)}
          >
            Send
          </button>

      </form>
    </div>
  );
};

export default AdminNotification;