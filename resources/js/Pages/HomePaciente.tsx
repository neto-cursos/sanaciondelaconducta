import React, { useRef, useState } from 'react'
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import TablaUsuarios from '@/Components/TablaUsuarios';
import Titulo from '@/Components/Titulo';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import useRoute from '@/Hooks/useRoute';
import CustomButton from '@/Components/CustomButton';
import InputLabel from '@/Components/InputLabel';

interface Props{
    user:JSON;
    psicologo_id:number;
    paciente_id:number;
    sesiones:any;
    psicologos:Array<JSON>;
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

export default function HomePaciente({user,psicologo_id,paciente_id,sesiones,psicologos}:Props) {
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

    const route = useRoute();
  const [switchVisibility, setSwitchVisibility] = useState("tablaboton");
  const fecha_hora_inicioInput= useRef(null)
  const fecha_hora_finInput= useRef(null)

  const servicioInput= useRef(null)
  const institucionInput= useRef(null)
  const convenioInput= useRef(null)
  const{data,setData,put,post,processing,reset,errors} = useForm({
    operacion:"",
    estado:'pendiente',
    pago_confirmado:0,
    fecha_hora_inicio:'',
    fecha_hora_fin:'',
    paciente_id:paciente_id,
    psicologo_id:psicologo_id,
    //
    servicio:'',
    institucion:'',
    convenio:'',
    sesion_id:sesiones[0].id
  })


  const programarSesion = () => {
    //check si hay una sesion programada
   let auxFecha = new Date();
   let fechaSesion = new Date(sesiones[0].fecha_hora_fin)
    if(sesiones[0].estado == "programada" && fechaSesion>auxFecha){
      alert("ya tiene una sesion programada")
    }else{
      console.log("siguiente if")
      if(){

      }else{
        
      }
    }
  };
  //cuando se apreta el boton
  //si el usuario debe compensar una sesion y tiene una solicitud pendiente mostrar alerta de que espere
  //si el usuario debe compensar una sesion y no tiene solicitud pendiente mostrar form de pago y mandar solicitud
  
  //si el usuario tiene todos los pagos confirmados->
  //si el usuario no tiene psicologo elegir uno->asignar
  //cuando el usuario tiene psicologo puede finalmente agendar sesion mostrando calendario

  const mostrarFormSesion = (obj: any) => {
    setSwitchVisibility("formSesion");
    setData({
      fecha_hora_inicio:obj.fecha_hora_inicio,
      fecha_hora_fin:obj.fecha_hora_fin
});
  };

  const ocultarFormSesion = () => {
    setSwitchVisibility("");
  };

  const mostrarFormPsicologo = (obj: any) => {
    setSwitchVisibility("formPsicologo");
    /*setData({

});*/
  };

  const ocultarFormPsicologo = () => {
    setSwitchVisibility("");
  };

  const mostrarFormPago = (obj: any) => {
    setSwitchVisibility("formPago");
    setData({
      servicio:obj.servicio,
      institucion:obj.institucion,
      convenio:obj.convenio,
});
  };

  const ocultarFormPago = () => {
    setSwitchVisibility("");
  };

  const asignarPsicologo = (id: any) => {
    setData({
      psicologo_id:id,  
      operacion:"asignarPsicologo"
});

setSwitchVisibility("confirmar update");
  };

  const update = (e:any) => {
    e.preventDefault();
    setSwitchVisibility("");
    put(route('homePaciente.update',data.paciente_id),{
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
    //setSwitchVisibility(true);
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
             <form className="w-[350px]" onSubmit={save}>
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
               
                {/*  <label>
                    Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} />
                  </label>
                  <hr />
                  <p>
                    Radio buttons:
                    <label><input type="radio" name="myRadio" value="option1" /> Option 1</label>
                    <label><input type="radio" name="myRadio" value="option2" defaultChecked={true} /> Option 2</label>
                    <label><input type="radio" name="myRadio" value="option3" /> Option 3</label>
                  </p>
                  <hr />
                  <button type="reset">Reset form</button>
                  <button type="submit">Submit form</button>
                      */}

                <CustomButton onClick={()=>save}>Editar usuario</CustomButton>
              </form>
              <br/>
              <PrimaryButton   onClick={()=>ocultarFormPago()}>Cancelar</PrimaryButton>


              <br />
             <form className="w-[350px]" onSubmit={update}>
              <div className="mt-4"> 
                <InputLabel htmlFor="fecha_hora_inicio">Fecha Hora Inicio</InputLabel>
                  <TextInput
                    id="fecha_hora_inicio"
                    name="fecha_hora_inicio"
                    ref={fecha_hora_inicioInput}
                    className="mt-1 block w-full isFocused "
                    value={data.fecha_hora_inicio}
                  onChange={e => setData('fecha_hora_inicio', e.target.value)}
                    required
                    
                    placeholder="fecha hora inicio"
                  />
                  <InputError className="mt-2" message={errors.fecha_hora_inicio} />
                </div>
                <br />

                <div className="mt-4"> 
                <InputLabel htmlFor="fecha_hora_fin">Fecha Hora Fin</InputLabel>
                  <TextInput
                    id="fecha_hora_fin"
                    name="fecha_hora_fin"
                    ref={fecha_hora_finInput}
                    className="mt-1 block w-full isFocused "
                    value={data.fecha_hora_fin}
                  onChange={e => setData('fecha_hora_fin', e.target.value)}
                    required
                    
                    placeholder="fecha hora fin"
                  />
                  <InputError className="mt-2" message={errors.fecha_hora_fin} />
                </div>
                <br />
               
                {/*  <label>
                    Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} />
                  </label>
                  <hr />
                  <p>
                    Radio buttons:
                    <label><input type="radio" name="myRadio" value="option1" /> Option 1</label>
                    <label><input type="radio" name="myRadio" value="option2" defaultChecked={true} /> Option 2</label>
                    <label><input type="radio" name="myRadio" value="option3" /> Option 3</label>
                  </p>
                  <hr />
                  <button type="reset">Reset form</button>
                  <button type="submit">Submit form</button>
                      */}

                <CustomButton onClick={()=>update}>Editar usuario</CustomButton>
              </form>
              <br/>
              <PrimaryButton   onClick={()=>ocultarFormSesion()}>Cancelar</PrimaryButton>

              
              <br/>

              <table className="table-auto">

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
              </div>
        </AppLayout>
        </LogoLayout>
      );
    }
    