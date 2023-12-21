import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'

function EditarProducto(props) {
    const history = useNavigate();

    const { id } = useParams();

    // producto = state, y función para actualizarlo
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        //image: ''
    });

    // archivo = state, guardarArchivo = setState
    const [archivo, guardarArchivo] = useState('');

   
    // Consulta api para traer el producto
    const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/products/${id}`);
        guardarProducto(productoConsulta.data);
    }

    // y cargar el componente
    useEffect(() => {
        consultarAPI();
    }, []);

    // Edita un producto en la BBDD
    const editarProducto = async e => {
        e.preventDefault();
        // crear form-data
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('image', archivo);

        // Almacenarlo
        try {
            const res = await clienteAxios.put(`/products/${id}`, formData, {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                Swal.fire(
                    'Actualizado correctamente',
                    'El producto se actualizó correctamente',
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
    };

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

    
   // extraer los valores del state
    const { nombre, precio, image } = producto;

    //if(!nombre) return <Spinner />


    return (
        <Fragment>
            <h2>Editar Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} defaultValue={nombre} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.5" placeholder="Precio" onChange={leerInformacionProducto} defaultValue={precio} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {image ? (
                        <img src={`http://localhost:5000/${image}`} alt="imagen" width="300" />
                    ) : null }
                    <input type="file" name="image" onChange={leerArchivo} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    );

}

export default EditarProducto;