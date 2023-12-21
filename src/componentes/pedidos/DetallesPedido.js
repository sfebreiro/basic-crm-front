import React from 'react'

function DetallesPedido({pedido}) {

    const { cliente } = pedido;
    console.log(pedido);

    return (
        <li className="pedido">
                    <div className="info-pedido">
                        <p className="id">ID: {cliente._id}</p>
                        <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido} </p>
                        
                        <div className="articulos-pedido">
                            <p className="productos">Artículos Pedido: </p>
                            <ul>
                                {pedido.pedido.map(articulos =>(
                                   <li key={pedido._id}>
                                    <p>{pedido._id} </p>
                                    <p>Total: {pedido.total} </p>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="acciones">
                     
                        <button type="button" className="btn btn-rojo btn-eliminar">
                            <i className="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
    )
}

export default DetallesPedido;