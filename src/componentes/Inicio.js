import React, {useState, useEffect } from "react";
import "./styles/inicio.css"
import iconoModa from "./iconos/iconos_categorias/dress.png"
import iconoDeporte from "./iconos/iconos_categorias/running.png"
import iconoVideojuegos from "./iconos/iconos_categorias/video-game-controller.png"
import iconoMoviles from "./iconos/iconos_categorias/smartphone.png"
import iconoVehiculos from "./iconos/iconos_categorias/car.png"
import iconoInformatica from "./iconos/iconos_categorias/computer.png"
import iconoInmobiliaria from "./iconos/iconos_categorias/architecture.png"
import iconoCocina from "./iconos/iconos_categorias/cooker.png"
import ProductoInicio from "./ProductoInicio";
import {Link} from "react-router-dom"
import {useNavigate } from 'react-router-dom';
import Loader from "./Loader";
import axios from "axios"
import iconoBuscar from "./iconos/buscar.svg"

const Inicio = () => {
    
    //const [loading, setLoading] = useState(true);
    /*
    const [productosModa, setProductosModa] = useState([]);
    const [productosDeporte, setProductosDeporte] = useState([]);
    const [productosVideojuegos, setProductosVideojuegos] = useState([]);
    const [productosMoviles, setProductosMoviles] = useState([]);
    const [productosVehiculos, setProductosVehiculos] = useState([]);
    const [productosInformatica, setProductosInformatica] = useState([]);
    const [productosInmobiliaria, setProductosInmobiliaria] = useState([]);
    const [productosCocina, setProductosCocina] = useState([]);
    */
    const navigate = useNavigate();
    const [productos, setProductos] = useState({});

/*
    useEffect(() => {
      setTimeout(function(){
        console.log("hola")
        setLoading(false);
      }, 3000)
    }, []);
*/
    useEffect(()=>{

        obtenerDatos();
        //console.log(productos)
        
    }, []);

    const obtenerDatos = () => {

        axios.get("https://backend-lobelbuy.onrender.com/buscarProductoInicio")
        .then(res => {
            setProductos(res.data)
            //console.log(res.data) 
            //console.log(res.data)
            
            //console.log(productos)
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    const verListadoCategorias = (event) => {
       const categoria = event.target.nextElementSibling.textContent
       navigate("/listadoProductos?categoria=" + categoria)
    }

    const buscarProducto = () => {
        const nombreBuscador = document.getElementById("buscadorInicio").value;
        const ruta = "/listadoProductos?nombre=" + nombreBuscador;
        navigate(ruta)
    }

    return(
        
        <div id="inicio" style={{minHeight: "80%"}}>
            <div className="container-fluid">
                <div className="row pt-5 pb-2 busqueda">
                    <div className="col-md-12 col-ms-12 col-xs-12 d-flex justify-content-center flex-column align-items-center">
                        <h1 className="text-center">Compre a terceros en Lobelbuy</h1>
                        <p className="text-center">Tú página de compra y venta de confianza</p>
                        <div className="buscador text-white d-flex align-items-center flex-row-reverse" style={{width: "40%"}}>
                            <input id="buscadorInicio" type="text" placeholder="Buscar producto" className=" form-control" style={{left: "0"}}/>
                            <img id="busca" src={iconoBuscar} className="iconoBuscar me-2" alt="buscar" onClick={buscarProducto}/>
                        </div>
                        <div className="row mx-auto pt-5 d-flex justify-content-center">
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoModa} className="imgIcono"/><span>Moda</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoDeporte}  className="imgIcono"/><span>Deporte</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoVideojuegos}  className="imgIcono"/><span>Videojuegos</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoMoviles}  className="imgIcono"/><span>Móviles</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoVehiculos}  className="imgIcono"/><span>Vehículos</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoInformatica}  className="imgIcono"/><span>Informática</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoInmobiliaria}  className="imgIcono"/><span>Inmobiliaria</span></div>
                            <div onClick={verListadoCategorias} className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={iconoCocina}  className="imgIcono"/><span>Cocina</span></div>
                        </div> 
                        <div className="d-flex justify-content-center align-items-center">
                            <Link to="/listadoProductos"><button className=" text-black btn" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>Ver todos los productos</button></Link>
                        </div>
                    </div>
                </div>
                <div className="row py-5 productosPorCategorias">
                        {Object.entries(productos).map(([categoria, articulos]) => (
                             <div className="col-md-12 col-ms-12 col-xs-12" key={categoria}>
                                <div className="mb-3 d-flex justify-content-between align-items-center">
                                    <span className="mx-auto text-center h3">Productos de la categoria '{categoria}'</span>
                                    <span className="ml-auto text-center fs-5 px-2"><a href="#" className="text-white text-decoration-none">Ver más</a></span>
                                </div> 
                                <div className="row d-flex flex-row justify-content-center align-items-center flex-wrap">  
                                {articulos.map((articulo) => (
                                    <ProductoInicio key={articulo.id} id={articulo.id} nombre={articulo.nombre} precio={articulo.precio} categoria={articulo.categoria} imagen={articulo.imagen}/>
                                ))}
                                </div>
                             </div>
                        ))}
                </div>
            </div>
          
        </div>
        /*
        <div id="inicio" className="d-flex align-items-center justify-content-center">
            <div className=" py-5">
                <div className="row">
                    <div className="col my-auto">
                        <p className="titulos h1">Empiece a comprar ahora</p>
                        <p className="h3 text-white">Lobelbuy es tu página de compra y venta donde podrás comprar y vender productos nuevos y de segunda mano</p>
                        <button className="fw-1 inputSubir btn text-white border fw-bold rounded-pill px-5 py-2"><Link to="/listadoProductos/todos" className="enlace">Ver productos</Link></button>
                    </div>
                    <div className="col">
                        <img src={iconoCarrito} className="imagen" alt="Compra ahora"/>
                    </div>
                </div>

                <div className="py-5">
                    <p className="titulos h1 mb-4">Encuentre su producto por categorías</p>
                    <div className="categorias d-flex flex-row align-items-center justify-content-center d-flex flex-column">
                        <div>
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Moda" className="enlace">Moda</Link></button> .
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Deporte" className="enlace">Deporte</Link></button> .
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Videojuegos" className="enlace">Videojuegos</Link></button>
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Móviles" className="enlace">Moviles</Link></button> .
                        </div>
                        <div className="mt-3">
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Vehículos" className="enlace">Vehículos</Link></button> .
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Informatica" className="enlace">Informática</Link></button> .
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Inmobiliaria" className="enlace">Inmobiliaria</Link></button>
                            <button className="botonCategorias me-4 text-white btn"><Link to="/listadoProductos/Cocina" className="enlace">Cocina</Link></button> .
                        </div>
                    </div>
                </div>

                <div className="">
                    <p className="titulos h1">Registrate para empezar a vender</p>
                    <Link to="/registro"><img src={iconoSignUp} className="imagenRegistrarse" alt="Registrate"/></Link>
                </div>
            </div>
        </div>
        */
    )
   
}

export default Inicio;