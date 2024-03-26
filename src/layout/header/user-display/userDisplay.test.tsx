import { fetchCurrentEmployeeThunk, clearCurrentEmployee } from "../../../redux/slices/employeesSlice";
import store from "../../../redux/store";
import { render, screen } from "../../../utils/testUtils/test-utils";
import UserDisplay from "./UserDisplay";
import { BrowserRouter } from "react-router-dom";

describe('User Display', ()=>{

  it('renders names properly', async ()=>{
    await store.dispatch(fetchCurrentEmployeeThunk('1'));
    render(
      <BrowserRouter>
        <UserDisplay/>
      </BrowserRouter>
    );
    const rembo = screen.getByText('Rembo');
    expect(rembo).toBeInTheDocument();

    store.dispatch(clearCurrentEmployee());
    await store.dispatch(fetchCurrentEmployeeThunk('2'));

    const bueno = screen.getByText('Bueno');
    expect(bueno).toBeInTheDocument();
  });

  it('invisible if not logged in', async ()=>{
    store.dispatch(clearCurrentEmployee());
    render(
      <BrowserRouter>
        <UserDisplay/>
      </BrowserRouter>
    );
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

})