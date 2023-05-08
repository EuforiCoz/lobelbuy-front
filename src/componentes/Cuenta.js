import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/cuenta.css"
import { useAppContext } from "../AppProvider";


const Cuenta = () => {
    //const navigate = useNavigate();

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));

    const {dispatch} = useAppContext();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    useEffect(()=>{
        if(usuarioConectado != null){
            dispatch({
                type: "CREAR_USUARIO",
                value: usuarioConectado
            })
        }
    }, [])

    return(
        <div id="cuenta" className="d-flex flex-row justify-content-center align-items-center">
          
        </div>
    )
        
    
}

export default Cuenta;