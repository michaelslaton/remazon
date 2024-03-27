import { BrowserRouter } from "react-router-dom";
import { act, render, screen, userEvent } from "../../../utils/testUtils/test-utils";
import AdminNotification from "./AdminNotification";
import store from "../../../redux/store";
import { fetchEmployeesListThunk } from "../../../redux/slices/employeesSlice";

describe('Admin Notification', ()=>{

  it('all elements render correctly', ()=>{
    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const title = screen.getByRole('heading', {
      name: 'Admin Notification'
    });
    const titleInput = screen.getByRole('textbox', {name: 'Title:'});
    const messageInput = screen.getByRole('textbox', {name:'Message:'});
    const moveLeftButton = screen.getByRole('button',{name:'<'});
    const moveAllLeftButton = screen.getByRole('button',{name:'<<'});
    const moveRightButton = screen.getByRole('button',{name:'>'});
    const moveAllRightButton = screen.getByRole('button',{name:'>>'});
    const notIncludedList = screen.getByTestId('not included');
    const includedList = screen.getByTestId('included');
    const clearButton = screen.getByRole('button',{name:'Clear'});
    const sendButton = screen.getByRole('button',{name:'Send'});

    expect(title).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(moveLeftButton).toBeInTheDocument();
    expect(moveAllLeftButton).toBeInTheDocument();
    expect(moveRightButton).toBeInTheDocument();
    expect(moveAllRightButton).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('lists not included employees properly', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const rembo = screen.getByText('Rembo');
    const bueno = screen.getByText('Bueno');
    const notIncludedList = screen.getByTestId('not included');

    expect(notIncludedList.childElementCount).toBe(2);
    expect(rembo).toBeInTheDocument();
    expect(bueno).toBeInTheDocument();
  });

  it('moves listing right when selected and move right is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const user = userEvent.setup();    
    const rembo = screen.getByText('Rembo');
    const bueno = screen.getByText('Bueno');
    const moveRightButton = screen.getByRole('button',{name:'>'});
    const includedList = screen.getByTestId('included');
    const notIncludedList = screen.getByTestId('not included');
    
    expect(rembo).toBeInTheDocument();
    expect(bueno).toBeInTheDocument();
    expect(moveRightButton).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);

    await user.click(rembo);
    await user.click(moveRightButton);

    expect(includedList.childElementCount).toBe(1);
    expect(notIncludedList.childElementCount).toBe(1);
  });

  it('moves listing left when selected and move left is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const user = userEvent.setup();    
    let rembo = screen.getByText('Rembo');
    const moveRightButton = screen.getByRole('button',{name:'>'});
    const moveLeftButton = screen.getByRole('button',{name:'<'});
    const includedList = screen.getByTestId('included');
    const notIncludedList = screen.getByTestId('not included');
    
    expect(rembo).toBeInTheDocument();
    expect(moveRightButton).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);

    await user.click(rembo);
    await user.click(moveRightButton);

    expect(includedList.childElementCount).toBe(1);
    expect(notIncludedList.childElementCount).toBe(1);

    rembo = screen.getByText('Rembo');
    await user.click(rembo);
    await user.click(moveLeftButton);

    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);
  });

  it('moves all listings right when move all right is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const moveAllRightButton = screen.getByRole('button',{name:'>>'});
    const includedList = screen.getByTestId('included');
    const notIncludedList = screen.getByTestId('not included');
    
    expect(moveAllRightButton).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);

    await user.click(moveAllRightButton);

    expect(includedList.childElementCount).toBe(2);
    expect(notIncludedList.childElementCount).toBe(0);
  });

  it('moves all listings left when move all left is clicked', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const moveAllRightButton = screen.getByRole('button',{name:'>>'});
    const moveAllLeftButton = screen.getByRole('button',{name:'<<'});
    const includedList = screen.getByTestId('included');
    const notIncludedList = screen.getByTestId('not included');
    
    expect(moveAllRightButton).toBeInTheDocument();
    expect(moveAllLeftButton).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);

    await user.click(moveAllRightButton);

    expect(includedList.childElementCount).toBe(2);
    expect(notIncludedList.childElementCount).toBe(0);
    
    await user.click(moveAllLeftButton);
    
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);
  });

  it('form resets on hitting clear', async ()=>{
    await act(async ()=>{
      await store.dispatch(fetchEmployeesListThunk());
    });

    render(
      <BrowserRouter>
        <AdminNotification/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const titleInput = screen.getByRole('textbox', {name: 'Title:'});
    const messageInput = screen.getByRole('textbox', {name:'Message:'});
    const moveAllRightButton = screen.getByRole('button',{name:'>>'});
    const notIncludedList = screen.getByTestId('not included');
    const includedList = screen.getByTestId('included');
    const clearButton = screen.getByRole('button',{name:'Clear'});

    expect(titleInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(moveAllRightButton).toBeInTheDocument();
    expect(notIncludedList).toBeInTheDocument();
    expect(includedList).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);

    await user.click(moveAllRightButton);

    expect(includedList.childElementCount).toBe(2);
    expect(notIncludedList.childElementCount).toBe(0);

    titleInput.focus();
    expect(titleInput).toHaveFocus();
    await user.keyboard('This is a title');
    expect(titleInput).toHaveValue('This is a title');
    
    messageInput.focus();
    expect(messageInput).toHaveFocus();
    await user.keyboard('This is a message');
    expect(messageInput).toHaveValue('This is a message');

    await user.click(clearButton);
    
    expect(includedList.childElementCount).toBe(0);
    expect(notIncludedList.childElementCount).toBe(2);
    expect(titleInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

});