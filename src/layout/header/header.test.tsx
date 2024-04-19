import { fetchCurrentEmployeeThunk, clearCurrentEmployee } from "../../redux/slices/employeesSlice";
import store from "../../redux/store";
import { render, screen, act } from "../../utils/testUtils/test-utils";
import UserDisplay from "./user-display/UserDisplay";
import { BrowserRouter } from "react-router-dom";

describe('Header', ()=>{
  describe('User Display', ()=>{
    it('renders all elements properly', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'))
      });
      render(
        <BrowserRouter>
          <UserDisplay/>
        </BrowserRouter>
      );
      const rembo = screen.getByText('Rembo');
      const notificationsButton = screen.getByTestId('notifications button');

      expect(rembo).toBeVisible();
      expect(notificationsButton).toBeVisible();
      store.dispatch(clearCurrentEmployee());
      await store.dispatch(fetchCurrentEmployeeThunk('2'));
  
      const bueno = screen.getByText('Bueno');

      expect(rembo).not.toBeVisible();
      expect(bueno).toBeInTheDocument();
    });
  
    it('invisible if not logged in', async ()=>{
      store.dispatch(clearCurrentEmployee());
      render(
        <BrowserRouter>
          <UserDisplay/>
        </BrowserRouter>
      );
      
      const notificationsButton = screen.queryByTestId('notifications button');
      expect(notificationsButton).not.toBeInTheDocument();
    });
  
  });
});