import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import {useNavigate, useParams } from "react-router-dom";
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import {FaRegHandshake} from "react-icons/fa"
import {BsHandbag} from "react-icons/bs"
import imgSale from "./iconos/cupon.png"
import ProductoInicio from "./ProductoInicio";
import estrella from "./iconos/estrella.png";
import Skeleton from '@mui/material/Skeleton';
import "./styles/productos.css";

const Productos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const params = useParams();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    
    const [usuario, setUsuario] = useState([]);
    const [productos, setProductos] = useState([]);
    const [resenas, setResenas] = useState([]);
    const [productosEnVenta, setProductosEnVenta] = useState([]);
    const [resenasPorVentas, setResenasPorVentas] = useState([]);
    const [resenasPorCompras, setResenasPorCompras] = useState([]);
    const [mensajeMostrar, setMensajeMostrar] = useState("");
    const [estadoMostrar, setEstadoMostrar] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{

        obtenerDatos();
     
    }, []);


    const obtenerDatos = () => {
        const datos =  {
            usuario_id: params.id
        }

        axios.post("https://backend-lobelbuy-iex3.onrender.com/perfil/obtenerDatos", datos)
        .then(res => {
            console.log(res.data)
            setUsuario(res.data);
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy-iex3.onrender.com/mostrarProductosEnVenta", datos)
        .then(res => {

            setProductosEnVenta(res.data);
            setProductos(res.data);
            setMensajeMostrar("No ha publicado ningún producto");
            setEstadoMostrar("productos");
            console.log(res.data);
            setLoaded(true);
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy-iex3.onrender.com/resenasPorVentas", datos)
        .then(res => {

            setResenasPorVentas(res.data);
            //setResenas(res.data);
            //setMensajeMostrar("No te han dedicado ninguna reseña");
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy-iex3.onrender.com/resenasPorCompras", datos)
        .then(res => {
            var resenasCompletadasCompras = [];
            for (let i = 0; i < res.data.length; i++) {
                if(res.data[i].estado == 1){
                    resenasCompletadasCompras.push(res.data[i])
                } 
            }   
            console.log(resenasCompletadasCompras)
            setResenasPorCompras(resenasCompletadasCompras) 
        })
        .catch(({response}) => {
            console.log(response.data);
        }) 
        
    }

    const mostrar = (datos, mensaje) =>{
        
        if(mensaje == "en venta"){
            document.getElementById("divPorVentas").classList.remove("animacionCaja");
            document.getElementById("divPorCompras").classList.remove("animacionCaja");
            document.getElementById("divEnVenta").classList.add("animacionCaja");
            setMensajeMostrar("No ha publicado ningún producto");
            setProductos(datos);
            setResenas([]);
            setEstadoMostrar("productos");
        } else if(mensaje == "por ventas"){
            document.getElementById("divPorVentas").classList.add("animacionCaja");
            document.getElementById("divPorCompras").classList.remove("animacionCaja");
            document.getElementById("divEnVenta").classList.remove("animacionCaja");
            setMensajeMostrar("No le han dedicado ninguna reseña");
            setProductos([])
            setResenas(datos);
            setEstadoMostrar("reseñas");
        } else {
            document.getElementById("divPorVentas").classList.remove("animacionCaja");
            document.getElementById("divPorCompras").classList.add("animacionCaja");
            document.getElementById("divEnVenta").classList.remove("animacionCaja");
            setMensajeMostrar("No ha publicado ninguna reseña a otro comprador");
            setProductos([])
            setResenas(datos);
            setEstadoMostrar("reseñas");
            
        }
        
    }   
   
    return(
        <div id="fichaVendedor" className="pt-5" style={{minHeight: "80%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            <div className="container-fluid w-75" style={{borderRadius: "10px"}}>
                <div className="row d-flex flex-row justify-content-center align-items-center py-5 text-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        {!loaded && 
                            <>
                                <Skeleton variant="circular" width={150} height={150} sx={{ bgcolor: 'lightblue' }}/>
                                <Skeleton className="mt-3" variant="text" sx={{ width: 200, fontSize: '2rem' , bgcolor: 'lightblue'}}/>
                            </>
                        }

                        {loaded &&
                            <>
                                <img src={usuario.imagen} className="rounded-circle img-fluid img-overlay" style={{width: "150px", height: "150px"}}/>
                                <h1 className="mt-3 text-white">{usuario.nombre}</h1>
                            </>
                        }
                        
                    </div>
                    <div className="row mx-auto pt-5 d-flex justify-content-center">
                            <div id="divEnVenta" onClick={() => mostrar(productosEnVenta, "en venta")}  className="cajaCategoria animacionCaja col-sm-6 col-xs-6 mb-4 mx-2"><img src={imgSale} style={{width: "60px", height: "60px"}}/><span>En venta</span></div>
                            <div id="divPorVentas" className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorVentas, "por ventas")}><FaRegHandshake style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por ventas</span></div>
                            <div id="divPorCompras" className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorCompras, "por compras")}><BsHandbag style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por compras</span></div>  
                    </div>
                    <div className="misProductosCuenta d-flex flex-column justify-content-center align-items-center mt-5">

                        {!loaded && 
                            Array.from({ length: 3 }, (_, index) => (
                            <div className="mb-4">
                                <Skeleton variant="rounded" width={350} height={230} sx={{ bgcolor: 'lightblue' }}/>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                <Skeleton variant="rectangular" width={350} height={80} sx={{bgcolor: 'lightblue'}}/>
                            </div>
                            ))
                        }

                        {!loaded && estadoMostrar == "reseñas" &&
                            Array.from({ length: 3 }, (_, index) => (
                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
                                    <div class="row p-2">
                                        <div class="col-md-4 col-sm-12 text-center">
                                            <Skeleton variant="rounded" sx={{width: "100%", height: "180px", bgcolor: 'lightblue' }}/>
                                        </div>
                                        <div class="col-md-8 col-sm-12 card-body">
                                            <div class="d-flex flex-row justify-content-start align-items-center">
                                                <Skeleton variant="circular" sx={{width: "40px", height: "40px", bgcolor: 'lightblue' }}/>
                                                <div class="mx-1"></div>
                                                <Skeleton variant="text" sx={{width: "350px", fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                            </div> 
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                            <div class="mt-2 mb-2">
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                            </div>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {productos.length == 0 && estadoMostrar == "productos" && loaded ? (
                            <h1 className="text-white">{mensajeMostrar}</h1>
                            ) : (
                                productos.map((producto) =>{
                                                
                                    return (
                                        <ProductoInicio key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} categoria={producto.categoria} imagen={producto.imagen} reservado={producto.reservado} tamano={5}/>

                                    )
                                })
                            )

                        }

                        {resenas.length == 0 && estadoMostrar == "reseñas" &&
                            <h1 className="text-white">{mensajeMostrar}</h1>
                        }

                        {estadoMostrar == "reseñas" &&
                             resenas.map((resena) =>{

                                return (
                                    <>
                                    {resena.estado == 1 &&
                                    <div class="resena card col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-4" style={{backgroundColor:"aliceblue"}}>
                                    <div class="row p-2">
                                        <div class="col-md-4 col-sm-6 text-center">
                                            <img src={resena.imagen} class="img-fluid" style={{width: "100%", height: "180px",borderRadius: "20px"}}/>
                                        </div>
                                        <div class="col-md-8 col-sm-6 card-body">
                                            <div class="d-flex flex-row justify-content-start align-items-center">
                                                <img src={resena.foto} class="rounded-circle" style={{width: "40px", height: "40px"}}/>
                                                <div class="mx-1"></div>
                                                <span class="fs-5">{resena.nombre_vendedor}</span>
                                            </div> 
                                            <div className="mt-1 fw-bold">{resena.nombre_producto}</div>
                                            <div class="mt-2 mb-2">
                                                {Array.from({ length: resena.valoracion }, (_, index) => (
                                                    <img src={estrella} class="" style={{width: "25px", height: "25px"}}/>
                                                ))}
                                            </div>
                                            <div>{resena.comentario}</div> 
                                        </div>
                                    </div>
                                </div>
                                                }
                                                </>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
       
    )
        
    
}

export default Productos;
