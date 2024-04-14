import { act, render, screen } from "../../utils/testUtils/test-utils";
import AwardsDisplay from "./AwardsDisplay";
import store from "../../redux/store";
import { fetchAwardsThunk } from "../../redux/slices/awardsSlice";
import { BrowserRouter } from "react-router-dom";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";
import { awardsDummyData } from "../../test/mocks/handlers";
import Award from "./award-component/Award";


describe('Awards', ()=>{
  describe('Awards Display', ()=>{
    it('renders all elements correctly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchEmployeesListThunk());
      });
      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const awardsWrapper = screen.getByTestId('award cards wrapper');
      const rembo = screen.getByText('Rembo');
  
      expect(awardsWrapper).toBeVisible();
      expect(awardsWrapper.childElementCount).toBe(3);
      expect(rembo).toBeVisible();
    });
  });

  describe("Award", ()=>{
    it('renders all elements correctly', ()=>{
      const awardData = awardsDummyData.data;
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

      expect(title).toBeVisible();
      expect(type).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(awardedTo).toBeVisible();
      expect(awardedToValue).toBeVisible();
      expect(awardedFor).toBeVisible();
      expect(awardedForValue).toBeVisible();
    })
  })
});