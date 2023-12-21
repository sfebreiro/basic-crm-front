import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

function Productos(){

    // Productos = state guardarProductos = funcion para guardar el state
    const [productos, guardarProductos] = useState([]);

    // useEffect para consulta api
    useEffect(() => {
        // Query a la api
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/products');
            guardarProductos(productosConsulta.data);
        }

        // Llamado a la api
        consultarAPI();
    }, [productos]);

    // Spinner
    if (!productos.length) return <Spinner/>


    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto
                        key={producto._id}
                        producto= {producto}
                    />
                ))}
                
            </ul>
        </Fragment>
    );
}

export default Productos;