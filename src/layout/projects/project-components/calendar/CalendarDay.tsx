import '../../projects.css';

type DayProps = {
  event: boolean;
  date: {
    day: number,
    month: number,
    year: number
  };
  position: string;
  clickEvent: Function,
  selected: {
    day: number,
    month: number,
    year: number
  } | null;
};

const CalendarDay: React.FC<DayProps> = (dayData) => {
  const { event, date, position, clickEvent, selected } = dayData;

  const isToday = (): boolean => {
    let results: boolean = false;
    const today: Date = new Date();

    if (
      today.getDate() === date.day &&
      today.getMonth() === date.month &&
      today.getFullYear() === date.year
    ) results = true;

    return results;
  };

  const isSelected = (): boolean => {
    let results = false;

    if (
      selected?.day === date.day &&
      selected?.month === date.month &&
      selected?.year === date.year &&
      position === ""
    ) results = true;

    return results;
  };

  return (
    <div
      className={`day ${isToday() && 'today'} ${position} ${event ? 'event' : ''} ${isSelected() && 'selected'}`}
      onClick={()=> clickEvent({day: date.day, month: date.month, year: date.year})}
    >
      {date.day}
    </div>
  );
};

export default CalendarDay;