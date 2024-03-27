import { BrowserRouter } from "react-router-dom";
import { act, render, screen, userEvent } from "../../../utils/testUtils/test-utils";
import AdminMotd from './AdminMotd';

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

describe('Admin Motd', ()=>{

  it('renders all elements properly',()=>{
    render(
      <BrowserRouter>
        <AdminMotd/>
      </BrowserRouter>
    );

    const title = screen.getByRole('heading', {
      name: 'Message of the Day'
    });
    const messageInput = screen.getByRole('textbox');
    const clearButton = screen.getByRole('button', {
      name: 'Clear'
    });
    const saveButton = screen.getByRole('button', {
      name: 'Save'
    });

    expect(title).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('useNavigate to not be called on save if no changes', async ()=>{
    render(
      <BrowserRouter>
        <AdminMotd/>
      </BrowserRouter>
    );
    const user = userEvent.setup();

    const signinButton = screen.getByRole('button', {
      name: 'Save'
    });
    
    expect(signinButton).toBeInTheDocument();
    await act(()=> user.click(signinButton));
    expect(mockedUseNavigate).not.toHaveBeenCalledTimes(1);
  });

  it('useNavigate to be called if changes are made', async ()=>{
    render(
      <BrowserRouter>
        <AdminMotd/>
      </BrowserRouter>
    );
    const user = userEvent.setup();

    const messageInput = screen.getByRole('textbox');
    const signinButton = screen.getByRole('button', {
      name: 'Save'
    });

    messageInput.focus();
    expect(messageInput).toHaveFocus();
    await user.keyboard('hello');
    expect(messageInput).toHaveValue('hello');
    await user.click(signinButton);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });

  it('textbox to be reset when Clear is clicked', async ()=>{
    render(
      <BrowserRouter>
        <AdminMotd/>
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const messageInput = screen.getByRole('textbox');
    const clearButton = screen.getByRole('button', {
      name: 'Clear'
    });

    messageInput.focus();
    expect(messageInput).toHaveFocus();
    await user.keyboard('hello');
    expect(messageInput).toHaveValue('hello');
    await user.click(clearButton);
    expect(messageInput).toHaveValue('');
  });

});