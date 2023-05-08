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

            setProductos(res.data)
            
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

        axios.post("http://localhost:5000/eliminarProducto", datos)
        .then(res => {
            if(res.data == "Eliminado") {
                window.location.reload(true);
            }
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
                                    <div class="row no-gutters">
                                        <div class="col-md-4 img-container img-overlay">
                                            {producto.imagen == "" ? (
                                                <img src={imgProducto} class="card-img  w-100" height="270" alt="Producto"/>
                                            ) : (
                                                <img src={producto.imagen} class="card-img  w-100" height="270" alt="Producto"/>
                                            )

                                            }
                                            
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body d-flex flex-column align-items-start justify-content-start">
                                                <input type="number" value={producto.id} hidden/>
                                                <h5 class="card-title">{producto.nombre}</h5>
                                                <p class="card-text"><span class="fs-5">Precio: {producto.precio}€</span></p>
                                                <div className="d-flex flex-column">
                                                    <button className="btn btn-primary"><a href={"/producto/" + producto.id} className="text-white text-decoration-none">Ver producto</a></button>
                                                    <button className="btn btn-success my-2"><a href={"/editarProducto/" + producto.id} className="text-white text-decoration-none">Editar</a></button>
                                                    <button className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
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