import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { NotificationPostType } from '../../../types/notificationType';
import { createNotificationThunk, fetchNotificationsThunk } from '../../../redux/slices/notificationsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import EmployeeType from '../../../types/employeeType';
import './adminNotification.css';

type InitialStateType = {
  unlisted: EmployeeType[];
  listed: EmployeeType[];
  clickedUnlisted: string[];
  clickedListed: string[];
};

const initialState: InitialStateType = {
  unlisted: [],
  listed: [],
  clickedUnlisted: [],
  clickedListed: [],
};

const AdminNotification: React.FC = () => {
  const employeeList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);
  const [ countData, setCountData ] = useState<number>(0);
  const [ listState, setListState ] = useState<InitialStateType>({
    ...initialState,
    unlisted: employeeList,
  });
  const dispatch = useAppDispatch();
  const currentEmployeeUid: string | undefined = useAppSelector((state)=> state.employeesControl.currentEmployee?.uid);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const alphabetizeEmployees = (arr: EmployeeType[]): EmployeeType[] => {
    const sorted = [...arr].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    });
    return sorted;
  };

  // handleClickUnlisted and handleClickListed
  // these functions handle clicking and selecting items in the sent to user lists
  // moving them between the list of currently clicked names or un clicked names of each list, depending on it's current clicked state
  const handleClickUnlisted = (employee: EmployeeType): void => {
    let currentClickedUnlisted = [...listState.clickedUnlisted];
    if (currentClickedUnlisted.includes(employee.uid)) currentClickedUnlisted = currentClickedUnlisted.filter((uid)=> uid !== employee.uid);
    else currentClickedUnlisted = [...currentClickedUnlisted, employee.uid];
    setListState({...listState, clickedUnlisted: currentClickedUnlisted});
    return;
  };

  const handleClickListed = (employee: EmployeeType): void => {
    let currentClickedListed = [...listState.clickedListed];
    if (currentClickedListed.includes(employee.uid)) currentClickedListed = currentClickedListed.filter((uid)=> uid !== employee.uid);
    else currentClickedListed = [...currentClickedListed, employee.uid];
    setListState({...listState, clickedListed: currentClickedListed});
    return;
  };

  const handleMoveRight = (): void => {
    let currentListed = [...listState.listed];
    let currentUnlisted = [...listState.unlisted];
    currentUnlisted.forEach((employee) => {
      if (listState.clickedUnlisted.includes(employee.uid)) currentListed.push(employee);
    });
    currentUnlisted = currentUnlisted.filter((employee)=> !listState.clickedUnlisted.includes(employee.uid));
    setListState({
      ...listState,
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
      if (listState.clickedListed.includes(employee.uid)) currentUnlisted.push(employee);
    });
    currentListed = currentListed.filter((employee)=> !listState.clickedListed.includes(employee.uid));
    setListState({
      ...listState,
      listed: currentListed,
      unlisted: currentUnlisted,
      clickedListed: [],
      clickedUnlisted: [],
    });
    return;
  };

  const handleMoveAll = (): void => {
    let newListed = [...listState.unlisted];
    let newUnlisted = [...listState.listed];
    setListState({
      ...listState,
      unlisted: newUnlisted,
      listed: newListed,
    });
    return;
  };

  // handleReset resets the state of the send to user lists
  // handleFullReset resets the state of the entire form to it's initial state
  const handleReset = (): void=> {
    setListState({
      ...initialState,
      unlisted: employeeList,
    });
  };
  
  const handleFullReset = (): void=> {
    formRef.current!.reset();
    handleReset();
  };

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault()
    if (messageRef.current!.value.length > 200) {
      dispatch(setUiError('Please shorten your notification length to 200 characters or less.'));
      return;
    };
    if(messageRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a message for the notification.'));
      return;
    };
    if (titleRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a title for the notification.'));
      return;
    };
    if (listState.listed.length < 1) {
      dispatch(setUiError('Please enter at least 1 recipient for the notification.'));
      return;
    };

    const attendingList = listState.listed.map((employee)=> employee.uid).toString();
    const newNotification: NotificationPostType = {
      title: titleRef.current!.value,
      users: attendingList,
      type: 'admin',
      message: messageRef.current!.value,
    };
    
    dispatch(createNotificationThunk(newNotification))
      .then(()=> dispatch(fetchNotificationsThunk(currentEmployeeUid!)))
      .then(()=> {
        handleFullReset();
      })
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
    return;
  };

  return (
    <form className='form-wrapper' ref={formRef}>
      <div className='form__section'>
        <h2 className='title form-title'>Admin Notification</h2>
      </div>

      <div className='form__inputs'>
        <label className='form-input-label'>
          Send To:
        </label>
        <div className='admin__send-to-grid'>
          <ul className='admin__send-to__list'>
            {alphabetizeEmployees(listState.unlisted).map((employee) => (
              <li
                className={`admin__send-to__listing ${listState.clickedUnlisted.includes(employee.uid) && 'selected'}`}
                onClick={() => handleClickUnlisted(employee)}
                key={employee.id}
              >
                {employee.name}
              </li>
            ))}
          </ul>
          
          <div className='admin__send-to--buttons-wrapper'>
            <button
              type='button'
              className='admin__send-to-button'
              onClick={() => handleMoveRight()}
            >
              {`>`}
            </button>

            <button
              type='button'
              className='admin__send-to-button'
              onClick={() => handleMoveAll()}
            >
              {`>>`}
            </button>

            <button
              type='button'
              className='admin__send-to-button'
              onClick={()=> handleReset()}
            >
              {`<<`}
            </button>

            <button
              type='button'
              className='admin__send-to-button'
              onClick={() => handleMoveLeft()}
            >
              {`<`}
            </button>
          </div>

          <div>
            <ul className='admin__send-to__list'>
              {alphabetizeEmployees(listState.listed).map((employee) => (
                <li
                  className={`admin__send-to__listing ${listState.clickedListed.includes(employee.uid) && 'selected'}`}
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
          rows={1}
          ref={titleRef}
        />

        <label
          htmlFor='message'
          className='form-input-label'
        >
          Message:
        </label>
        <textarea
          id='message'
          name='message'
          rows={6}
          ref={messageRef}
          maxLength={200}
          onChange={(e)=> setCountData(e.currentTarget.value.length)}
        />
        <div className='parameter-text'>
          {countData} of 200
        </div>
      </div>

      <div className='form__control-wrapper'>
        <button
          className='button form__control'
          type='button'
          onClick={()=> handleFullReset()}
        >
          Clear
        </button>
        <button
          className='button form__control'
          type='submit'
          onClick={(e)=> submitHandler(e)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default AdminNotification;