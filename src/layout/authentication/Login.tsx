import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import "./loginSignup.css";

const Login: React.FC = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;

    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(() => {
        dispatch(fetchCurrentEmployeeThunk(auth.currentUser!.uid));
        navigate("/");
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
      });
  };

  return (
    <>
      <h2 className="title">Log In</h2>
      <form>
        <label htmlFor="email">
          Email: 
          <input type="email" ref={emailRef}/>
        </label>
        <label htmlFor="password">
          Password: 
          <input type="password" ref={passwordRef}/>
        </label>
        <button
          className="button"
          type="submit"
          onClick={(e) => submitHandler(e)}>
          Sign In
        </button>
         or 
        <button
         className="button"
          type="button"
          onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Login;