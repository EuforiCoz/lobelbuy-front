import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import "./styles/perfil.css"
import "./styles/listadoProductos.css"
import iconoCarrito from "./iconos/carrito.jpg"
import imgProducto from "./iconos/crash.jpg"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import { Link,useNavigate, useParams, useLocation} from "react-router-dom";
import Loader from "./Loader";

const ListadoProductos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    //const params = useParams();
    //const productoBuscado = params.match.nombreProducto;
    const location = useLocation();
    const nombre = new URLSearchParams(location.search).get('nombre');
    const categoria = new URLSearchParams(location.search).get('categoria');
    const estado = new URLSearchParams(location.search).get('estado');
    
    //const { nombreProducto } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(()=>{

        obtenerDatos();
       
        
    }, [location])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(function(){
       
        setLoading(false);
        document.getElementById("cajaProductos").style.visibility = "visible";
      }, 1000)
    }, []);

    const obtenerDatos = () => {

        var productoEstado;

        if(estado == "sin-abrir"){
            productoEstado = "Sin abrir";
        } else if(estado == "como-nuevo"){
            productoEstado = "Como nuevo";
        } else if(estado == "Usado") {
            productoEstado = "Usado";
        }

        const datos =  {
            nombre: nombre,
            categoria: categoria,
            estado: productoEstado
        }

        console.log(datos)

        axios.post("http://localhost:5000/buscarProducto", datos)
        .then(res => {

            setProductos(res.data)
            const selectCategoria = document.getElementById('categoria');
            var opcion1 = selectCategoria.querySelector("option[value=" + categoria + "]");

            if(opcion1 == null){
                opcion1 = selectCategoria.querySelector("option[value='porDefectoCategoria']");
            } 
            
            opcion1.setAttribute('selected', 'selected');

            const selectEstado = document.getElementById('estado');
           
            var opcion2 = selectEstado.querySelector("option[value=" + estado + "]");

            if(opcion2 == null){
                opcion2 = selectEstado.querySelector("option[value='porDefectoEstado']");
            } 

            opcion2.setAttribute('selected', 'selected');
            
            
        })
        .catch(({response}) => {
          
        })
    }

    return(
      
        <div id="listadoProductos" style={{minHeight: "80%"}}>
                <div className="container-fluid py-5" >
                    <div className="row">
                        <div className="col-md-3 col-xs-12 mx-auto">
                            
                            <form className="form-control mb-5 mx-auto" style={{width: "60%", background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                                <h3>Filtrar</h3>
                                <input type="text" value={nombre} name="nombre" hidden/>
                                {/*
                                <div className="mb-3 d-flex flex-column">
                                    <div className="mb-3">
                                        <label htmlFor="precio_min">Precio mínimo:</label>
                                        <input type="number" id="precio_min" name="precio_min" className="form-control"/>
                                        
                                    </div>
                                    <div>
                                        <label htmlFor="precio_max">Precio máximo:</label>
                                        <input type="number" id="precio_max" name="precio_max" className="form-control" />
                                    </div>
                                </div>
                                    */}
                                <div className="mb-3">
                                    <span>Categorías</span>
                                    <span className="mx-3"></span>
                                    <select id="categoria" name="categoria" className="form-control">
                                        <option value="porDefectoCategoria" disabled selected>Selecciona una categoría</option>
                                        <option value="Moda">Moda</option>
                                        <option value="Deporte">Deporte</option>
                                        <option value="Videojuegos">Videojuegos</option>
                                        <option value="Móviles">Móviles</option>
                                        <option value="Vehículos">Vehículos</option>
                                        <option value="Informática">Informática</option>
                                        <option value="Inmobiliaria">Inmobiliaria</option>
                                        <option value="Cocina">Cocina</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <span>Estado</span>
                                    <span className="mx-3"></span>
                                    <select id="estado" name="estado" className="form-control">
                                        <option value="porDefectoEstado" disabled selected>Selecciona un estado</option>
                                        <option value="sin-abrir">Sin abrir</option>
                                        <option value="como-nuevo">Como nuevo</option>
                                        <option value="Usado">Usado</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="btnVerProducto btn btn-primary w-50">Filtrar</button>
                                </div>   
                            
                            </form>
                        </div>
                    
                        <div className="container cajaPadre col-md-9 col-xs-12">
                            {loading && <Loader />}
                            <div id="cajaProductos" className="row cajaProductos">
                                {productos.length == 0 ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h3 className="text-white my-auto">No se han encontrado resultados</h3>
                                        </div>
                                    ) : (
                                        productos.map((producto) =>{
                                                
                                            return (
                                                    <div class="col-md-3 mb-5">
                                                        <div class="card product">
                                                            <div className="position-relative">
                                                                
                                                                <img src={producto.imagen} class="card-img  w-100" height="240" alt="Producto"/>
                                                                {producto.reservado == 0 &&
                                                                <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill text-primary p-1 position-absolute" style={{top: "20px", left: "20px"}} hidden>Reservado</span>
                                                                    <input type="number" value={producto.reservado} hidden/>
                                                                    </div>
                                                                }
            
                                                                {producto.reservado == 1 &&
                                                                    <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill text-primary p-1 position-absolute" style={{top: "20px", left: "20px"}}>Reservado</span>
                                                                    <input type="number" value={producto.reservado} hidden/>
                                                                    </div>
                                                                }   
                                                            </div>
                                                        
                                                            <div class="card-body">
                                                                <h5 class="card-title">{producto.nombre}</h5>
                                                                <p class="card-text">Precio: {producto.precio}€</p>
                                                                <Link to={"/producto/" + producto.id} className="btnVerProducto btn btn-primary text-decoration-none">Ver Producto</Link>
                                                            </div>
                                                        </div>
                                                    </div>  
                                            )
                                        })
                                    )  
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </div>
    )
          
}

export default ListadoProductos;
