import { BrowserRouter } from "react-router-dom";
import { act, cleanup, render, screen } from "../../utils/testUtils/test-utils";
import ProjectsDisplay from "./ProjectsDisplay";
import store from "../../redux/store";
import { fetchProjectsThunk } from "../../redux/slices/projectsSlice";
import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { projectsDummyData } from "../../test/mocks/handlers";
import ProjectType from "../../types/project.type";
import Project from "./project-component/Project";

describe("Projects", ()=>{
  describe("Projects Display",()=>{
    it("renders all elements correctly", async ()=>{
      render(
        <BrowserRouter>
          <ProjectsDisplay/>
        </BrowserRouter>
      );

      const title = screen.getByRole("heading", { name: "Projects" });
      const sortBy = screen.getByTestId("projects sort");
      const sortOptionAlphabetical = screen.getByRole("option", { name: "Alphabetical" });
      const sortOptionPlaceHolder = screen.getByRole("option", { name: "Sort By" });
      const sortOptionHost = screen.getByRole("option", { name: "Host" });
      const deactivatedBox = screen.getByTestId("deactivated checkbox");
      const noProjects = screen.getByText('No projects to show.')

      expect(title).toBeVisible();
      expect(sortBy).toBeVisible();
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
      const specialEventList = screen.getByTestId('special event list');
      const reoccuringEventList = screen.getByTestId('recurring event list');
      const deactivatedList = screen.queryByTestId('deactivated event list');
      const newEventButton = screen.getByTestId('new event button');
      const specialEventsTitle = screen.getByRole('heading', { name: 'Special Events...'});
      const recurringEventsTitle = screen.getByRole('heading', { name: 'Recurring Events...'});
      
      expect(noProjects).not.toBeVisible();
      expect(newEventButton).toBeVisible();
      expect(specialEventsTitle).toBeVisible();
      expect(recurringEventsTitle).toBeVisible();
      expect(specialEventList).toBeVisible();
      expect(reoccuringEventList).toBeVisible();
      expect(deactivatedList).not.toBeInTheDocument();
      expect(specialEventList.childElementCount).toBe(1);
      expect(reoccuringEventList.childElementCount).toBe(2);
    });
  });

  describe("Project", ()=>{
    const projects: ProjectType[] = projectsDummyData.data;

    it('renders all elements correctly', async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchProjectsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Project data={projects[0]}/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: "Movie Night" });
      const host = screen.getByText('Host:');
      const hostName = screen.queryAllByText('Rembo');
      const date = screen.getByText('Date:');
      const dateValue = screen.getByText('January 25');
      const time = screen.getByText('Time:');
      const timeValue = screen.getByText('12:00 AM');
      const type = screen.getByText('Type:');
      const typeValue = screen.getByText('Watch Night');
      const confirmed = screen.getByText('Confirmed Attending:');
      const description = screen.getByText('Description:');
      const descriptionValue = screen.getByText('Movie watch nights');
      const minusButton = screen.queryByTestId('attend button minus');
      const plusButton = screen.queryByTestId('attend button plus');

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
      expect(description).toBeVisible();
      expect(descriptionValue).toBeVisible();
      expect(minusButton).not.toBeInTheDocument();
      expect(plusButton).not.toBeInTheDocument();
    })
  })
});