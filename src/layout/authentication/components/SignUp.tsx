import { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { createEmployeeThunk, fetchEmployeesListThunk, fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
import { setAuthDisplay } from '../../../redux/slices/controlsSlice';
import { EmployeePostType } from '../../../types/employeeType';
import '../authentication.css';

const SignUp: React.FC = () => {
  const auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bdayRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let employeeBirthday: Date | null = null;
    if(bdayRef.current!.value) employeeBirthday = new Date(bdayRef.current!.value);
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
    .then(()=> {
      dispatch(fetchEmployeesListThunk());
    })
    .then(()=> {
      dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid))
      dispatch(setAuthDisplay('logged in'))
    })
    .then(()=> {
      navigate('/');
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
  };

  return (
    <div className='center-display-space'>
      <div className='form-wrapper'>
        <h2 className='title'>Sign Up</h2>
        <form className='signup'>

          <label htmlFor='name'>
            <div className='form-input-label'>Name:</div>
            <input
              type='text'
              name='name'
              id='id'
              ref={nameRef}/>
          </label>

          <label htmlFor='email'>
            <div className='form-input-label'>Email: </div>
            <input type='email' ref={emailRef}/>
          </label>

          <label htmlFor='password'>
            <div className='form-input-label'>Password: </div>
            <input type='password' ref={passwordRef}/>
          </label>

          <label>
            <div className='form-input-label'>Birthday: </div>
            <input
              type='date'
              id='birthday'
              name='birthday'
              ref={bdayRef}/>
          </label>

          <label>
            <div className='form-input-label'>Description:</div>
            <textarea
              id='description'
              name='description'
              ref={descriptionRef}/>
          </label>

          <button
            className='button signup-control'
            type='submit'
            onClick={(e) => submitHandler(e)}>
              Sign Up
          </button>
          <button className='button signup-control' onClick={()=> navigate('/')}>Cancel</button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;