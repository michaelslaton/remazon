import AdminMotd from './admin-motd/AdminMotd';
import AdminNotification from './admin-notification/AdminNotification';
import AdminRanks from './ranks/RanksDisplay';
import './adminPanel.css';

const AdminPanel: React.FC = () => {

  return (
    <>
      <div className='display__header'>
        <h2>Admin Control Panel</h2>
      </div>
      <div className='display__controls'/>
      <div className='display-admin-widgets'>
        <div className="admin-widget">
          <AdminMotd/>
        </div>
        <div className="admin-widget">
          <AdminRanks/>
        </div>
        <div className="admin-widget">
          <AdminNotification/>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;