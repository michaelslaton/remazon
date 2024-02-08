import { useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import '../authentication.css';
import { fetchNotificationsThunk } from '../../../redux/slices/notificationsSlice';

const SignIn: React.FC = () => {
  const auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
        dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid));
        dispatch(fetchNotificationsThunk(auth.currentUser!.uid));
      })
      .then(()=> navigate('/'))
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
      });
  };

  return (
    <div className='center-display-space'>
      <form className='form-wrapper'>
        <h2 className='title form-title'>Sign In</h2>

        <label
          htmlFor='email'
          className='form-input-label'
        >
          E-Mail:
        </label>
        <input
          type='email'
          ref={emailRef}
          placeholder='Email'
        />

        <label
          htmlFor='password'
          className='form-input-label'
        >
          Password: 
        </label>
        <input
          type='password'
          ref={passwordRef}
          placeholder='Password'
        />

        <button
          className='button form__control'
          type='submit'
          onClick={(e)=> loginHandler(e)}
        >
          <FontAwesomeIcon icon={faSignIn}/>
        </button>

        <button
          className='button form__control'
          type='button'
          onClick={()=> navigate('/signup')}
        >
          Sign Up
        </button>
        
      </form>
    </div>
  );
};

export default SignIn;