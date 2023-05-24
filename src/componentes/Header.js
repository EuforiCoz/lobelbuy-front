import React, { useEffect } from "react";
import "./styles/header.css";
import {Link} from "react-router-dom"
import { useAppContext } from "../AppProvider";
import {useNavigate } from 'react-router-dom';
import iconoBuscar from "./iconos/buscar.svg"
import iconoUsuario from "./iconos/user.svg"
import iconoUsuarioDefecto from "./iconos/foto_defecto.svg"
import iconoMensajes from "./iconos/chat.svg"

const Header = () => {
    const navigate = useNavigate();
    const {usuario} = useAppContext();
    const {dispatch} = useAppContext();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    const currentUrl = window.location.href;
    console.log(currentUrl);



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

    const cerrarSesion = () => {
        dispatch({
            type: "CREAR_USUARIO",
            value: null
        })
        window.localStorage.clear();
        navigate("/login");
    }

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
                            <div className="botonCuenta">
                                <div className="d-flex flex-row" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={usuarioConectado.imagen} className="rounded-circle iconoUsuario mx-2" alt="Foto de perfil" width="40" height="40"/>
                                    <div className="cuenta nombre-usuario text-white fs-5" >{usuario.nombre}</div>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link className="dropdown-item" to="/cuenta/productos">Mi cuenta</Link></li>
                                    <li className="dropdown-item" onClick={cerrarSesion}>Cerrar Sesión</li>
                                </ul>
                            </div>
                            ) : (
                                <div className="botonCuenta">
                                <div className="d-flex flex-row" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="cuenta text-white">Cuenta</div>
                                    <img src={iconoUsuario} className="iconoUsuario ms-1" alt="cuenta"/>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                                    <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                                </ul>
                            </div>)
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
