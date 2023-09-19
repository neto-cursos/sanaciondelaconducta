import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';

interface Props{
    solicitudes:Array<JSON>;
}

export default function SolicitudTutor({solicitudes}:Props) {
    console.log("solicitudes")
    console.log(solicitudes)

    return (
      <LogoLayout>
        <AppLayout
          title="SolicitudTutor"

        >
                   <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
              <Titulo>Solicitudes de Tutores</Titulo>
              </div>
              <br/>


        </AppLayout>
        </LogoLayout>
      );
    }
    