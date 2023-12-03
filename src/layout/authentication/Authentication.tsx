import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../../redux/hooks";
// import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import EmployeeType from "../../types/employeeType";
import "./authentication.css";
import LoggedIn from "./components/LoggedIn";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Authentication: React.FC = () => {
  const [ controls, setControls ] = useState<string>("login signup");
  const auth = getAuth();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);


  // Show if the employee is signed in --------------------------------------------------------------------------------------------------------->
  if(auth.currentUser || currentEmployee) return (
    <LoggedIn/>
  );

  // Show if the employee wants to sign in ------------------------------------------------------------------------------------------------------>
  else if(controls === "login") return (
    <SignIn setControls={setControls}/>
  );

  // Default view to show sign in or sign up ----------------------------------------------------------------------------------------------------->
  else if (controls === "login signup") return (
    <SignUp setControls={setControls}/>
  );
};

export default Authentication;