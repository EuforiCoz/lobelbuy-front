import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import "./styles/perfil.css"
import "./styles/fichaProducto.css"
import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom";
import iconoCarrito from "./iconos/carrito.jpg";
import imgLike from "./iconos/like.svg";
import imgProducto from "./iconos/crash.jpg";
import {RiKakaoTalkLine} from "react-icons/ri"
import {AiFillHeart} from "react-icons/ai";
import Skeleton from '@mui/material/Skeleton';

const FichaProducto = () => {

    const navigate = useNavigate()
    const [usuario, setUsuario] = useState();
    const [producto, setProducto] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [loaded, setLoaded] = useState(false);
    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    

    useEffect(() => {
        if(usuarioConectado == null){
            setUsuario(0)
        } else{
            setUsuario(usuarioConectado.usuario_id);
            saberFavorito();
        }
    }, [])

    const saberFavorito = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/saberFavorito", datos)
        .then(res => {
            if(res.data.esta_en_favoritos == 1){
                document.getElementById("boton-me-gusta").style.fill = "red";
            }
        })
        .catch(res => {
            console.log(res);
        })
    }
    
    const params = useParams();  

    useEffect(()=>{
        obtenerDatos();   
        console.log(producto)
    }, [producto.length])

    const obtenerDatos = () => {
        const datos =  {
            id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarFichaProducto", datos)
        .then(res => {
            console.log(res.data);
            setLoaded(true);
            setProducto(res.data)
            var detalles = res.data.detalles;
            detalles = detalles.split(",");
            var arrayDetalles = []
            for (let i = 0; i < detalles.length; i++) 
            {
                if(detalles[i].trim() != ""){
                    arrayDetalles.push(detalles[i])
                }
            }
            console.log(arrayDetalles)
            setDetalles(arrayDetalles);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const crearConversacion = () => {
        console.log(usuario);
        if(usuario == 0){
            navigate("/login");
        }
        else{
            const datos =  {
                usuario1_id: usuarioConectado.usuario_id,
                usuario2_id: producto.usuario_id
            }
    
            axios.post("https://backend-lobelbuy.onrender.com/crearConversacion", datos)
            .then(res => {
               
                    navigate("/cuenta/chats?usuario=" + producto.usuario_id);
                
            })
            .catch(res => {
                console.log(res);
            })
        }
    }

    const meGusta = (event) => {
        if(usuario == 0){
            navigate("/login")
        } else{
            var contiene = document.getElementById("boton-me-gusta").classList.contains('animacion-me-gusta')
            if (contiene || document.getElementById("boton-me-gusta").style.fill == "red") {
                document.getElementById("boton-me-gusta").classList.remove('animacion-me-gusta');
                document.getElementById("boton-me-gusta").style.fill = "black";
                quitaLike();
              } else {
                document.getElementById("boton-me-gusta").classList.add('animacion-me-gusta');
                document.getElementById("boton-me-gusta").style.fill = "red";
    
                darLike();
              }
        }
       
    }

    const darLike = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: producto.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/guardarFavorito", datos)
        .then(res => {
            //setProducto(res.data) 
        })
        .catch(res => {
            console.log(res);
        })
    }

    const quitaLike = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/eliminarFavorito", datos)
        .then(res => {
            //setProducto(res.data) 
        })
        .catch(res => {
            console.log(res);
        })
    }
   
    return(
        <div id="fichaProducto" className="py-5" style={{minHeight: "80%"}}>
            <div class="container p-3 con">
                <div class="row">
                    <div className="col-md-12">
                        <div className="ms-3 d-flex flex-row justify-content-between align-items-center">
                            {!loaded &&
                                <>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <Skeleton variant="circular" sx={{width: "60px", height: "60px", bgcolor: 'white.100'}}/>
                                    <Skeleton className="mx-1" variant="text" sx={{width: "120px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
                                </div>
                               
                                <Skeleton variant="text" sx={{width: "100px", fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                </>
                                
                            }

                            {loaded &&
                                <>
                                    <div>
                                        <Link to={"/vendedor/" + producto.usuario_id}><img src={producto.foto} className="rounded-circle" style={{width: "60px", height: "60px"}} /></Link>
                                        <span className="mx-1"></span>
                                        <span className="fs-5">{producto.nombre_usuario}</span>
                                    </div>
                                    {producto.usuario_id != usuario &&
                                        <button className="btnVerProducto"  onClick={crearConversacion}>Chatear</button>

                                    }
                                </>
                                
                            }
                           
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div id="carouselExampleIndicators" class=" mt-2 position-relative" style={{borderRadius: "20px"}}>
                           
                                <div class="c-item position-relative" style={{borderRadius: "20px"}}>
                                    <img src={producto.imagen} class="d-block  c-img" alt="..." style={{borderRadius: "20px"}}/>
                                </div>{
                                    console.log(producto.reservado)
                                }
                                {producto.reservado == 1 &&
                                    <span className="span-reservar position-absolute" style={{left: 5, top: 15}}>
                                        <input className="input-reservar" type="number" value={1} hidden/>
                                        <div class="mask">
                                            <div class="d-flex justify-content-start align-items-end h-100">
                                            <h4><span class="badge bg-primary ms-2 ">Reservado</span></h4>
                                            </div>
                                        </div>
                                        <div class="hover-overlay">
                                            <div class="mask"></div>
                                        </div>
                                    </span>
                                }
                        </div>
                    </div>
                    <div className="mt-3 d-flex flex-row justify-content-between">
                        {!loaded &&
                            <>
                                <Skeleton variant="text" sx={{width: "120px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
                                <div className="justify-content-end">                              
                                    <Skeleton variant="rounded" sx={{width: "50px", height: "50px", bgcolor: 'white.100'}}/>                               
                                </div>
                            </>
                        }

                        {loaded && 
                            <>
                                <span className="fs-3 fw-bold">{producto.nombre}</span>
                                <div className="justify-content-end">
                                {producto.usuario_id != usuario &&
                                    <AiFillHeart id="boton-me-gusta" onClick={meGusta} style={{width: "50px", height: "50px", fill: "black", cursor: "pointer"}}/>
                                }
                                </div>
                            </>
                        }
                       
                       
                    </div>
                    <div className="d-flex flex-column">
                    {!loaded && 
                        <>
                            <Skeleton variant="text" sx={{width: "60px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
                            <Skeleton variant="text" sx={{width: "80px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
                            <Skeleton variant="text" sx={{width: "100%", fontSize: '5rem' , bgcolor: 'white.100'}}/>
                        </>
                    }
                    {loaded && 
                        <>
                        <span className="fs-5 fw-bold">{producto.precio}€</span>
                        <h6 className="">{producto.categoria}</h6>
                        <p className="fs-5">{producto.descripcion}</p>
                        </>
                    }
                    </div>
                
                    <div>
                        {!loaded && 
                            <>
                                <Skeleton variant="text" sx={{width: "150px", fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                <Skeleton variant="rounded" sx={{width: "100%", height: "180px" , bgcolor: 'white.100'}}/>                
                            </>
                        }
                        {loaded && 
                            <>
                                <h2>Detalles</h2>
                                {detalles.length == 0 && 
                                    <p>No ha dado ningún detalle</p>
                                }

                                {detalles.length != 0 && 
                                    <ul>
                                        {
                                            detalles.map((detalles) => {
                                                return(<li>{detalles}</li>)  
                                            })
                                        }
                                    </ul>
                                }
                            </>
                        }
                    </div>
                    <div >
                        {!loaded && 
                            <>
                                <Skeleton variant="text" sx={{width: "150px", fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                <Skeleton variant="rounded" sx={{width: "100%", height: "80px" , bgcolor: 'white.100'}}/>                
                            </>
                        }

                        {loaded && 
                            <>
                                <h2>Método de envío</h2>
                                <ul>
                                    {producto.envio == 0 && <li>En mano</li>}
                                    {producto.envio == 1 && <li>Envío a casa</li>}
                                    {producto.envio == 2 && <><li>En mano</li><li>Envío a casa</li></>}
                                </ul>
                           </>
                        }
                        
                    </div>               
                </div>
            </div>
        </div>
    )  
}

export default FichaProducto;
