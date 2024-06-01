import { NavigateFunction, useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import months from '../../../../data/months';
import '../../projects.css';
import { useAppSelector } from '../../../../redux/hooks';
import Project from './CalendarProject';
import { useState } from 'react';

type CalendarListProps = {
  selected: { day: number, month: number, year: number } | null;
}

const CalendarList: React.FC<CalendarListProps> = ({ selected }) => {
  const projectsList = useAppSelector((state)=> state.projectsControl.projects);
  const navigate: NavigateFunction = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(null);

  const today: Date = new Date();

  const acceptableDate = (): boolean => {
    let results: boolean = false;
    if(Number(selected?.year) < today.getFullYear()) return results;
    if(Number(selected?.year) === today.getFullYear()){
      if(Number(selected?.month) < today.getMonth()) return results;
      else if(Number(selected?.month) === today.getMonth()){
        if(Number(selected?.day) < today.getDate()) return results;
      };
    };

    return true;
  }

  return (
    <div className='cal_right'>
      { selected &&
        <>
          <div className='project__list-header'>
            <h2 className='title project__list-title'>
              {months[selected!.month]} {selected!.day}, {selected!.year}
            </h2>

            { acceptableDate() &&
              <button
                onClick={()=> navigate(`/projects/create?day=${selected?.day}&month=${selected?.month}&year=${selected?.year}`)}
                className='button card-button project__new-project-button'
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            }
          </div>
          {
            selected &&
            projectsList
              .filter((project)=>{
                const projectDate = new Date(project.date);
                if(projectDate.getFullYear() !== selected.year) return;
                if(projectDate.getMonth() !== selected.month) return;
                else if(projectDate.getDate() ===  selected.day) return project;
              })
              .map((project, i)=>(
                <Project key={i} data={project} expanded={expanded} setExpanded={setExpanded}/>
            ))
          }
        </>
      }

    </div>
  );
};

export default CalendarList;