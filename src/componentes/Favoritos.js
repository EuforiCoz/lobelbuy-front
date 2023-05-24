import React from "react";
import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import Loader from "./Loader"
import Sidebar from "./Sidebar";
import imgProducto from "./iconos/crash.jpg"
import "./styles/productos.css"
import axios from "axios"
import ProductoInicio from "./ProductoInicio";
import Skeleton from '@mui/material/Skeleton';

const Favoritos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    const [loaded, setLoaded] = useState(false)
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
            setLoaded(true);
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
                        {!loaded &&
                            Array.from({ length: 3 }, (_, index) => (
                            <div className="mb-4">
                                <Skeleton variant="rounded" width={350} height={230} sx={{ bgcolor: 'lightblue' }}/>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' , bgcolor: 'lightblue'}}/>
                                <Skeleton variant="rectangular" width={350} height={80} sx={{bgcolor: 'lightblue'}}/>
                            </div>
                            ))
                        }
                        {productos.length == 0 && loaded ? (
                            <h3 className="text-white">No tienes ningún producto en favoritos</h3>
                        ) : (
                            productos.map((producto) =>{
                                console.log(producto.reservado)
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
