import { useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../redux/hooks";
import { createEmployeeThunk } from "../../redux/slices/employeesSlice";
import { EmployeePostType } from "../../types/employeeType";
import "./authentication.css";


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
    if(bdayRef.current!.value) employeeBirthday = new Date(bdayRef.current!.value);

    const enteredEmail: string = emailRef.current!.value;
    const enteredPassword: string = passwordRef.current!.value;
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    .then(() => {      
      const newEmployee: EmployeePostType = {
        name: nameRef.current!.value,
        birthday: employeeBirthday,
        uid: auth.currentUser!.uid,
        description: descriptionRef.current!.value,
      }      
      dispatch(createEmployeeThunk(newEmployee));
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
      <form className="signup">

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

        <label>
          Birthday:
          <input
            type="date"
            id="birthday"
            name="birthday"
            ref={bdayRef}/>
        </label>

        <label>
          Description:
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}/>
        </label>

        <button
          className="button signup-control"
          type="submit"
          onClick={(e) => submitHandler(e)}>
            Sign Up
        </button>
        <button className="button signup-control" onClick={()=> navigate("/")}>Cancel</button>

      </form>
    </>
  );
};

export default SignUp;