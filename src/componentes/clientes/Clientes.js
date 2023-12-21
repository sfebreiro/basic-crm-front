import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

// Import Axios
import clienteAxios from '../../config/axios.js';

import Cliente from './Cliente.js';

import Spinner from '../layout/Spinner';

function Clientes(){

    // Trabajar con el state
    const [clientes, guardarClientes] = useState([]);

    // Query a la api -> Podría ir dentro de useEffect
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/customers');

        // Colocar resultado en el state
        guardarClientes(clientesConsulta.data);

      
    };

    // UseEffect, like before component
    useEffect(() => {
        consultarAPI();
    }, [clientes]);

    if (!clientes.length) return <Spinner />

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente
                        key= {cliente._id}
                        cliente= {cliente}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Clientes;