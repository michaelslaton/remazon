import { useAppDispatch } from '../../../redux/hooks';
import { removeNotificationThunk } from '../../../redux/slices/notificationsSlice';
import NotificationType from '../../../types/notification.type';
import '../notifications.css';

type NotificationProps = {
  data: NotificationType;
  uid: string;
  action: Function;
};

const Notification: React.FC<NotificationProps> = ({ data, uid, action }) => {
  const dispatch = useAppDispatch();

  const deleteButtonHandler = (): void => {
    dispatch(removeNotificationThunk({uid, id: data.id}));
    action(null);
    return;
  };
  
  if (!data) return <>eh??</>
  else return (
    <div className='notification__wrapper'>
      <h2 className='title form-title'>{data.title}</h2>

      <ul className='notification__info-list'>
        <li>
          <div className='notification__info-key'>Type:</div><div className='notification__info-value'>{` ${data.type}`}</div>
        </li>
        <li>
          <div className='notification__info-key'>Message:</div>
          <p className='notification__info-value'>{` ${data.message}`}</p>
        </li>
      </ul>

      <div className='notification__buttons-wrapper'>
        <button
          className='notification__button delete'
          onClick={()=> deleteButtonHandler()}
        >
            Delete
        </button>
      </div>
      
    </div>
  );
};

export default Notification;