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
import Skeleton from '@mui/material/Skeleton';
import PantallaLoad from "./PantallaLoad";

const Perfil = () => {
    const navigate = useNavigate()

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const {dispatch} = useAppContext();
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    console.log(usuarioConectado);
    const [usuario, setUsuario] = useState({id: "", nombre: "", apellido: "", edad: 0, sexo: "", ciudad: "",  direccion: ""});
    const [imagen, setImagen] = useState(null);
    const [loaded, setLoaded] = useState(false);
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

        axios.post("https://backend-lobelbuy-iex3.onrender.com/perfil/obtenerDatos", datos)
        .then(({data}) => {
            console.log(data)
            dispatch({
                type: "CREAR_USUARIO",
                value: data
            })

            window.localStorage.setItem("usuario", JSON.stringify(data));
            
            setUsuario(data);
            setLoaded(true)            
            
        })
       
    }

    const selectedHandle = (event) => {
        console.log(event.target.files[0].name)
        setImagen(event.target.files[0].name);
        console.log(imagen)
    }
    
    const guardarDatos = () => {
        
        document.getElementById("nombre").classList.remove("is-invalid");

        var nombre =  document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var sexo = document.getElementById("sexo").value;
        var errorNombre = false;

        if(nombre == "" || (nombre.length < 4 || nombre.length > 20)){
            errorNombre = true;
            document.getElementById("nombre").classList.add("is-invalid");
        }

        if(edad == "") {
            edad = 0;
        }

        if(sexo == "¿Cual es tu sexo?") {
            sexo = "";
        } 

        const datos = {
            usuario_id: document.getElementById("usuario_id").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: edad,
            sexo: sexo,
            ciudad: document.getElementById("ciudad").value,
            direccion: document.getElementById("direccion").value,
            imagen: document.getElementById("imagen").files[0]
            //imagen: document.getElementById('imagen').files[0]
        }

        console.log(datos)

        if(!errorNombre){
            document.getElementById("modalEditandoPerfil").style.display = "block";
            if(document.getElementById("imagen").files[0] == undefined){
                axios.post("https://backend-lobelbuy-iex3.onrender.com/perfil/guardarDatosSinFoto", datos)
                .then(({data}) => {
                    if(data == "Actualizado") {
                        obtenerDatos();
                        setLoaded(true);
                    }
                    document.getElementById("modalEditandoPerfil").style.display = "none";
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
            }
            else{
                const formData = new FormData();
                formData.append("usuario_id", document.getElementById("usuario_id").value);
                formData.append("nombre", document.getElementById("nombre").value);
                formData.append("apellido", document.getElementById("apellido").value);
                formData.append("edad", edad);
                formData.append("sexo", sexo);
                formData.append("ciudad", document.getElementById("ciudad").value);
                formData.append("direccion", document.getElementById("direccion").value);
                formData.append("file", document.getElementById("imagen").files[0]);
        
                axios.post("https://backend-lobelbuy-iex3.onrender.com/perfil/guardarDatos", formData)
                .then(({data}) => {
                    if(data == "Actualizado") {
                        setImagen(null)
                        obtenerDatos();
                        setLoaded(true)
                    }
                    document.getElementById("modalEditandoPerfil").style.display = "none";
                })
                .catch(({response}) => {
                    console.log(response.data);
                })
            }
        }

        

        //document.getElementById("imagen").value = null;
        //setImagen(null);
       
    }
  
    /*const cerrarAlerta = ({target}) => {
        target.parentElement.style.visibility = "hidden";
    }*/

    return(
        <div id="perfil" className=" position-relative" style={{minHeight: "80%", background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            
            <Sidebar componente="perfil"/>
            <div className="perfilForm py-5 mx-auto">
                <div className="container" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                    <div class="pt-5 pb-2 text-center" style={{position: "relative"}}>
                        {!loaded ? (
                            <Skeleton className="mx-auto" variant="rounded" sx={{width: "150px", height: "150px", bgcolor: 'white.100' }}/>
                            ) : (
                                <>
                                {usuario.imagen == "" ? (
                                    <img src="" class="rounded-circle" alt="Foto de perfil" width="150" height="150" style={{position: "relative"}}/>
                                ) : (
                                    <img src={usuario.imagen} class="rounded-circle" alt="Foto de perfil" width="150" height="150"/>
                                )}

                                <label for="imagen" style={{position: "absolute", top: "50px", cursor: "pointer"}}>
                                    <MdModeEditOutline style={{width: "40px", height: "40px"}}/>
                                    {imagen != null && <span>{imagen}</span>}
                                </label>
                                </>
                            )

                            
                        }

                        
                    </div>
                    <input id="imagen" type="file" name="imagen" style={{display: "none"}} onChange={(event) => selectedHandle(event)}/>
                    <h2 class="mt-3 text-center">{usuario.nombre}</h2>
                    <hr/>
                    <form className="pb-5 px-5">
                        <input type="text" id="usuario_id" defaultValue={usuario.usuario_id} hidden name="id"/>
                        <div className="row">
                            <h3>Datos personales</h3>
                            <div class="col-md-6 col-xs-12 form-group mb-3 col">
                                <label htmlFor="nombre" className="mb-2">Nombre de usuario</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }

                                {loaded &&
                                   <input type="text" id="nombre" name="nombre" defaultValue={usuario.nombre} class="form-control" placeholder="¿Cómo te llamas?"/>
                                }
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="apellido" className="mb-2">Apellido</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }
                                {loaded &&
                                    <input type="text" id="apellido" name="apellido" defaultValue={usuario.apellido} class="form-control" placeholder="¿Cómo te apellidas?"/>

                                }
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3 col">
                                <label htmlFor="edad" className="mb-2">Edad</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }

                                {loaded && usuario.edad == 0 &&
                                   
                                    <input type="number" id="edad" name="edad" class="form-control" placeholder="¿Cuantos años tienes?" />
                                       
                                }

                                {loaded && usuario.edad != 0 &&
                                   
                                   <input type="number" id="edad" name="edad" defaultValue={usuario.edad} class="form-control" placeholder="¿Cuantos años tienes?" />
                                  
                                }
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="sexo" className="mb-2">Sexo</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }

                                {loaded && usuario.sexo == "" &&
                                    <select id="sexo" class="form-control">
                                        <option selected disabled>¿Cual es tu sexo?</option>
                                        <option >Hombre</option>
                                        <option>Mujer</option>
                                    </select>
                                }

                                {loaded && usuario.sexo != "" &&
                                    <select id="sexo" defaultValue={usuario.sexo} class="form-control">
                                        <option selected disabled>¿Cual es tu sexo?</option>
                                        <option >Hombre</option>
                                        <option>Mujer</option>
                                    </select>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <h3>Dirección</h3>
                            <div class="col-md-12 col-xs-12 form-group mb-3">
                                <label htmlFor="ciudad" defaultValue={usuario.ciudad} className="mb-2">Ciudad</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }
                                {loaded && usuario.ciudad == "" &&
                                    <select id="ciudad" name="ciudad" class="form-control">
                                        <option selected disabled defaultValue='selecciona'>Selecciona</option>
                                        <option defaultValue='A Coruña' >A Coruña</option>
                                        <option defaultValue='álava'>álava</option>
                                        <option defaultValue='Albacete' >Albacete</option>
                                        <option defaultValue='Alicante'>Alicante</option>
                                        <option defaultValue='Almería' >Almería</option>
                                        <option defaultValue='Asturias' >Asturias</option>
                                        <option defaultValue='ávila' >Ávila</option>
                                        <option defaultValue='Badajoz' >Badajoz</option>
                                        <option defaultValue='Barcelona'>Barcelona</option>
                                        <option defaultValue='Burgos' >Burgos</option>
                                        <option defaultValue='Cáceres' >Cáceres</option>
                                        <option defaultValue='Cádiz' >Cádiz</option>
                                        <option defaultValue='Cantabria' >Cantabria</option>
                                        <option defaultValue='Castellón' >Castellón</option>
                                        <option defaultValue='Ceuta' >Ceuta</option>
                                        <option defaultValue='Ciudad Real' >Ciudad Real</option>
                                        <option defaultValue='Córdoba' >Córdoba</option>
                                        <option defaultValue='Cuenca' >Cuenca</option>
                                        <option defaultValue='Gerona' >Gerona</option>
                                        <option defaultValue='Girona' >Girona</option>
                                        <option defaultValue='Las Palmas' >Las Palmas</option>
                                        <option defaultValue='Granada' >Granada</option>
                                        <option defaultValue='Guadalajara' >Guadalajara</option>
                                        <option defaultValue='Guipúzcoa' >Guipúzcoa</option>
                                        <option defaultValue='Huelva' >Huelva</option>
                                        <option defaultValue='Huesca' >Huesca</option>
                                        <option defaultValue='Jaén' >Jaén</option>
                                        <option defaultValue='La Rioja' >La Rioja</option>
                                        <option defaultValue='León' >León</option>
                                        <option defaultValue='Lleida' >Lleida</option>
                                        <option defaultValue='Lugo' >Lugo</option>
                                        <option defaultValue='Madrid' >Madrid</option>
                                        <option defaultValue='Malaga' >Málaga</option>
                                        <option defaultValue='Mallorca' >Mallorca</option>
                                        <option defaultValue='Melilla' >Melilla</option>
                                        <option defaultValue='Murcia' >Murcia</option>
                                        <option defaultValue='Navarra' >Navarra</option>
                                        <option defaultValue='Orense' >Orense</option>
                                        <option defaultValue='Palencia' >Palencia</option>
                                        <option defaultValue='Pontevedra'>Pontevedra</option>
                                        <option defaultValue='Salamanca'>Salamanca</option>
                                        <option defaultValue='Segovia' >Segovia</option>
                                        <option defaultValue='Sevilla' >Sevilla</option>
                                        <option defaultValue='Soria' >Soria</option>
                                        <option defaultValue='Tarragona' >Tarragona</option>
                                        <option defaultValue='Tenerife' >Tenerife</option>
                                        <option defaultValue='Teruel' >Teruel</option>
                                        <option defaultValue='Toledo' >Toledo</option>
                                        <option defaultValue='Valencia' >Valencia</option>
                                        <option defaultValue='Valladolid' >Valladolid</option>
                                        <option defaultValue='Vizcaya' >Vizcaya</option>
                                        <option defaultValue='Zamora' >Zamora</option>
                                        <option defaultValue='Zaragoza'>Zaragoza</option>
                                    </select>
                                }

                                {loaded && usuario.ciudad != "" &&
                                    <select id="ciudad" defaultValue={usuario.ciudad} name="ciudad" class="form-control">
                                        <option selected disabled defaultValue='selecciona'>Selecciona</option>
                                        <option defaultValue='A Coruña' >A Coruña</option>
                                        <option defaultValue='álava'>álava</option>
                                        <option defaultValue='Albacete' >Albacete</option>
                                        <option defaultValue='Alicante'>Alicante</option>
                                        <option defaultValue='Almería' >Almería</option>
                                        <option defaultValue='Asturias' >Asturias</option>
                                        <option defaultValue='ávila' >Ávila</option>
                                        <option defaultValue='Badajoz' >Badajoz</option>
                                        <option defaultValue='Barcelona'>Barcelona</option>
                                        <option defaultValue='Burgos' >Burgos</option>
                                        <option defaultValue='Cáceres' >Cáceres</option>
                                        <option defaultValue='Cádiz' >Cádiz</option>
                                        <option defaultValue='Cantabria' >Cantabria</option>
                                        <option defaultValue='Castellón' >Castellón</option>
                                        <option defaultValue='Ceuta' >Ceuta</option>
                                        <option defaultValue='Ciudad Real' >Ciudad Real</option>
                                        <option defaultValue='Córdoba' >Córdoba</option>
                                        <option defaultValue='Cuenca' >Cuenca</option>
                                        <option defaultValue='Gerona' >Gerona</option>
                                        <option defaultValue='Girona' >Girona</option>
                                        <option defaultValue='Las Palmas' >Las Palmas</option>
                                        <option defaultValue='Granada' >Granada</option>
                                        <option defaultValue='Guadalajara' >Guadalajara</option>
                                        <option defaultValue='Guipúzcoa' >Guipúzcoa</option>
                                        <option defaultValue='Huelva' >Huelva</option>
                                        <option defaultValue='Huesca' >Huesca</option>
                                        <option defaultValue='Jaén' >Jaén</option>
                                        <option defaultValue='La Rioja' >La Rioja</option>
                                        <option defaultValue='León' >León</option>
                                        <option defaultValue='Lleida' >Lleida</option>
                                        <option defaultValue='Lugo' >Lugo</option>
                                        <option defaultValue='Madrid' >Madrid</option>
                                        <option defaultValue='Malaga' >Málaga</option>
                                        <option defaultValue='Mallorca' >Mallorca</option>
                                        <option defaultValue='Melilla' >Melilla</option>
                                        <option defaultValue='Murcia' >Murcia</option>
                                        <option defaultValue='Navarra' >Navarra</option>
                                        <option defaultValue='Orense' >Orense</option>
                                        <option defaultValue='Palencia' >Palencia</option>
                                        <option defaultValue='Pontevedra'>Pontevedra</option>
                                        <option defaultValue='Salamanca'>Salamanca</option>
                                        <option defaultValue='Segovia' >Segovia</option>
                                        <option defaultValue='Sevilla' >Sevilla</option>
                                        <option defaultValue='Soria' >Soria</option>
                                        <option defaultValue='Tarragona' >Tarragona</option>
                                        <option defaultValue='Tenerife' >Tenerife</option>
                                        <option defaultValue='Teruel' >Teruel</option>
                                        <option defaultValue='Toledo' >Toledo</option>
                                        <option defaultValue='Valencia' >Valencia</option>
                                        <option defaultValue='Valladolid' >Valladolid</option>
                                        <option defaultValue='Vizcaya' >Vizcaya</option>
                                        <option defaultValue='Zamora' >Zamora</option>
                                        <option defaultValue='Zaragoza'>Zaragoza</option>
                                    </select>
                                }
                                
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="direccion" className="mb-2">Dirección</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }
                                {loaded && usuario.direccion == "" &&
                                    <input type="text" id="direccion" name="direccion" class="form-control" placeholder="Ej: Calle de la villa"/>
                                }  

                                {loaded && usuario.direccion != "" &&
                                    <input type="text" id="direccion" name="direccion" defaultValue={usuario.direccion} class="form-control" placeholder="Ej: Calle de la villa del Carmen"/>
                                } 
                            </div>
                            <div class="col-md-6 col-xs-12 form-group mb-3">
                                <label htmlFor="cod-postal" className="mb-2">Código Postal</label>
                                {!loaded &&
                                    <Skeleton variant="text" sx={{fontSize: '2rem' , bgcolor: 'white.100'}}/>
                                }
                                {loaded &&
                                    <input type="number" id="cod-postal" name="cod-postal" class="form-control" placeholder="Ej: 28067"/>
                                }  
                                
                            </div>
                            <div className="pt-4 d-flex justify-content-center">
                                <button type="button" class="btnVerProducto" onClick={guardarDatos}>Guardar</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div id="modalEditandoPerfil" style={{display: "none"}}>
                <PantallaLoad texto="Guardando cambios"/>
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
