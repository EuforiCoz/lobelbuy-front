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

        axios.post("https://backend-lobelbuy.onrender.com/resenasPorVentas", datos)
        .then(res => {

            setResenasPorVentas(res.data);
            setResenas(res.data);
            setMensajeMostrar("No te han dedicado ninguna reseña");
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy.onrender.com/resenasPorCompras", datos)
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
            <div className="misProductosCuenta d-flex flex-column justify-content-center align-items-center mt-5">
            {resenas.length == 0 ? (
                            <h1 className="text-white">{mensajeMostrar}</h1>
                            ) : (
                                resenas.map((resena) =>{

                                    return (
                                        <div className="card horizontal-card mb-3" key={resena.id} style={{width: "50%",background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                                            <div className="row">
                                                
                                                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 img-container img-overlay position-relative">
                                                    
                                                        {resena.imagen == "" ? (
                                                            <img src={imgProducto} className="card-img  w-100" height="240" alt="Producto"/>
                                                        ) : (
                                                            <div>
                                                                <img src={resena.imagen} className="card-img  w-100" height="240" alt="Producto"/>
                                                                {resena.reservado == 0 &&
                                                                    <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}} hidden>Reservado</span>
                                                                    <input type="number" defaultValue={resena.reservado} hidden/>
                                                                    </div>
        
                                                                }
        
                                                                {resena.reservado == 1 &&
                                                                    <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}}>Reservado</span>
                                                                    <input type="number" defaultValue={resena.reservado} hidden/>
                                                                    </div>
                                                                }   
                                                            </div>
                                                        )
        
                                                        }  
                                                    
                                                </div>
                                                
                                                <div id="caja" className="col-lg-8 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
                                                    <div className="card-body">
                                                        <div className="row d-flex flex-row">
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center d-flex flex-column align-items-center justify-content-center">
                                                                <input type="number" defaultValue={resena.id} hidden/>
                                                                <h5 className="card-title">Valoración:</h5>
                                                                {resena.valoracion == 0 &&
                                                                    <p className="card-text"><span className="fs-5">?</span></p>
                                                                }

                                                                {resena.comentario != 0 &&
                                                                    <p className="card-text"><span className="fs-5">{resena.valoracion} estrellas</span></p>
                                                                }
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2 d-flex flex-column align-items-center justify-content-center">
                                                                <span className="fs-5 fw-bold">Comentario:</span>
                                                                {resena.comentario == "" &&
                                                                    <span className="fs-5 ">?</span>                                                               
                                                                }

                                                                {resena.comentario != "" &&
                                                                     <span className="fs-5 ">{resena.comentario}</span>  
                                                                }
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex flex-column align-items-center justify-content-center">
                                                                {resena.estado == 0 &&
                                                                    <button className="btn btn-success"><Link to={"/cuenta/resenasForm/" + resena.producto_id} className="text-white text-decoration-none">Rellenar reseña</Link></button>
                                                                }

                                                                {resena.estado == 1 &&
                                                                    <button className="btn btn-primary">Reseña completada</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
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
