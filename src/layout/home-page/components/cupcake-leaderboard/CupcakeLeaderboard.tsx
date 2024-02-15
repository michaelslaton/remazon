import { useAppSelector } from '../../../../redux/hooks';
import EmployeeType from '../../../../types/employeeType';
import colorCupcake from '../../../../assets/imgs/cupcakeColor.png';
import './cupcakeLeaderboard.css';

type CupcakeLeaderboardProps = {
  rows: number;
}

const CupcakeLeaderboard: React.FC<CupcakeLeaderboardProps> = ({ rows }) => {
  let employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  const leaderboardList = (): JSX.Element => {
    const results = [...employeesList]
      .sort((a,b)=>{
        if (a.cupcakes < b.cupcakes) return 1;
        if (a.cupcakes > b.cupcakes) return -1;
        return 0;
      })
    return (
      <div>
        { results.map((employee)=>(
          <div key={employee.id} className='leaderboard__entry'>
            <div className='leaderboard__entry-name'>
              {employee.name}
            </div>
            <div className='leaderboard__entry-cupcakes'>
              {employee.cupcakes}
            </div>
          </div>
        )).splice(0,rows) }
      </div>
    )
  };

  return (
    <div className='leaderboard__wrapper'>
      <div className='leaderboard__header'>
        <img
          src={colorCupcake}
          className='leaderboard-cupcake'
        />
        <div className='leaderboard__header-text'>
          <div>
            Cupcake
          </div>
          <div>
            Leaderboard
          </div>
        </div>
        <img
          src={colorCupcake}
          className='leaderboard-cupcake'
        />
      </div>
      {leaderboardList()}
    </div>
  );
};

export default CupcakeLeaderboard;