import RankType from "../../../types/rankType";
import "../ranks.css";

type RankProps = {
  rankData: RankType;
}

const Rank: React.FC<RankProps> = ({ rankData }) => {

  return (
    <div className="rank">
      {rankData.name}
    </div>
  );
};

export default Rank;