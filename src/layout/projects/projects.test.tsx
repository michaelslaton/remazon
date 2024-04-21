import { BrowserRouter } from 'react-router-dom';
import { act, cleanup, render, screen, userEvent } from '../../utils/testUtils/test-utils';
import { projectsDummyData } from '../../test/mocks/handlers';
import ProjectType from '../../types/project.type';
import ProjectsDisplay from './ProjectsDisplay';
import Project from './project-component/Project';
import EditProject from './project-component/EditProject';
import store from '../../redux/store';
import { fetchProjectsThunk } from '../../redux/slices/projectsSlice';
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import * as projectActions from '../../redux/slices/projectsSlice';
import * as controlActions from '../../redux/slices/controlsSlice';

const editProjectThunkSpy = vi.spyOn(projectActions, 'editProjectThunk');
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
    it('renders all elements properly', async ()=>{
      render(
        <BrowserRouter>
          <ProjectsDisplay/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Projects' });
      const sortOptionAlphabetical = screen.getByRole('option', { name: 'Alphabetical' });
      const sortOptionPlaceHolder = screen.getByRole('option', { name: 'Sort By' });
      const sortOptionHost = screen.getByRole('option', { name: 'Host' });
      const deactivatedBox = screen.getByTestId('deactivated checkbox');
      const noProjects = screen.getByText('No projects to show.')

      expect(title).toBeVisible();
      expect(sortOptionAlphabetical).toBeVisible();
      expect(sortOptionPlaceHolder).toBeVisible();
      expect(sortOptionHost).toBeVisible();
      expect(deactivatedBox).toBeVisible();
      expect(noProjects).toBeVisible();

      cleanup();

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
      
      expect(noProjects).not.toBeVisible();
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

  describe('Project', ()=>{
    const projects: ProjectType[] = projectsDummyData.data;

    it('renders all elements properly (admin viewing project)', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[1]}/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Hunt Event' });
      const host = screen.getByText('Host:');
      const hostName = screen.queryAllByText('Bueno');
      const secondAttending = screen.getByText('Rembo');
      const date = screen.getByText('Date:');
      const dateValue = screen.getByText('March 25');
      const time = screen.getByText('Time:');
      const timeValue = screen.getByText('1:00 AM');
      const type = screen.getByText('Type:');
      const typeValue = screen.getByText('Game Night');
      const confirmed = screen.getByText('Confirmed Attending:');
      const description = screen.getByText('Description:');
      const descriptionValue = screen.getByText('Lets do the current hunt event');
      const minusButton = screen.queryByTestId('attend button minus');
      const plusButton = screen.queryByTestId('attend button plus');
      const deleteButton = screen.getByTestId('delete button');
      const editButton = screen.getByTestId('edit button');

      expect(title).toBeVisible();
      expect(host).toBeVisible();
      expect(hostName).toHaveLength(2);
      expect(date).toBeVisible();
      expect(dateValue).toBeVisible();
      expect(time).toBeVisible();
      expect(timeValue).toBeVisible();
      expect(type).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(confirmed).toBeVisible();
      expect(secondAttending).toBeVisible();
      expect(description).toBeVisible();
      expect(descriptionValue).toBeVisible();
      expect(minusButton).toBeVisible();
      expect(plusButton).not.toBeInTheDocument();
      expect(deleteButton).toBeVisible();
      expect(editButton).toBeVisible();
    });

    it('renders all elements properly (admin viewing self made project)', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[0]}/>
        </BrowserRouter>
      );

      const minusButton = screen.queryByTestId('attend button minus');
      const plusButton = screen.queryByTestId('attend button plus');
      const deleteButton = screen.getByTestId('delete button');
      const editButton = screen.getByTestId('edit button');
      
      expect(minusButton).not.toBeInTheDocument();
      expect(plusButton).not.toBeInTheDocument();
      expect(deleteButton).toBeVisible();
      expect(editButton).toBeVisible();
    });

    it('calls useNavigate when edit button is clicked', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[0]}/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const editButton = screen.getByTestId('edit button');

      await user.click(editButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });

    it('populates a confirm window on deleteButton click', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[0]}/>
        </BrowserRouter>
      );

      const deleteButton = screen.getByTestId('delete button');
      const user = userEvent.setup();

      expect(deleteButton).toBeVisible();
      await user.click(deleteButton);
      expect(windowConfirmSpy).toHaveBeenCalled();
    });

    it('deletePRojectTunk is called when confirm is clicked', async ()=>{
      vi.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);

      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[0]}/>
        </BrowserRouter>
      );

      const deleteButton = screen.getByTestId('delete button');
      const user = userEvent.setup();

      expect(deleteButton).toBeVisible();

      await user.click(deleteButton);
      expect(deleteProjectThunkSpy).toHaveBeenCalled();
    });

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

});