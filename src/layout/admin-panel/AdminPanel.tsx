import AdminMotd from './admin-motd/AdminMotd';
import AdminNotification from './admin-notification/AdminNotification';
import './adminPanel.css';
import AdminRanks from './ranks/RanksDisplay';

const AdminPanel: React.FC = () => {

  return (
    <>
      <div className='display__header'>
        <h2>Admin Control Panel</h2>
      </div>
      <div className='display__controls'/>
      <div className='center-display-space'>
        <AdminMotd/>
        <AdminNotification/>
        <AdminRanks/>
      </div>
    </>
  );
};

export default AdminPanel;