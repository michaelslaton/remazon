import { act, render, screen, userEvent } from '../../utils/testUtils/test-utils';
import AwardsDisplay from './AwardsDisplay';
import store from '../../redux/store';
import { fetchAwardsThunk } from '../../redux/slices/awardsSlice';
import { BrowserRouter } from 'react-router-dom';
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { awardsDummyData } from '../../test/mocks/handlers';
import Award from './award-component/Award';

const awardData = awardsDummyData.data;

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


describe('Awards', ()=>{
  describe('Awards Display', ()=>{
    it('renders all elements correctly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const header = screen.getByRole('heading', { name: 'Awards' });
      const sortSelection = screen.queryByRole('combobox');
      const awardsWrapper = screen.getByTestId('award cards wrapper');
      const newAwardButton = screen.queryByTestId('create award button');

      expect(header).toBeVisible();
      expect(sortSelection).toBeVisible();
      expect(sortSelection?.childElementCount).toBe(7);
      expect(newAwardButton).not.toBeInTheDocument();
      expect(awardsWrapper).toBeVisible();
      expect(awardsWrapper.childElementCount).toBe(3);
    });

    it('renders New Award button when logged in as an admin', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const newAwardButton = screen.getByTestId('create award button');

      expect(newAwardButton).toBeVisible();
    });

    it('useNavigate is called when the New Award button is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const newAwardButton = screen.getByTestId('create award button');
      
      await user.click(newAwardButton);
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });

  describe('Award', ()=>{
    it('renders all elements correctly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });
      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const title = screen.getByText('Drift Belt');
      const type = screen.getByText('Type:');
      const typeValue = screen.getByText('belt');
      const awardedTo = screen.getByText('Awarded to:');
      const awardedToValue = screen.getByText('Bueno');
      const awardedFor = screen.getByText('Awarded for:');
      const awardedForValue = screen.getByText('The perfect driiiiift! Yeeeh');
      const editAwardButton = screen.queryByTestId('edit award button');

      expect(title).toBeVisible();
      expect(type).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(awardedTo).toBeVisible();
      expect(awardedToValue).toBeVisible();
      expect(awardedFor).toBeVisible();
      expect(awardedForValue).toBeVisible();
      expect(editAwardButton).not.toBeInTheDocument();
    });

    it('edit award button to be visible if the user is the ceo', async()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const editAwardButton = screen.getByTestId('edit award button');

      expect(editAwardButton).toBeVisible();
    });

    it('useNavigate to be called when edit award button is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const editAwardButton = screen.getByTestId('edit award button');

      await user.click(editAwardButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});