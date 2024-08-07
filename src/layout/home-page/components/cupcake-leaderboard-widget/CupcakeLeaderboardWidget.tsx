import { useAppSelector } from '../../../../redux/hooks';
import EmployeeType from '../../../../types/employee.type';
import colorCupcake from '../../../../assets/imgs/cupcakeColor.png';
import '../../../cupcake-leaderboard/cupcakeLeaderboard.css';

const CupcakeLeaderboardWidget: React.FC = () => {
  let employeesList: EmployeeType[] = useAppSelector((state)=> state.employeesControl.employees);

  if (employeesList.length < 1) return <></>;

  return (
    <div className='leaderboard__widget-container'>
      <div className='leaderboard__header'>
        <img
          data-testid='cupcake image'
          src={colorCupcake}
          className='leaderboard-cupcake widget'
        />
        <div className='leaderboard__header-text widget'>
          <h3>
            Cupcake
          </h3>
          <h3>
            Leaderboard
          </h3>
        </div>
        <img
          data-testid='cupcake image'
          src={colorCupcake}
          className='leaderboard-cupcake widget'
        />
      </div>
      <div>
        {
          [...employeesList]
            .sort((a, b) => {
              if (a.cupcakes < b.cupcakes) return 1;
              if (a.cupcakes > b.cupcakes) return -1;
              return 0;
            })
            .map((employee) => (
              <div key={employee.id} className="leaderboard__entry widget">
                <div className="leaderboard__entry-name">{employee.name}</div>
                <div className="leaderboard__entry-cupcakes">
                  {employee.cupcakes}
                </div>
              </div>
            ))
            .splice(0, 3)
        }
      </div>
    </div>
  );
};

export default CupcakeLeaderboardWidget;