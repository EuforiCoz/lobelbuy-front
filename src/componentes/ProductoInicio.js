import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import "./styles/productoInicio.css"
import {FaRegHandshake} from "react-icons/fa"
import {TiCancelOutline} from "react-icons/ti"
import {BsFillPencilFill} from "react-icons/bs"
import {IoMdSave} from "react-icons/io"

const ProductoInicio = (props) => {

    var tamanoCSS = "";

    if(props.tamano == 1){
        tamanoCSS = "col-lg-9 col-md-8 col-sm-12 col-xs-12";
    } else if(props.tamano == 2) {
        tamanoCSS = "col-lg-4 col-md-8 col-sm-6 col-xs-12";
    } else if(props.tamano == 3) {
        tamanoCSS = "col-lg-4 col-md-6 col-sm-12 col-xs-12";
    } else if(props.tamano == 4){
        tamanoCSS = "col-lg-3 col-md-6 col-sm-12 col-xs-12";
    } else {
        tamanoCSS = "col-lg-4 col-md-6 col-sm-6 col-xs-12";
    }
/*
    const ponerColor = (boton,index) => {
        console.log(index)
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
        console.log(index)
        var caja = document.getElementsByClassName(boton)[index];
        var imagen = caja.firstChild;
        caja.style.borderColor = "black";
        imagen.style.fill = "black";
    }*/
    
    return(
             
            <div id="productoInicio" class={"mx-3 mb-3"}>
                <div class="card text-center" style={{borderRadius: "20px 20px 20px 20px", overflow: "hidden", width: "350px", boxShadow: "4px 4px 4px black"}} >
                    <div>
                        <Link to={"/producto/" + props.id}>
                            <div class="position-relative" data-mdb-ripple-color="light" style={{height: "250px"}}>
                                <img id="imgPro" src={props.imagen} class="w-100 h-100" style={{borderRadius: "20px 20px 0 0"}} />
                                {props.reservado == 1 &&
                                    <span className="position-absolute" style={{left: 0, bottom: 0}}>
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
                        <h5 class="card-title  fw-bold">{props.nombre}</h5> 
                        <span>{props.categoria}</span>
                        <h6 class="">{props.precio}€</h6>
                        {/*props.componente == "cuenta" &&
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div onMouseOver={() => ponerColor("vender", props.index)} onMouseOut={() => quitarColor("vender", props.index)} className="vender venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><FaRegHandshake className="venderImg" style={{width: "75%", height:"75%"}}/></div>
                                <div onMouseOver={() => ponerColor("reservar", props.index)} onMouseOut={() => quitarColor("reservar", props.index)} className="reservar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><IoMdSave className="venderImg" style={{width: "75%", height:"75%"}}/></div>
                                <div onMouseOver={() => ponerColor("editar", props.index)} onMouseOut={() => quitarColor("editar", props.index)} className="editar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><BsFillPencilFill className="venderImg" style={{width: "55%", height:"55%"}}/></div>
                                <div onMouseOver={() => ponerColor("eliminar", props.index)} onMouseOut={() => quitarColor("eliminar", props.index)} className="eliminar venderDiv rounded-circle d-flex justify-content-center align-items-center mx-3" style={{width: "45px", height: "45px"}}><TiCancelOutline className="venderImg" style={{width: "80%", height:"80%"}}/></div>
                            </div>*/
                        }
                    </div>
                </div>
            </div>
        
                       
    )
      
}

export default ProductoInicio;
