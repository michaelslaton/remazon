import { fetchCurrentEmployeeThunk, clearCurrentEmployee } from "../../redux/slices/employeesSlice";
import store from "../../redux/store";
import { render, screen, act, cleanup, userEvent } from "../../utils/testUtils/test-utils";
import Header from "./Header";
import UserDisplay from "./user-display/UserDisplay";
import { BrowserRouter } from "react-router-dom";

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

describe('Header', ()=>{
  describe('Title', ()=>{
    it('renders all elements properly', ()=>{
      render(
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
      );

      const remazon = screen.getByText('Remazon');
      const prime = screen.getByText('Prime');

      expect(remazon).toBeVisible();
      expect(prime).toBeVisible();
    });
  });

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

      cleanup()
      
      await act( async ()=>{
        await store.dispatch(clearCurrentEmployee());
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });
  
      render(
        <BrowserRouter>
          <UserDisplay/>
        </BrowserRouter>
      );

      const bueno = screen.getByText('Bueno');

      expect(rembo).not.toBeVisible();
      expect(bueno).toBeInTheDocument();
    });
  
    it('invisible if not logged in', async ()=>{
      act(()=>{
        store.dispatch(clearCurrentEmployee());
      });
      render(
        <BrowserRouter>
          <UserDisplay/>
        </BrowserRouter>
      );
      
      const notificationsButton = screen.queryByTestId('notifications button');

      expect(notificationsButton).not.toBeInTheDocument();
    });

    it('useNavigate is called when notifications button is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'))
      });

      render(
        <BrowserRouter>
          <UserDisplay/>
        </BrowserRouter>
      );
      const user = userEvent.setup();
      const notificationsButton = screen.getByTestId('notifications button');

      await user.click(notificationsButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  
  });
});