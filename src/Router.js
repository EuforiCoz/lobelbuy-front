
import { Routes, Route } from "react-router-dom";
import Inicio from "./componentes/Inicio"
import Login from "./componentes/Login"
import Cuenta from "./componentes/Cuenta"
import Registro from "./componentes/Registro"
import Perfil from "./componentes/Perfil"
import Productos from "./componentes/Productos"
import SubirProducto from "./componentes/SubirProducto"
import FichaProducto from "./componentes/FichaProducto";
import ListadoProductos from "./componentes/ListadoProductos";
import Chats from "./componentes/Chats";
import EditarProducto from "./componentes/EditarProducto";

const Router = () => {

        return(
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route path="/subirProducto" element={<SubirProducto/>}/>   
                <Route path="/cuenta" element={<Cuenta/>}/>
                <Route path="/cuenta/perfil" element={<Perfil/>}/>
                <Route path="/cuenta/productos" element={<Productos/>}/>
                <Route path="/cuenta/chats" element={<Chats/>}/>
                <Route path="/listadoProductos" element={<ListadoProductos/>}/>
                {/*<Route path="/listadoProductos/:categoria" element={<ListadoProductos/>}/>*/}    
                <Route path="/producto/:id" element={<FichaProducto className="fichaAltura"/>}/>  
                <Route path="/editarProducto/:id" element={<EditarProducto/>}/> 
            </Routes>
                  
);
    
}
export default Router;