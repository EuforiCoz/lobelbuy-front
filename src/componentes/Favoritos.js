import React from "react";
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import Loader from "./Loader"
import Sidebar from "./Sidebar";
import imgProducto from "./iconos/crash.jpg"
import "./styles/productos.css"
import axios from "axios"
import ProductoInicio from "./ProductoInicio";

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

        axios.post("http://localhost:5000/mostrarProductosFavoritos", datos)
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
                                    <ProductoInicio key={producto.id} id={producto.id} nombre={producto.nombre} precio={producto.precio} categoria={producto.categoria} imagen={producto.imagen} reservado={producto.reservado} tamano={5}/>
                                  
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
