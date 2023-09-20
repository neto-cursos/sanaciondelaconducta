import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';
import PrimaryButton from '@/Components/PrimaryButton';
import React, { useRef, useState } from 'react'
import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';

interface Props{
    solicitudes:Array<JSON>;
}

export default function SolicitudTutor({solicitudes}:Props) {
    console.log("solicitudes")
    console.log(solicitudes)

    const route = useRoute();
    const [switchVisibility, setSwitchVisibility] = useState(true);
    const [operation, setOperation] = useState(1);
    const [itemId, setItemId] = useState(1);
    const{put,delete:destroy,processing,reset,errors} = useForm({
      })

    const aceptarSolicitud = (id: any) => {
        setSwitchVisibility(false);
        let a = id.toString()
        setOperation(1);
        setItemId(a)
      };

    const rechazarSolicitud = (id: any) => {
        setSwitchVisibility(false);
        let a = id.toString()
        setOperation(2);
        setItemId(a)
      };

      const cancelar = () => {
        setSwitchVisibility(true);
      };

      const actualizar = () => {
        setSwitchVisibility(true);
        update()
      };

    const update = () => {
        if(operation === 1){
            put(route('solicitudTutor.update',itemId),{
                onSuccess:()=>{
                  alert("Exito aceptar")
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
        }else{
            destroy(route('solicitudTutor.destroy',itemId),{
                onSuccess:()=>{
                  alert("Exito rechazo")
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

    return (
      <LogoLayout>
        <AppLayout
          title="SolicitudTutor"

        >
                   <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Solicitudes de Tutores</Titulo>
              <br/>
              {/*solicitudes.length == 0 ? <Titulo>NO HAY NADA</Titulo> : 
              
              <Titulo>HAY {'solicitudes.length'} ELEMENTOS</Titulo>*/
              }
                  <table className={`table-auto ${switchVisibility ? 'visible' : 'collapse'}`}>

                    <thead>
                    <tr>
                    <th>Nombre del solicitante</th>
                    <th>Apellidos del solicitante</th>
                    <th>CI del paciente solicitado</th>
                    <th>Aceptar Solicitud</th>
                    <th>Rechazar Solicitud</th>
                    </tr>
                    </thead>
                    <tbody>
                    {solicitudes.map((item:any) => (

                        <tr  key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.apellidos}</td>
                    <td>{item.ci}</td>
                    <td><PrimaryButton onClick={()=>aceptarSolicitud(item.id)}>Aceptar Solicitud</PrimaryButton></td>
                    <td><PrimaryButton onClick={()=>rechazarSolicitud(item.id)}>Rechazar Solicitud</PrimaryButton></td>

                    </tr>
                        
                    ))}
                    </tbody>
                </table>

                <br/>
                <PrimaryButton className={`table-auto ${switchVisibility ? 'collapse' : 'visible'}`} onClick={()=>cancelar()}>Cancelar</PrimaryButton>
                <br/>
                <PrimaryButton className={`table-auto ${switchVisibility ? 'collapse' : 'visible'}`} onClick={()=>actualizar()}>Confirmar</PrimaryButton>

                </div>




        </AppLayout>
        </LogoLayout>
      );
    }
    