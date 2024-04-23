import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../utils/testUtils/test-utils";
import Layout from "./Layout";

describe('Layout', ()=>{
  it('renders all elements properly', ()=>{
    render(
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    );

    const mainScreen = screen.getByTestId('main screen');

    expect(mainScreen).toBeVisible();
  });
});