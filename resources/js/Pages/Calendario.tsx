import React, { useState } from "react";
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import PrimaryButton from '@/Components/PrimaryButton';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props{
  sesions:Array<JSON>;
  horarios:Array<JSON>;
}

export default function Calendario({sesions,horarios}:Props) {
console.log("sesiones")
console.log(sesions)
console.log("horarios")
console.log(horarios)


  /*interface TimezoneConfig {
    timezoneName: string;
    displayLabel?: string;
    tooltip?: string;
  }
  
  interface TimezoneOptions {
    zones?: TimezoneConfig[];
    customOffsetCalculator?: (timezoneName: string, timestamp: number) => number;
  }*/

  function formatTime(time:any) {
    const hours = `${time.getHours()}`.padStart(2, '0');
    const minutes = `${time.getMinutes()}`.padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }



  //documentacion de parametros https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#eventfilter 
  const calendar = new Calendar('#calendar', {
  defaultView: 'week',
  useFormPopup: false,
  useDetailPopup: true,
  isReadOnly: true,
  usageStatistics: false,
  eventFilter: (event) => event.isVisible==true!!,
  week: {
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
  },
  gridSelection: {
    enableDblClick: true,
    enableClick: true,
  },
  
  /*timezone: {
    zones: [
      {
        timezoneName: 'Europe/London',
      },
    ],
  },*/
  theme: {
    week: {
      today: {
        color: 'blue',
      },
      /*gridSelection: {
        color: 'grey',
      },*/
      timeGrid: {
        borderRight: '1px solid #e5e5e5',
      },
    },
  },
  template: {
    time(event) {
      const { start, end, title, isVisible } = event;

        return `<div style="color: black;">${formatTime(start)}-${formatTime(end)}</div>
        <div style="color: black;">${title}</div>`;

      
    },

  },
  //usar para colores de casillas?
  calendars: [
    {
      id: 'cal1',
      name: 'Sesión',
      backgroundColor: '#f8c2a1',
    },
    {
      id: 'cal2',
      name: 'Libre',
      backgroundColor: '#d1bcde',
    },
  ],
});

//convertir sesions y horarios a los siguientes json

//el mes en los objetos del json de eventos va de 1 (enero) a 12 (diciembre)
let jsondeeventos = [ {
  id: 'event1',
  calendarId: 'cal1',
  title: 'Weekly Meeting',
  start: '2023-08-30T09:00:00',
  end: '2023-08-30T10:00:00',
  isVisible: true,
},
{
  id: 'event2',
  calendarId: 'cal2',
  title: 'Mothlyy sscrum',
  start: '2023-09-07T12:00:00',
  end: '2023-09-07T13:00:00',
  isVisible: true,
},
]

calendar.createEvents(jsondeeventos);

const previousWeek = () => {
  calendar.prev()
};

const nextWeek = () => {
  calendar.next()
};

const today = () => {
  calendar.today()
};

const diaElegido = (/*annio,mes,dia*/) => {
  //el primer valor es el annio, el segundo es el mes EMPIEZA EN 0 (O ES ENERO Y 11 ES DICIEMBRE), dia
  calendar.setDate(new Date(2023, 8, 26));
};


const [startDate, setStartDate] = useState(new Date());
const [year, setYear] = useState(2023)
const [month, setMonth] = useState(0)
const [date, setDate] = useState(1)

//comportamiento incoherente 
const changeDate = (date: Date) => {
  console.log("enviado"+date)
  setStartDate(date);
  startDate.setFullYear(date.getFullYear())
  startDate.setMonth(date.getMonth())
  startDate.setDate(date.getDate())
  setYear(startDate.getFullYear())
  setMonth(startDate.getMonth())
  setDate(startDate.getDate())
  startDate.setTime(date.getTime())
  console.log("cambiado"+startDate)
  let v = (startDate.toLocaleString())
  calendar.setDate(v)
 console.log(calendar.getDate())
  //2023-08-30T09:00:00
  //2023-08-30
};

    return (
      <LogoLayout>
        <AppLayout
          title="Psicologo"
        >
            <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Calendario</Titulo>
              <br/>
              <div className='flex-row'>
              <PrimaryButton onClick={(previousWeek)}>Anterior Semana</PrimaryButton>
              <PrimaryButton onClick={(nextWeek)}>Siguiente Semana</PrimaryButton>
           {/*  <PrimaryButton onClick={(diaElegido)}>Ir a 26 de Septiembre del 2023</PrimaryButton>
             <DatePicker selected={startDate} onChange={(date:Date) => changeDate(date)} />*/} 
              <PrimaryButton onClick={(today)}>Hoy</PrimaryButton>
              
              
              </div>
              <br/>

              <div id="calendar" className="w-[800px] h-[800px] bg-customMoradoClaro">
                <div className='collapse'>calendar.render()</div>
              </div>
            <div>Copyright (c) 2021 NHN Corp.</div>
            </div>

            <br/>

        </AppLayout>
      </LogoLayout>
    );
  }
    