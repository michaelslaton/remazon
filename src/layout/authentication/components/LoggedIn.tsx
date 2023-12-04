import { getAuth, signOut } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearCurrentEmployee } from "../../../redux/slices/employeesSlice";
import RankType from "../../../types/rankType";
import "../authentication.css";

const LoggedIn: React.FC = () => {
  const auth = getAuth();
  const ranks = useAppSelector((state)=> state.ranksControl.ranks);
  const navigate: NavigateFunction = useNavigate();  
  const dispatch = useAppDispatch();
  const currentEmployee = useAppSelector((state)=> state.employeesControl.currentEmployee);
  const currentEmployeesRank: RankType | undefined = ranks?.find((rank)=> rank.id === currentEmployee?.rank);

  const logoutHandler = (): void => {
    navigate(0);
    signOut(auth);
    dispatch(clearCurrentEmployee());
  };

  return (
    <div className="logged-in-wrapper">
      Signed in as <div className="authentication__employee-name" style={{color: currentEmployeesRank?.color}}>{currentEmployee?.name}</div>
      <button className="button" onClick={()=> navigate("/notifications")}><FontAwesomeIcon icon={faNewspaper}/></button>
      <button className="button signout-button" onClick={()=> logoutHandler()}><FontAwesomeIcon icon={faSignOut}/></button>
    </div>
  );
};

export default LoggedIn;