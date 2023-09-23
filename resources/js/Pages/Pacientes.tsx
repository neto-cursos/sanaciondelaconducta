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
import { isNull } from 'lodash';

interface Props{
    user:JSON;
    pacientes:Array<any>;
    sesiones:any;
    pagos_pendientes:Array<JSON>;
    bloqueos:Array<any>;
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

export default function Pacientes({user,pacientes,sesiones,pagos_pendientes,bloqueos}:Props) {
    console.log("user")
    console.log(user)
    console.log("pacientes")
    console.log(pacientes)
    console.log("sesiones")
    console.log(sesiones)
    console.log("ultima sesion id")
    console.log(sesiones[0].id)
    console.log("pagos pendientes")
    console.log(pagos_pendientes)
    console.log("bloqueos")
    console.log(bloqueos)

    const route = useRoute();
    const [switchVisibility, setSwitchVisibility] = useState("tablaboton");

    const{data,setData,put,post,delete:destroy,processing,reset,errors} = useForm({
    estado:'pendiente',
    pago_confirmado:0,
    paciente_id:0,
    psicologo_id:0,
  })

  console.log("data inicializada")
  console.log(data)
  const calendario = (id:any) => {
//set data
setData({
  paciente_id:id
});
console.log("data actualizada"+data);
if(sesiones.length == 0){
  console.log("agendar sesion")
  setSwitchVisibility("calendario");
}else{

    //check si hay una sesion programada
   let auxFecha = new Date();

   let i = -1;
   let fechaSesion = null;
   do{
    i++;
    if(sesiones[i].paciente_id==id){
      fechaSesion = new Date(sesiones[i].fecha_hora_fin);
    }
   }while(isNull(fechaSesion) && i<(sesiones.length)-1);

   if(isNull(fechaSesion)){
    console.log("agendar sesion")
    setSwitchVisibility("calendario");
   }else{
    if(sesiones[i].estado == "programada" && fechaSesion>auxFecha){
      alert("ya tiene una sesion programada")
    }else{
      
      if(pagos_pendientes.length!=0){
        alert("no puede programar la sesión por un pago pendiente. se le notificará cuando se registre su transacción")
      }else{
        
        let j = -1;
        let psicologoDePaciente = null;
        do{
         j++;
         console.log("par"+pacientes[j].id+","+selected);
         if(pacientes[j].id==selected){
          console.log("entra if")
           psicologoDePaciente = pacientes[j].psicologo_id; 
         }
        }while(isNull(psicologoDePaciente) && j<(pacientes.length)-1);*/

        //si el usuario no tiene psicologo elegir uno->asignar
        if(psicologoDePaciente==null){
          console.log("asignar psicologo")
          setSwitchVisibility("tablapsicologos");
        }else{
          //verificar si el usuario debe compensar una sesion y si es true form de pago y mandar solicitud
          if(sesiones[i].estado == "cancelada" &&
           sesiones[i].contador_cancelaciones==2 &&
           sesiones[i].psicologo_id==psicologoDePaciente &&
           sesiones[i].pago_confirmado==false){
            setSwitchVisibility("formpago");
          }else{
            if(sesiones[i].estado == "solicitada"){
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
    setSwitchVisibility("tablaboton");
    put(route('pacientes.update','2023-11-04 14:00:00,2023-11-04 15:00:00'),{
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

  const isBloqueado = (idPaciente:any) => {
    if(bloqueos.length==0){
      return false;
    }
    let i=-1
    do{
      i++;
      if(bloqueos[i].paciente_id==idPaciente){
        return true;
      }
    }while(i<(bloqueos.length)-1);
    return false;
      }

    return (
      <LogoLayout>
        <AppLayout
          title="Pacientes de Psicologo"
        >
          <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Pacientes</Titulo>
              <br />
              <PrimaryButton className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}  onClick={()=>update()}>Calendario</PrimaryButton>
              <br />
              <PrimaryButton className={`${switchVisibility=="calendario" ? 'visible' : 'collapse'}`}  onClick={()=>setSwitchVisibility("tablaboton")}>Cancelar</PrimaryButton>
              <table className={`table-auto ${switchVisibility=="tablaboton" ? 'visible' : 'collapse'}`}>

                <thead>
                <tr>
                <th>CI</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Estado del paciente</th>
                <th>Programar sesión</th>
                <th>Bloquear</th>
                <th>Dar de alta</th>
                </tr>
                </thead>

                <tbody>
                {pacientes.map((item:any) => (
                <tr  key={item.id}>
                <td>{item.ci}</td>
                <td>{item.name}</td>
                <td>{item.apellidos}</td>
                <td className={`${isBloqueado(item.id) ? 'bg-customVerdeOscuro' : item.isAlta==false ? 'bg-customMoradoClaro': 'bg-customMoradoOscuro'}`}>{`${isBloqueado(item.id) ? 'bloqueado' : item.isAlta==false ? 'disponible': 'dado de alta'}`}</td>
                <td><PrimaryButton className={`${item.isAlta==false && isBloqueado(item.id) == false ? 'visible' : 'collapse'}`} onClick={()=>calendario(item.id)}>Programar sesión</PrimaryButton></td>
                <td><PrimaryButton className={`${item.isAlta==false && isBloqueado(item.id) == false ? 'visible' : 'collapse'}`} onClick={()=>console.log("bloquear:"+item.id)}>Bloquear</PrimaryButton></td>
                <td><PrimaryButton className={` ${item.isAlta==false && isBloqueado(item.id) == false ? 'visible' : 'collapse'}`} onClick={()=>console.log("dar de alta:"+item.id)}>Dar de alta</PrimaryButton></td>
                </tr>
                    
                ))}
                </tbody>
              </table>

              </div>
        </AppLayout>
        </LogoLayout>
      );
    }
    