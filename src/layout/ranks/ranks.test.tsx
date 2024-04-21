import { fetchCurrentEmployeeThunk } from "../../redux/slices/employeesSlice";
import { fetchRanksThunk } from "../../redux/slices/ranksSlice";
import store from "../../redux/store";
import { ranksDummyData } from "../../test/mocks/handlers";
import RankType from "../../types/rank.type";
import { act, render, screen, userEvent } from "../../utils/testUtils/test-utils"
import RanksDisplay from "./RanksDisplay"
import Rank from "./rank-component/Rank";
import * as ranksActions from '../../redux/slices/ranksSlice';
import * as controlActions from '../../redux/slices/controlsSlice';

const createRankThunkSpy = vi.spyOn(ranksActions, 'createRankThunk');
const setUiErrorSpy = vi.spyOn(controlActions, 'setUiError');

describe('Ranks', ()=>{
  describe('Ranks Display', ()=>{
    it('renders all elements properly', async ()=>{
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
  
  describe('Rank', ()=>{
    beforeEach( async ()=>{
      await act( async ()=>{
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
    });
    const ranks: RankType[] = ranksDummyData.data;
      
    it('renders display elements properly', async ()=>{
      render(<Rank rankData={ranks[1]}/>);
  
      const title = screen.getByText('Ceo');
      const editButton = screen.getByTestId('rank-edit-button');
      const deleteButton = screen.queryByTestId('rank-delete-button');

      expect(title).toBeVisible();
      expect(editButton).toBeVisible();
      expect(deleteButton).not.toBeInTheDocument();
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

  describe('New Rank', ()=>{
    it('renders New Rank form when the add rank button is clicked', async ()=>{  
      render(<RanksDisplay/>);
      
      const user = userEvent.setup();
      const addRankButton = screen.getByTestId('add rank');

      await user.click(addRankButton);

      const titleBox = screen.getByRole('textbox', { name: 'Title:' })

      expect(titleBox).toBeVisible();
    });

    it('renders all elements properly', async ()=>{
      render(<RanksDisplay/>);
      
      const user = userEvent.setup();
      const addRankButton = screen.getByTestId('add rank');

      await user.click(addRankButton);

      const titleBox = screen.getByRole('textbox', { name: 'Title:' });
      const colorBox = screen.getByLabelText(/color:/i);
      const submitRankButton = screen.getByTestId('submit rank button');
      const cancelRankButton = screen.getByTestId('cancel new rank');

      expect(titleBox).toBeVisible();
      expect(colorBox).toBeVisible();
      expect(colorBox).toHaveValue('#ffa500');
      expect(submitRankButton).toBeVisible();
      expect(cancelRankButton).toBeVisible();
    });

    it('new rank form to unrender if cancel is clicked', async ()=>{
      render(<RanksDisplay/>);
      
      const user = userEvent.setup();
      const addRankButton = screen.getByTestId('add rank');
      
      await user.click(addRankButton);

      const cancelRankButton = screen.getByTestId('cancel new rank');
      const titleBox = screen.getByRole('textbox', { name: 'Title:' });
      expect(titleBox).toBeVisible();

      await user.click(cancelRankButton);

      expect(titleBox).not.toBeVisible();
    });

    it('createRankThunk is called when fields are filled out properly and save button is clicked', async ()=>{
      render(<RanksDisplay/>);
      
      const user = userEvent.setup();
      const addRankButton = screen.getByTestId('add rank');
      
      await user.click(addRankButton);

      const titleBox = screen.getByRole('textbox', { name: 'Title:' });

      titleBox.focus();
      await user.keyboard('Egg Rank');
      expect(titleBox).toHaveValue('Egg Rank');

      const submitRankButton = screen.getByTestId('submit rank button');

      await user.click(submitRankButton);

      expect(createRankThunkSpy).toHaveBeenCalled();
    });

    it('setUiError is called when fields are not filled properly', async ()=>{
      render(<RanksDisplay/>);
      
      const user = userEvent.setup();
      const addRankButton = screen.getByTestId('add rank');
      
      await user.click(addRankButton);

      const submitRankButton = screen.getByTestId('submit rank button');

      await user.click(submitRankButton);

      expect(setUiErrorSpy).toHaveBeenCalled();
    });
  });
});