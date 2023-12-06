import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchCurrentEmployeeThunk } from "../../../redux/slices/employeesSlice";
import { setAuthDisplay } from "../../../redux/slices/controlsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faX } from "@fortawesome/free-solid-svg-icons";
import "../authentication.css";

const SignIn: React.FC = () => {
  const auth = getAuth();
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
        dispatch(setAuthDisplay("logout"));
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        dispatch(setAuthDisplay("login signup"));
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
        <button className="button" onClick={()=> dispatch(setAuthDisplay("login signup"))}>
          <FontAwesomeIcon icon={faX}/>
        </button>
      </form>
    </>
  );
};

export default SignIn;