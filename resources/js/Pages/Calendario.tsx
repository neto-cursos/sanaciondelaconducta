import React, { useState } from "react";
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import PrimaryButton from '@/Components/PrimaryButton';
import { MyCalendar } from "../Components/MyCalendar";
//import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from 'react';

interface Props{
  sesions:Array<any>;
  horarios:Array<any>;
}

export default function Calendario({sesions,horarios}:Props) {

/*console.log("sesiones")
console.log(sesions)
console.log("horarios")
console.log(horarios)*/

let auxEventos = []
let auxFecha = new Date()
console.log(auxFecha)
for(let i = 0; i < sesions.length; i++) {
  //color distinto para el dia actual
  let auxInicio = new Date(sesions[i].fecha_hora_inicio)

  if(auxInicio.getDate() == auxFecha.getDate() &&
  auxInicio.getMonth() == auxFecha.getMonth() &&
  auxInicio.getFullYear() == auxFecha.getFullYear()){

    auxEventos.push({
      title: sesions[i].name+" "+sesions[i].apellidos,
      start: new Date(sesions[i].fecha_hora_inicio),
      end: new Date(sesions[i].fecha_hora_fin),
      calendarId: 'cal3',
    })

  }else{

    auxEventos.push({
      title: sesions[i].name+" "+sesions[i].apellidos,
      start: new Date(sesions[i].fecha_hora_inicio),
      end: new Date(sesions[i].fecha_hora_fin),
      calendarId: 'cal1',
    })
  }

}

for(let i = 0; i < horarios.length; i++) {

  if(new Date(horarios[i].fecha_hora_fin)>auxFecha){
    console.log("mayor")
  }else{
    console.log("menor")
  }

    auxEventos.push({
      title: "libre",
      start: new Date(horarios[i].fecha_hora_inicio),
      end: new Date(horarios[i].fecha_hora_fin),
      calendarId: 'cal2',
    })

  }

//comportamiento incoherente 
/*const changeDate = (date: Date) => {
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
};*/

const procesarItem = (event: any) => {
  //setSwitchVisibility(false);
  console.log("evento start")
  console.log(event.start)
  console.log("evento end")
  console.log(event.start)
};

    return (
      <LogoLayout>
        <AppLayout
          title="Psicologo"
        >
            <br/>
            <div className={` flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Calendario</Titulo>
              <br/>
              <div className='flex-row'>

              
              
              </div>
              <br/>
              
            </div>
            
              <MyCalendar soloLectura={true} eventos={auxEventos} onClickItem={procesarItem} pintarSeleccion={false}
              />
               
              
            <br/>
        </AppLayout>
      </LogoLayout>
    );
  }
    