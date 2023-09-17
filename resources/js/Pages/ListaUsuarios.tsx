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
    users:Array<JSON>;
}

interface User{
  id: string
  name: string
  apellidos: string
  email: string
  canal_comunicacion: string
  fecha_nacimiento: Date
  ocupacion: string
  ci: string
  codigo_pais_telefono: string
  telefono: string
  pregunta_seguridad_a: string
  pregunta_seguridad_b: string
  respuesta_seguridad_a: string
  respuesta_seguridad_b: string
}

export default function ListaUsuarios({users}:Props){
  console.log(users)
  const route = useRoute();
  const [switchVisibility, setSwitchVisibility] = useState(true);
  const nameInput= useRef(null)
  const apellidosInput= useRef(null)
  const emailInput= useRef(null)
  const canal_comunicacionInput= useRef(null)
  const fecha_nacimientoInput= useRef(null)
  const ocupacionInput= useRef(null)
  const ciInput= useRef(null)
  const codigo_pais_telefonoInput= useRef(null)
  const telefonoInput= useRef(null)
  const pregunta_seguridad_aInput= useRef(null)
  const pregunta_seguridad_bInput= useRef(null)
  const respuesta_seguridad_aInput= useRef(null)
  const respuesta_seguridad_bInput= useRef(null)
  const{data,setData,put,processing,reset,errors} = useForm({
    id:'',
    name:'',
    apellidos:'',
    email:'',
    canal_comunicacion: '',
    fecha_nacimiento: '',
    ocupacion: '',
    ci: '',
    codigo_pais_telefono: '',
    telefono: '',
    pregunta_seguridad_a: '',
    pregunta_seguridad_b: '',
    respuesta_seguridad_a: '',
    respuesta_seguridad_b: '',
  })

  const mostrarForm = (user: User) => {
    setSwitchVisibility(false);
    setData({
      id:user.id,
      name:user.name,
      apellidos:user.apellidos,
      email:user.email,
      canal_comunicacion:user.canal_comunicacion,
      fecha_nacimiento:user.fecha_nacimiento,
      ocupacion:user.ocupacion,
      ci:user.ci,
      codigo_pais_telefono:user.codigo_pais_telefono,
      telefono:user.telefono,
      pregunta_seguridad_a:user.pregunta_seguridad_a,
      pregunta_seguridad_b:user.pregunta_seguridad_b,
      respuesta_seguridad_a:user.respuesta_seguridad_a,
      respuesta_seguridad_b:user.respuesta_seguridad_b
});
  };

  const ocultarForm = () => {
    setSwitchVisibility(true);
  };

  const update = (e:any) => {
    e.preventDefault();
    setSwitchVisibility(true);
    put(route('usuarios.update',data.id),{
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
          title="ListaUsuarios"
        >
            <br/>
            <div className={` min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900 ${switchVisibility ? 'visible' : 'collapse'}`}>
              <Titulo>Lista de Usuarios</Titulo>
              <br/>
             <TablaUsuarios datos={users} onClickItem={mostrarForm}></TablaUsuarios>
             </div>

             <div className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900 ${switchVisibility ? 'collapse' : 'visible'}`}>
             <Titulo>Editar usuario</Titulo>
             <br />
             <form className="w-[350px]" onSubmit={update}>
              <div className="mt-4"> 
                <InputLabel htmlFor="name">Nombre</InputLabel>
                  <TextInput
                    id="name"
                    name="name"
                    ref={nameInput}
                    className="mt-1 block w-full isFocused "
                    value={data.name}
                  onChange={e => setData('name', e.target.value)}
                    required
                    
                    placeholder="nombre"
                  />
                  <InputError className="mt-2" message={errors.name} />
                </div>
                <br />

                <div className="mt-4"> 
                <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
                  <TextInput
                    id="apellidos"
                    name="apellidos"
                    ref={apellidosInput}
                    className="mt-1 block w-full isFocused "
                    value={data.apellidos}
                  onChange={e => setData('apellidos', e.target.value)}
                    required
                    
                    placeholder="apellidos"
                  />
                  <InputError className="mt-2" message={errors.apellidos} />
                </div>
                <br />

                <div className="mt-4">
                    <InputLabel htmlFor="email">Correo</InputLabel>
                    <TextInput
                      id="email"
                      name="email"
                      ref={emailInput}
                      className="mt-1 block w-full "
                      value={data.email}
                    onChange={e => setData('email', e.target.value)}
                      required
                      
                      placeholder="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
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

                <div className="mt-4"> 
                  <InputLabel htmlFor="canal_comunicacion">Canal de Comunicación</InputLabel>
                  <TextInput
                    id="canal_comunicacion"
                    name="canal_comunicacion"
                    ref={canal_comunicacionInput}
                    className="mt-1 block w-full isFocused "
                    value={data.canal_comunicacion}
                  onChange={e => setData('canal_comunicacion', e.target.value)}
                    required
                    
                    placeholder="canal de comunicación"
                  />
                  <InputError className="mt-2" message={errors.canal_comunicacion} />
                </div>
                <br />
     
                <div className="mt-4">
                  <InputLabel htmlFor="fecha_nacimiento">Fecha de Nacimiento</InputLabel>
                  <TextInput
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    ref={fecha_nacimientoInput}
                    className="mt-1 block w-full isFocused "
                    value={data.fecha_nacimiento}
                  onChange={e => setData('fecha_nacimiento', e.target.value)}
                    required
                    
                    placeholder="fecha de nacimiento"
                  />
                  <InputError className="mt-2" message={errors.fecha_nacimiento} />
                </div>
                <br />

                <div className="mt-4"> 
                  <InputLabel htmlFor="ocupacion">Ocupación</InputLabel>
                  <TextInput
                    id="ocupacion"
                    name="ocupacion"
                    ref={ocupacionInput}
                    className="mt-1 block w-full isFocused "
                    value={data.ocupacion}
                  onChange={e => setData('ocupacion', e.target.value)}
                    required
                    
                    placeholder="ocupación"
                  />
                  <InputError className="mt-2" message={errors.ocupacion} />
                </div>
                <br />

                <div className="mt-4">
                  <InputLabel htmlFor="ci">CI</InputLabel>
                  <TextInput
                    id="ci"
                    name="ci"
                    ref={ciInput}
                    className="mt-1 block w-full isFocused "
                    value={data.ci}
                  onChange={e => setData('ci', e.target.value)}
                    required
                    
                    placeholder="número de carnet de identidad o equivalente"
                  />
                  <InputError className="mt-2" message={errors.ci} />
                </div>
                <br />

                <div className="mt-4">
                  <InputLabel htmlFor="codigo_pais_telefono">Código del país del teléfono</InputLabel>
                  <TextInput
                    id="codigo_pais_telefono"
                    name="codigo_pais_telefono"
                    ref={codigo_pais_telefonoInput}
                    className="mt-1 block w-full isFocused "
                    value={data.codigo_pais_telefono}
                  onChange={e => setData('codigo_pais_telefono', e.target.value)}
                    required
                    
                    placeholder="código del país del teléfono"
                  />
                  <InputError className="mt-2" message={errors.codigo_pais_telefono} />
                </div>
                <br />

                <div className="mt-4"> 
                  <InputLabel htmlFor="telefono">Teléfono</InputLabel>
                  <TextInput
                    id="telefono"
                    name="telefono"
                    ref={telefonoInput}
                    className="mt-1 block w-full isFocused "
                    value={data.telefono}
                  onChange={e => setData('telefono', e.target.value)}
                    required
                    
                    placeholder="teléfono"
                  />
                  <InputError className="mt-2" message={errors.telefono} />
                </div>
                <br />

                <div className="mt-4"> 
                  <InputLabel htmlFor="pregunta_seguridad_a">Pregunta de Seguridad 1</InputLabel>
                  <TextInput
                    id="pregunta_seguridad_a"
                    name="pregunta_seguridad_a"
                    ref={pregunta_seguridad_aInput}
                    className="mt-1 block w-full isFocused "
                    value={data.pregunta_seguridad_a}
                  onChange={e => setData('pregunta_seguridad_a', e.target.value)}
                    required
                    
                    placeholder="pregunta de seguridad 1"
                  />
                  <InputError className="mt-2" message={errors.pregunta_seguridad_a} />
                </div>
                <br />

                <div className="mt-4">
                  <InputLabel htmlFor="respuesta_seguridad_a">Respuesta de Seguridad 1</InputLabel>
                  <TextInput
                    id="respuesta_seguridad_a"
                    name="respuesta_seguridad_a"
                    ref={respuesta_seguridad_aInput}
                    className="mt-1 block w-full isFocused "
                    value={data.respuesta_seguridad_a}
                  onChange={e => setData('respuesta_seguridad_a', e.target.value)}
                    required
                    
                    placeholder="respuesta de seguridad 1"
                  />
                  <InputError className="mt-2" message={errors.respuesta_seguridad_a} />
                </div>
                <br />

                <div className="mt-4">
                  <InputLabel htmlFor="pregunta_seguridad_b">Pregunta de Seguridad 2</InputLabel>
                  <TextInput
                    id="pregunta_seguridad_b"
                    name="pregunta_seguridad_b"
                    ref={pregunta_seguridad_bInput}
                    className="mt-1 block w-full isFocused "
                    value={data.pregunta_seguridad_b}
                  onChange={e => setData('pregunta_seguridad_b', e.target.value)}
                    required
                    
                    placeholder="pregunta de seguridad 2"
                  />
                  <InputError className="mt-2" message={errors.pregunta_seguridad_b} />
                </div>
                <br />

                <div className="mt-4">
                  <InputLabel htmlFor="respuesta_seguridad_b">Respuesta de Seguridad 2</InputLabel>
                  <TextInput
                    id="respuesta_seguridad_b"
                    name="respuesta_seguridad_b"
                    ref={respuesta_seguridad_bInput}
                    className="mt-1 block w-full isFocused "
                    value={data.respuesta_seguridad_b}
                  onChange={e => setData('respuesta_seguridad_b', e.target.value)}
                    required
                    
                    placeholder="respuesta de seguridad 2"
                  />
                  <InputError className="mt-2" message={errors.respuesta_seguridad_b} />
                </div>
                <br />

                <CustomButton onClick={()=>update}>Editar usuario</CustomButton>
              </form>
              <br/>
              <PrimaryButton   onClick={()=>ocultarForm()}>Cancelar</PrimaryButton>
            </div>
             
           
            </AppLayout>
        </LogoLayout>
        
    );
}