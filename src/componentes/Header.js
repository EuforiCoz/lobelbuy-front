import React, { useEffect, useState } from "react";
import "./styles/header.css";
import {Link} from "react-router-dom"
import { useAppContext } from "../AppProvider";
import {useNavigate } from 'react-router-dom';
import iconoBuscar from "./iconos/buscar.svg"
import iconoUsuario from "./iconos/user.svg"
import iconoUsuarioDefecto from "./iconos/foto_defecto.svg"
import iconoMensajes from "./iconos/chat.svg"
import {AiFillHeart} from "react-icons/ai";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import fotoUsuario from "./iconos/usuario.png"

const Header = () => {
    const navigate = useNavigate();
    const {usuario} = useAppContext();
    const {dispatch} = useAppContext();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    const currentUrl = window.location.href;
    console.log(currentUrl);

    const [color, setColor] = useState(null);

    useEffect(()=>{
        if(usuarioConectado != null){
            dispatch({
                type: "CREAR_USUARIO",
                value: usuarioConectado
            })
        }
    }, []);

    
    useEffect(()=>{
        if(currentUrl == "https://frontend-lobelbuy.onrender.com/"){
            console.log("inicio")
            //document.getElementById("busca").hidden = true;
            //document.getElementById("nombreBuscador").hidden = true;
            document.getElementById("buscador").display = "none";
        } else{
            console.log("otro")
            //document.getElementById("busca").hidden = false;
            //document.getElementById("nombreBuscador").hidden = false;
            document.getElementById("buscador").display = "flex";
        }
      
    }, [currentUrl])

    const buscarProducto = () => {
        const nombreBuscador = document.getElementById("nombreBuscador").value;
        const ruta = "/listadoProductos?nombre=" + nombreBuscador;
        navigate(ruta)
    }
    
    return(
        <div id="header" className="container-fluid py-4">
            <div className="row d-flex justify-content-center align-items-center" >
                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="text-white d-flex justify-content-center align-items-center">
                        <Link to="/" className="text-decoration-none">
                            <div className="logo text-white">Lobelbuy</div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-6 col-6">
                    <div id="buscador" className="buscador text-white d-flex flex-row-reverse align-items-center">
                        {/*<input id="nombreBuscador" type="text" placeholder="Buscar producto" className="inputBuscar form-control w-100 rounded-pill"/>*/}
                        <input id="nombreBuscador" type="text" placeholder="Buscar producto" className="inputBuscar form-control w-100"/>
                        <img id="busca" src={iconoBuscar} className="iconoBuscar me-2" alt="buscar" onClick={buscarProducto}/>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 col-6">
                    <div className="text-white d-flex justify-content-center align-items-center cuenta">
                    {usuario != null ?
                            (                          
                                <div className="d-flex flex-row align-items-center" >                             
                                    <Link  to="/cuenta/productos">
                                            <img src={usuarioConectado.imagen} className="rounded-circle iconoUsuario mx-2" alt="Foto de perfil"/>
                                    </Link>
                                    <div className="mx-4"></div>
                                    <Link to="/cuenta/favoritos" className="iconoLike"><AiFillHeart style={{width: "50px", height: "50px", fill: "red", cursor: "pointer"}}/></Link>                                  
                                </div>                
                            ) : ( 
                                <div className="botonCuenta">
                                    <Link  to="/login" className="d-flex flex-row align-items-center">
                                        <div className="cuenta text-white">Cuenta</div>
                                        <img src={iconoUsuario} className="iconoUsuario ms-1" alt="cuenta"/>
                                    </Link>
                                </div>           
                           )
                    }
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 col-6">
                    <div  className="subirProducto">
                        {/*<Link to="/subirProducto" className="inputSubir btn text-white border fw-bold rounded-pill">Subir Producto</Link>*/}
                        <Link to="/subirProducto" className="inputSubir btn text-white">Subir Producto</Link>
                    </div>
                </div>
            </div> 
           
        </div>
    )
}

export default Header;
