import React from 'react';
import PrimaryButton from './PrimaryButton';

interface Props{
    datos:Array<JSON>;
    onClickItem: (item:any) =>void;
}


export default function TablaUsuarios({datos,onClickItem}:Props){

    return (
        <>
    <table className="table-auto">

        <thead>
    <tr>
      <th>CI</th>
      <th>Nombre</th>
      <th>Apellidos</th>
      <th>Correo</th>
      <th>Canal de Comunicación</th>
      <th>Fecha de nacimiento</th>
      <th>Ocupación</th>
      <th>Código del país del teléfono</th>
      <th>Teléfono</th>
      <th>Editar Usuario</th>
    </tr>
  </thead>
  <tbody>
      {datos.map((item:any) => (
       
             <tr  key={item.id}>
      <td>{item.ci}</td>
      <td>{item.name}</td>
      <td>{item.apellidos}</td>
      <td>{item.email}</td>
      <td>{item.canal_comunicacion}</td>
      <td>{item.fecha_nacimiento}</td>
      <td>{item.ocupacion}</td>
      <td>{item.codigo_pais_telefono}</td>
      <td>{item.telefono}</td>
      <td><PrimaryButton onClick={()=>onClickItem(item)}>Editar usuario</PrimaryButton></td>
      
    </tr>
            
      ))}
  </tbody>
</table>
</>
    );
}