import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
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

const Resenas = () =>{

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    
    const [resenas, setResenas] = useState([]);
    const [resenasPorVentas, setResenasPorVentas] = useState([]);
    const [resenasPorCompras, setResenasPorCompras] = useState([]);
    const [mensajeMostrar, setMensajeMostrar] = useState("");

    useEffect(()=>{
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }

        axios.post("http://localhost:5000/resenasPorVentas", datos)
        .then(res => {

            setResenasPorVentas(res.data);
            setResenas(res.data);
            setMensajeMostrar("No te han dedicado ninguna reseña");
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("http://localhost:5000/resenasPorCompras", datos)
        .then(res => {
            setResenasPorCompras(res.data);    
        })
        .catch(({response}) => {
            console.log(response.data);
        }) 
    }

    const mostrar = (resenas, mensaje) =>{
        
        if(mensaje == "por ventas"){
            setMensajeMostrar("No te han dedicado ninguna reseña");
        } else {
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
                    <div  className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorVentas, "por ventas")}><FaRegHandshake style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por ventas</span></div>
                    <div  className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2" onClick={() => mostrar(resenasPorCompras, "por compras")}><BsHandbag style={{width: "60px", height: "60px"}}/><span className='text-center'>Reseñas por compras</span></div>  
                </div>
            </div>
            <div className="misProductosCuenta d-flex flex-column justify-content-center align-items-center ">
                {resenas.length == 0 && 
                    <h1 className="text-white">{mensajeMostrar}</h1>
                }

                {resenas == resenasPorVentas ? (
                    resenas.map((resena) =>{

                        return (
                            <div class="resena card col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-4" style={{backgroundColor:"aliceblue"}}>
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
                                <div class="resena card col-lg-5 col-md-6 col-sm-12 col-xs-12 mb-4" >
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
