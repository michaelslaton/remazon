import AdminMotd from './admin-motd/AdminMotd';
import AdminNotification from './admin-notification/AdminNotification';
import AdminRanks from './ranks/RanksDisplay';
import './adminPanel.css';
import CupcakeControl from './cupcake-control/CupcakeControl';

const AdminPanel: React.FC = () => {

return (
  <>
    <div className='display__header'>
      <h2>Admin Control Panel</h2>
    </div>
    <div className='display__controls'/>
    <div className='admin-widgets__container '>
      <div className='admin-widgets__center'>
        <AdminMotd/>
        <AdminRanks/>
        <CupcakeControl/>
        <AdminNotification/>
      </div>
    </div>
  </>
);
};

export default AdminPanel;