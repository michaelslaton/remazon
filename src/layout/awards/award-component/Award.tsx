import AwardType from '../../../types/awardType';
import '../awards.css';

type AwardProps = {
  awardData: AwardType;
}

const Award: React.FC<AwardProps> = ({ awardData }) => {

  if (awardData.type === 'belt') return (
    <div className='award__wrapper'>
      <div className='award__plate'>
        <div className='belt__title'>
          {awardData.name}
        </div>
        <div className='belt__buckle'>
          <div className='belt__plaque'/>
        </div>
        <div className='belt__strap'/>
      </div>
      {awardData.holder}
      {awardData.type}
    </div>
  );
  else return (<>'Please finish this Mike'</>)
};


export default Award;