import { BrowserRouter } from "react-router-dom";
import { act, render, screen, userEvent } from "../../utils/testUtils/test-utils";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import * as firebaseAuth from 'firebase/auth';

type FakeAuth = { signInWithEmailAndPassword(this: void): void, createUserWithEmailAndPassword(this: void): void }
vi.mock("firebase/auth", async (getModule) => {
  const original: FakeAuth = await getModule();

  return {
    ...original,
    signInWithEmailAndPassword: vi.fn().mockImplementation(original.signInWithEmailAndPassword),
    createUserWithEmailAndPassword: vi.fn().mockImplementation(original.createUserWithEmailAndPassword),
  };
});

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

const signInSpy = vi.spyOn(firebaseAuth, "signInWithEmailAndPassword");
const createUserAuthSpy = vi.spyOn(firebaseAuth, "createUserWithEmailAndPassword");

describe('Sign In', ()=>{

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
    const signinButton = screen.getByRole('button', { name: 'Sign In' });
    const signupButton = screen.getByRole('button', { name: 'Go to Sign Up' });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('goes to the signup page when sign up is clicked', async ()=>{
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
    const signinButton = screen.getByRole('button', { name: 'Sign In' });
    
    expect(signinButton).toBeInTheDocument();
    await user.click(signinButton);
    expect(mockedUseNavigate).not.toHaveBeenCalled();
  });

  it('signInWithEmailAndPassword is called when sign in is clicked and fields are entered properly', async ()=>{
    render(
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const signinButton = screen.getByRole('button', { name: 'Sign In' });

    email.focus();
    await user.keyboard('fake@fakies.com');
    password.focus();
    await user.keyboard('fakies');
    await user.click(signinButton);

    expect(signInSpy).toHaveBeenCalled();
  });

});

describe('Sign Up', ()=>{

  it('all elements render properly', ()=>{
    render(
      <BrowserRouter>
        <SignUp/>
      </BrowserRouter>
    );

    const title = screen.getByRole('heading', {name: 'Sign Up'});
    const password = screen.getByTestId('password');
    const repeatPassword = screen.getByTestId('password repeat');
    const description = screen.getByRole('textbox', {name: 'Description:'});
    const username = screen.getByRole('textbox', {name: 'Username:'});
    const email = screen.getByRole('textbox', {name: 'Email:'});
    const birthday = screen.getByTestId('birthday');
    const createAccountButton = screen.getByRole('button', {name:'Create Account'});
    const cancelButton = screen.getByRole('button', {name:'Cancel'});
    const returnToSignInButton = screen.getByRole('button', {name:'Return to Sign In'});

    expect(title).toBeVisible();
    expect(username).toBeVisible();
    expect(password).toBeVisible();
    expect(repeatPassword).toBeVisible();
    expect(description).toBeVisible();
    expect(email).toBeVisible();
    expect(birthday).toBeVisible();
    expect(createAccountButton).toBeVisible();
    expect(cancelButton).toBeVisible();
    expect(returnToSignInButton).toBeVisible();
  });

  it('leaves the page when cancel is clicked', async ()=>{
    render(
      <BrowserRouter>
        <SignUp/>
      </BrowserRouter>
    );

    const user = userEvent.setup();

    const cancelButton = screen.getByRole('button', {name:'Cancel'});
    expect(cancelButton).toBeVisible();

    await user.click(cancelButton);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it('leaves the page when return to sign in is clicked', async ()=>{
    render(
      <BrowserRouter>
        <SignUp/>
      </BrowserRouter>
    );

    const user = userEvent.setup();

    const returnToSignInButton = screen.getByRole('button', {name:'Return to Sign In'});
    expect(returnToSignInButton).toBeVisible();

    await user.click(returnToSignInButton);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it('createUserWithEmailAndPassword is called when fields are entered properly and Create Account is clicked', async ()=>{
    render(
      <BrowserRouter>
        <SignUp/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const password = screen.getByTestId('password');
    const repeatPassword = screen.getByTestId('password repeat');
    const description = screen.getByRole('textbox', {name: 'Description:'});
    const username = screen.getByRole('textbox', {name: 'Username:'});
    const email = screen.getByRole('textbox', {name: 'Email:'});
    const createAccountButton = screen.getByRole('button', {name:'Create Account'});

    username.focus();
    await user.keyboard('fakeName');
    password.focus();
    await user.keyboard('fakies');
    repeatPassword.focus();
    await user.keyboard('fakies');
    description.focus();
    await user.keyboard('fakies');
    email.focus();
    await user.keyboard('fakies@fakies.com');
    await user.click(createAccountButton);

    expect(createUserAuthSpy).toHaveBeenCalled();
  });

});