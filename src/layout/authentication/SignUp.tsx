import { useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { UserPostType } from "../../types/userType";
import "./loginSignup.css";
import { createUserThunk } from "../../redux/slices/usersSlice";


const SignUp: React.FC = () => {
  const auth = getAuth();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    .then(() => {      
      const newUser: UserPostType = {
        name: nameRef.current!.value,
        uid: auth.currentUser!.uid,
        employeeNumber: null,
      }      
      dispatch(createUserThunk(newUser));
      navigate("/");
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
  };

  return (
    <>
      <h2 className="title">Sign Up</h2>
      <form>

        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="id"
            ref={nameRef}/>
        </label>

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
            Sign Up
        </button>

      </form>
    </>
  );
};

export default SignUp;