import { BrowserRouter } from "react-router-dom";
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import store from "../../redux/store";
import { act, render, screen, userEvent } from "../../utils/testUtils/test-utils";
import EmployeesDisplay from "./EmployeesDisplay";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { employeesDummyData } from "../../test/mocks/handlers";
import Employee from "./employee-component/Employee";
import EditEmployee from "./employee-component/EditEmployee";

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useParams: () => ({ paramId: '2' }),
  };
});

describe('Employees', ()=>{
  describe('Employees Display', ()=>{
    it('renders all elements properly', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchRanksThunk());
      });

      render(
        <BrowserRouter>
          <EmployeesDisplay/>
        </BrowserRouter>
      );

      const header = screen.getByRole('heading', { name:'Employee Directory' });
      const sort = screen.getByRole('combobox');
      const sortDefault = screen.getByRole('option', { name: 'Sort By' });
      const sortAlphabetical = screen.getByRole('option', { name: 'Alphabetical' });
      const sortRank = screen.getByRole('option', { name: 'Rank' });
      const deactivatedBox = screen.getByRole('checkbox');

      expect(header).toBeVisible();
      expect(sort).toBeVisible();
      expect(sortDefault).toBeVisible();
      expect(sortAlphabetical).toBeVisible();
      expect(sortRank).toBeVisible();
      expect(deactivatedBox).toBeVisible();
    });
  });

  describe('Employee', ()=>{
    const employeesData = employeesDummyData.data;

    it('renders all elements properly', ()=>{
      render(
        <BrowserRouter>
          <Employee data={employeesData[0]}/>
        </BrowserRouter>
      );

      const name = screen.getByRole('heading', { name: 'Rembo' });
      const rank = screen.getByRole('heading', { name: 'Ceo' });
      const bioKey = screen.getByText('Bio:');
      const bioValue = screen.getByText('Its Rembo!');
      const aliasKey = screen.getByText('Aliases:')
      const aliasList = screen.getByText('Tiffles, The Boss');
      const editButton = screen.queryByTestId('edit employee button');

      expect(name).toBeVisible();
      expect(rank).toBeVisible();
      expect(bioKey).toBeVisible();
      expect(bioValue).toBeVisible();
      expect(aliasKey).toBeVisible();
      expect(aliasList).toBeVisible();
      expect(editButton).not.toBeInTheDocument();
    });

    it('renders edit button when respective employee is logged in', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      })

      render(
        <BrowserRouter>
          <Employee data={employeesData[1]}/>
        </BrowserRouter>
      );

      const editButton = screen.queryByTestId('edit employee button');

      expect(editButton).toBeInTheDocument();
    });

    it('renders edit button on all employees when admin is logged in', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      })

      render(
        <BrowserRouter>
          <Employee data={employeesData[1]}/>
        </BrowserRouter>
      );

      const editButton = screen.queryByTestId('edit employee button');

      expect(editButton).toBeInTheDocument();
    });

    it('edit button is not rendered if not an admin and not the respective employee', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      })

      render(
        <BrowserRouter>
          <Employee data={employeesData[0]}/>
        </BrowserRouter>
      );

      const editButton = screen.queryByTestId('edit employee button');

      expect(editButton).not.toBeInTheDocument();
    });

    it('useNavigate is called when edit button is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });

      render(
        <BrowserRouter>
          <Employee data={employeesData[1]}/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const editButton = screen.getByTestId('edit employee button');

      await user.click(editButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});