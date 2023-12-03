import { NavigateFunction, useNavigate } from "react-router-dom";
import "../authentication.css";


type SignUpProps = {
  setControls: React.Dispatch<React.SetStateAction<string>>;
}

const SignUp: React.FC<SignUpProps> = ({ setControls }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <button
        className="button"
        type="submit"
        onClick={() => setControls("login")}>
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