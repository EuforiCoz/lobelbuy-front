import React from "react";
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import Loader from "./Loader"
import Sidebar from "./Sidebar";
import imgProducto from "./iconos/crash.jpg"
import "./styles/productos.css"
import axios from "axios"

const Favoritos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    const [loader, setLoader] = useState(true)
    const [productos, setProductos] = useState([]);

    useEffect(()=>{

        obtenerDatos();
        console.log(productos)
        
    }, [productos.length])

    const obtenerDatos = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarProductosFavoritos", datos)
        .then(res => {

            setProductos(res.data);
            setLoader(false);
            console.log(loader)
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    return(
        <div id="favoritos" className="position-relative" style={{minHeight: "80%", background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            <Sidebar componente="favoritos"/>
            <div className="container-fluid py-5 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-white text-center">Mis favoritos</h1>
                    <div className="w-75 misProductosCuenta d-flex flex-column justify-content-center align-items-center mt-5">
                        {loader && <Loader/>}
                        {productos.length == 0 ? (
                            <h3 className="text-white">No tienes ningún producto en favoritos</h3>
                        ) : (
                            productos.map((producto) =>{

                                return (
                                    <div class="card horizontal-card mb-3" key={producto.id} style={{width: "50%",background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
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
                                                        <button className="btn btn-primary"><Link to={"/producto/" + producto.id} className="text-white text-decoration-none">Ver producto</Link></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                           
                        }
                        
                    </div>
                </div>
        </div>
    )
}

export default Favoritos;
