import React, { useRef, useState } from 'react'
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import useRoute from '@/Hooks/useRoute';
import CustomButton from '@/Components/CustomButton';
import InputLabel from '@/Components/InputLabel';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

interface Props{
    user:JSON;
    psicologo_id:number;
    paciente_id:number;
    sesiones:any;
    psicologos:Array<JSON>;
    pagos_pendientes:Array<JSON>;
    horarios:Array<any>;
}

/*interface User{
  id: string
  name: string
  apellidos: string
  email: string
  canal_comunicacion: string
  fecha_nacimiento: Date
  ocupacion: string
  ci: string
}*/

export default function HomePaciente({user,psicologo_id,paciente_id,sesiones,psicologos,pagos_pendientes,horarios}:Props) {
    console.log("user")
    console.log(user)
    console.log("psicologo_id")
    console.log(psicologo_id)
    console.log("paciente_id")
    console.log(paciente_id)
    console.log("sesiones")
    console.log(sesiones)
    console.log("ultima sesion id")
    console.log(sesiones[0].id)
    console.log("psicologos")
    console.log(psicologos)
    console.log("pagos pendientes")
    console.log(pagos_pendientes)
    console.log("horarios")
    console.log(horarios)

    const route = useRoute();
    const [switchVisibility, setSwitchVisibility] = useState("tablaboton");

    const servicioInput= useRef(null)
    const institucionInput= useRef(null)
    const convenioInput= useRef(null)

    const{data,setData,put,post,delete:destroy,processing,reset,errors} = useForm({
    estado:'pendiente',
    pago_confirmado:0,
    paciente_id:paciente_id,
    psicologo_id:psicologo_id,
    
    servicio:'',
    institucion:'',
    convenio:'',
    sesion_id:sesiones[0].id
  })

  const asignarPsicologo = (psicologo_id: any) => {
    setSwitchVisibility("tablaboton")
    destroy(route('homePaciente.destroy',paciente_id+","+psicologo_id),{
      onSuccess:()=>{
        alert("Exito")
      },
      onError:()=>{
        /*if(errors.name){
          reset('name')
        }
        if(errors.email){
          reset('email')
        }*/
      },
    });
  };

  const programarSesion = () => {
    //check si hay una sesion programada
   let auxFecha = new Date();
   let fechaSesion = new Date(sesiones[0].fecha_hora_fin)
    if(sesiones[0].estado == "programada" && fechaSesion>auxFecha){
      alert("ya tiene una sesion programada")
    }else{
      
      if(pagos_pendientes.length!=0){
        alert("no puede programar la sesión por un pago pendiente. se le notificará cuando se registre su transacción")
      }else{
        
        //si el usuario no tiene psicologo elegir uno->asignar
        if(psicologo_id==null){
          console.log("asignar psicologo")
          setSwitchVisibility("tablapsicologos");
        }else{
          //verificar si el usuario debe compensar una sesion y si es true form de pago y mandar solicitud
          if(sesiones.length == 0){
            console.log("agendar sesion")
            setSwitchVisibility("calendario");
          }else{
          if(sesiones[0].estado == "cancelada" &&
           sesiones[0].contador_cancelaciones==2 &&
           sesiones[0].psicologo_id==psicologo_id &&
           sesiones[0].pago_confirmado==false){
            setSwitchVisibility("formpago");
          }else{
            if(sesiones[0].estado == "solicitada"){
              alert("tiene una solicitud de sesión pendiente. no puede programar otra sesión")
            }else{
              console.log("agendar sesion")
              setSwitchVisibility("calendario");
            }
          }
        }
        }
      }
    }
  };  

  const update = (/*e:any*/) => {
    //e.preventDefault();
    setSwitchVisibility("tablaboton");
    put(route('homePaciente.update','2023-11-04 14:00:00,2023-11-04 15:00:00'),{
      onSuccess:()=>{
        alert("Exito")
      },
      onError:()=>{
        /*if(errors.name){
          reset('name')
        }
        if(errors.email){
          reset('email')
        }*/
      },
    });
  };

  const save = (e:any) => {
    e.preventDefault();
    setSwitchVisibility("tablaboton");
    post(route('homePaciente.store'),{
      onSuccess:()=>{
        alert("Exito")
      },
      onError:()=>{
        /*if(errors.name){
          reset('name')
        }
        if(errors.email){
          reset('email')
        }*/
      },
    });
    
  };

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
  useDetailPopup: false,
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
    enableDblClick: false,
    enableClick: false,
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
  ],
});

/*let jsondeeventos = [ {
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
]*/

