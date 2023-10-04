import React, { useRef, useState } from 'react'
import AppLayout from '@/Layouts/AppLayout';
import LogoLayout from '@/Layouts/LogoLayout';
import Titulo from '@/Components/Titulo';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import useRoute from '@/Hooks/useRoute';
import CustomButton from '@/Components/CustomButton';

/*interface Props{
    users:Array<JSON>;
}*/

interface User{
  ci: string
}

export default function AsignarPaciente(/*{users}:Props*/){
  const route = useRoute();
  const ciInput= useRef(null)
  const{data,setData,put,processing,reset,errors} = useForm({
    ci:''
  })
/*  if(session('id')('alerta')){
    alert(e)

  }*/
    
  const update = (e:any) => {
    e.preventDefault();
    put(route('asignarPaciente.update',data.ci),{
      onSuccess:()=>{
        alert("Exito"+data.ci)
        setData({ci:''})
      },
      onError:()=>{
        if(errors.ci){
          reset('ci')
        }
      },
    });
    
  };
    return (
        <LogoLayout>
            <AppLayout
          title="AsignarPaciente"
        >
            <br/>

             <div className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900`}>
             <Titulo>Asignar paciente</Titulo>
             <br />
             <form className="w-[350px]" onSubmit={update}>
              <div className="mt-4"> 
                  <TextInput
                    id="ci"
                    name="ci"
                    ref={ciInput}
                    className="mt-1 block w-full isFocused "
                    value={data.ci}
                  onChange={e => setData('ci', e.target.value)}
                    required
                    
                    placeholder="ci"
                  />
                  <InputError className="mt-2" message={errors.ci} />
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
      
     
                <CustomButton onClick={()=>update}>Asignar paciente</CustomButton>
              </form>
              <br/>
            </div>
             
           
            </AppLayout>
        </LogoLayout>
        
    );
}
