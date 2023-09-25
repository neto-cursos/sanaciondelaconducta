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
import { MyCalendar } from "../Components/MyCalendar";
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
    
 /* console.log("user")
    console.log(user)
    console.log("psicologo_id")
    console.log(psicologo_id)
    console.log("paciente_id")
    console.log(paciente_id)
    console.log("sesiones")
    console.log(sesiones)
    console.log("psicologos")
    console.log(psicologos)
    console.log("pagos pendientes")
    console.log(pagos_pendientes)
    console.log("horarios")
    console.log(horarios)*/

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
    sesion_id:''
  })

  const [idEvent,setIdEvent]=useState(-1);

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
    if(sesiones.length == 0){
      console.log("agendar sesion")
      setSwitchVisibility("calendario");
    }else{
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
           sesiones[0].pago_confirmado==false &&
           sesiones[0].cancelador=='paciente'){
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
  }
  };  

  const update = (/*e:any*/) => {
    //e.preventDefault();

    if(idEvent ==-1){
      alert("debe elegir un horario")
    }else{
      setSwitchVisibility("tablaboton");
      put(route('homePaciente.update',idEvent),{
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
    }

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
   // console.log("mayor")
    
    auxEventos.push({
      title: "libre",
      start: new Date(horarios[i].fecha_hora_inicio),
      end: new Date(horarios[i].fecha_hora_fin),
      calendarId: 'cal2',
      id: horarios[i].id,
    })

  }else{
   // console.log("menor")
  }

  }
}


const procesarItem = (event: any) => {
    //setDateInicio(new Date(event.start).toISOString());
    setIdEvent(event.id)
    console.log("evento id")
    console.log(idEvent)
};

    return (
      <LogoLayout>
        <AppLayout
          title="Paciente"
        >
          <br/>
            <div className={` flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
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

              <PrimaryButton className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}  onClick={()=>update()}>Solicitar sesión</PrimaryButton>

              <br/>

              
              </div>

              <div className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}>
              <MyCalendar  soloLectura={true} eventos={auxEventos} onClickItem={procesarItem} pintarSeleccion={true}
              />
              </div>
        </AppLayout>
        </LogoLayout>
      );
    }
    