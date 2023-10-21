import RankType from "../../../types/rankType";
import "../ranks.css";

type RankProps = {
  rankData: RankType;
}

const Rank: React.FC<RankProps> = ({ rankData }) => {

  const editButtonHandler = (): void => {

    return
  }

  return (
    <div className="rank">
      <h2 className="rank__title">{rankData.name}</h2>
      {rankData.description}
      <button className="button" onClick={()=> editButtonHandler()}>Edit</button>
    </div>
  );
};

export default Rank;