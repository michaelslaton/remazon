import { BrowserRouter } from "react-router-dom";
import { fetchMotdThunk } from "../../redux/slices/controlsSlice";
import store from "../../redux/store";
import { render, screen, act, userEvent } from "../../utils/testUtils/test-utils";
import MessageOfTheDay from "./components/message-of-the-day/MessageOfTheDay";
import MostRecentAward from "./components/most-recent/most-recent-award/MostRecentAward";
import { fetchAwardsThunk } from "../../redux/slices/awardsSlice";
import { clearEmployeeList, fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import MostRecentEmployee from "./components/most-recent/most-recent-employee/MostRecentEmployee";

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

describe('Home Page', ()=>{
  describe('Message of the Day', ()=>{
    it('renders all elements properly if there is no Motd', ()=>{
      render(
        <MessageOfTheDay/>
      );
      
      const defaultMessage = screen.getByRole('heading', { name: 'Welcome to Remazon Prime' });
      const heroBanner = screen.getByAltText('hero banner');
      
      expect(defaultMessage).toBeVisible();
      expect(heroBanner).toBeInTheDocument();
    });
    
    it('renders all elements properly if there is a Motd', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchMotdThunk());
      });
      
      render(
        <MessageOfTheDay/>
      );
      
      const messageFromTheBoss = screen.getByRole('heading', {name: 'A Message from the Boss!!' });
      const motd = screen.getByRole('heading', { name: '"This is a MOTD"' });
      const rembo = screen.getByRole('heading', { name: '- Rembo' });
      const heroBanner = screen.getByAltText('hero banner');
      
      expect(messageFromTheBoss).toBeVisible();
      expect(motd).toBeVisible();
      expect(rembo).toBeVisible();
      expect(heroBanner).toBeInTheDocument();
    });
  });
  
  describe('Most Recent Award', ()=>{
    it('renders nothing when there are no awards', ()=>{
      render(
        <BrowserRouter>
          <MostRecentAward/>
        </BrowserRouter>
      );
      
      const mostRecentWrapper = screen.queryByTestId('most recent wrapper');
      expect(mostRecentWrapper).not.toBeInTheDocument();
    });
    
    it('renders all elements properly when there are awards', async ()=>{
      await act( async ()=>{
        store.dispatch(fetchAwardsThunk());
        store.dispatch(fetchEmployeesListThunk());
      });
      
      render(
        <BrowserRouter>
          <MostRecentAward/>
        </BrowserRouter>
      );
      
      const mostRecentWrapper = screen.getByTestId('most recent award wrapper');
      const title = screen.getByRole('heading', { name: 'Face of the Business' });
      const awardedToKey = screen.getByText('Awarded To:');
      const awardedToValue = screen.getByText('Rembo');
      const typeKey = screen.getByText('Type:');
      const typeValue = screen.getByText('belt');
      const dateKey = screen.getByText('Date:');
      const dateValue = screen.getByText('March 5, 2024')
      
      expect(mostRecentWrapper).toBeVisible();
      expect(title).toBeVisible();
      expect(awardedToKey).toBeVisible();
      expect(awardedToValue).toBeVisible();
      expect(typeKey).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(dateKey).toBeVisible();
      expect(dateValue).toBeVisible();

    });
    
    it('useNavigate is called to /awards when clicked', async ()=>{
      await act( async ()=>{
        store.dispatch(fetchAwardsThunk());
        store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <MostRecentAward/>
        </BrowserRouter>
      );
      
      const user = userEvent.setup();
      const mostRecentWrapper = screen.getByTestId('most recent award wrapper');
      
      await user.click(mostRecentWrapper);
      
      expect(mockedUseNavigate).toHaveBeenCalledWith('/awards');
    });
  });
  
  describe('Most Recent Employee', ()=>{
    it('renders nothing when there are no employees', async ()=>{
      await act(async ()=>{
        store.dispatch(clearEmployeeList());
      });
      
      render(
        <BrowserRouter>
          <MostRecentEmployee/>
        </BrowserRouter>
      );

      const mostRecentWrapper = screen.queryByTestId('most recent employee wrapper');
      expect(mostRecentWrapper).not.toBeInTheDocument();
    });
    
    it('renders all elements properly', async ()=>{
      await act( async ()=>{
        store.dispatch(fetchRanksThunk());
        store.dispatch(fetchEmployeesListThunk());
      });
      
      render(
        <BrowserRouter>
          <MostRecentEmployee/>
        </BrowserRouter>
      );
      
      const title = screen.getByText('New Hire');
      const mostRecentWrapper = screen.getByTestId('most recent employee wrapper');
      const name = screen.getByRole('heading', { name: 'Bueno' });
      const rankKey = screen.getByText('Rank:');
      const rankValue = screen.getByText('Weebo');
      
      expect(title).toBeVisible();
      expect(mostRecentWrapper).toBeVisible();
      expect(name).toBeVisible();
      expect(rankKey).toBeVisible();
      expect(rankValue).toBeVisible();
    });

    it('useNavigate is called to /employees when clicked', async ()=>{
      await act( async ()=>{
        store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <MostRecentEmployee/>
        </BrowserRouter>
      );
      
      const user = userEvent.setup();
      const mostRecentWrapper = screen.getByTestId('most recent employee wrapper');
      
      await user.click(mostRecentWrapper);
      
      expect(mockedUseNavigate).toHaveBeenCalledWith('/employees');
    });
    
  });
});