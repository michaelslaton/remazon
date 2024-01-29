import AdminMotd from './admin-motd/AdminMotd';
import AdminNotification from './admin-notification/AdminNotification';
import './adminPanel.css';

const AdminPanel: React.FC = () => {

  return (
    <div className='center-display-space'>
      <AdminMotd/>
      <AdminNotification/>
    </div>
  );
};

export default AdminPanel;