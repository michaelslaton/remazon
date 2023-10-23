import { NavigateFunction, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import "./header.css";
import UserType from "../../types/userType";
import { clearUser } from "../../redux/slices/usersSlice";

const Header: React.FC = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const currentUser: UserType | null = useAppSelector((state)=> state.userControl.currentUser);

  const handleSignout = () => {
    signOut(auth);
    dispatch(clearUser());
    navigate(0);
  };

  return (
    <>
      <div className="header__content">
        <h1 className="header__title">Remazon Prime</h1>
        { auth.currentUser?.uid || currentUser?.uid ?
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