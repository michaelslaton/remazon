import { BrowserRouter } from "react-router-dom";
import { act, render, screen, userEvent } from "../../../utils/testUtils/test-utils"
import SignIn from "./SignIn"

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Sign In, Sign Out', ()=>{

  it('renders all sign in elements', ()=>{
    render(
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    );
    const title = screen.getByRole('heading', {
      name: 'Sign In'
    });
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const signinButton = screen.getByRole('button', {
      name: 'Sign In'
    })
    const signupButton = screen.getByRole('button', {
      name: 'Go to Sign Up'
    })

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('goes to the signup page', async ()=>{
    render(
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    );

    const user = userEvent.setup();

    const signupButton = screen.getByRole('button', {
      name: 'Go to Sign Up'
    });
    
    expect(signupButton).toBeInTheDocument();
    await act(()=> user.click(signupButton));
    expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it('does not navigate if no info is entered', async ()=>{
    render(
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    );
    const user = userEvent.setup();

    const signinButton = screen.getByRole('button', {
      name: 'Sign In'
    });
    
    expect(signinButton).toBeInTheDocument();
    await act(()=> user.click(signinButton));
    expect(mockedUseNavigate).not.toHaveBeenCalled();
  });

});