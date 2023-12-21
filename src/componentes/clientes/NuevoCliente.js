import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoCliente() {
    const history = useNavigate();

    // cliente = state, guardarcliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Leer datos del formulario
    const actualizarState = e => {
        // Almacenar en el state lo que escribe el usuario
        guardarCliente(
            {
                // Obtener copia del state actual
                ...cliente,
                [e.target.name] : e.target.value
            }
        ) 
    }

    // Añade cliente en la api rest
    const agregarCliente = e => {
        e.preventDefault();

        // Enviar petición
        clienteAxios.post('/customers', cliente)
            .then(res => {
                // Validar errores al insertar en BBDD
                if (res.data.code === 11000) {
                    console.log('Error duplicado de Mongo')
                    Swal.fire({
                        type: 'Error',
                        title: 'Hubo un error',
                        text: 'Correo ya en uso'
                    });
                } else {
                    console.log(res.data); 

                    Swal.fire(
                        'Se agregó el cliente',
                        res.data.message,
                        'success'
                    );
                }

                // Redireccionar
                history('/');
            });

    }

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
            <h2>Nuevo cliente</h2>
            
            <form
                onSubmit={agregarCliente}
            >
                <legend>Rellena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Primer apellido" name="apellido" onChange={actualizarState} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa" name="empresa" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email" name="email" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono" name="telefono" onChange={actualizarState} />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente" disable={+validarCliente()} />
                </div>

            </form>

        </Fragment>
    );
}

// HOC, función que toma componente y retorna un nuevo componente
export default NuevoCliente;