import { BrowserRouter } from 'react-router-dom';
import { act, render, screen, userEvent } from '../../utils/testUtils/test-utils';
import AdminNotification from './admin-notification/AdminNotification';
import store from '../../redux/store';
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { fetchNotificationsThunk } from '../../redux/slices/notificationsSlice';
import AdminMotd from './admin-motd/AdminMotd';
import * as notificationActions from '../../redux/slices/notificationsSlice';
import * as controlActions from '../../redux/slices/controlsSlice';
import * as ranksActions from '../../redux/slices/ranksSlice';
import RankType from "../../types/rank.type";
import Rank from "./ranks/rank-component/Rank";
import AdminPanel from './AdminPanel';
import AdminRanks from './ranks/RanksDisplay';
import { ranksDummyData } from "../../test/mocks/handlers";

const sendNotificationSpy = vi.spyOn(notificationActions, 'createNotificationThunk');
const setUiErrorSpy = vi.spyOn(controlActions, 'setUiError');
const updateMotdSpy = vi.spyOn(controlActions, 'updateMotdThunk');
const createRankThunkSpy = vi.spyOn(ranksActions, 'createRankThunk');

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Admin Panel', ()=>{
  describe('Admin Panel', ()=>{
    it('renders all elements properly', ()=>{
      render(
        <AdminPanel/>
      );

      const header = screen.getByRole('heading', { name: 'Admin Control Panel' });

      expect(header).toBeVisible();
    });
  });

  describe('Admin Notification', ()=>{
    it('all elements render correctly', ()=>{
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const title = screen.getByRole('heading', {
        name: 'Admin Notification'
      });
      const titleInput = screen.getByRole('textbox', {name: 'Title:'});
      const messageInput = screen.getByRole('textbox', {name:'Message:'});
      const moveLeftButton = screen.getByRole('button',{name:'<'});
      const moveAllLeftButton = screen.getByRole('button',{name:'<<'});
      const moveRightButton = screen.getByRole('button',{name:'>'});
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const notIncludedList = screen.getByTestId('not included');
      const includedList = screen.getByTestId('included');
      const clearButton = screen.getByRole('button',{name:'Clear'});
      const sendButton = screen.getByRole('button',{name:'Send'});
  
      expect(title).toBeVisible();
      expect(titleInput).toBeVisible();
      expect(messageInput).toBeVisible();
      expect(moveLeftButton).toBeVisible();
      expect(moveAllLeftButton).toBeVisible();
      expect(moveRightButton).toBeVisible();
      expect(moveAllRightButton).toBeVisible();
      expect(notIncludedList).toBeVisible();
      expect(includedList).toBeVisible();
      expect(clearButton).toBeVisible();
      expect(sendButton).toBeVisible();
    });
  
    it('lists not included employees properly', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const rembo = screen.getByText('Rembo');
      const bueno = screen.getByText('Bueno');
      const notIncludedList = screen.getByTestId('not included');
  
      expect(notIncludedList.childElementCount).toBe(2);
      expect(rembo).toBeVisible();
      expect(bueno).toBeVisible();
    });
  
    it('moves listing right when selected and move right is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();    
      const rembo = screen.getByText('Rembo');
      const moveRightButton = screen.getByRole('button',{name:'>'});
      const includedList = screen.getByTestId('included');
      const notIncludedList = screen.getByTestId('not included');

      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
  
      await user.click(rembo);
      await user.click(moveRightButton);
  
      expect(includedList.childElementCount).toBe(1);
      expect(notIncludedList.childElementCount).toBe(1);
    });
  
    it('moves listing left when selected and move left is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();    
      let rembo = screen.getByText('Rembo');
      const moveRightButton = screen.getByRole('button',{name:'>'});
      const moveLeftButton = screen.getByRole('button',{name:'<'});
      const includedList = screen.getByTestId('included');
      const notIncludedList = screen.getByTestId('not included');
      
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
  
      await user.click(rembo);
      await user.click(moveRightButton);
  
      expect(includedList.childElementCount).toBe(1);
      expect(notIncludedList.childElementCount).toBe(1);
  
      rembo = screen.getByText('Rembo');
      await user.click(rembo);
      await user.click(moveLeftButton);
  
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
    });
  
    it('moves all listings right when move all right is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const includedList = screen.getByTestId('included');
      const notIncludedList = screen.getByTestId('not included');
      
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
  
      await user.click(moveAllRightButton);
  
      expect(includedList.childElementCount).toBe(2);
      expect(notIncludedList.childElementCount).toBe(0);
    });
  
    it('moves all listings left when move all left is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const moveAllLeftButton = screen.getByRole('button',{name:'<<'});
      const includedList = screen.getByTestId('included');
      const notIncludedList = screen.getByTestId('not included');
      
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
  
      await user.click(moveAllRightButton);
  
      expect(includedList.childElementCount).toBe(2);
      expect(notIncludedList.childElementCount).toBe(0);
      
      await user.click(moveAllLeftButton);
      
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
    });
  
    it('form resets on hitting clear', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();
      const titleInput = screen.getByRole('textbox', {name: 'Title:'});
      const messageInput = screen.getByRole('textbox', {name:'Message:'});
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const notIncludedList = screen.getByTestId('not included');
      const includedList = screen.getByTestId('included');
      const clearButton = screen.getByRole('button',{name:'Clear'});
  
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
  
      await user.click(moveAllRightButton);
  
      expect(includedList.childElementCount).toBe(2);
      expect(notIncludedList.childElementCount).toBe(0);
  
      titleInput.focus();
      expect(titleInput).toHaveFocus();
      await user.keyboard('This is a title');
      expect(titleInput).toHaveValue('This is a title');
      
      messageInput.focus();
      expect(messageInput).toHaveFocus();
      await user.keyboard('This is a message');
      expect(messageInput).toHaveValue('This is a message');
  
      await user.click(clearButton);
      
      expect(includedList.childElementCount).toBe(0);
      expect(notIncludedList.childElementCount).toBe(2);
      expect(titleInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });

    it('createNotificationThunk is called when fields are properly filled out', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchNotificationsThunk('1'));
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const titleInput = screen.getByRole('textbox', {name: 'Title:'});
      const messageInput = screen.getByRole('textbox', {name:'Message:'});
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const sendButton = screen.getByRole('button',{name:'Send'});

      await user.click(moveAllRightButton);
      titleInput.focus();
      await user.keyboard('A Message Title');
      expect(titleInput).toHaveValue('A Message Title');
      messageInput.focus();
      await user.keyboard('A Message');
      expect(messageInput).toHaveValue('A Message');
      
      await user.click(sendButton);
      expect(sendNotificationSpy).toHaveBeenCalled();
    });

    it('setUiError is called when fields are not filled properly', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
      });
  
      render(
        <BrowserRouter>
          <AdminNotification/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const titleInput = screen.getByRole('textbox', {name: 'Title:'});
      const messageInput = screen.getByRole('textbox', {name:'Message:'});
      const moveAllRightButton = screen.getByRole('button',{name:'>>'});
      const sendButton = screen.getByRole('button',{name:'Send'});

      await user.click(sendButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(1);

      await user.click(moveAllRightButton);
      await user.click(sendButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(2);

      titleInput.focus();
      await user.keyboard('A Message Title');
      expect(titleInput).toHaveValue('A Message Title');
      await user.click(sendButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(3);
      user.clear(titleInput);
      messageInput.focus();
      await user.keyboard('A Message');
      expect(messageInput).toHaveValue('A Message');
      await user.click(sendButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(4);
    });
    
  });
  
  describe('Admin Motd', ()=>{
    it('renders all elements properly',()=>{
      render(
        <BrowserRouter>
          <AdminMotd/>
        </BrowserRouter>
      );
  
      const title = screen.getByRole('heading', { name: 'Message of the Day' });
      const messageInput = screen.getByRole('textbox');
      const clearButton = screen.getByRole('button', { name: 'Clear' });
      const saveButton = screen.getByRole('button', { name: 'Save' });
  
      expect(title).toBeVisible();
      expect(messageInput).toBeVisible();
      expect(clearButton).toBeVisible();
      expect(saveButton).toBeVisible();
    });
  
    it('textbox to be reset when Clear is clicked', async ()=>{
      render(
        <BrowserRouter>
          <AdminMotd/>
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const messageInput = screen.getByRole('textbox');
      const clearButton = screen.getByRole('button', {
        name: 'Clear'
      });
  
      messageInput.focus();
      expect(messageInput).toHaveFocus();
      await user.keyboard('hello');
      expect(messageInput).toHaveValue('hello');
      await user.click(clearButton);
      expect(messageInput).toHaveValue('');
    });

    it('updateMotdThunk is called when fields are filled properly', async ()=>{
      render(
        <BrowserRouter>
          <AdminMotd/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const messageInput = screen.getByRole('textbox');
      const saveButton = screen.getByRole('button', { name: 'Save' });

      messageInput.focus();
      await user.keyboard('An Motd')
      await user.click(saveButton);
      expect(updateMotdSpy).toHaveBeenCalled();
    });

    it('setUiError is called when fields are not filled properly', async ()=>{
      render(
        <BrowserRouter>
          <AdminMotd/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const saveButton = screen.getByRole('button', { name: 'Save' });

      await user.click(saveButton);
      expect(setUiErrorSpy).toHaveBeenCalled();
    });
  
  });

  describe('Ranks', ()=>{
    describe('Admin Ranks', ()=>{
      it('renders all elements properly', async ()=>{
        await act( async ()=>{
          await store.dispatch(fetchCurrentEmployeeThunk('1'));
          await store.dispatch(fetchRanksThunk());
        });
    
        render(<AdminRanks/>);
    
        const title = screen.getByRole('heading', { name: 'Rank List' });
        const ceo = screen.getByText('Ceo');
        const weebo = screen.getByText('Weebo');
        const deactivated = screen.queryByText('Deactivated');
        const addRankButton = screen.getByTestId('add rank');
    
        expect(title).toBeVisible();
        expect(ceo).toBeVisible();
        expect(weebo).toBeVisible();
        expect(deactivated).not.toBeInTheDocument();
        expect(addRankButton).toBeVisible();
      });
    });
    
    describe('Rank', ()=>{
      beforeEach( async ()=>{
        await act( async ()=>{
          await store.dispatch(fetchCurrentEmployeeThunk('1'));
        });
      });
      const ranks: RankType[] = ranksDummyData.data;
        
      it('renders display elements properly', async ()=>{
        render(<Rank rankData={ranks[1]}/>);
    
        const title = screen.getByText('Ceo');
        const editButton = screen.getByTestId('rank-edit-button');
        const deleteButton = screen.queryByTestId('rank-delete-button');
  
        expect(title).toBeVisible();
        expect(editButton).toBeVisible();
        expect(deleteButton).not.toBeInTheDocument();
      });
    
      it('switches to edit mode properly', async ()=>{
        render(<Rank rankData={ranks[1]}/>);
        const user = userEvent.setup();
    
        const editButton = screen.getByTestId('rank-edit-button');
  
        expect(editButton).toBeVisible();
    
        await user.click(editButton);
    
        const titleBox = screen.getByLabelText(/title :/i);
  
        expect(editButton).not.toBeVisible();
        expect(titleBox).toBeVisible();
      })
    
      it('renders edit elements properly', async ()=>{
        render(<Rank rankData={ranks[1]}/>);
  
  
        const user = userEvent.setup();
    
        const editButton = screen.getByTestId('rank-edit-button');
  
        expect(editButton).toBeVisible();
    
        await user.click(editButton);
    
        const titleBox = screen.getByLabelText(/title :/i);
        const colorBox = screen.getByLabelText(/color :/i);
        const saveButton = screen.getByTestId('rank-save-button');
        const cancelButton = screen.getByTestId('rank-cancel-button');
  
        expect(titleBox).toBeVisible();
        expect(titleBox).toHaveValue('Ceo');
        expect(colorBox).toBeVisible();
        expect(colorBox).toHaveValue('#00c8d6');
        expect(saveButton).toBeVisible();
        expect(cancelButton).toBeVisible();
      });
  
    });
  
    describe('New Rank', ()=>{
      it('renders New Rank form when the add rank button is clicked', async ()=>{  
        render(<AdminRanks/>);
        
        const user = userEvent.setup();
        const addRankButton = screen.getByTestId('add rank');
  
        await user.click(addRankButton);
  
        const titleBox = screen.getByRole('textbox', { name: 'Title:' })
  
        expect(titleBox).toBeVisible();
      });
  
      it('renders all elements properly', async ()=>{
        render(<AdminRanks/>);
        
        const user = userEvent.setup();
        const addRankButton = screen.getByTestId('add rank');
  
        await user.click(addRankButton);
  
        const titleBox = screen.getByRole('textbox', { name: 'Title:' });
        const colorBox = screen.getByLabelText(/color:/i);
        const submitRankButton = screen.getByTestId('submit rank button');
        const cancelRankButton = screen.getByTestId('cancel new rank');
  
        expect(titleBox).toBeVisible();
        expect(colorBox).toBeVisible();
        expect(colorBox).toHaveValue('#ffa500');
        expect(submitRankButton).toBeVisible();
        expect(cancelRankButton).toBeVisible();
      });
  
      it('new rank form to unrender if cancel is clicked', async ()=>{
        render(<AdminRanks/>);
        
        const user = userEvent.setup();
        const addRankButton = screen.getByTestId('add rank');
        
        await user.click(addRankButton);
  
        const cancelRankButton = screen.getByTestId('cancel new rank');
        const titleBox = screen.getByRole('textbox', { name: 'Title:' });
        expect(titleBox).toBeVisible();
  
        await user.click(cancelRankButton);
  
        expect(titleBox).not.toBeVisible();
      });
  
      it('createRankThunk is called when fields are filled out properly and save button is clicked', async ()=>{
        render(<AdminRanks/>);
        
        const user = userEvent.setup();
        const addRankButton = screen.getByTestId('add rank');
        
        await user.click(addRankButton);
  
        const titleBox = screen.getByRole('textbox', { name: 'Title:' });
  
        titleBox.focus();
        await user.keyboard('Egg Rank');
        expect(titleBox).toHaveValue('Egg Rank');
  
        const submitRankButton = screen.getByTestId('submit rank button');
  
        await user.click(submitRankButton);
  
        expect(createRankThunkSpy).toHaveBeenCalled();
      });
  
      it('setUiError is called when fields are not filled properly', async ()=>{
        render(<AdminRanks/>);
        
        const user = userEvent.setup();
        const addRankButton = screen.getByTestId('add rank');
        
        await user.click(addRankButton);
  
        const submitRankButton = screen.getByTestId('submit rank button');
  
        await user.click(submitRankButton);
  
        expect(setUiErrorSpy).toHaveBeenCalled();
      });
    });
  });
});