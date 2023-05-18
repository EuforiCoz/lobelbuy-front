import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import "./styles/productoInicio.css"

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
                    </div>
                </div>
            </div>
        
                       
    )
      
}

export default ProductoInicio;
