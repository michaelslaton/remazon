import { NavigateFunction, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { clearCurrentEmployee } from "../../redux/slices/employeesSlice";
import EmployeeType from "../../types/employeeType";
import "./header.css";

const Header: React.FC = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentEmployee: EmployeeType | null = useAppSelector((state)=> state.employeesControl.currentEmployee);

  const handleSignout = () => {
    signOut(auth);
    dispatch(clearCurrentEmployee());
    navigate(0);
  };

  return (
    <>
      <div className="header__content">
        <h1 className="header__title">Remazon Prime</h1>
        { auth.currentUser?.uid || currentEmployee?.uid ?
          <button className="button" onClick={()=> handleSignout()}>
          Sign Out
          </button>
          :
          <>
          </>
        }
      </div>
      <div className="divider"/>
    </>
  );
};

export default Header;