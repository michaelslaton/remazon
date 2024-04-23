import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { render } from "./utils/testUtils/test-utils";
import * as controlActions from './redux/slices/controlsSlice';

const initialLoadSpy = vi.spyOn(controlActions, 'initialLoadThunk');

describe('App', ()=>{
  it('initialLoadThunk to have been called', ()=>{
    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );

    expect(initialLoadSpy).toHaveBeenCalled();
  });
});