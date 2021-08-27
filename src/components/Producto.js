import React from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { borrarProductoAction,  obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redireccion
    const confirmarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
           
          }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch(borrarProductoAction(id));  

            }
          })
     

    }

    // Funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    const { nombre, precio, id } = producto;
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>${precio}</span></td>
            <td className="acciones">
                <button 
                    type='button' 
                    onClick={()=> redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=>confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Producto;