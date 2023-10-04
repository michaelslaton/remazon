import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [ authing, setAuthing ] = useState(false);

  const signIn = async (email: string,password: string) => {
    setAuthing(true);

    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response.user.uid);
      navigate("/");
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
  };

  const signUp = async (email: string,password: string) => {
    setAuthing(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response.user.uid);
      navigate("/");
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
  };

  return (
    <>
      Login Page
    </>
  )
}

export default Login;
