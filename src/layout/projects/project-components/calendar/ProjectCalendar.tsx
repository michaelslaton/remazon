import { useState } from 'react';
import months from '../../../../data/months';
import CalendarDay from './CalendarDay';
import { useAppSelector } from '../../../../redux/hooks';
import '../../projects.css';

type DayType = {
  event: boolean;
  date: {
    day: number,
    month: number,
    year: number
  };
  position: string;
};

const ProjectCalendar: React.FC = () =>{
  const projectsList = useAppSelector((state)=> state.projectsControl.projects);
  const [ monthOffset, setMonthOffset ] = useState<number>(0);
  const [ selected, setSelected ] = useState<{ day: number, month: number, year: number } | null>(null);

  let today: Date = new Date();
  let month: number = today.getMonth() + monthOffset;
  let year: number = today.getFullYear();
  
  const getEventDays = (): number[] => {
    let results: number[] = [];
    
    projectsList.forEach((project)=>{
      const projectDate = new Date(project.date);
      if(projectDate.getFullYear() !== year) return;
      if(projectDate.getMonth() !== month) return;
      else results.push(projectDate.getDate());
    });
    
    return results;
  };

  const eventDays: number[] = getEventDays();
  
  const initCalendar = (): DayType[] => {
    const firstDay: Date = new Date(year, month, 1);
    const lastDay: Date = new Date(year, month + 1, 0);
    const prevLastDay: Date = new Date(year, month, 0);
    const prevDays: number = prevLastDay.getDate();
    const lastDate: number = lastDay.getDate();
    const day: number = firstDay.getDay();
    const nextDays: number = 7 - lastDay.getDay() - 1;

    let days: DayType[] = [];

    for(let x = day; x > 0; x--){
      days.push({position: 'prev-date', date: {day: Number(prevDays - x + 1), month, year}, event: false});
    };

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      if(eventDays.includes(i)) event = true;
      days.push({position: '', date: {day: i, month, year}, event: event});
    };

    for (let j = 1; j <= nextDays; j++) {
      days.push({position: 'next-date', date: {day: j, month, year}, event: false});
    };

    return days;
  };

  const shiftMonth = (amount: number): void => {
    setMonthOffset(monthOffset + amount);
    setSelected(null);
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
                <div>{months[month]} {year}</div>
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
                    event={day.event}
                    selected={selected}
                    clickEvent={setSelected}
                  />
              ))}
            </div>

          </div>
        </div>
        
        <div className='cal_right'>
          {
            selected &&
            projectsList
              .filter((project)=>{
                const projectDate = new Date(project.date);
                if(projectDate.getFullYear() !== selected.year) return;
                if(projectDate.getMonth() !== selected.month) return;
                else if(projectDate.getDate() ===  selected.day) return project;
              })
              .map((project)=>(
                <div>
                  {project.name}
                </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ProjectCalendar;