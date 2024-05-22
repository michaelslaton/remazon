type DayProps = {
  date: number;
  position: string;
  event: boolean;
}

const CalendarDay: React.FC<DayProps> = (dayData) => {

  let today = new Date();

  return (
    <div
      className={`day ${today.getDate() === dayData.date && dayData.position === '' && 'today'} ${dayData.position} ${dayData.event ? 'event' : ''}`}
    >
      {dayData.date}
    </div>
  )
}

export default CalendarDay;