import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"
import "./styles/registro.css"
import { useNavigate, Link } from 'react-router-dom';
import PantallaLoad from "./PantallaLoad";

const Registro = () => {
    const navigate = useNavigate();

    const [datosRegistro, setDatosRegistro] = useState({nombreRegistro: "", correoRegistro: "", contrasenaRegistro: ""});
    const [errorNombre, setErrorNombre] = useState(true);
    const [errorCorreo, setErrorCorreo] = useState(true);
    const [errorContrasena, setErrorContrasena] = useState(true);
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    useEffect(() => {
        if(usuarioConectado != null){
            navigate("/cuenta/productos");
        }
    }, [])

    const inputChangeRegistro = ({target}) => {
       
        const {name, value} = target
        setDatosRegistro({
            ...datosRegistro,
            [name]: value
        })
    }

    // Expresión regular para correos electrónicos
    var emailRegex = /^[\w\.-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/;

    // Expresión regular para contraseñas
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function validarNombre(nombre){
        if(nombre.length < 4 || nombre.length > 20){
            return false;
        }
        return true;
    }

    // Función para validar un correo electrónico
    function validarEmail(email) {
        return emailRegex.test(email);
    }
    
    // Función para validar una contraseña
    function validarPassword(password) {
        return passwordRegex.test(password);
    }

    const enviarDatosRegistro = () => {
        setErrorNombre(true);
        setErrorCorreo(true);
        setErrorContrasena(true);
        document.getElementById("nombreRegistro").classList.remove("is-invalid");
        document.getElementById("correoRegistro").classList.remove("is-invalid");
        document.getElementById("contrasenaRegistro").classList.remove("is-invalid");

        if(!validarNombre(datosRegistro.nombreRegistro)){
            setErrorNombre(false);
            document.getElementById("nombreRegistro").classList.add("is-invalid");
        }
        
        if (!validarEmail(datosRegistro.correoRegistro)) {
            setErrorCorreo(false);
            document.getElementById("correoRegistro").classList.add("is-invalid");
        } 
        
        if (!validarPassword(datosRegistro.contrasenaRegistro)) {
            setErrorContrasena(false);
            document.getElementById("contrasenaRegistro").classList.add("is-invalid");
        } 

        if (validarNombre(datosRegistro.nombreRegistro) && validarEmail(datosRegistro.correoRegistro) && validarPassword(datosRegistro.contrasenaRegistro)) {
            document.getElementById("modalRegistrarse").style.display = "block";
            setErrorCorreo(true);
            setErrorContrasena(true);
            axios.post("https://backend-lobelbuy-iex3.onrender.com/api/registrarse", datosRegistro)
            .then(({data}) => {
                navigate("/login", {
                    state: {
                        registered: true
                    }
                });
                document.getElementById("modalRegistrarse").style.display = "none";
            })
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            enviarDatosRegistro();
        }
      };

    return (
        <div id="registro" onKeyPress={handleKeyPress} className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{minHeight: "80%", background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            <div className="">
                <form className="w-75 p-5 mx-auto" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)", borderRadius: "10px"}}>
                    <div className="row ">
                        <h3>Registrarse</h3>
                        <div class="col-md-12 col-xs-12 form-group mb-3">
                            <label htmlFor="email" className="mb-2">Nombre de usuario</label>
                            <p style={{fontSize: "12px", color: "grey"}}>Entre 4 y 20 caracteres</p>
                            <input type="text" id="nombreRegistro" name="nombreRegistro"  class="form-control" onChange={inputChangeRegistro}/>
                            {!errorNombre &&
                                <p className="text-danger">Nombre de usuario no válido</p>
                            }
                        </div>
                        <div class="col-md-12 col-xs-12 form-group mb-3">
                            <label htmlFor="email" className="mb-2">Correo electrónico</label>
                            <p style={{fontSize: "12px", color: "grey"}}>Ejemplo: nombre@dominio.com</p>
                            <input type="text" id="correoRegistro" name="correoRegistro"  class="form-control" onChange={inputChangeRegistro}/>
                            {!errorCorreo &&
                                <p className="text-danger">Correo electrónico no válido</p>
                            }
                        </div>
                        <div class="col-md-12 col-xs-12 form-group mb-3">
                            <label htmlFor="password" className="mb-2">Contraseña</label>
                            <p style={{fontSize: "12px", color: "grey"}}>Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número</p>
                            <input type="password" id="contrasenaRegistro" name="contrasenaRegistro"  class="form-control" onChange={inputChangeRegistro}/>
                            {!errorContrasena &&
                                <p className="text-danger">Contraseña no válida</p>
                            }
                        </div>
                        <p>¿Ya tienes una cuenta?<Link to="/login">Inicia sesión</Link></p>
                        <div className="col-md-12 col-xs-12 d-flex justify-content-center align-items-center">
                            <button type="button"  onClick={enviarDatosRegistro}>Crear cuenta</button>
                        </div>
                    </div>
                </form>
            </div>
            <div id="modalRegistrarse" style={{display: "none"}}>
                <PantallaLoad texto="Creando cuenta"/>
            </div> 
        </div>
    )
}

export default Registro;
