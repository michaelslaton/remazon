import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    if (type === "in") {
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((response) => {
          console.log(response.user.uid);
          navigate("/");
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
        });

    } else if (type === "up"){
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((response) => {
          console.log(response.user.uid);
          navigate("/");
        })
        .catch((error) => {
          console.error(error.code);
          console.error(error.message);
        });
    };
  };

  return (
    <>
      <form>
        Email: <input type="text" ref={emailRef}/>
        Password: <input type="text" ref={passwordRef}/>
        <button type="submit" onClick={(e) => submitHandler(e, "in")}>Sign In</button>
        <button type="submit" onClick={(e) => submitHandler(e, "up")}>Sign Up</button>
      </form>
    </>
  )
}

export default Login;