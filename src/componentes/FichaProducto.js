import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import "./styles/perfil.css"
import "./styles/fichaProducto.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import iconoCarrito from "./iconos/carrito.jpg";
import imgLike from "./iconos/like.svg";
import imgProducto from "./iconos/crash.jpg";
import {AiOutlineHeart} from 'react-icons/ai';
import {BsFillSuitHeartFill} from 'react-icons/bs';

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
        }
    }, [])
    
   

    const params = useParams();
   

    useEffect(()=>{

        obtenerDatos();   
        console.log(producto)
    }, [producto.length])

    const obtenerDatos = () => {
        const datos =  {
            id: params.id
        }

        axios.post("http://localhost:5000/mostrarFichaProducto", datos)
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
    
            axios.post("http://localhost:5000/crearConversacion", datos)
            .then(res => {
               
                    navigate("/cuenta/chats");
                
            })
            .catch(res => {
                console.log(res);
            })
        }

       
    }

    const meGusta = (event) => {
        if (event.target.classList.contains('animacion-me-gusta')) {
            event.target.classList.remove('animacion-me-gusta');
          } else {
            event.target.classList.add('animacion-me-gusta');
          }
    }
   
    return(
        <div id="fichaProducto" className="py-5" style={{minHeight: "80%"}}>
            <div class="container p-5 con">
		<div class="row">
			<div class=" col-md-4 col-xs-6">
                <div class="row my-3">
                    <div class="col-md-12 col-xs-12 mb-4 main-img border">
                        {producto.imagen == "" ? (
                            <img src={imgProducto} alt="Nombre del producto" className="img-fluid img-main"/>
                        ) : (
                            <img src={producto.imagen} alt="Nombre del producto" className="img-fluid img-main"/>
                        )

                        }
                        
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <div className="row d-flex flex-nowrap">
                            <div className="col-md-4 col-sm-4 col-xs-4 border cajaImg">
                                <img src={imgProducto} alt="Nombre del producto" className=" img-fluid img-sec border"/>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4 border cajaImg">
                                <img src={imgProducto} alt="Nombre del producto" className=" img-fluid img-sec border"/>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4 border cajaImg">
                                <img src={imgProducto} alt="Nombre del producto" className=" img-fluid img-sec border"/>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			<div className="col-md-8 col-xs-6">
                <div className="d-flex flex-row justify-content-between">
                    <h1>{producto.nombre}</h1>
                        <div onClick={meGusta} className="">
                            <BsFillSuitHeartFill id="no-like" style={{width: "40px", height: "40px", marginRight: "50px"}}/>
                        </div>
                </div>
				
				<p>Vendido por SAPATISA</p>
				<hr/>
				<h2>Detalles</h2>
				<ul>
					<li><strong>Precio:</strong> {producto.precio}€</li>
					<li><strong>Disponibilidad:</strong> Vendido</li>
					<li class="categoria"><strong>Categoría:</strong> {producto.categoria}</li>
				</ul>
				<hr/>
                {usuario !=  producto.usuario_id && 
                    <button type="button" class="btn btn-primary mb-3" onClick={crearConversacion}>Hablar con vendedor</button>
                }
			</div>
            <div class="col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-md-12 col-xs-12">   
                        <h1>Descripción</h1>
                        <p>{producto.descripcion}</p>
                    </div>
                    <div class="col-md-6 col-xs-6">
                        <h2>Especificaciones</h2>
                        <ul>
                            <li>Producto dañado</li>
                            <li>No lo uso mucho</li>
                            <li>Producto dañado</li>
                            <li>No lo uso mucho</li>
                        </ul>
                    </div>
                    <div class="col-md-6 col-xs-6">
                        <h2>Método de envío</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, neque? Eos placeat laboriosam modi provident, maxime rem blanditiis veniam animi repudiandae? Illum optio qui corporis cumque quas dolor itaque placeat?</p>
                    </div>
                </div>
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
