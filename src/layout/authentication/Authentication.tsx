import { useRef, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { clearCurrentEmployee } from "../../redux/slices/employeesSlice";
// import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faX, faNewspaper, faSignOut } from "@fortawesome/free-solid-svg-icons";
import RankType from "../../types/rankType";
import EmployeeType from "../../types/employeeType";
import "./authentication.css";

const Authentication: React.FC = () => {
  const [ controls, setControls ] = useState<string>("login signup");
  const auth = getAuth();
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranks?.find((rank)=> rank.id === currentEmployee?.rank);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    // if(ranks.length < 1) dispatch(fetchRanksThunk());
  },[])

  const loginHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
        dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid));
        setControls("logout");
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        setControls("login signup");
      });
  };

  const logoutHandler = (): void => {
    navigate(0);
    signOut(auth);
    dispatch(clearCurrentEmployee());
  };

  // Show if the employee is signed in --------------------------------------------------------------------------------------------------------->
  if(auth.currentUser || currentEmployee) return (
    <div className="logged-in-wrapper">
      Signed in as <div className="authentication__employee-name" style={{color: currentEmployeesRank?.color}}>{currentEmployee?.name}</div>
      <button className="button" onClick={()=> navigate("/notifications")}><FontAwesomeIcon icon={faNewspaper}/></button>
      <button className="button signout-button" onClick={()=> logoutHandler()}><FontAwesomeIcon icon={faSignOut}/></button>
    </div>
  );

  // Show if the employee wants to sign in ------------------------------------------------------------------------------------------------------>
  else if(controls === "login") return (
    <>
      <form className="login-form">
        <label htmlFor="email">
          <input type="email" ref={emailRef} placeholder="Email"/>
        </label>
        <label htmlFor="password">
          <input type="password" ref={passwordRef} placeholder="Password"/>
        </label>
        <button
          className="button login-button"
          type="submit"
          onClick={(e) => loginHandler(e)}>
          <FontAwesomeIcon icon={faSignIn}/>
        </button>
        <button className="button" onClick={()=> setControls("login signup")}>
          <FontAwesomeIcon icon={faX}/>
        </button>
      </form>
    </>
  );

  // Default view to show sign in or sign up ----------------------------------------------------------------------------------------------------->
  else if (controls === "login signup") return (
    <>
      <button
        className="button"
        type="submit"
        onClick={() => setControls("login")}>
        Sign In
      </button>
      or 
      <button
      className="button"
        type="button"
        onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </>
  );
};

export default Authentication;