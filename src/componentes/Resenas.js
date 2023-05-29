import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
import "./styles/productos.css"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import {useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import {FaRegHandshake} from "react-icons/fa"
import {BsHandbag} from "react-icons/bs"
import imgSale from "./iconos/cupon.png"
import estrella from "./iconos/estrella.png"
import estrellaOff from "./iconos/estrellaOff.png"
import Skeleton from '@mui/material/Skeleton';

const Resenas = () =>{

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    
    const [resenas, setResenas] = useState([]);
    const [resenasPorVentas, setResenasPorVentas] = useState([]);
    const [resenasPorCompras, setResenasPorCompras] = useState([]);
    const [mensajeMostrar, setMensajeMostrar] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }

        axios.post("https://backend-lobelbuy-iex3.onrender.com/resenasPorVentas", datos)
        .then(res => {

            setResenasPorVentas(res.data);
            setResenas(res.data);
            setMensajeMostrar("No te han dedicado ninguna reseña");
            setLoaded(true);
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy-iex3.onrender.com/resenasPorCompras", datos)
        .then(res => {
            setResenasPorCompras(res.data);
                
        })
        .catch(({response}) => {
            console.log(response.data);
        }) 
    }

    const mostrar = (resenas, mensaje) =>{
        
        if(mensaje == "por ventas"){
            document.getElementById("divCompras").classList.remove("animacionCaja");
            document.getElementById("divVentas").classList.add("animacionCaja");
            setMensajeMostrar("No te han dedicado ninguna reseña");
        } else {
            document.getElementById("divVentas").classList.remove("animacionCaja");
            document.getElementById("divCompras").classList.add("animacionCaja");
            setMensajeMostrar("No has hecho ninguna reseña a ningún vendedor");
        }
        setResenas(resenas);
    }   

    return(
        <div id="resenas" className="productosCuenta position-relative" style={{minHeight: "80%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            <Sidebar componente="resenas"/>
            <div className="container-fluid py-5">
                <h1 className="text-white text-center">Reseñas</h1>
                <div className="row mx-auto pt-5 d-flex justify-content-center">
                    <div id="divVentas"  className="cajaCategoria animacionCaja col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorVentas, "por ventas")}><FaRegHandshake style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por ventas</span></div>
                    <div id="divCompras" className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorCompras, "por compras")}><BsHandbag style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por compras</span></div>  
                </div>
            </div>
            <div className="misProductosCuenta d-flex flex-column justify-content-center align-items-center ">
                {!loaded && 
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

                {(resenas.length == 0 && loaded) &&
                    <h1 className="text-white">{mensajeMostrar}</h1>
                }

                {resenas == resenasPorVentas ? (
                    resenas.map((resena) =>{

                        return (
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
                                
                            )
                        })
                    ) : (
                        resenas.map((resena) =>{

                            return (
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
                                            {resena.estado == 0 &&
                                                <div class="mt-2 mb-2">
                                                    <img src={estrellaOff} class="" style={{width: "25px", height: "25px"}}/>
                                                    <img src={estrellaOff} class="" style={{width: "25px", height: "25px"}}/>
                                                    <img src={estrellaOff} class="" style={{width: "25px", height: "25px"}}/>
                                                    <img src={estrellaOff} class="" style={{width: "25px", height: "25px"}}/>
                                                    <img src={estrellaOff} class="" style={{width: "25px", height: "25px"}}/>
                                                </div>
                                            }

                                            {resena.estado == 1 &&
                                                <div class="mt-2 mb-2">
                                                    {Array.from({ length: resena.valoracion }, (_, index) => (
                                                        <img src={estrella} class="" style={{width: "25px", height: "25px"}}/>
                                                    ))}
                                                </div>
                                            }
                                            
                                            {resena.estado == 0 &&
                                                <Link to={"/cuenta/resenasForm/" + resena.producto_id}><button className="btn btn-primary">Valorar</button></Link>
                                            } 

                                            {resena.estado == 1 &&
                                                 <div>{resena.comentario}</div> 
                                            } 
                                            
                                        </div>
                                    </div>
                                </div>
                                    
                                )
                            })
                    )
                }
            </div>
            
        </div>
    )
}

export default Resenas;
