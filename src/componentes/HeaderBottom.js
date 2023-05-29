import React, { useEffect } from "react";
import "./styles/headerBottom.css";
import {Link} from "react-router-dom"
import { useAppContext } from "../AppProvider";
import {useNavigate } from 'react-router-dom';
import iconoBuscar from "./iconos/buscar.svg"
import iconoUsuario from "./iconos/user.svg"
import iconoUsuarioDefecto from "./iconos/foto_defecto.svg"
import iconoMensajes from "./iconos/chat.svg"
import {AiFillHeart} from "react-icons/ai";



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

    const subirProducto = () => {
        if(usuarioConectado == null){
            navigate("/login");
        }
        else {
            navigate("/subirProducto");
        }
    }
    
    return(
        <div id="headerBottom" className="position-fixed d-flex align-items-center" style={{width: "100%",bottom: 0}}>
            <div className="container-fluid text-white">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Link to="/" className="text-white text-decoration-none">Inicio</Link>
                    <Link to="/subirProducto" className="text-white text-decoration-none">Subir</Link>
                   
                    {usuario != null ?
                        (
                            <>
                                <Link to="/cuenta/productos"><img src={usuarioConectado.imagen} className="rounded-circle iconoUsuario " alt="Foto de perfil" style={{width: "40px", height: "40px"}}/></Link>
                                <Link to="/cuenta/favoritos" className="iconoLike"><AiFillHeart style={{width: "40px", height: "40px", fill: "red", cursor: "pointer"}}/></Link>
                            </>
                        ) : (
                                <Link to="/login" className="d-flex flex-column justify-content-center align-items-center">
                                    <div className=" text-white">Cuenta</div>
                                    <img src={iconoUsuario} className=" ms-1" alt="cuenta" style={{width: "30px", height: "30px"}}/>
                                </Link>                           
                        )
                }
                   
                </div>
            </div>
           
        </div>
    )
}

export default HeaderBottom;
