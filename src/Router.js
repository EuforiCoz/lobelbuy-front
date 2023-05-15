
import { Routes, Route } from "react-router-dom";
import Inicio from "./componentes/Inicio"
import Login from "./componentes/Login"
import Cuenta from "./componentes/Cuenta"
import Registro from "./componentes/Registro"
import Perfil from "./componentes/Perfil"
import Productos from "./componentes/Productos"
import SubirProducto from "./componentes/SubirProducto"
import FichaProducto from "./componentes/FichaProducto";
import FichaVendedor from "./componentes/FichaVendedor";
import ListadoProductos from "./componentes/ListadoProductos";
import Chats from "./componentes/Chats";
import EditarProducto from "./componentes/EditarProducto";
import Favoritos from "./componentes/Favoritos";
import Resenas from "./componentes/Resenas";
import ResenaForm from "./componentes/ResenaForm";

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
                <Route path="/cuenta/favoritos" element={<Favoritos/>}/> 
                <Route path="/cuenta/chats" element={<Chats/>}/>
                <Route path="/cuenta/resenas" element={<Resenas/>}/>
                <Route path="/cuenta/resenasForm/:id" element={<ResenaForm/>}/>  
                <Route path="/listadoProductos" element={<ListadoProductos/>}/>
                {/*<Route path="/listadoProductos/:categoria" element={<ListadoProductos/>}/>*/}    
                <Route path="/producto/:id" element={<FichaProducto className="fichaAltura"/>}/>
                <Route path="/vendedor/:id" element={<FichaVendedor/>}/>    
                <Route path="/editarProducto/:id" element={<EditarProducto/>}/> 
            </Routes>
                  
);
    
}
export default Router;
