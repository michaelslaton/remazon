import { useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchCurrentEmployeeThunk } from '../../../redux/slices/employeesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { fetchNotificationsThunk } from '../../../redux/slices/notificationsSlice';
import { setUiError } from '../../../redux/slices/controlsSlice';
import '../authentication.css';

const SignIn: React.FC = () => {
  const auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    if (emailRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter an E-Mail address.'));
      return;
    };
    if(!emailRef.current!.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      dispatch(setUiError('E-mail address format is invalid.'));
      return;
    };
    if (passwordRef.current!.value.length < 1) {
      dispatch(setUiError('Please enter a password.'));
      return;
    };

    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
        dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid));
        dispatch(fetchNotificationsThunk(auth.currentUser!.uid));
      })
      .then(()=> navigate('/'))
      .catch((error) => {
        dispatch(setUiError(`Error: ${error.code}`));
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
          required
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
          required
        />

        <div className='form__control-wrapper'>
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
        </div>
        
      </form>
    </div>
  );
};

export default SignIn;