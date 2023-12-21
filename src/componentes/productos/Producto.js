import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios';

function Producto({producto}){

    const { _id, nombre, precio, image } = producto;

    // Elimina un producto
    const eliminarProducto = id => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Este cambio no es revertible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, elimínalo",
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Eliminar producto en la api
              clienteAxios.delete(`/products/${id}`)
                    .then( res => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Eliminado",
                                text: "Producto eliminado",
                                icon: "success"
                              });
                        }
                    })
            }
          });
    }

    return(
        <li className="producto">
                 <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">{precio} €</p>
                        {
                        image ? (
                                <img src={`http://localhost:5000/${image}`} alt="imagen" />
                            ) : null
                        }
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Producto
                        </button>
                    </div>
                </li>
    );
}

export default Producto;