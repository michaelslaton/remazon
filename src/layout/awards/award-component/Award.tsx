import AwardType from '../../../types/awardType';
import '../awards.css';

type AwardProps = {
  awardData: AwardType;
}

const Award: React.FC<AwardProps> = ({ awardData }) => {

  return (
    <div className='award__wrapper'>
      <h2 className='title'>{awardData.name}</h2>
      <ul className='award__info'>
        { awardData.holder &&
          <li>
            <div className='award__info-key'>
              Holder:
            </div>
            {awardData.holder}
          </li>
        }
      </ul>
    </div>
  );
};

export default Award;