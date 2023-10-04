import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type AuthProps = {
  children: JSX.Element;
}

const AuthRoute: React.FC<AuthProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user) setLoading(false);
      else {
        console.log("Unauthorized");
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