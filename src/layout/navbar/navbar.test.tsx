import { BrowserRouter } from "react-router-dom";
import { render, screen, act, userEvent } from "../../utils/testUtils/test-utils";
import Navbar from "./Navbar";
import store from "../../redux/store";
import { clearCurrentEmployee, fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../utils/firebase/firebase";
import * as firebaseAuth from 'firebase/auth';

const windowConfirmSpy = vi.spyOn(window, 'confirm');
const signoutSpy = vi.spyOn(firebaseAuth, "signOut");

type FakeAuth = { signOut(this: void): void }
vi.mock("firebase/auth", async (getModule) => {
  const original: FakeAuth = await getModule();

  return {
    ...original,
    signOut: vi.fn().mockImplementation(original.signOut),
  };
});

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Navbar', ()=>{
  it('renders all logged out elements properly', ()=>{
    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const collapseButton = screen.getByRole('button', { name: 'collapse button' });
    const homeButton = screen.getByRole('button', { name: 'Home' });
    const employeesButton = screen.getByRole('button', { name: 'Employees' });
    const projectsButton = screen.getByRole('button', { name: 'Projects' });
    const awardsButton = screen.getByRole('button', { name: 'Awards' });
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    const signOutButton = screen.queryByRole('button', { name: 'Sign Out' });

    expect(collapseButton).toBeVisible();
    expect(homeButton).toBeVisible();
    expect(employeesButton).toBeVisible();
    expect(projectsButton).toBeVisible();
    expect(awardsButton).toBeVisible();
    expect(signInButton).toBeVisible();
    expect(signOutButton).not.toBeInTheDocument();
  });

  it('renders sign out button if signed in', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('2'));
    });

    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const signInButton = screen.queryByRole('button', { name: 'Sign In' });
    const signOutButton = screen.queryByRole('button', { name: 'Sign Out' });

    expect(signInButton).not.toBeInTheDocument();
    expect(signOutButton).toBeVisible();
  });

  it('renders admin and ranks buttons if logged in as an admin', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
    });

    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const ranksButton = screen.getByRole('button', { name: 'Ranks' });
    const adminButton = screen.getByRole('button', { name: 'Admin' });

    expect(ranksButton).toBeVisible();
    expect(adminButton).toBeVisible();

    act(()=>{
      store.dispatch(clearCurrentEmployee());
    });
  });

  it('useNavigate is called when clicking a link button', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
    });

    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const homeButton = screen.getByRole('button', { name: 'Home' });
    const employeesButton = screen.getByRole('button', { name: 'Employees' });
    const projectsButton = screen.getByRole('button', { name: 'Projects' });
    const awardsButton = screen.getByRole('button', { name: 'Awards' });
    const ranksButton = screen.getByRole('button', { name: 'Ranks' });
    const adminButton = screen.getByRole('button', { name: 'Admin' });

    await user.click(homeButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    await user.click(employeesButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(2);
    await user.click(projectsButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(3);
    await user.click(awardsButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(4);
    await user.click(ranksButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(5);
    await user.click(adminButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(6);

    act(()=>{
      store.dispatch(clearCurrentEmployee());
    });
  });

  it('useNavigate is called when clicking sign in', async ()=>{
    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    await user.click(signInButton);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it('window confirm is called when sign out is clicked', async ()=>{

    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
    });
    
    initializeApp(firebaseConfig);

    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });

    await user.click(signOutButton);
    expect(windowConfirmSpy).toHaveBeenCalled();
  });

  it('signOut is called when sign out is clicked and window is confirmed', async ()=>{
    vi.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
    });
    
    initializeApp(firebaseConfig);

    render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const signOutButton = screen.getByRole('button', { name: 'Sign Out' });

    await user.click(signOutButton);
    expect(signoutSpy).toHaveBeenCalled();
  });
});