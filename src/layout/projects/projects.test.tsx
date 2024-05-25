import { BrowserRouter } from 'react-router-dom';
import { act, render, screen, userEvent } from '../../utils/testUtils/test-utils';
import { projectsDummyData } from '../../test/mocks/handlers';
import ProjectsDisplay from './ProjectsDisplay';
import EditProject from './project-components/EditProject';
import store from '../../redux/store';
import { fetchProjectsThunk } from '../../redux/slices/projectsSlice';
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import * as projectActions from '../../redux/slices/projectsSlice';
import * as controlActions from '../../redux/slices/controlsSlice';
import CreateProject from './project-components/CreateProject';

const editProjectThunkSpy = vi.spyOn(projectActions, 'editProjectThunk');
const createProjectThunkSpy = vi.spyOn(projectActions, 'createProjectThunk');
const deleteProjectThunkSpy = vi.spyOn(projectActions, 'deleteProjectThunk');
const setUiErrorSpy = vi.spyOn(controlActions, 'setUiError');
const windowConfirmSpy = vi.spyOn(window, 'confirm');

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

describe('Projects', ()=>{
  describe('Projects Display',()=>{
    it('renders all elements properly if there are no projects', ()=>{
      render(
        <BrowserRouter>
          <ProjectsDisplay/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Projects' });
      const noProjects = screen.getByText('No Projects to display.')

      expect(title).toBeVisible();
      expect(noProjects).toBeVisible();
    })
    it('renders all elements properly if projects exist', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <ProjectsDisplay/>
        </BrowserRouter>
      );
      const sortBy = screen.getByTestId('projects sort');
      const specialEventList = screen.getByTestId('special event list');
      const reoccuringEventList = screen.getByTestId('recurring event list');
      const deactivatedList = screen.queryByTestId('deactivated event list');
      const newProjectButton = screen.getByTestId('new event button');
      const specialEventsTitle = screen.getByRole('heading', { name: 'Special Events...'});
      const recurringEventsTitle = screen.getByRole('heading', { name: 'Recurring Events...'});
      
      expect(sortBy).toBeVisible();
      expect(newProjectButton).toBeVisible();
      expect(specialEventsTitle).toBeVisible();
      expect(recurringEventsTitle).toBeVisible();
      expect(specialEventList).toBeVisible();
      expect(reoccuringEventList).toBeVisible();
      expect(deactivatedList).not.toBeInTheDocument();
      expect(specialEventList.childElementCount).toBe(1);
      expect(reoccuringEventList.childElementCount).toBe(2);
    });

    it('useNavigate is called when new project button is clicked', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <ProjectsDisplay/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const newProjectButton = screen.getByTestId('new event button');

      expect(newProjectButton).toBeVisible();

      await user.click(newProjectButton);
      expect(mockedUseNavigate).toHaveBeenCalled();
    })
  });

  describe('Edit Project', ()=>{
    it('renders all elements properly', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
      
      render(
        <BrowserRouter>
          <EditProject/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Edit Movie Night' });
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const typeBox = screen.getByRole('combobox', { name: 'Type:' });
      const hostBox = screen.getByRole('combobox', { name: 'Host:' });
      const rembo = screen.getByText('Rembo');
      const dateBox = screen.getByTestId('dateTime');
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });
      const checkbox = screen.getByRole('checkbox', { name: 'Active:' });
      const descCharCount = screen.getByText('18 of 200');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(title).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(nameBox).toHaveValue('Movie Night');
      expect(typeBox).toBeVisible();
      expect(typeBox).toHaveValue('Watch Night');
      expect(hostBox).toBeVisible();
      expect(hostBox).toHaveValue('1');
      expect(hostBox.childElementCount).toBe(2);
      expect(rembo).toBeVisible();
      expect(dateBox).toBeVisible();
      expect(dateBox).toHaveValue('2026-01-25T00:00');
      expect(descriptionBox).toBeVisible();
      expect(descriptionBox).toHaveValue('Movie watch nights');
      expect(checkbox).toBeVisible();
      expect(descCharCount).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });

    it('editProjectThunk to be called when info is edited and entered properly', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
      
      render(
        <BrowserRouter>
          <EditProject/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      expect(nameBox).toBeVisible();
      expect(nameBox).toHaveValue('Movie Night');
      expect(submitButton).toBeVisible();

      vi.clearAllMocks();

      nameBox.focus();
      user.clear(nameBox);
      await user.keyboard('Godzilla V Kong');
      expect(nameBox).toHaveValue('Godzilla V Kong');

      expect(editProjectThunkSpy).toHaveBeenCalledTimes(0);
      await user.click(submitButton);
      expect(editProjectThunkSpy).toHaveBeenCalledTimes(1);
    });

    it('setUiError to have been called when info is edited or entered wrong', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
      
      render(
        <BrowserRouter>
          <EditProject/>
        </BrowserRouter>
      );

      vi.clearAllMocks();

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      expect(submitButton).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(descriptionBox).toBeVisible();

      expect(setUiErrorSpy).toHaveBeenCalledTimes(0);
      await user.click(submitButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(1);

      user.clear(nameBox);
      await user.click(submitButton);
      expect(setUiErrorSpy).toHaveBeenCalledTimes(2);
    });

    it('useNavigate to be called when cancel is clicked', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
      
      render(
        <BrowserRouter>
          <EditProject/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(cancelButton).toBeVisible();

      await user.click(cancelButton);
      expect(mockedUseNavigate).toHaveBeenCalled();
    })
  });

  describe('Create Project', ()=>{
    it('renders all elements properly',()=>{
      render(
        <CreateProject/>
      );

      const title = screen.getByRole('heading', { name: 'Create Project' });
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const dateBox = screen.getByLabelText(/date:/i);
      const typeBox = screen.getByRole('combobox', { name: 'Type:' });
      const gameNightOption = screen.getByRole('option', { name: 'Game Night' });
      const watchNightOption = screen.getByRole('option', { name: 'Watch Night' });
      const socialOption = screen.getByRole('option', { name: 'Social Gathering' });
      const rwfOption = screen.getByRole('option', { name: 'RWF' });
      const otherOption = screen.getByRole('option', { name: 'Other' });
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });
      const charCount = screen.getByText('0 of 200');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(title).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(dateBox).toBeVisible();
      expect(typeBox).toBeVisible();
      expect(typeBox.childElementCount).toBe(5);
      expect(gameNightOption).toBeVisible();
      expect(watchNightOption).toBeVisible();
      expect(socialOption).toBeVisible();
      expect(rwfOption).toBeVisible();
      expect(otherOption).toBeVisible();
      expect(descriptionBox).toBeVisible();
      expect(charCount).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });

    it('setUiError is called if all fields are not filled properly and submit is clicked', async ()=>{
      render(
        <CreateProject/>
      );

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await user.click(submitButton);

      expect(setUiErrorSpy).toHaveBeenCalled();
    });

    it('useNavigate to be called if cancel is clicked', async ()=>{
      render(
        <CreateProject/>
      );

      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      await user.click(cancelButton);

      expect(mockedUseNavigate).toHaveBeenCalledWith('/projects');
    });

    it('createProjectThunk is called when fields are entered correctly', async ()=>{
      render(
        <CreateProject/>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const dateBox = screen.getByLabelText(/date:/i);
      const descriptionBox = screen.getByRole('textbox', { name: 'Description:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      nameBox.focus();
      await user.keyboard('Lets Play Lethal Company');
      dateBox.focus();
      await user.keyboard('2500-02-01');
      descriptionBox.focus();
      await user.keyboard('Watch out for the Braken!');
      await user.click(submitButton);

      expect(createProjectThunkSpy).toHaveBeenCalled();
    });
  });

});