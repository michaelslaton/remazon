import { act, render, screen } from "../../utils/testUtils/test-utils";
import AwardsDisplay from "./AwardsDisplay";
import store from "../../redux/store";
import { fetchAwardsThunk } from "../../redux/slices/awardsSlice";
import { BrowserRouter } from "react-router-dom";
import { fetchEmployeesListThunk } from "../../redux/slices/employeesSlice";

describe('Awards Display', ()=>{
  it('All elements render correctly', async ()=>{
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