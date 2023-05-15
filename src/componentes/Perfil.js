import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/perfil.css"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
import imgProducto from "./iconos/crash.jpg";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {MdModeEditOutline} from 'react-icons/md';

const Perfil = () => {
    const navigate = useNavigate()

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const {dispatch} = useAppContext();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    console.log(usuarioConectado)
    const [usuario, setUsuario] = useState({id: "", nombre: "", apellido: "", direccion: ""});
    const [imagen, setImagen] = useState(null);

    //const myImage = new CloudinaryImage('sample', {cloudName: 'dj3zwdn0r'}).resize(fill().width(100).height(150));
    

    useEffect(()=>{
        if(usuarioConectado != null){
            dispatch({
                type: "CREAR_USUARIO",
                value: usuarioConectado
            })
        }
        console.log("hola")
        obtenerDatos();
        
    }, [])

    const obtenerDatos = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }

        axios.post("http://localhost:5000/perfil/obtenerDatos", datos)
        .then(({data}) => {
            dispatch({
                type: "CREAR_USUARIO",
                value: data
            })
            window.localStorage.setItem("usuario", JSON.stringify(data));
            setUsuario(data);
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    const selectedHandle = (event) => {
        setImagen(event.target.files[0]);
        
    }
    
    const guardarDatos = () => {

        const datos = {
            usuario_id: document.getElementById("usuario_id").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            direccion: document.getElementById("direccion").value,
            imagen: document.getElementById("imagen").files[0]
            //imagen: document.getElementById('imagen').files[0]
        }

        const formData = new FormData();
        formData.append("usuario_id", document.getElementById("usuario_id").value);
        formData.append("nombre", document.getElementById("nombre").value);
        formData.append("apellido", document.getElementById("apellido").value);
        formData.append("direccion", document.getElementById("direccion").value);
        formData.append("file", document.getElementById("imagen").files[0]);

        axios.post("http://localhost:5000/perfil/guardarDatos", formData)
        .then(({data}) => {
            if(data == "Actualizado") {
                alert("Se han actualizado los datos")
                obtenerDatos();
            }
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        //document.getElementById("imagen").value = null;
        //setImagen(null);
       
    }
  
    /*const cerrarAlerta = ({target}) => {
        target.parentElement.style.visibility = "hidden";
    }*/

    return(
        <div id="perfil" className=" position-relative" style={{minHeight: "80%", background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            
            <Sidebar componente="perfil"/>
            <div className="w-75 py-5 mx-auto">
                <div className="container" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                    <div class="pt-5 pb-2 text-center" style={{position: "relative"}}>
                        
                        {usuario.imagen == "" ? (
                            <img src={imgProducto} class="rounded-circle" alt="Foto de perfil" width="150" height="150" style={{position: "relative"}}/>
                        ) : (
                            <img src={usuario.imagen} class="rounded-circle" alt="Foto de perfil" width="150" height="150"/>
                        )

                        }
                         <label for="imagen" style={{position: "absolute", top: "50px", cursor: "pointer"}}>
                            <MdModeEditOutline style={{width: "40px", height: "40px"}}/>
                        </label>
                    </div>
                    <input id="imagen" type="file" name="imagen" style={{display: "none"}}/>
                    <h2 class="mt-3 text-center">{usuario.nombre}</h2>
                    <hr/>
                    <form className="pb-5 px-5">
                        <input type="text" id="usuario_id" defaultValue={usuario.usuario_id} hidden name="id"/>
                        <div className="row">
                            <h3>Datos personales</h3>
                            <div class="col-md-6 col-xs-12 form-group mb-3 col">
                                <label htmlFor="nombre" className="mb-2">Nombre de usuario</label>
                                <input type="text" id="nombre" name="nombre" defaultValue={usuario.nombre} class="form-control" placeholder="¿Cómo te llamas?"/>
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="apellido" className="mb-2">Apellido</label>
                                <input type="text" id="apellido" name="apellido" defaultValue={usuario.apellido} class="form-control" placeholder="¿Cómo te apellidas?"/>
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3 col">
                                <label htmlFor="edad" className="mb-2">Edad</label>
                                <input type="number" id="edad" name="edad" class="form-control" placeholder="¿Cuantos años tienes?" />
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="sexo" className="mb-2">Sexo</label>
                                <select id="sexo" class="form-control">
                                    <option selected disabled>¿Cual es tu sexo?</option>
                                    <option >Hombre</option>
                                    <option>Mujer</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Dirección</h3>
                            <div class="col-md-12 col-xs-12 form-group mb-3">
                                <label htmlFor="ciudad" className="mb-2">Ciudad</label>
                                <input type="text" id="ciudad" name="ciudad"  class="form-control" placeholder="Madrid, Barcelona, etc"/>
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="direccion" className="mb-2">Dirección</label>
                                <input type="text" id="direccion" name="direccion" defaultValue={usuario.direccion} class="form-control"/>
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="cod-postal" className="mb-2">Código Postal</label>
                                <input type="number" id="cod-postal" name="cod-postal" class="form-control" placeholder="Ej: 28067"/>
                            </div>
                            <div className="pt-4 d-flex justify-content-center">
                                <button type="button" class="btn btnVerProducto" onClick={guardarDatos}>Guardar</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            {/*
            <div className="info py-5">
                <p className="h2 "> Mi perfil</p>
                <form>
                    <input type="text" id="usuario_id" defaultValue={usuario.usuario_id} hidden name="id"/>
                    <div className="my-5">
                        <label className="mx-5">Imagen de perfil</label>
                        <img src={imagenPerfil} className="imagenPerfil mx-5 rounded-circle"/>
                        <input id="imagen" type="file" className="btn" onChange={selectedHandle}/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Nombre</label>
                        <input type="text" className="texto col-2 form-control"/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Apellido</label>
                        <input type="text" id="apellido" defaultValue={usuario.apellido} className="texto col-2 form-control" name="apellido"/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Nombre de usuario</label>
                        <input type="text" id="nombre" defaultValue={usuario.nombre} className="texto col-2 form-control" name="nombre"/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Dirección</label>
                        <input type="text" id="direccion" defaultValue={usuario.direccion} className="texto col-2 form-control" name="direccion"/>
                    </div>
                    <div className="my-5">
                        <input type="button" value="Guardar" className="inputSubir btn text-white border rounded-pill" onClick={guardarDatos}/>
                    </div>
                </form> 
            </div>
            */}
        </div>
    )
        
    
}

export default Perfil;
