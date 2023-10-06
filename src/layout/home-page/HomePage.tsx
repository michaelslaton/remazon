import { getAuth, signOut } from "firebase/auth";
import "./homePage.css";



const HomePage: React.FC = () => {
  const auth = getAuth();

  return (
    <>
      Some stuff <button onClick={()=> signOut(auth)}>Sign Out</button>
    </>
  );
};

export default HomePage;