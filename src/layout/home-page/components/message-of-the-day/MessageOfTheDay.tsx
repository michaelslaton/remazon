import { useAppSelector } from "../../../../redux/hooks";
import "./messageOfTheDay.css";

const MessageOfTheDay: React.FC = () => {
  const motd = useAppSelector((state)=> state.mainControl.motd);

  return (
    <>
      {motd.length ? 
        <div className="motd__container">
          <div className="motd__wrapper">
            <div className="motd__a-message">
              A Message from the Boss!!
            </div>
            <div className="motd">
              "{motd}"
            </div>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
};

export default MessageOfTheDay;