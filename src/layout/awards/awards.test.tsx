import { act, render, screen, userEvent } from '../../utils/testUtils/test-utils';
import AwardsDisplay from './AwardsDisplay';
import store from '../../redux/store';
import { fetchAwardsThunk } from '../../redux/slices/awardsSlice';
import { BrowserRouter } from 'react-router-dom';
import { fetchCurrentEmployeeThunk, fetchEmployeesListThunk } from '../../redux/slices/employeesSlice';
import { awardsDummyData } from '../../test/mocks/handlers';
import Award from './award-component/Award';
import EditAward from './award-component/EditAward';
import * as controlActions from '../../redux/slices/controlsSlice';
import * as awardActions from '../../redux/slices/awardsSlice';
import CreateAward from './award-component/CreateAward';

const setUiErrorSpy = vi.spyOn(controlActions, 'setUiError');
const editAwardThunkSpy = vi.spyOn(awardActions, 'editAwardThunk');
const createAwardThunkSpy = vi.spyOn(awardActions, 'createAwardThunk');
const windowConfirmSpy = vi.spyOn(window, 'confirm');

const awardData = awardsDummyData.data;

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useParams: () => ({ paramId: '1' }),
  };
});


describe('Awards', ()=>{
  describe('Awards Display', ()=>{
    it('renders all elements properly if no awards exist', async ()=>{
      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const header = screen.getByRole('heading', { name: 'Awards' });
      const noAwards = screen.getByText('No Awards to display.')

      expect(header).toBeVisible();
      expect(noAwards).toBeVisible();
    });

    it('renders all elements properly if awards exist', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchEmployeesListThunk());
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const header = screen.getByRole('heading', { name: 'Awards' });
      const sortSelection = screen.queryByRole('combobox');
      const awardsWrapper = screen.getByTestId('award cards wrapper');
      const newAwardButton = screen.queryByTestId('create award button');

      expect(header).toBeVisible();
      expect(sortSelection).toBeVisible();
      expect(sortSelection?.childElementCount).toBe(9);
      expect(newAwardButton).not.toBeInTheDocument();
      expect(awardsWrapper).toBeVisible();
      expect(awardsWrapper.childElementCount).toBe(3);
    });

    it('renders New Award button when logged in as an admin', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );
  
      const newAwardButton = screen.getByTestId('create award button');

      expect(newAwardButton).toBeVisible();
    });

    it('useNavigate is called when the New Award button is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
        await store.dispatch(fetchAwardsThunk());
        await store.dispatch(fetchEmployeesListThunk());
      });

      render(
        <BrowserRouter>
          <AwardsDisplay/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const newAwardButton = screen.getByTestId('create award button');
      
      await user.click(newAwardButton);
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });

  describe('Award', ()=>{
    it('renders all elements properly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('2'));
      });
      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const title = screen.getByText('Drift Belt');
      const type = screen.getByText('Type:');
      const typeValue = screen.getByText('belt');
      const awardedTo = screen.getByText('Awarded to:');
      const awardedToValue = screen.getByText('Bueno');
      const awardedFor = screen.getByText('Awarded for:');
      const awardedForValue = screen.getByText('The perfect driiiiift! Yeeeh');
      const editAwardButton = screen.queryByTestId('edit award button');

      expect(title).toBeVisible();
      expect(type).toBeVisible();
      expect(typeValue).toBeVisible();
      expect(awardedTo).toBeVisible();
      expect(awardedToValue).toBeVisible();
      expect(awardedFor).toBeVisible();
      expect(awardedForValue).toBeVisible();
      expect(editAwardButton).not.toBeInTheDocument();
    });

    it('edit award button to be visible if the user is the ceo', async()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const editAwardButton = screen.getByTestId('edit award button');

      expect(editAwardButton).toBeVisible();
    });

    it('useNavigate to be called when edit award button is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <Award awardData={awardData[0]}/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const editAwardButton = screen.getByTestId('edit award button');

      await user.click(editAwardButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });

  describe('Edit award', ()=>{
    it('renders all elements properly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );

      const header = screen.getByRole('heading', { name: 'Edit Award' });
      const title = screen.getByRole('heading', { name: 'Edit Drift Belt' });
      const titleCountText = screen.getByText('10 of 21');
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const typeSelecter = screen.getByRole('combobox', { name: 'type selector' });
      const classSelecter = screen.getByRole('combobox', { name: 'class selector' });
      const goldOption = screen.getByRole('option', { name: 'Gold' });
      const silverOption = screen.getByRole('option', { name: 'Silver' });
      const bronzeOption = screen.getByRole('option', { name: 'Bronze' });
      const beltOption = screen.getByRole('option', { name: 'Belt' });
      const trophyOption = screen.getByRole('option', { name: 'Trophy' });
      const awardedToSelecter = screen.getByRole('combobox', { name: 'holder selector' });
      const awardedForBox = screen.getByRole('textbox', { name: 'Awarded For:' });
      const retiredCheckBox = screen.getByRole('checkbox', { name: 'Retired Status:' });
      const AwardedForCharCountText = screen.getByText('28 of 200');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(header).toBeVisible();
      expect(title).toBeVisible();
      expect(titleCountText).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(typeSelecter).toBeVisible();
      expect(classSelecter).toBeVisible();
      expect(goldOption).toBeVisible();
      expect(silverOption).toBeVisible();
      expect(bronzeOption).toBeVisible();
      expect(classSelecter.childElementCount).toBe(3);
      expect(beltOption).toBeVisible();
      expect(trophyOption).toBeVisible();
      expect(awardedToSelecter).toBeVisible();
      expect(awardedToSelecter.childElementCount).toBe(3);
      expect(awardedForBox).toBeVisible();
      expect(retiredCheckBox).toBeVisible();
      expect(AwardedForCharCountText).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });
    
    it('useNavigate to be called when cancel is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });
      
      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );
      
      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      
      await user.click(cancelButton);
      
      expect(mockedUseNavigate).toHaveBeenCalled();
    });

    it('setUiError is called when no changes are made and submit is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await user.click(submitButton);

      expect(setUiErrorSpy).toHaveBeenCalled();
    });
    
    it('setUiError is called if fields are filled improperly', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      nameBox.focus();
      user.clear;

      await user.click(submitButton);

      expect(setUiErrorSpy).toHaveBeenCalled();
    });

    it('window confirm is called when fields are properly altered and submit is clicked', async ()=>{
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      nameBox.focus();
      user.clear;
      await user.keyboard('WWE Title');
      await user.click(submitButton);

      expect(windowConfirmSpy).toHaveBeenCalled();
    });

    it('editAwardThunk is called if fields are properly altered and confirm is clicked', async ()=>{
      vi.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);
      await act(async ()=> {
        await store.dispatch(fetchCurrentEmployeeThunk('1'));
      });

      render(
        <BrowserRouter>
          <EditAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      nameBox.focus();
      user.clear;
      await user.keyboard('WWE Title');
      await user.click(submitButton);

      expect(editAwardThunkSpy).toHaveBeenCalled();
    });
  });

  describe('Create Award', ()=>{
    it('renders all elements properly', ()=>{
      render(
        <BrowserRouter>
          <CreateAward/>
        </BrowserRouter>
      );

      const title = screen.getByRole('heading', { name: 'Create Award' });
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const typeBox = screen.getByRole('combobox', { name: 'Type:' });
      const beltOption = screen.getByRole('option', { name: 'Belt' });
      const trophyOption = screen.getByRole('option', { name: 'Trophy' });
      const awardHolderBox = screen.getByRole('combobox', { name: 'Current Award Holder:' });
      const unawardedOption = screen.getByRole('option', { name: 'Unawarded' });
      const rembo = screen.getByRole('option', { name: 'Rembo' });
      const bueno = screen.getByRole('option', { name: 'Bueno' });
      const awardedFor = screen.getByRole('textbox', { name: 'Awarded For:' });
      const charCount = screen.getByText('0 of 200');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      expect(title).toBeVisible();
      expect(nameBox).toBeVisible();
      expect(typeBox).toBeVisible();
      expect(typeBox.childElementCount).toBe(2);
      expect(beltOption).toBeVisible();
      expect(trophyOption).toBeVisible();
      expect(awardHolderBox).toBeVisible();
      expect(unawardedOption).toBeVisible();
      expect(rembo).toBeVisible();
      expect(bueno).toBeVisible();
      expect(awardHolderBox.childElementCount).toBe(3);
      expect(awardedFor).toBeVisible();
      expect(charCount).toBeVisible();
      expect(submitButton).toBeVisible();
      expect(cancelButton).toBeVisible();
    });

    it('setUiError is called if fields are not filled properly and submit is clicked', async ()=>{
      render(
        <BrowserRouter>
          <CreateAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await user.click(submitButton);

      expect(setUiErrorSpy).toHaveBeenCalled();
    });

    it('useNavigate is called if cancel is clicked', async ()=>{
      render(
        <BrowserRouter>
          <CreateAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });

      await user.click(cancelButton);

      expect(mockedUseNavigate).toHaveBeenCalled();
    });

    it('createAwardThunk is called if fields are entered correctly', async ()=>{
      render(
        <BrowserRouter>
          <CreateAward/>
        </BrowserRouter>
      );

      const user = userEvent.setup();
      const nameBox = screen.getByRole('textbox', { name: 'Name:' });
      const awardedFor = screen.getByRole('textbox', { name: 'Awarded For:' });
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      nameBox.focus();
      await user.keyboard('Weebo Belt');
      awardedFor.focus();
      await user.keyboard('Egg Belt');
      await user.click(submitButton);

      expect(createAwardThunkSpy).toHaveBeenCalled();
    });
  });
});