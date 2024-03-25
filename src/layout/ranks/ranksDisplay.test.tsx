import { render, screen } from "../../utils/testUtils/test-utils"
import RanksDisplay from "./RanksDisplay"

describe('Ranks Display', ()=>{

  it('renders the ceo', async ()=>{
    render(<RanksDisplay/>);
    const ceo = await screen.findByText('Ceo');
    expect(ceo).toBeInTheDocument();
  });

  it('renders weebo', async ()=>{
    render(<RanksDisplay/>);
    const ceo = await screen.findByText('Weebo');
    expect(ceo).toBeInTheDocument();
  });

});