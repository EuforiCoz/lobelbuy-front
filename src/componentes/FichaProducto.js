import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import "./styles/perfil.css"
import "./styles/fichaProducto.css"
import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom";
import iconoCarrito from "./iconos/carrito.jpg";
import imgLike from "./iconos/like.svg";
import imgProducto from "./iconos/crash.jpg";
import {RiKakaoTalkLine} from "react-icons/ri"

const FichaProducto = () => {

    const navigate = useNavigate()
    const [usuario, setUsuario] = useState();
    const [producto, setProducto] = useState([]);
    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    

    useEffect(() => {
        if(usuarioConectado == null){
            setUsuario(0)
        } else{
            setUsuario(usuarioConectado.usuario_id);
            saberFavorito();
        }
    }, [])

    const saberFavorito = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/saberFavorito", datos)
        .then(res => {
            if(res.data.esta_en_favoritos == 1){
                document.getElementById("boton-me-gusta").classList.add('animacion-me-gusta');
            }
        })
        .catch(res => {
            console.log(res);
        })
    }
    
   

    const params = useParams();
   

    useEffect(()=>{

        obtenerDatos();   
        console.log(producto)
    }, [producto.length])

    const obtenerDatos = () => {
        const datos =  {
            id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarFichaProducto", datos)
        .then(res => {
            setProducto(res.data) 
        })
        .catch(res => {
            console.log(res);
        })
    }

    const crearConversacion = () => {
        console.log(usuario);
        if(usuario == 0){
            navigate("/login");
        }
        else{
            const datos =  {
                usuario1_id: usuarioConectado.usuario_id,
                usuario2_id: producto.usuario_id
            }
    
            axios.post("https://backend-lobelbuy.onrender.com/crearConversacion", datos)
            .then(res => {
               
                    navigate("/cuenta/chats");
                
            })
            .catch(res => {
                console.log(res);
            })
        }

       
    }

    const meGusta = (event) => {
        var contiene = document.getElementById("boton-me-gusta").classList.contains('animacion-me-gusta')
        if (contiene) {
            document.getElementById("boton-me-gusta").classList.remove('animacion-me-gusta');
            quitaLike();
          } else {
            document.getElementById("boton-me-gusta").classList.add('animacion-me-gusta');
            darLike();
          }
    }

    const darLike = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: producto.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/guardarFavorito", datos)
        .then(res => {
            //setProducto(res.data) 
        })
        .catch(res => {
            console.log(res);
        })
    }

    const quitaLike = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id,
            producto_id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/eliminarFavorito", datos)
        .then(res => {
            //setProducto(res.data) 
        })
        .catch(res => {
            console.log(res);
        })
    }
   
    return(
        <div id="fichaProducto" className="py-5" style={{minHeight: "80%"}}>
            <div class="container p-3 con w-50">
                <div class="row">
                    <div className="ms-3">
                        <Link to={"/vendedor/" + producto.usuario_id}><img src={producto.imagen} className="rounded-circle" style={{width: "60px", height: "60px"}} /></Link>
                        <span className="mx-1"></span>
                        <span className="fs-5">Pekito Terrores</span>
                        <RiKakaoTalkLine className="hablar mx-3" onClick={crearConversacion} style={{width: "45px", height: "45px", cursor: "pointer"}}/>
                    </div>
                    <div id="carouselExampleIndicators" class="carousel slide mt-2" style={{borderRadius: "20px"}}>
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner " style={{borderRadius: "20px"}}>
                            <div class="carousel-item active c-item">
                            <img src={producto.imagen} class="d-block w-100 c-img" alt="..." style={{borderRadius: "20px"}}/>
                            </div>
                            <div class="carousel-item  c-item">
                            <img src="http://res.cloudinary.com/dj3zwdn0r/image/upload/v1683813843/upcy4zbcbwogm1jom5qy.jpg" class="d-block w-100 c-img" alt="..." style={{borderRadius: "20px"}}/>
                            </div>
                            <div class="carousel-item  c-item">
                            <img src="http://res.cloudinary.com/dj3zwdn0r/image/upload/v1683813843/upcy4zbcbwogm1jom5qy.jpg" class="d-block w-100 c-img" alt="..." style={{borderRadius: "20px"}}/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="mt-3">
                        <p className="fs-3 fw-bold">{producto.nombre}</p>
                    </div>
                    <div className="">
                        <p className="fs-5">{producto.descripcion}</p>
                    </div>
                   
                    <div>
                        <h2>Especificaciones</h2>
                        <ul>
                            <li>Producto dañado</li>
                            <li>No lo uso mucho</li>
                            <li>Producto dañado</li>
                            <li>No lo uso mucho</li>
                        </ul>
                    </div>
                    <div >
                        <h2>Método de envío</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, neque? Eos placeat laboriosam modi provident, maxime rem blanditiis veniam animi repudiandae? Illum optio qui corporis cumque quas dolor itaque placeat?</p>
                    </div>               
                </div>
            </div>
             {/*
            <div className="info text-white py-5">
                {/*
                    <div>
                        {producto.id} <br/>
                        {producto.nombre} <br/>
                        {producto.categoria} <br/>
                        {producto.precio}€ <br/>
                        {producto.estado} <br/>
                        {producto.descripcion} <br/>
                        {producto.usuario} <br/>
                    </div>

               
            </div>
             */}
        </div>
    )  
}

export default FichaProducto;
