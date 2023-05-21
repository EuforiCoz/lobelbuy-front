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
import ProductoInicio from "./ProductoInicio";
import {TiCancelOutline} from "react-icons/ti"
import {BsFillPencilFill} from "react-icons/bs"
import {IoMdSave} from "react-icons/io";
import PantallaLoad from "./PantallaLoad";
import Skeleton from '@mui/material/Skeleton';

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
    const [loaded, setLoaded] = useState(false);

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
            setLoaded(true);
            
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
   
    const eliminarProducto = (index) => {
        document.getElementById("modalEliminandoProducto").style.display = "block";
        const datos =  {
            id: productos[index].id
        }  

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

    const reservarProducto = (index) => {

        const datos =  {
            id: productos[index].id,
        }
        
        var spanReservado = document.getElementsByClassName("span-reservar")[index];
        var input = document.getElementsByClassName("input-reservar")[index];
        console.log(input)
        console.log(input.value)
        //var reservado = event.target.closest("#caja").previousElementSibling.firstChild.firstChild.firstChild.nextElementSibling.firstChild;
        //var input = event.target.closest("#caja").previousElementSibling.firstChild.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling;

        if(input.value == 0){
            spanReservado.hidden = false;
            input.value = 1;
            
        } else {
            spanReservado.hidden = true;
            input.value = 0;
        }

        axios.post("https://backend-lobelbuy.onrender.com/reservarProducto", datos)
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
        document.getElementById("modalVendiendoProducto").style.display = "block";
        const datos =  {
            producto_id: productoSeleccionadoVender,
            comprador_id: vendedor,
            vendedor_id: usuarioConectado.usuario_id
        }
       
        axios.post("https://backend-lobelbuy.onrender.com/venderProducto", datos)
        .then(res => {
            console.log(res.data)
            document.getElementById("modalVendiendoProducto").style.display = "none";
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

    const ponerColor = (boton,index) => {
        var caja = document.getElementsByClassName(boton)[index];
        var imagen = caja.firstChild;
        if(boton == "vender") {
            caja.style.borderColor = "#1E90FF";
            imagen.style.fill = "#1E90FF";
        }  else if(boton == "reservar"){
            caja.style.borderColor = "purple";
            imagen.style.fill = "purple";
        }else if(boton == "editar"){
            caja.style.borderColor = "rgb(0, 154, 0)";
            imagen.style.fill = "rgb(0, 154, 0)";
        } else {
            caja.style.borderColor = "red";
            imagen.style.fill = "red";
        }
    }

    const quitarColor = (boton,index) => {
        var caja = document.getElementsByClassName(boton)[index];
        var imagen = caja.firstChild;
        caja.style.borderColor = "black";
        imagen.style.fill = "black";
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
                        {productos.length == 0 ? (
                            <h1 className="text-white">{mensajeMostrar}</h1>
                            ) : (
                                productos.map((producto, index) =>{

                                    return (
                                        <div id="productoInicio" class={"mx-3 mb-3"}>
                                            <div class="card text-center" style={{borderRadius: "20px 20px 20px 20px", overflow: "hidden", width: "350px", boxShadow: "4px 4px 4px black"}} >
                                                <div>
                                                    <Link to={"/producto/" + producto.id}>
                                                        <div class="position-relative" data-mdb-ripple-color="light" style={{height: "250px"}}>
                                                            <img id="imgPro" src={producto.imagen} class="w-100 h-100" style={{borderRadius: "20px 20px 0 0"}} />
                                                            {producto.reservado == 0 &&
                                                                <span className="span-reservar position-absolute" style={{left: 0, bottom: 0}} hidden>
                                                                    <input className="input-reservar" type="number" value={0} hidden/>
                                                                    <div class="mask">
                                                                        <div class="d-flex justify-content-start align-items-end h-100">
                                                                        <h5><span class="badge bg-primary ms-2">Reservado</span></h5>
                                                                        </div>
                                                                    </div>
                                                                    <div class="hover-overlay">
                                                                        <div class="mask"></div>
                                                                    </div>
                                                                </span>
                                                            }

                                                            {producto.reservado == 1 &&
                                                                <span className="span-reservar position-absolute" style={{left: 0, bottom: 0}}>
                                                                    <input className="input-reservar" type="number" value={1} hidden/>
                                                                    <div class="mask">
                                                                        <div class="d-flex justify-content-start align-items-end h-100">
                                                                        <h5><span class="badge bg-primary ms-2">Reservado</span></h5>
                                                                        </div>
                                                                    </div>
                                                                    <div class="hover-overlay">
                                                                        <div class="mask"></div>
                                                                    </div>
                                                                </span>
                                                            }
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div class="card-body position-relative" style={{borderRadius: "0 0 20px 20px", backgroundColor: "aliceblue"}}>
                                                    <h5 class="card-title  fw-bold">{producto.nombre}</h5> 
                                                    <span>{producto.categoria}</span>
                                                    <h6 class="">{producto.precio}€</h6>
                    
                                                        <div className="d-flex flex-row justify-content-center align-items-center">
                                                            <div onClick={() => productoElegidoVender(producto.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" onMouseOver={() => ponerColor("vender", index)} onMouseOut={() => quitarColor("vender", index)} className="vender venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><FaRegHandshake className="venderImg" style={{width: "75%", height:"75%"}}/></div>
                                                            <div onClick={() => reservarProducto(index)} onMouseOver={() => ponerColor("reservar", index)} onMouseOut={() => quitarColor("reservar", index)} className="reservar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><IoMdSave className="venderImg" style={{width: "75%", height:"75%"}}/></div>
                                                            <Link className="text-decoration-none" to={"/editarProducto/" + producto.id}><div onMouseOver={() => ponerColor("editar", index)} onMouseOut={() => quitarColor("editar", index)} className="editar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><BsFillPencilFill className="venderImg" style={{width: "55%", height:"55%", fill: "black"}}/></div></Link>
                                                            <div onClick={() => eliminarProducto(index)} onMouseOver={() => ponerColor("eliminar", index)} onMouseOut={() => quitarColor("eliminar", index)} className="eliminar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><TiCancelOutline className="venderImg" style={{width: "80%", height:"80%"}}/></div>
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
                <div id="modalEliminandoProducto" style={{display: "none"}}>
                    <PantallaLoad texto="Eliminando producto"/>
                </div> 
                <div id="modalVendiendoProducto" style={{display: "none"}}>
                    <PantallaLoad texto="Vendiendo producto"/>
                </div>
            </div>
       
    )
        
    
}

export default Productos;
