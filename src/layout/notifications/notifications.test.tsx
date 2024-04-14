import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { fetchNotificationsThunk } from "../../redux/slices/notificationsSlice";
import store from "../../redux/store";
import { render, screen, act, userEvent } from "../../utils/testUtils/test-utils";
import NotificationsDisplay from "./NotificationsDisplay";


describe('Notifications', ()=>{
  describe('Notifications Display', ()=> {
  
    it('renders all base elements properly', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchNotificationsThunk('1'));
      });
  
      render(<NotificationsDisplay/>);
  
      const title = screen.getByRole('heading', {name:'Notifications'});
      const notificationsList = screen.getByTestId('notifications list');
      const notificationDisplay = screen.getByTestId('notification display');
      const noNotifications = screen.getByText('No notifications to display!');
  
      expect(title).toBeVisible();
      expect(notificationsList).toBeVisible();
      expect(notificationDisplay).toBeVisible();
      expect(noNotifications).toBeVisible();
  
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
        await store.dispatch(fetchNotificationsThunk('2'));
      });
    
      const firstNotification = screen.getByText('A Notification');
      const deleteButton = screen.queryByRole('button', {name:'Delete'});
      
      expect(noNotifications).not.toBeVisible();
      expect(firstNotification).toBeVisible();
      expect(deleteButton).not.toBeInTheDocument();
    });
  
    it('renders all notification components properly when a notification is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
        await store.dispatch(fetchNotificationsThunk('2'));
      });
  
      render(<NotificationsDisplay/>);
  
      const user = userEvent.setup();
      const firstNotification = screen.getByText('A Notification');
      let deleteButton = screen.queryByRole('button', {name:'Delete'});
      const notificationsList = screen.getByTestId('notifications list');
  
      expect(firstNotification).toBeVisible();
      expect(deleteButton).not.toBeInTheDocument();
      expect(notificationsList.childElementCount).toBe(2);
  
      await user.click(firstNotification);
      
      const firstNotificationTitle = screen.queryAllByText('A Notification');
      const type = screen.getByText('Type:');
      const message = screen.getByText('Message:');
      const typeValue = screen.getByText('admin');
      const messageValue = screen.getByText('This is a notification')
      deleteButton = screen.getByRole('button', {name:'Delete'});
  
      expect(firstNotificationTitle).toHaveLength(2);
      expect(type).toBeVisible();
      expect(message).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(messageValue).toBeVisible();
      expect(deleteButton).toBeVisible();
    });
  
    it('removes the notification when delete button is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
        await store.dispatch(fetchNotificationsThunk('2'));
      });
  
      render(<NotificationsDisplay/>);
  
      const user = userEvent.setup();
      const firstNotification = screen.getByText('A Notification');
      
      await user.click(firstNotification);
  
      const deleteButton = screen.getByRole('button', {name:'Delete'});
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toBeVisible();
  
      await user.click(deleteButton);
  
      expect(deleteButton).not.toBeInTheDocument();
      expect(deleteButton).not.toBeVisible();
    });
    
  });
});