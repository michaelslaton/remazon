import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";

type AuthProps = {
  children: JSX.Element;
}

const AuthRoute: React.FC<AuthProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const auth: Auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user) setLoading(false);
      else {
        console.error("Unauthorized");
        navigate("/login");
      };
    });
  },[auth]);

  if (loading) return <p>loading ...</p>

  return (
    <>
      {children}
    </>
  );
};

export default AuthRoute;