import { useEffect, useState } from 'react';
import CalendarList from './CalendarList';
import Calendar from './Calendar';
import '../../projects.css';

const CalendarDisplay: React.FC = () =>{
  const [ displayedMonth, setDisplayedMonth ] = useState<{ month: number, year: number }>({month: 0, year: 0});
  const [ selected, setSelected ] = useState<{ day: number, month: number, year: number } | null>(null);
  
  let today: Date = new Date();

  useEffect(()=>{
    let month: number = today.getMonth();
    let year: number = today.getFullYear();
    setDisplayedMonth({
      month,
      year
    })
  },[])

  return (
    <>
      <div className='cal_container'>

        <Calendar
          setDisplayedMonth={setDisplayedMonth}
          displayedMonth={displayedMonth}
          selected={selected}
          setSelected={setSelected}
        />
        
        <CalendarList
          selected={selected}
        />

      </div>
      <section
        className='calendar__controls'
      >
        <button
          className='button card__button'
          onClick={()=> {
            setDisplayedMonth({month: today.getMonth(), year: today.getFullYear()});
            setSelected({day: today.getDate(), month: today.getMonth(), year: today.getFullYear()});
          }}
        >
          Today
        </button>
      </section>
    </>
  );
};

export default CalendarDisplay;