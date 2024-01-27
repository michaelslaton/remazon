// import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import NotificationType from '../../../types/notificationType';
import '../notifications.css';

type NotificationProps = {
  data: NotificationType | null;
};

const Notification: React.FC<NotificationProps> = ({ data = null }) => {
  // const dispatch = useAppDispatch();

  
  if(!data) return <>eh??</>
  else return (
    <div className='notification__wrapper'>
      <div>
        {data.title}
      </div>
      <div>
        {data.type}
      </div>
      <p>
        {data.message}
      </p>
    </div>
  );
};

export default Notification;