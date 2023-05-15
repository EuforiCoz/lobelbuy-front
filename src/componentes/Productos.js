import React, {useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css"
import { useAppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import imagenPerfil from "./iconos/carrito.jpg"
import axios from "axios"
import {useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import {FaRegHandshake} from "react-icons/fa"
import imgSale from "./iconos/cupon.png"

const Productos = () => {

    //const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    const navigate = useNavigate()
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    
    const [productos, setProductos] = useState([]);
    const [productosEnVenta, setProductosEnVenta] = useState([]);
    const [productosVendidos, setProductosVendidos] = useState([]);
    const [conversaciones, setConversaciones] = useState([]);
    const [productoSeleccionadoVender, setProductoSeleccionadoVender] = useState();
    const [mensajeMostrar, setMensajeMostrar] = useState("");

    useEffect(()=>{

        obtenerDatos();
     
    }, []);

    useEffect(()=>{

        obtenerConversaciones();
        
    }, []);

    const obtenerConversaciones = () => {
       
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }
    
        axios.post("https://backend-lobelbuy.onrender.com/obtenerConversaciones", datos)
        .then(res => {

            if(res.data != "No hay conversaciones"){
              setConversaciones(res.data);
            }
            
        })
        .catch(({response}) => {
          
        })
      
}


    const obtenerDatos = () => {
        const datos =  {
            usuario_id: usuarioConectado.usuario_id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarProductosEnVenta", datos)
        .then(res => {

            setProductosEnVenta(res.data);
            setProductos(res.data);
            setMensajeMostrar("No tienes productos en venta");
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        axios.post("https://backend-lobelbuy.onrender.com/mostrarProductosVendidos", datos)
        .then(res => {

            setProductosVendidos(res.data);
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })

        
    }

    const mostrar = (productos, mensaje) =>{
        
        if(mensaje == "en venta"){
            setMensajeMostrar("No tienes productos en venta");
        } else {
            setMensajeMostrar("No has vendido ningún producto");
        }
        setProductos(productos);
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

    const reservarProducto = (producto_id, event) => {

        const datos =  {
            id: producto_id,
        }

        var reservado = event.target.closest("#caja").previousElementSibling.firstChild.firstChild.firstChild.nextElementSibling.firstChild;
        var input = event.target.closest("#caja").previousElementSibling.firstChild.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling;

        if(input.value == 0){
            reservado.hidden = false;
            input.value = 1;
            
        } else {
            reservado.hidden = true;
            input.value = 0;
        }

        axios.post("http://localhost:5000/reservarProducto", datos)
        .then(res => {
            console.log(res.data);
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    const productoElegidoVender = (producto_id) => {
        setProductoSeleccionadoVender(producto_id)
    }

    const venderProducto = (vendedor) => {

        const datos =  {
            producto_id: productoSeleccionadoVender,
            comprador_id: vendedor,
            vendedor_id: usuarioConectado.usuario_id
        }
       
        axios.post("http://localhost:5000/venderProducto", datos)
        .then(res => {
            console.log(res.data)
            
            /*
            if(res.data == "Eliminado") {
                window.location.reload(true);
            }*/
            obtenerDatos();
            //var closeModal = document.getElementById("close");
        })
        .catch(res => {
            console.log(res);
        })
    }


    return(
        <div id="productosCuenta" className="productosCuenta position-relative" style={{minHeight: "80%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
                <Sidebar componente="productos"/>
                <div className="container-fluid py-5 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-white text-center">Mis productos</h1>
                    <div className="row mx-auto pt-5 d-flex justify-content-center">
                            <div onClick={() => mostrar(productosEnVenta, "en venta")}  className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><img src={imgSale} style={{width: "60px", height: "60px"}}/><span>En venta</span></div>
                            <div onClick={() => mostrar(productosVendidos, "vendido")}  className="cajaCategoria col-sm-6 col-xs-6 mb-4 mx-2"><FaRegHandshake style={{width: "60px", height: "60px"}}/><span>Vendido</span></div>
                    </div>
                    <div className="w-75 misProductosCuenta d-flex flex-column justify-content-center align-items-center mt-5">
                        {productos.length == 0 ? (
                            <h1 className="text-white">{mensajeMostrar}</h1>
                            ) : (
                                productos.map((producto) =>{

                                    return (
                                        <div className="card horizontal-card mb-3" key={producto.id} style={{width: "50%",background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                                            <div className="row">
                                                
                                                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 img-container img-overlay position-relative">
                                                    <Link to={"/producto/" + producto.id} className="text-decoration-none">
                                                        {producto.imagen == "" ? (
                                                            <img src={imgProducto} className="card-img  w-100" height="240" alt="Producto"/>
                                                        ) : (
                                                            <div>
                                                                <img src={producto.imagen} className="card-img  w-100" height="240" alt="Producto"/>
                                                                {producto.reservado == 0 &&
                                                                    <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}} hidden>Reservado</span>
                                                                    <input type="number" defaultValue={producto.reservado} hidden/>
                                                                    </div>
        
                                                                }
        
                                                                {producto.reservado == 1 &&
                                                                    <div>
                                                                    <span id="reservado" className="fs-4 bg-white rounded-pill p-1 position-absolute" style={{top: "20px", left: "20px"}}>Reservado</span>
                                                                    <input type="number" defaultValue={producto.reservado} hidden/>
                                                                    </div>
                                                                }   
                                                            </div>
                                                        )
        
                                                        }  
                                                    </Link> 
                                                </div>
                                                
                                                <div id="caja" className="col-lg-8 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
                                                    <div className="card-body">
                                                        <div className="row d-flex flex-row">
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center d-flex flex-column align-items-center justify-content-center">
                                                                <input type="number" defaultValue={producto.id} hidden/>
                                                                <h5 className="card-title">{producto.nombre}</h5>
                                                                <p className="card-text"><span className="fs-5">Precio: {producto.precio}€</span></p>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2 d-flex flex-column align-items-center justify-content-center">
                                                                <span className="fs-5">Publicado:</span>
                                                                <span className="fs-5 fw-bold">20-05-22</span>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex flex-column align-items-center justify-content-center">
                                                                <button className="btn btn-primary" onClick={() => productoElegidoVender(producto.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Vendido</button>    
                                                                <button className="btn btn-primary" onClick={(event) => reservarProducto(producto.id, event)}>Reservar</button>                                      
                                                                <button className="btn btn-danger  my-2" onClick={eliminarProducto}>Eliminar</button>
                                                                <button className="btn btn-success"><Link to={"/editarProducto/" + producto.id} className="text-white text-decoration-none">Editar</Link></button>
                                                            </div>
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
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Producto Vendido</h5>
                                <button type="button" id="close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h6>¿A quien se lo has vendido?</h6>

                                {conversaciones.map((conversaciones) => {
                                    return (
                                        <div key={conversaciones.id}>
                                            {conversaciones.usuario1_id == usuarioConectado.usuario_id &&
                                                
                                                <span className="name mt-2" style={{cursor: "pointer"}} onClick={() => venderProducto(conversaciones.usuario2_id)} data-bs-dismiss="modal">{conversaciones.nombre_usuario2}</span>
                                                    
                                            }
            
                                            {conversaciones.usuario2_id == usuarioConectado.usuario_id &&
                                            
                                                <span className="name" style={{cursor: "pointer"}} onClick={() => venderProducto(conversaciones.usuario1_id)} data-bs-dismiss="modal">{conversaciones.nombre_usuario1}</span>
                                                    
                                            }
                                        </div>
                                    )
                                    })
                                
                                }
                                <span className="text-danger" style={{cursor: "pointer"}} onClick={() => venderProducto(null)} data-bs-dismiss="modal">Lo he vendido en otro lado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    )
        
    
}

export default Productos;
