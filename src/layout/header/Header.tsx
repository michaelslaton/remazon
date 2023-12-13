import Authentication from "../authentication/Authentication";
import ErrorDisplay from "./error-display/ErrorDisplay";
import Divider from "../../utils/divider/Divider";
import "./header.css";

const Header: React.FC = () => {

  return (
    <>
      <div className="header__wrapper">
        <div>
          <h1 className="header__title">Remazon Prime</h1>
        </div>
        <div className="header__items">
          <Authentication/>
        </div>
      </div>
      <Divider/>
      <ErrorDisplay/>
    </>
  );
};

export default Header;