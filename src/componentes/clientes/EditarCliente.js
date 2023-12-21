import React, { Fragment, useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarCliente(props) {
    const history = useNavigate();

    // Get Id
    const { id } = useParams();

    // cliente = state, datosCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la api
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/customers/${id}`);
        
        datosCliente(clienteConsulta.data);
    }

    // useEffect cuando carga el componente
    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer datos del formulario
    const actualizarState = e => {
        // Almacenar en el state lo que escribe el usuario
        datosCliente(
            {
                // Obtener copia del state actual
                ...cliente,
                [e.target.name] : e.target.value
            }
        ) 
    }

    // Actualizar cliente enviando petición mediante Axios
    const actualizarCliente = e => {
        e.preventDefault();
        
        // Enviar petición por Axios
        clienteAxios.put(`/customers/${cliente._id}`, cliente)
            .then( res => {
                if (res.data.code === 11000) {
                    console.log('Error duplicado de Mongo')
                    Swal.fire({
                        type: 'Error',
                        title: 'Hubo un error',
                        text: 'Correo ya está en uso'
                    });
                } else {
                    console.log(res.data); 

                    Swal.fire(
                        'OK',
                        'Cliente actualizado correctamente',
                        'success'
                    );
                }

                history('/');
            });
    };


    // Validar formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente; 

        // Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // true o false
        return valido;
    }
    

    return(
        <Fragment>
            <h2>Editar cliente</h2>
            
            <form
                onSubmit= {actualizarCliente}
            >
                <legend>Rellena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={actualizarState} value={cliente.nombre} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Primer apellido" name="apellido" onChange={actualizarState} value={cliente.apellido} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa" name="empresa" onChange={actualizarState} value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" name="email" onChange={actualizarState} value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono" name="telefono" onChange={actualizarState} value={cliente.telefono}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Guardar cambios" disable={+validarCliente()} />
                </div>

            </form>

        </Fragment>
    );
}


export default EditarCliente;