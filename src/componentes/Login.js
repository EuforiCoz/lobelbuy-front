import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios"
import "./styles/login.css"
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from "../AppProvider";
import PantallaLoad from "./PantallaLoad";

const Login = () => {
    const navigate = useNavigate();
    var {state} = useLocation();
    const {dispatch} = useAppContext();

    const [datosLogin, setDatosLogin] = useState({correoLogin: "", contrasenaLogin: ""});
    const [error, setError] = useState(true);
    
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    useEffect(() => {
        if(usuarioConectado != null){
            navigate("/cuenta/productos");
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
        document.getElementById("modalEntrarLogin").style.display = "block";
        axios.post("https://backend-lobelbuy-iex3.onrender.com/api/login", datosLogin)
        .then(({data}) => {
            dispatch({
                type: "CREAR_USUARIO",
                value: data
            })
            window.localStorage.setItem("usuario", JSON.stringify(data));
            navigate("/cuenta/productos");
            document.getElementById("modalEntrarLogin").style.display = "none";
        })
        .catch(({response}) => {
            console.log(response.data);
            setError(false)
            document.getElementById("modalEntrarLogin").style.display = "none";
        })
       }

    const cerrarAlerta = ({target}) => {
        target.parentElement.style.visibility = "hidden";
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
          enviarDatosLogin();
        }
      };

   

    return (
      

<div id="login" onKeyPress={handleKeyPress} className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80%", background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
<div className="">
{state?.registered ? (
                 <div id="alerta" class="alert alert-success w-100 position-absolute top-0 start-0" role="alert">
                 Te has registrado correctamente
                 <button className="btn btn-close" onClick={cerrarAlerta}></button>
               </div>) : ("")
            
            }
    <form className="w-75 p-5 mx-auto" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)", borderRadius: "10px"}}>
        <div className="row ">
            <h3>Iniciar sesión</h3>
            <div class="col-md-12 col-xs-12 form-group mb-3">
                <label htmlFor="email" className="mb-2">Correo electrónico</label>
                <input type="text" id="name" name="correoLogin" required  class="form-control" onChange={inputChangeLogin}/>
            </div>
            <div class="col-md-12 col-xs-12 form-group mb-3">
                <label htmlFor="password" className="mb-2">Contraseña</label>
                <input type="password" id="email" name="contrasenaLogin"  class="form-control" onChange={inputChangeLogin}/>
            </div>
            <p>¿No tienes cuenta?<Link to="/registro"> Regístrate</Link></p>
            <div className="col-md-12 col-xs-12 d-flex flex-column justify-content-center align-items-center">
                {!error &&
                    <span className="text-danger mb-3">Correo o contraseña incorrecta</span>
                }
                <button type="button" onClick={enviarDatosLogin}>Entrar</button>
            </div>
        </div>
    </form>
</div>
<div id="modalEntrarLogin" style={{display: "none"}}>
    <PantallaLoad texto="Verificando datos"/>
</div> 
</div>
    )
}

export default Login;
