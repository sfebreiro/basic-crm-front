import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'


function NuevoProducto() {
    const history = useNavigate();

    // producto = state, guardarProducto = setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
    });

    // archivo = state, guardarArchivo = setState
    const [archivo, guardarArchivo] = useState('');

    // Almacena nuevo producto en BBDD
    const agregarProducto = async e => {
        e.preventDefault();

        // crear form-data
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('image', archivo);

        // Almacenarlo
        try {
            const res = await clienteAxios.post('/products', formData, {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                Swal.fire(
                    'Agregado correctamente',
                    'El producto se agregó correctamente',
                    'success'
                );
            }

            // redireccionar
            history('/productos');

        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelve a intentarlo'
            });
        }
    }

    // leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            // obtener copia del state
            ...producto,
            [e.target.name] : e.target.value
        });
        console.log(producto);
    };

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    };

    return (

        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit= {agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.5" placeholder="Precio" onChange={leerInformacionProducto}/>
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </Fragment>

    );
}

export default NuevoProducto;