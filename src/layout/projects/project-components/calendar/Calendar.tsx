import { useEffect, useState } from 'react';
import months from '../../../../data/months';
import CalendarDay from './CalendarDay';
import { useAppSelector } from '../../../../redux/hooks';
import '../../projects.css';
import CalendarList from './CalendarList';

type DayType = {
  projectDay: boolean;
  date: {
    day: number,
    month: number,
    year: number
  };
  position: string;
};

const Calendar: React.FC = () =>{
  const projectsList = useAppSelector((state)=> state.projectsControl.projects);
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
  
  const getEventDays = (): number[] => {
    let results: number[] = [];
    
    projectsList.forEach((project)=>{
      const projectDate = new Date(project.date);
      if(projectDate.getFullYear() !== displayedMonth.year) return;
      if(projectDate.getMonth() !== displayedMonth.month) return;
      else results.push(projectDate.getDate());
    });
    
    return results;
  };

  const projectDays: number[] = getEventDays();
  
  const initCalendar = (): DayType[] => {
    const firstDay: Date = new Date(displayedMonth.year, displayedMonth.month, 1);
    const lastDay: Date = new Date(displayedMonth.year, displayedMonth.month + 1, 0);
    const prevLastDay: Date = new Date(displayedMonth.year, displayedMonth.month, 0);
    const prevDays: number = prevLastDay.getDate();
    const lastDate: number = lastDay.getDate();
    const day: number = firstDay.getDay();
    const nextDays: number = 7 - lastDay.getDay() - 1;

    let days: DayType[] = [];

    for(let x = day; x > 0; x--){
      days.push({position: 'prev-date', date: {day: Number(prevDays - x + 1), month: displayedMonth.month, year: displayedMonth.year}, projectDay: false});
    };

    for (let i = 1; i <= lastDate; i++) {
      let projectDay = false;
      if(projectDays.includes(i)) projectDay = true;
      days.push({position: '', date: {day: i, month: displayedMonth.month, year: displayedMonth.year}, projectDay: projectDay});
    };

    for (let j = 1; j <= nextDays; j++) {
      days.push({position: 'next-date', date: {day: j, month: displayedMonth.month, year: displayedMonth.year}, projectDay: false});
    };

    return days;
  };

  const shiftMonth = (amount: number): void => {
    if(displayedMonth.month === 11 && amount === 1) {
      setDisplayedMonth({month: 0, year: displayedMonth.year + 1});
      return
    };
    if(displayedMonth.month === 0 && amount === -1){
      setDisplayedMonth({month: 11, year: displayedMonth.year - 1});
      return
    }
    else setDisplayedMonth({...displayedMonth, month: displayedMonth.month + amount});
    setSelected(null);
    return
  };

  return (
    <>
      <div className='cal_container'>
        <div className='cal_left'>
          <div className='cal_calendar'>
            <div className='month'>
              <div/>
              <div className='month'>
                <div
                  className='month-shift-button'
                  onClick={()=> shiftMonth(-1)}
                >
                  {'<'}
                </div>
                <div>{months[displayedMonth.month]} {displayedMonth.year}</div>
                <div
                  className='month-shift-button'
                  onClick={()=> shiftMonth(1)}
                >
                  {'>'}
                </div>
              </div>
            </div>

            <div className='weekdays'>
              <div className='weekday'>Sun</div>
              <div className='weekday'>Mon</div>
              <div className='weekday'>Tue</div>
              <div className='weekday'>Wed</div>
              <div className='weekday'>Thu</div>
              <div className='weekday'>Fri</div>
              <div className='weekday'>Sat</div>
            </div>

            <div className='days'>
              {
                initCalendar().map((day, i)=>(
                  <CalendarDay
                    key={i}
                    position={`${day.position}`}
                    date={day.date}
                    projectDay={day.projectDay}
                    selected={selected}
                    clickEvent={setSelected}
                  />
              ))}
            </div>

          </div>
        </div>
        
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

export default Calendar;