import { BrowserRouter } from "react-router-dom";
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import store from "../../redux/store";
import { act, render, screen, userEvent } from "../../utils/testUtils/test-utils";
import EmployeesDisplay from "./EmployeesDisplay";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import { employeesDummyData } from "../../test/mocks/handlers";
import Employee from "./employee-component/Employee";
import EditEmployee from "./employee-component/EditEmployee";
import * as controlActions from '../../redux/slices/controlsSlice';
import * as employeeActions from '../../redux/slices/employeesSlice';

const setUiErrorSpy = vi.spyOn(controlActions, 'setUiError');
const editEmployeeSpy = vi.spyOn(employeeActions, 'editEmployeeThunk');

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

    it('renders all elements properly if no employees exist', async ()=>{
      render(
        <BrowserRouter>
          <EmployeesDisplay/>
        </BrowserRouter>
      );

      const header = screen.getByRole('heading', { name:'Employee Directory' });
      const noEmployees = screen.getByText('No Employees to display.')

      expect(header).toBeVisible();
      expect(noEmployees).toBeVisible();      
    });

    it('renders all elements properly if employees exist', async ()=>{
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

  describe('Edit Employee', ()=>{

    it('renders all elements properly when user is logged in', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Edit Bueno' });
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const birthdayBox = screen.getByTestId('employee birthday box');
      const aliasDisplay = screen.getByTestId('alias display');
      const aliasDeleteButton = screen.queryAllByTestId('alias delete button');
      const alias = screen.getByText('Egg');
      const aliasInputBox = screen.getByRole('textbox', { name: 'aliases' });
      const addaliasButton = screen.getByTestId('add alias button');
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });
      const descriptionLengthText = screen.getByText('6 of 100');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(title).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(nameBox).toHaveValue('Bueno');
      expect(birthdayBox).toBeVisible();
      expect(aliasDisplay).toBeVisible();
      expect(aliasDisplay.childElementCount).toBe(1);
      expect(aliasDeleteButton).toHaveLength(1);
      expect(alias).toBeVisible();
      expect(aliasInputBox).toBeVisible();
      expect(addaliasButton).toBeVisible();
      expect(descriptionBox).toBeVisible();
      expect(descriptionBox).toHaveValue('Egg!!!');
      expect(descriptionLengthText).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });

    it('renders rank input if an admin is logged in', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );

      const rankInput = screen.getByRole('combobox', { name: 'Rank:' });
      const deactivatedRank = screen.getByRole('option', { name: 'Deactivated' });
      const weeboRank = screen.getByRole('option', { name: 'Weebo' });

      expect(rankInput).toBeVisible();
      expect(rankInput.childElementCount).toBe(2);
      expect(deactivatedRank).toBeVisible();
      expect(weeboRank).toBeVisible();
    });

    it('adds an alies when one is entered and the add button is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );
      
      const user = userEvent.setup();
      const aliasDisplay = screen.getByTestId('alias display');
      const aliasInputBox = screen.getByRole('textbox', { name: 'aliases' });
      const addaliasButton = screen.getByTestId('add alias button');

      expect(aliasDisplay.childElementCount).toBe(1);
      aliasInputBox.focus();
      await user.keyboard('New Alias');
      expect(aliasInputBox).toHaveValue('New Alias');
      await user.click(addaliasButton);
      expect(aliasDisplay.childElementCount).toBe(2);

      const newAlias = screen.getByText('New Alias');
      expect(newAlias).toBeVisible();
    });

    it('useNavigate is called when cancel is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      await user.click(cancelButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });

    it('setUiError is called when no changes are made and Submit is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await user.click(submitButton);
      
      expect(setUiErrorSpy).toHaveBeenCalled();
    });

    it('editEmployeeThunk is called when changes are made and Submit is clicked', async ()=>{
      await act(async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditEmployee/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });

      descriptionBox.focus();
      expect(descriptionBox).toHaveFocus();
      await user.clear(descriptionBox);
      expect(descriptionBox).toHaveValue('');
      await user.keyboard('King of Eggs! Egg Lord!');
      expect(descriptionBox).toHaveValue('King of Eggs! Egg Lord!');

      await user.click(submitButton);

      expect(editEmployeeSpy).toHaveBeenCalled();
    });
  });
});