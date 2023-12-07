import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { setAuthDisplay } from "../../../redux/slices/controlsSlice";
import "../authentication.css";

const SignUp: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        className="button"
        type="submit"
        onClick={() => dispatch(setAuthDisplay("login"))}>
        Sign In
      </button>
      or 
      <button
      className="button"
        type="button"
        onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </>
  );
};

export default SignUp;