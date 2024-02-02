import { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { createEmployeeThunk, fetchEmployeesListThunk, fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
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
      .then(()=> {
        dispatch(fetchEmployeesListThunk());
      })
      .then(()=> {
        dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid))
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
        <form className='form-wrapper signup'>
        <h2 className='title form-title'>Sign Up</h2>

          <label
            htmlFor='name'
            className='form-input-label'
          >
            Name:
          </label>
          <input
            type='text'
            name='name'
            id='id'
            ref={nameRef}
          />

          <label
            htmlFor='email'
            className='form-input-label'
          >
            Email:
          </label>
          <input type='email' ref={emailRef}/>

          <label
            htmlFor='password'
            className='form-input-label'
          >
            Password:
          </label>
          <input
            type='password'
            ref={passwordRef}
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

          <button
            className='button signup-control'
            type='submit'
            onClick={(e) => submitHandler(e)}>
              Sign Up
          </button>
          <button 
            className='button signup-control'
            onClick={()=> navigate('/')}
          >
            Cancel
          </button>

        </form>
    </div>
  );
};

export default SignUp;