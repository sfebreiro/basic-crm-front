import React, {Fragment} from 'react';

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layout
import Header from './componentes/layout/Header.js';
import Navegacion from './componentes/layout/Navegacion.js';

// Components
import Clientes from './componentes/clientes/Clientes.js';
import NuevoCliente from './componentes/clientes/NuevoCliente.js';
import EditarCliente from './componentes/clientes/EditarCliente.js';

import Productos from './componentes/productos/Productos.js';
import EditarProducto from './componentes/productos/EditarProducto.js';
import NuevoProducto from './componentes/productos/NuevoProducto.js';

import Pedidos from './componentes/pedidos/Pedidos.js';
import NuevoPedido from './componentes/pedidos/NuevoPedido.js';


function App() {
  return (
    <Router>
      <Fragment>
       <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Clientes/>}/>
                <Route exact path="/clientes/nuevo" element={<NuevoCliente/>}/>
                <Route exact path="/clientes/editar/:id" element={<EditarCliente/>}/>
                <Route exact path="/productos" element={<Productos/>}/>
                <Route exact path="/productos/nuevo" element={<NuevoProducto/>}/>
                <Route exact path="/productos/editar/:id" element={<EditarProducto/>}/>
                <Route exact path="/pedidos" element={<Pedidos/>}/>
                <Route exact path="/pedidos/nuevo/:id" element={<NuevoPedido/>}/>

              </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}




export default App;
