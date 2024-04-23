import { BrowserRouter } from "react-router-dom";
import { render, screen, userEvent } from "../testUtils/test-utils"
import Error404 from "./error404/Error404"
import RouteError from "./route-error/RouteError";

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useParams: () => ({ paramId: '1' }),
  };
});

describe('Errors', ()=>{
  describe('Error 404', ()=>{
    it('renders all elements properly', ()=>{
      render(
        <BrowserRouter>
          <Error404/>
        </BrowserRouter>
      );
    
      const fourOhFour = screen.getByRole('heading', { name: '404' });
      const notFound = screen.getByRole('heading', { name: 'Not Found' });
      const goHomeButton = screen.getByRole('button', { name: 'Go Home' });
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
    
      expect(fourOhFour).toBeVisible();
      expect(notFound).toBeVisible();
      expect(goHomeButton).toBeVisible();
      expect(goBackButton).toBeVisible();
    });
  
    it('useNavigate is called with "/" when go home is clicked', async ()=>{
      render(
        <BrowserRouter>
          <Error404/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();
      const goHomeButton = screen.getByRole('button', { name: 'Go Home' });
  
      await user.click(goHomeButton);
  
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  
    it('useNavigate is called with -1 when go back is clicked', async ()=>{
      render(
        <BrowserRouter>
          <Error404/>
        </BrowserRouter>
      );
  
      const user = userEvent.setup();
      const goBackButton = screen.getByRole('button', { name: 'Go Back' });
  
      await user.click(goBackButton);
  
      expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Route Error', ()=>{
    it('renders all elements properly', ()=>{
      render(
        <BrowserRouter>
          <RouteError/>
        </BrowserRouter>
      );

      const wentWrong = screen.getByRole('heading', { name: 'Something went wrong...' });
      const pleaseRefresh = screen.getByRole('heading', { name: 'Please refresh the page...' });
      const refreshButton = screen.getByRole('button', { name: 'Refresh' });

      expect(wentWrong).toBeVisible();
      expect(pleaseRefresh).toBeVisible();
      expect(refreshButton).toBeVisible();
    });

    it('reload is called when Refresh is clicked', async ()=>{
      window.location = {
        ...window.location,
        reload: vi.fn()
      };

      render(
        <BrowserRouter>
          <RouteError/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const refreshButton = screen.getByRole('button', { name: 'Refresh' });

      await user.click(refreshButton);

      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});