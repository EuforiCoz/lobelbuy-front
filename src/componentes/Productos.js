import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import imgProducto from "./iconos/crash.jpg"

const Productos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    
    const [productos, setProductos] = useState([]);

    useEffect(()=>{

        obtenerDatos();
        console.log(productos)
        
    }, [productos.length])

    const obtenerDatos = () => {
        const datos =  {
            usuario: usuarioConectado.usuario_id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarProductos", datos)
        .then(res => {

            setProductos(res.data);
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    /*
    const mostrarModal = () => {
       
    }
    */
   
    const eliminarProducto = (event) => {
        const datos =  {
            id: event.target.parentElement.parentElement.firstChild.value
        }

        console.log(event.target.parentElement.parentElement.firstChild.value)

        axios.post("https://backend-lobelbuy.onrender.com/eliminarProducto", datos)
        .then(res => {
            if(res.data == "Eliminado") {
                window.location.reload(true);
            }
        })
        .catch(res => {
            console.log(res);
        })
    }

    const reservarProducto = (producto_id, reservado) => {

        

        if(reservado == 0){
            reservado = 1;
        } else {
            reservado = 0;
        }

        const datos =  {
            id: producto_id,
            reservado: reservado
        }

        console.log(datos);
        
        axios.post("https://backend-lobelbuy.onrender.com/reservarProducto", datos)
        .then(res => {
            console.log(res.data);
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    const venderProducto = (producto_id) => {
        const datos =  {
            id: producto_id,
            //usuario_id: usuarioConectado.usuario_id
        }
       
        axios.post("https://backend-lobelbuy.onrender.com/venderProducto", datos)
        .then(res => {
            console.log(res.data)
            /*
            if(res.data == "Eliminado") {
                window.location.reload(true);
            }*/
        })
        .catch(res => {
            console.log(res);
        })
    }

    return(
        <div id="productosCuenta" className="productosCuenta position-relative" style={{minHeight: "80%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
                <Sidebar componente="productos"/>
                <div className="container-fluid py-5">
                    <h1 className="text-white text-center">Mis productos</h1>
                    <div className="misProductosCuenta d-flex flex-column justify-content-center align-items-center mt-5">
                        {productos.map((producto) =>{

                            return (
                                <div class="card horizontal-card mb-3" style={{width: "50%",background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                                    <div class="row">
                                        
                                        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 img-container img-overlay position-relative">
                                            <Link to={"/producto/" + producto.id} className="text-decoration-none">
                                                {producto.imagen == "" ? (
                                                    <img src={imgProducto} class="card-img  w-100" height="240" alt="Producto"/>
                                                ) : (
                                                    <div>
                                                        <img src={producto.imagen} class="card-img  w-100" height="240" alt="Producto"/>
                                                        {producto.reservado == 0 &&
                                                            <span id="no-reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}} hidden>Reservado</span>

                                                        }

                                                        {producto.reservado == 1 &&
                                                            <span id="reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}}>Reservado</span>

                                                        }   
                                                    </div>
                                                )

                                                }  
                                            </Link> 
                                        </div>
                                        
                                        <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
                                            <div class="card-body">
                                                <div className="row d-flex flex-row">
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center d-flex flex-column align-items-center justify-content-center">
                                                        <input type="number" value={producto.id} hidden/>
                                                        <h5 class="card-title">{producto.nombre}</h5>
                                                        <p class="card-text"><span class="fs-5">Precio: {producto.precio}€</span></p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2 d-flex flex-column align-items-center justify-content-center">
                                                        <span className="fs-5">Publicado:</span>
                                                        <span className="fs-5 fw-bold">20-05-22</span>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex flex-column align-items-center justify-content-center">
                                                        <button className="btn btn-primary" onClick={() => venderProducto}>Vendido</button>    
                                                        <button className="btn btn-primary" onClick={() => reservarProducto(producto.id, producto.reservado)}>Reservar</button>                                      
                                                        <button className="btn btn-danger  my-2" onClick={eliminarProducto}>Eliminar</button>
                                                        <button className="btn btn-success"><a href={"/editarProducto/" + producto.id} className="text-white text-decoration-none">Editar</a></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
       
    )
        
    
}

export default Productos;