//el mes en los objetos del json de eventos va de 1 (enero) a 12 (diciembre)
let auxEventos = []
let auxFecha = new Date()
console.log(auxFecha)
/*for(let i = 0; i < sesions.length; i++) {
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

}*/
if(horarios.length>0){
  

for(let i = 0; i < horarios.length; i++) {

  if(new Date(horarios[i].fecha_hora_inicio)>auxFecha){
    console.log("mayor")
    
    auxEventos.push({
      title: "libre",
      start: new Date(horarios[i].fecha_hora_inicio),
      end: new Date(horarios[i].fecha_hora_fin),
      calendarId: 'cal2',
    })

  }else{
    console.log("menor")
  }

  }
  calendar.createEvents(auxEventos);
}


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
    return (
      <LogoLayout>
        <AppLayout
          title="Paciente"
        >
          <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Home Paciente</Titulo>

              <br />

              <PrimaryButton className={`${switchVisibility=="tablaboton" ? 'visible' : 'collapse'}`} onClick={()=>programarSesion()}>Programar Sesión</PrimaryButton>
              
              <br />
             <form className={`w-[350px] ${switchVisibility=="formpago" ? 'visible' : 'collapse'}`} onSubmit={save}>
              <div className="mt-4"> 
                <InputLabel htmlFor="servicio">Servicio</InputLabel>
                  <TextInput
                    id="servicio"
                    name="servicio"
                    ref={servicioInput}
                    className="mt-1 block w-full isFocused "
                    value={data.servicio}
                  onChange={e => setData('servicio', e.target.value)}
                    required
                    
                    placeholder="servicio"
                  />
                  <InputError className="mt-2" message={errors.servicio} />
                </div>
                <br />

                <div className="mt-4"> 
                <InputLabel htmlFor="institucion">Institución</InputLabel>
                  <TextInput
                    id="institucion"
                    name="institucion"
                    ref={institucionInput}
                    className="mt-1 block w-full isFocused "
                    value={data.institucion}
                  onChange={e => setData('institucion', e.target.value)}
                    required
                    
                    placeholder="institucion"
                  />
                  <InputError className="mt-2" message={errors.institucion} />
                </div>
                <br />

                <div className="mt-4">
                    <InputLabel htmlFor="convenio">Convenio</InputLabel>
                    <TextInput
                      id="convenio"
                      name="convenio"
                      ref={convenioInput}
                      className="mt-1 block w-full "
                      value={data.convenio}
                    onChange={e => setData('convenio', e.target.value)}
                      required
                      
                      placeholder="convenio"
                    />
                    <InputError className="mt-2" message={errors.convenio} />
                  </div>
                <br />

                <CustomButton onClick={()=>save}>Enviar comprobante de pago</CustomButton>
              </form>
              <br/>
              <PrimaryButton className={`${switchVisibility=="oculto" ? 'visible' : 'collapse'}`}  onClick={()=>console.log("a")}>Cancelar</PrimaryButton>


              <br />

              
              <br/>

              <table className={`table-auto ${switchVisibility=="tablapsicologos" ? 'visible' : 'collapse'}`}>

                <thead>
                <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Fecha de nacimiento</th>
                <th>Fecha de función de titulo</th>
                <th>Universidad</th>
                {/*<th>Ciudad de residencia</th>
                <th>Departamento de residencia</th>
                    <th>País de residencia</th>*/}
                <th>CV</th>
                <th>Descripción de CV</th>
                <th>Foto</th>
                <th>Elegir psicólogo</th>
                </tr>
                </thead>

                <tbody>
                {psicologos.map((item:any) => (
                <tr  key={item.id}>
                <td>{item.name}</td>
                <td>{item.apellidos}</td>
                <td>{item.fecha_nacimiento}</td>
                <td>{item.fecha_funcion_titulo}</td>
                <td>{item.universidad}</td>
                {/*<td>{item.ciudad_residencia}</td>
                <td>{item.departamento_residencia}</td>
                <td>{item.pais_residencia}</td>*/}
                <td>{item.archivo}</td>
                <td>{item.descripcion_cv}</td>
                <td>{item.foto}</td>
                <td><PrimaryButton onClick={()=>asignarPsicologo(item.id)}>Elegir psicólogo</PrimaryButton></td>

                </tr>
                    
                ))}
                </tbody>
              </table>

              <PrimaryButton className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}  onClick={()=>update()}>Calendario</PrimaryButton>

              <br/>
              <div className={`flex-row ${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}>
              <PrimaryButton onClick={(previousWeek)}>Anterior Semana</PrimaryButton>
              <PrimaryButton onClick={(nextWeek)}>Siguiente Semana</PrimaryButton>
           {/*  <PrimaryButton onClick={(diaElegido)}>Ir a 26 de Septiembre del 2023</PrimaryButton>
             <DatePicker selected={startDate} onChange={(date:Date) => changeDate(date)} />*/} 
              <PrimaryButton onClick={(today)}>Hoy</PrimaryButton>
              
              
              </div>
              <br/>

              <div id="calendar" className={`w-[1000px] h-[800px] bg-customMoradoClaro ${switchVisibility=="calendario" ? 'visible' : 'collapse'}`} >
                <div className='collapse'>calendar.render()</div>
              </div>
            <div className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}>Copyright (c) 2021 NHN Corp.</div>
              </div>
        </AppLayout>
        </LogoLayout>
      );
    }
    