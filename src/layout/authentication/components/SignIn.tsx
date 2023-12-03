import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from "../../../redux/slices/employeesSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faX } from "@fortawesome/free-solid-svg-icons";
import "../authentication.css";

type SignInProps = {
  setControls: React.Dispatch<React.SetStateAction<string>>;
}


const SignIn: React.FC<SignInProps> = ({ setControls }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const auth = getAuth();


  const loginHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    
    dispatch(fetchEmployeesListThunk());
    
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

  return (
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
};

export default SignIn;