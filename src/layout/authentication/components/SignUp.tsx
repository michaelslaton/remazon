import { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createEmployeeThunk, fetchEmployeesListThunk, fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
import EmployeeType, { EmployeePostType } from '../../../types/employeeType';
import { setUiError } from '../../../redux/slices/controlsSlice';
import '../authentication.css';

const SignUp: React.FC = () => {
  const auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bdayRef = useRef<HTMLInputElement>(null);
  const employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (nameRef.current!.value.length < 1) { 
      dispatch(setUiError('Please enter a Username.'));
      return;
    };
    if (emailRef.current!.value.length < 1) { 
      dispatch(setUiError('Please enter an E-Mail address.'));
      return;
    };
    for(let i=0; i<employeesList.length;i++){
      if(employeesList[i].name.toLocaleLowerCase() === nameRef.current!.value.toLocaleLowerCase()){
        dispatch(setUiError('That name is taken.'));
        return;
      };
    };
    if (!emailRef.current!.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) { 
      dispatch(setUiError('E-mail address format is invalid.'));
      return;
    };
    if (passwordRef.current?.value === null || passwordRef.current!.value.length < 1) { 
      dispatch(setUiError('Please enter a password.'));
      return;
    };
    if (passwordRef.current?.value !== passwordRepeatRef.current?.value) { 
      dispatch(setUiError('Passwords do not macth.'));
      return;
    };

    let employeeBirthday: Date | null = null;
    if (bdayRef.current!.value) employeeBirthday = new Date(bdayRef.current!.value);
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    const newEmployeeName = nameRef.current!.value.toLowerCase();

    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {      
        const newEmployee: EmployeePostType = {
          name: newEmployeeName,
          birthday: employeeBirthday,
          uid: auth.currentUser!.uid,
          description: descriptionRef.current!.value,
        }      
        dispatch(createEmployeeThunk(newEmployee));
      })
      .then(()=> dispatch(fetchEmployeesListThunk()) )
      .then(()=> dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid)) )
      .then(()=> navigate('/') )
      .catch((error) => {
        dispatch(setUiError(error.message));
        console.error(error.code);
        console.error(error.message);
      });
  };

  return (
    <div className='center-display-space'>
        <form className='form-wrapper signup'>
          <h2 className='title form-title'>Sign Up</h2>

          <div className='form__inputs'>
            <label
              htmlFor='name'
              className='form-input-label'
            >
              Username:
            </label>
            <input
              type='text'
              name='name'
              id='id'
              ref={nameRef}
              required
            />

            <label
              htmlFor='email'
              className='form-input-label'
            >
              Email:
            </label>
            <input
              type='email'
              ref={emailRef}
              required
            />

            <label
              htmlFor='password'
              className='form-input-label'
            >
              Password:
            </label>
            <input
              id='password'
              type='password'
              ref={passwordRef}
              required
            />

            <label
              htmlFor='password repeat'
              className='form-input-label'
            >
              Re-Enter Password:
            </label>
            <input
              id='password repeat'
              type='password'
              ref={passwordRepeatRef}
              required
            />

            <label
              htmlFor='birthday'
              className='form-input-label'
            >
              Birthday:
            </label>
            <input
              type='date'
              id='birthday'
              name='birthday'
              className='date-input'
              ref={bdayRef}
            />

            <label
              htmlFor='description'
              className='form-input-label'
            >
              Description:
            </label>
            <textarea
              id='description'
              name='description'
              ref={descriptionRef}
            />
          </div>

          <div className='form__control-wrapper'>
            <button
              className='button form__control'
              type='submit'
              onClick={(e) => submitHandler(e)}>
                Create Account
            </button>

            <button
              className='button form__control'
              type='button'
              onClick={() => navigate('/signin')}>
                Return to Sign In
            </button>

            <button 
              className='button form__control'
              type='button'
              onClick={()=> navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
    </div>
  );
};

export default SignUp;