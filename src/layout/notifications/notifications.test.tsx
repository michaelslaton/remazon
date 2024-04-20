import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { fetchNotificationsThunk } from "../../redux/slices/notificationsSlice";
import store from "../../redux/store";
import { render, screen, act, userEvent } from "../../utils/testUtils/test-utils";
import NotificationsDisplay from "./NotificationsDisplay";
import * as notificationActions from '../../redux/slices/notificationsSlice';

const removeNotificationThunkSpy = vi.spyOn(notificationActions, 'removeNotificationThunk');


describe('Notifications', ()=>{
  it('renders all elements properly with no notifications', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
      await store.dispatch(fetchNotificationsThunk('1'));
    });

    render(<NotificationsDisplay/>);

    const header = screen.getByRole('heading', { name: 'Notifications' });
    const noNotifications = screen.getByText('No notifications to display!');
    const notificationsList = screen.getByTestId('notifications list');
    const notificationDisplay = screen.getByTestId('notification display');

    expect(header).toBeVisible();
    expect(noNotifications).toBeVisible();
    expect(notificationsList).toBeVisible();
    expect(notificationDisplay).toBeVisible();
  });

  it('notifications list renders properly when there are notifications', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('2'));
      await store.dispatch(fetchNotificationsThunk('2'));
    });

    render(<NotificationsDisplay/>);

    const notificationsList = screen.getByTestId('notifications list');
    const title1 = screen.getByText('A Notification');
    const title2 = screen.getByText('New Project');

    expect(notificationsList.childElementCount).toBe(2);
    expect(title1).toBeVisible();
    expect(title2).toBeVisible();
  });

  it('renders all notification elements properly when a notification is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('2'));
      await store.dispatch(fetchNotificationsThunk('2'));
    });

    render(<NotificationsDisplay/>);

    const user = userEvent.setup();
    const title1 = screen.getByText('A Notification');

    await user.click(title1);

    const notificationTitle = screen.getByRole('heading', { name: 'A Notification' });
    const typeKey = screen.getByText('Type:');
    const typeValue = screen.getByText('admin');
    const messageKey = screen.getByText('Message:');
    const messageValue = screen.getByText('This is a notification');
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(notificationTitle).toBeVisible();
    expect(typeKey).toBeVisible();
    expect(typeValue).toBeVisible();
    expect(messageKey).toBeVisible();
    expect(messageValue).toBeVisible();
    expect(deleteButton).toBeVisible();
  });

  it('removeNotificationThunk is called when Delete is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('2'));
      await store.dispatch(fetchNotificationsThunk('2'));
    });

    render(<NotificationsDisplay/>);

    const user = userEvent.setup();
    const title1 = screen.getByText('A Notification');

    await user.click(title1);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    await user.click(deleteButton);

    expect(removeNotificationThunkSpy).toHaveBeenCalled();
  });
});