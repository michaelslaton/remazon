import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCurrentEmployeeThunk } from '../../redux/slices/employeesSlice';
import LoggedIn from './components/LoggedIn';
import SignIn from './components/SignIn';
import EmployeeType from '../../types/employeeType';
import './authentication.css';

const Authentication: React.FC = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const authDisplay: string = useAppSelector((state)=> state.mainControl.authDisplay);
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  useEffect(()=>{
    if(auth.currentUser && !currentEmployee) dispatch(fetchCurrentEmployeeThunk(auth.currentUser?.uid));
  },[]);

  // Show if the employee is signed in --------------------------------------------------------------------------------------------------------->
  if(auth.currentUser || currentEmployee) return (
    <div className="authentication__wrapper">
      <LoggedIn/>
    </div>
  );

  // Show if the employee wants to sign in ------------------------------------------------------------------------------------------------------>
  else if(authDisplay === 'login') return (
    <div className="authentication__wrapper">
      <SignIn/>
    </div>
  );

  // Default view to show sign in or sign up ----------------------------------------------------------------------------------------------------->
  else if (authDisplay === 'login signup') return (
    <>
    </>
  );
};

export default Authentication;