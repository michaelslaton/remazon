import MessageOfTheDay from "./components/message-of-the-day/MessageOfTheDay";
import MostRecentEmployee from "./components/most-recent-employee/MostRecentEmployee";
import MostRecentProject from "./components/most-recent-project/MostRecentProject";
import Divider from "../../utils/divider/Divider";
import "./homePage.css";

const HomePage: React.FC = () => {

  return (
    <>
      <MessageOfTheDay />
      <div className="most-recent-container">
        <Divider grey={true}/>
        <div className="most-recent-wrapper">
          <MostRecentEmployee/>
          <Divider vertical={true}/>
          <MostRecentProject/>
        </div>
      </div>
    </>
  );
};

export default HomePage;