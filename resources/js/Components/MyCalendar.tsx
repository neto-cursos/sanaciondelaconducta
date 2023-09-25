/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import PrimaryButton from '@/Components/PrimaryButton';
import { useCallback, useEffect, useRef, useState } from 'react';
interface Props{
    soloLectura:boolean;
    eventos: Array<any>;
    onClickItem: (item:any) =>void;
    pintarSeleccion: boolean;
}

  /*interface TimezoneConfig {
    timezoneName: string;
    displayLabel?: string;
    tooltip?: string;
  }
  
  interface TimezoneOptions {
    zones?: TimezoneConfig[];
    customOffsetCalculator?: (timezoneName: string, timestamp: number) => number;
  }*/


export function MyCalendar({soloLectura,eventos,onClickItem,pintarSeleccion}:Props) {
    console.log("llegaron los siguientes eventos")
    console.log(eventos)
    const [startDate, setStartDate] = useState(new Date());
    const [year, setYear] = useState(2024)
    const [month, setMonth] = useState(0)
    const [date, setDate] = useState(1)
    const calendarRef = useRef<typeof Calendar>(null);

    const [idPintado,setIdPintado]=useState(-1);

    function formatTime(time:any) {
        const hours = `${time.getHours()}`.padStart(2, '0');
        const minutes = `${time.getMinutes()}`.padStart(2, '0');
        return `${hours}:${minutes}`;
      }

    const calendars =     [
        {
          id: 'cal1',
          name: 'sesion',
          backgroundColor: '#f8c2a1',
        },
        {
          id: 'cal2',
          name: 'horario',
          backgroundColor: '#d1bcde',
        },
        {
          id: 'cal3',
          name: 'sesion',
          backgroundColor: '#19757c',
        },
        {
          id: 'cal4',
          name: 'horario',
          backgroundColor: 'red',
        },
      ];

      //el mes en const eventos va de 1 (enero) a 12 (diciembre)
 /* const eventos = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2023-09-28T12:00:00',
      end: '2023-09-28T13:00:00',
      isVisible: true,
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2023-09-28T15:00:00',
      end: '2023-09-28T16:00:00',
      isVisible: true,
    },
    {
        id: 'event1',
        calendarId: 'cal1',
        title: 'Weekly Meeting',
        start: '2023-09-28T09:00:00',
        end: '2023-09-28T10:00:00',
        isVisible: true,
      },
      {
        id: 'event2',
        calendarId: 'cal2',
        title: 'Mothlyy sscrum',
        start: '2023-09-27T12:00:00',
        end: '2023-09-27T13:00:00',
        isVisible: true,
      },
  ];*/

         const   template={
            time(event) {
              const { id,start, end, title, isVisible } = event;
        
                return `<div style="color: black;">${formatTime(start)}-${formatTime(end)}</div>
                <div style="color: black;">${title}</div>`;
        
              
            },
        
          };

          const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

          const previousWeek = () => {
            getCalInstance().prev()
          };
          
          const nextWeek = () => {
            getCalInstance().next()
          };
          
          const today = () => {
            getCalInstance().today()
          };

          const onClickEvent: ExternalEventTypes['clickEvent'] = (res) => {

            onClickItem(res.event);
            console.group('onClickEvent');
            console.log('MouseEvent : ', res.nativeEvent);
            console.log('Event Info : ', res.event);
            console.groupEnd();

            if (pintarSeleccion == true){

              if(idPintado!=-1){
                getCalInstance().updateEvent(idPintado, 'cal4', {
                  calendarId: 'cal2',
                });
              }
              
              getCalInstance().updateEvent(res.event.id, 'cal2', {
                calendarId: 'cal4',
              });
              setIdPintado(res.event.id)
            }
                      
              
                       
          };

  //documentacion de parametros https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#eventfilter 
  // eventFilter: (event) => event.isVisible==true!!,
    return (
        <>
        <div className={` flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
            <PrimaryButton onClick={(previousWeek)}>Anterior Semana</PrimaryButton>
            <PrimaryButton onClick={(nextWeek)}>Siguiente Semana</PrimaryButton>
            {/*<PrimaryButton onClick={(diaElegido)}>Ir a 26 de Septiembre del 2023</PrimaryButton>
            <DatePicker selected={startDate} onChange={(date:Date) => changeDate(date)} /> */}
            <PrimaryButton onClick={(today)}>Hoy</PrimaryButton></div>
            <br/>
      <div>
        <Calendar 
        ref={calendarRef}
        useFormPopup = {false}
        useDetailPopup = {false}
        isReadOnly = {soloLectura}
        usageStatistics={false} 
        height="900px"
        view="week"
        week={ {
            startDayOfWeek: 1, //Monday
            dayNames: [ 'Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], //este string debe cambiar dependiendo de region
            narrowWeekend: false,
            workweek: false,
            showNowIndicator: false,
            //showTimezoneCollapseButton: false,
            //timezonesCollapsed: true,
            hourStart: 6,
            hourEnd: 24,
            eventView: ['time'],
            taskView: false,
            collapseDuplicateEvents:false,
          }}
        gridSelection={{
            enableDblClick: false,
            enableClick: false,
          }}
          theme={ {
            week: {
              today: {
                color: 'blue',
              },
              gridSelection: {
                color: 'grey',
              },
              timeGrid: {
                borderRight: '1px solid #e5e5e5',
              },
            },
          }}
          calendars={calendars}
          events={eventos}
          onClickEvent={onClickEvent}

          template={template}
        />
       
      </div>
      <div>Copyright (c) 2021 NHN Corp.</div>
      </>
    );
  }