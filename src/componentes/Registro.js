import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"
import "./styles/registro.css"
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();

    const [datosRegistro, setDatosRegistro] = useState({nombreRegistro: "", correoRegistro: "", contrasenaRegistro: ""});

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

    const enviarDatosRegistro = () => {
     axios.post("https://backend-lobelbuy.onrender.com/api/registrarse", datosRegistro)
     .then(({data}) => {
        navigate("/login", {
            state: {
                registered: true
            }
        });
     })
    }

    return (
        <div id="registro" className="d-flex justify-content-center align-items-center">
            {/*
            <div className="caja w-25 p-5">
                        <h1 className="text-white">Registro</h1>
                        <input type="text" className="form-control mt-4" name="nombreRegistro" onChange={inputChangeRegistro} placeholder="Nombre de usuario"/>
                        <input type="text" className="form-control mt-4" name="correoRegistro" onChange={inputChangeRegistro} placeholder="Correo electrónico"/>
                        <input type="password" className="form-control mt-4" name="contrasenaRegistro" onChange={inputChangeRegistro} placeholder="Contraseña"/>
                        <button type="button" className="inputIniciar btn border text-white w-100 mt-4" onClick={enviarDatosRegistro}>Crear Cuenta</button>
            </div>
            */}
            <form>
                <h1 className="titulo">Registrarse</h1>
                <div class="form-group">
                    <label for="name">Nombre usuario</label>
                    <input type="text" id="name" name="nombreRegistro" required onChange={inputChangeRegistro}/>
                </div>
                <div class="form-group">
                    <label for="name">Correo electrónico</label>
                    <input type="text" id="email" name="correoRegistro" required onChange={inputChangeRegistro}/>
                </div>
                <div class="form-group">
                    <label for="email">Contraseña</label>
                    <input type="password" id="password" name="contrasenaRegistro" required onChange={inputChangeRegistro}/>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button"  onClick={enviarDatosRegistro}>Crear cuenta</button>
                </div>
            </form>
        
        </div>
    )
}

export default Registro;
