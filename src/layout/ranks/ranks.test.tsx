import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import store from "../../redux/store";
import { ranksDummyData } from "../../test/mocks/handlers";
import RankType from "../../types/rank.type";
import { act, cleanup, render, screen, userEvent } from "../../utils/testUtils/test-utils"
import RanksDisplay from "./RanksDisplay"
import Rank from "./rank-component/Rank";

describe('Ranks Display', ()=>{
  it('renders all elements correctly', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
      await store.dispatch(fetchRanksThunk());
    });

    render(<RanksDisplay/>);

    const banner = screen.getByRole('heading', { name: 'Ranks' });
    const title = screen.getByRole('heading', { name: 'Rank List' });
    const ceo = screen.getByText('Ceo');
    const weebo = screen.getByText('Weebo');
    const deactivated = screen.queryByText('Deactivated');
    const addRankButton = screen.getByTestId('add rank');

    expect(banner).toBeVisible();
    expect(title).toBeVisible();
    expect(ceo).toBeVisible();
    expect(weebo).toBeVisible();
    expect(deactivated).not.toBeInTheDocument();
    expect(addRankButton).toBeVisible();
  });
});

describe('New Rank', ()=>{
  it('renders new rank correctly', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
      await store.dispatch(fetchRanksThunk());
    });
    render(<RanksDisplay/>);
    const user = userEvent.setup();

    const addRankButton = screen.getByTestId('add rank');
    expect(addRankButton).toBeVisible();

    await user.click(addRankButton);

    const titleBox = screen.getByRole('textbox', { name: 'Title:' });
    const colorBox = screen.getByTestId('color-box');
    const saveButton = screen.getByTestId('new-rank-save');
    const cancelButton = screen.getByTestId('new-rank-cancel');
    expect(titleBox).toBeVisible();
    expect(colorBox).toBeVisible();
    expect(colorBox).toHaveValue('#ffa500');
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();
  });

  it('does not render if closed or canceled', async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
      await store.dispatch(fetchRanksThunk());
    });
    render(<RanksDisplay/>);
    const user = userEvent.setup();

    const addRankButton = screen.getByTestId('add rank');
    expect(addRankButton).toBeVisible();
    let cancelButton = screen.queryByTestId('new-rank-cancel');
    expect(cancelButton).not.toBeInTheDocument();

    await user.click(addRankButton);

    cancelButton = screen.getByTestId('new-rank-cancel');
    expect(cancelButton).toBeVisible();
    
    await user.click(cancelButton);

    expect(cancelButton).not.toBeVisible();
  });
});

describe('Rank', ()=>{
  beforeEach( async ()=>{
    await act( async ()=>{
      await store.dispatch(fetchCurrentEmployeeThunk('1'));
    });
  });
  const ranks: RankType[] = ranksDummyData.data;
    
  it('renders display elements properly', async ()=>{
    render(<Rank rankData={ranks[1]}/>);

    let title = screen.getByText('Ceo');
    let editButton = screen.getByTestId('rank-edit-button');
    let deleteButton = screen.queryByTestId('rank-delete-button');
    expect(title).toBeVisible();
    expect(editButton).toBeVisible();
    expect(deleteButton).not.toBeInTheDocument();

    cleanup();

    render(<Rank rankData={ranks[2]}/>);

    title = screen.getByText('Weebo');
    editButton = screen.getByTestId('rank-edit-button');
    deleteButton = screen.queryByTestId('rank-delete-button');

    expect(title).toBeVisible();
    expect(editButton).toBeVisible();
    expect(deleteButton).toBeVisible();
  });

  it('switches to edit mode properly', async ()=>{
    render(<Rank rankData={ranks[1]}/>);
    const user = userEvent.setup();

    const editButton = screen.getByTestId('rank-edit-button');
    expect(editButton).toBeVisible();

    await user.click(editButton);

    const titleBox = screen.getByLabelText(/title :/i);
    expect(editButton).not.toBeVisible();
    expect(titleBox).toBeVisible();
  })

  it('renders edit elements properly', async ()=>{
    render(<Rank rankData={ranks[1]}/>);
    const user = userEvent.setup();

    const editButton = screen.getByTestId('rank-edit-button');
    expect(editButton).toBeVisible();

    await user.click(editButton);

    const titleBox = screen.getByLabelText(/title :/i);
    const colorBox = screen.getByLabelText(/color :/i);
    const saveButton = screen.getByTestId('rank-save-button');
    const cancelButton = screen.getByTestId('rank-cancel-button');
    expect(titleBox).toBeVisible();
    expect(titleBox).toHaveValue('Ceo');
    expect(colorBox).toBeVisible();
    expect(colorBox).toHaveValue('#00c8d6');
    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();
  });
});