import React, { useEffect } from "react";
import "./styles/headerBottom.css";
import {Link} from "react-router-dom"
import { useAppContext } from "../AppProvider";
import {useNavigate } from 'react-router-dom';
import iconoBuscar from "./iconos/buscar.svg"
import iconoUsuario from "./iconos/user.svg"
import iconoUsuarioDefecto from "./iconos/foto_defecto.svg"
import iconoMensajes from "./iconos/chat.svg"


const HeaderBottom = () => {
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
    }, [])

    
    useEffect(()=>{
        if(currentUrl == "http://localhost:3000/"){
            console.log("inicio")
            document.getElementById("busca").hidden = true;
            document.getElementById("nombreBuscador").hidden = true;
        } else{
            console.log("otro")
            document.getElementById("busca").hidden = false;
            document.getElementById("nombreBuscador").hidden = false;
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

  
    
    return(
        <div id="headerBottom" className="position-fixed d-flex align-items-center" style={{width: "100%",bottom: 0}}>
            <div className="container-fluid text-white">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className=""><a href="/" className="text-white text-decoration-none">Inicio</a></div>
                    <div className=""><a href="/subirProducto" className="text-white text-decoration-none">Subir</a></div>
                    <div className="">
                    {usuario != null ?
                        (
                        <div className="botonCuenta">
                            <div className="d-flex flex-row" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={usuarioConectado.imagen} className="rounded-circle iconoUsuario mx-2" alt="Foto de perfil" width="40" height="40"/>
                                <div className="cuenta text-white fs-5">{usuario.nombre}</div>
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
            </div>
           
        </div>
    )
}

export default HeaderBottom;