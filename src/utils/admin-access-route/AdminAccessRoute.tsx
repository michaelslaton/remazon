import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

type AuthProps = {
  children: JSX.Element;
}

const AdminAccessRoute: React.FC<AuthProps> = ({ children }) => {
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);

  useEffect(()=>{
    if(!currentEmployee?.admin) {
      console.error("Admin access only.");
      navigate("/");
    }
    else console.log("Admin access.")
  },[]);

  
  if(!currentEmployee?.admin) return <></>;

  return (
    <>
      {children}
    </>
  );
};

export default AdminAccessRoute;