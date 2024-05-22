import months from '../../data/months';
import CalendarDay from './calendar-components/CalendarDay';
import './projectCalendar.css';

type DayProps = {
  date: number;
  position: string;
  event: boolean;
}

const ProjectCalendar: React.FC = () =>{

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    let days: DayProps[] = [];

    const projects = [
      {
          id: 1,
          date: '2024-05-23T08:00:00.000Z',
      },
    ]

    for(let x = day; x > 0; x--){
      days.push({position: 'prev-date', date: Number(prevDays - x + 1), event: false});
    };

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      for(let x = 0; x<projects.length;x++){
        const projectDate = new Date(projects[x].date);
        if(projectDate.getDate() === i && projectDate.getFullYear() === year) {
          event = true;
        }
      }
      days.push({position: '', date: i, event: event});
    }

    for (let j = 1; j <= nextDays; j++) {
      days.push({position: 'next-date', date: j, event: false});
    }

    return days;
  };

  return (
    <>
      <div className='cal_container'>
        <div className='cal_left'>
          <div className='cal_calendar'>
            <div className="month">
              <div/><div className="date">{'<'} {months[month]} {year} {'>'}</div><div/>
            </div>

            <div className="weekdays">
              <div className='weekday'>Sun</div>
              <div className='weekday'>Mon</div>
              <div className='weekday'>Tue</div>
              <div className='weekday'>Wed</div>
              <div className='weekday'>Thu</div>
              <div className='weekday'>Fri</div>
              <div className='weekday'>Sat</div>
            </div>

            <div className='days'>
              {initCalendar().map((day, i)=>(
                <CalendarDay key={i} position={`${day.position}`} date={day.date} event={day.event}/>)
              )}
            </div>

          </div>
        </div>
        
        <div className='cal_right'>

        </div>
      </div>
    </>
  );
};

export default ProjectCalendar;