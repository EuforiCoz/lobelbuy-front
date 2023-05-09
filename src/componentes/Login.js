import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios"
import "./styles/login.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from "../AppProvider";

const Login = () => {
    const navigate = useNavigate();
    var {state} = useLocation();
    const {dispatch} = useAppContext();

    const [datosLogin, setDatosLogin] = useState({correoLogin: "", contrasenaLogin: ""});
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    useEffect(() => {
        if(usuarioConectado != null){
            navigate("/cuenta");
        }
    }, [])

    const inputChangeLogin = ({target}) => {
       
        const {name, value} = target
        setDatosLogin({
            ...datosLogin,
            [name]: value
        })
    }

    const enviarDatosLogin = () => {
        axios.post("https://backend-lobelbuy.vercel.app/api/login", datosLogin)
        .then(({data}) => {
            dispatch({
                type: "CREAR_USUARIO",
                value: data
            })
            window.localStorage.setItem("usuario", JSON.stringify(data));
            navigate("/cuenta/productos")
        })
        .catch(({response}) => {
            console.log(response.data);
        })
       }

    const cerrarAlerta = ({target}) => {
        target.parentElement.style.visibility = "hidden";
    }

   

    return (
      
        <div id="login" className="d-flex flex-column justify-content-center align-items-center">
            {state?.registered ? (
                 <div id="alerta" class="alert alert-success w-100 position-absolute top-0 start-0" role="alert">
                 Te has registrado correctamente
                 <button className="btn btn-close" onClick={cerrarAlerta}></button>
               </div>) : ("")
            
            }
            {/*
            <div className="container p-5 w-25 mx-auto">
            
                    <h1 className="">Login</h1>
                    <input type="text" className="inputs form-control mt-4" name="correoLogin" onChange={inputChangeLogin} placeholder="Correo electrónico"/>
                    <input type="password" className="inputs form-control mt-4" name="contrasenaLogin" onChange={inputChangeLogin} placeholder="Contraseña"/>
                    <button type="button" className="inputIniciarSesion btn text-white w-100 mt-4" onClick={enviarDatosLogin}>Iniciar sesión</button>
               
            </div>
        */}
           
            <form>
                <h1 className="titulo">Iniciar sesión</h1>
                <div class="form-group">
                    <label for="name">Correo electrónico</label>
                    <input type="text" id="name" name="correoLogin" required onChange={inputChangeLogin}/>
                </div>
                <div class="form-group">
                    <label for="email">Contraseña</label>
                    <input type="password" id="email" name="contrasenaLogin" required onChange={inputChangeLogin}/>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button"  onClick={enviarDatosLogin}>Entrar</button>
                </div>
            </form>
           
        </div>
    )
}

export default Login;
