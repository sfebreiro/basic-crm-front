import React, { useState, useEffect, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2'


function NuevoPedido(props) {

    const history = useNavigate();

    // Extraer el Id del cliente
    const { id } = useParams();

    // State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);
   
    // Obtener el cliente
    const consultarAPI = async () => {
        // consultar cliente actual
        const resultado = await clienteAxios.get(`/customers/${id}`);
        guardarCliente(resultado.data);
    }

    useEffect(() => {
        // Llamar a la API
        consultarAPI();

        // Actualizar el total a pagar 
        actualizarTotal();

    }, [productos]);



    
    const buscarProducto = async e => {
        e.preventDefault();
        try {
            // Obtener productos de la búsqueda
            const resultadoBusqueda = await clienteAxios.post(`/products/busqueda/${busqueda}`);
            console.log(resultadoBusqueda.data);

            if (resultadoBusqueda.data[0]) {

                let productoResultado = resultadoBusqueda.data[0];

                // agregar la llave producto (copia de id)
                productoResultado.producto = resultadoBusqueda.data[0]._id;
                productoResultado.cantidad = 0;
                console.log(productoResultado);

                // ponerlo en el state
                guardarProductos([...productos, productoResultado]);


            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Sin resultados',
                    text: 'No hay resultados'
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Almacenar búsqueda en el State
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);

    }

    // Almacenar cantidad de productos
    const restarProductos = i => {
        // copiar arreglo original
        const todosProductos = [...productos];

        // validar si está en 0
        if (todosProductos[i].cantidad === 0) return;

        // restamos
        todosProductos[i].cantidad--;

        // almacenarlo en el state
        guardarProductos(todosProductos);
    }

    const aumentarProductos = i => {
        // copiar el arreglo
        const todosProductos = [...productos];

        // incremento
        todosProductos[i].cantidad++;

        // al state
        guardarProductos(todosProductos);

    }

    // Elimina un producto del state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);

        guardarProductos(todosProductos);
    }

    // Actualizar total a pagar
    const actualizarTotal = () => {
        // si el arreglo es 0 el total es 0
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        // calcular nuevo total
        let nuevoTotal = 0;

        // recorrer los productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad*producto.precio));

        // almacenar el total
        guardarTotal(nuevoTotal);

    }

    // Almacena pedido en BBDD
    const realizarPedido = async e => {
        e.preventDefault();

        // Id ya extraido en parte superior
       
        // Construir objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

        // Almacenar en BBDD
        const resultado = await clienteAxios.post(`/orders/nuevo/${id}`, pedido);
        
        // leer resultado
        if (resultado.status === 200) {
            Swal.fire({
                type: 'success',
                title: 'OK',
                text: resultado.data.message
            })
            console.log(pedido);
        } else {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'No se ha podido crear el pedido'
            })
        }

        // redireccionar
        history('/pedidos');
    }



    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
                <p>{cliente.telefono} {cliente.email}</p>
            </div>

            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />

                <ul className="resumen">
                    {productos.map((producto, index) => (
                        <FormCantidadProducto 
                            key= {producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            aumentarProductos={aumentarProductos}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}                          
                </ul>
                <p className="total">Total a pagar: <span>{total} €</span></p>
                
                {total > 0? (
                    <form
                        onSubmit={realizarPedido}
                    >
                        <input type='submit' className="btn btn-verde btn-block" value='Realizar pedido' />
                    </form>
                ) : null } 

        </Fragment>
    )
}

export default NuevoPedido;