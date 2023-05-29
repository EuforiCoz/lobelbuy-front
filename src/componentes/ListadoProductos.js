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
import ProductoInicio from "./ProductoInicio";
import Skeleton from '@mui/material/Skeleton';

const ListadoProductos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    //const params = useParams();
    //const productoBuscado = params.match.nombreProducto;
    const location = useLocation();
    const navigate = useNavigate();
    const nombre = new URLSearchParams(location.search).get('nombre');
    const categoria = new URLSearchParams(location.search).get('categoria');
    const estado = new URLSearchParams(location.search).get('estado');
    
    //const { nombreProducto } = useParams();
    const [productos, setProductos] = useState([]);
    const [stateCategoria, setStateCategoria] = useState();
    const [stateEstado, setStateEstado] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(false);
        obtenerDatos();
       
        
    }, [location])

    const obtenerDatos = () => {
        document.getElementById("categoria").value = "porDefectoCategoria";
        document.getElementById("estado").value = "porDefectoEstado";
        var productoEstado;

        if(estado == "sin-abrir"){
            productoEstado = "Sin abrir";
        } else if(estado == "como-nuevo"){
            productoEstado = "Como nuevo";
        } else if(estado == "Usado") {
            productoEstado = "Usado";
        }

        var productoCategoria = null;
        console.log(productoCategoria)
        console.log(categoria)

        if(categoria != "porDefectoCategoria"){
            productoCategoria = categoria;
        }

        const datos =  {
            nombre: nombre,
            categoria: productoCategoria,
            estado: productoEstado
        }

        console.log(datos);

        axios.post("https://backend-lobelbuy-iex3.onrender.com/buscarProducto", datos)
        .then(res => {
            console.log(res.data)
            setProductos(res.data)
            setLoaded(true);
            console.log(stateCategoria)
            console.log(stateEstado)

            if(categoria == null || categoria == "porDefectoCategoria"){
                document.getElementById("categoria").value = "porDefectoCategoria";
            }
            else{

                if(stateCategoria == null){
                    document.getElementById("categoria").value = categoria;
                } else{
                    document.getElementById("categoria").value = stateCategoria;
                }
                
            }

            if(estado == null || estado == "porDefectoEstado"){
                document.getElementById("estado").value = "porDefectoEstado";
            }
            else{
                document.getElementById("estado").value = stateEstado;
            }
            
       
            
        })
        .catch(({response}) => {
            setLoaded(true);
        })
    }

    const filtrar = () => {
        setLoaded(false);
        var categoria = document.getElementById("categoria").value;
        var estado = document.getElementById("estado").value;
        document.getElementById("categoria").value = "porDefectoCategoria";
        document.getElementById("estado").value = "porDefectoEstado";
        setStateCategoria(categoria);
        setStateEstado(estado);

        if(nombre == null){
            navigate("/listadoProductos?categoria=" + categoria + "&estado=" + estado);
        } else{
            navigate("/listadoProductos?nombre=" + nombre + "&categoria=" + categoria + "&estado=" + estado);
        }
    }

    return(
      
        <div id="listadoProductos" style={{minHeight: "80%"}}>
                <div className="container-fluid py-5" >
                    <div className="row">
                        <div className="col-md-4 col-xs-12 mx-auto">
                            
                            <form className="form-control mb-5 mx-auto" style={{width: "60%", background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                                <h3>Filtrar</h3>
                                <input type="text" value={nombre}  hidden/>
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
                                    <select id="categoria" className="form-control" onChange={event => setStateCategoria(event.target.value)}>
                                        <option value="porDefectoCategoria" disabled>Selecciona una categoría</option>
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
                                    <select id="estado"  className="form-control" onChange={event => setStateEstado(event.target.value)}>
                                        <option value="porDefectoEstado" disabled>Selecciona un estado</option>
                                        <option value="sin-abrir">Sin abrir</option>
                                        <option value="como-nuevo">Como nuevo</option>
                                        <option value="Usado">Usado</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="button" onClick={filtrar} className="btnVerProducto btn btn-primary w-50">Filtrar</button>
                                </div> 
                            
                            </form>
                           
                        </div>
                    
                        <div className="container cajaPadre col-md-8 col-xs-12">
                            
                            <div id="cajaProductos" className="cajaProductos d-flex justify-content-center align-items-center flex-wrap">
                                {!loaded ? (
                                    Array.from({ length: 8 }, (_, index) => (
                                        <div className="mx-4 mb-5">
                                            <Skeleton variant="rounded" width={350} height={230} sx={{ bgcolor: 'lightblue' }}/>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                            <Skeleton variant="rectangular" width={350} height={80} sx={{bgcolor: 'lightblue'}}/>
                                        </div>
                                    ))
                                    ) : (
                                        <>
                                            {productos.length == 0 ? (
                                                <h3 className="text-center text-white my-auto">No se han encontrado resultados</h3>
                                            ) : (
                                                productos.map((producto) =>{
                                                    return (
                                                        <ProductoInicio key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} categoria={producto.categoria} imagen={producto.imagen} reservado={producto.reservado} tamano={5}/>
                                                    )
                                                })
                                            )  }
                                        </>
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
