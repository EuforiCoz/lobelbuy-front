import React from "react"
import {Link} from "react-router-dom"
import imgProducto from "./iconos/crash.jpg"
import "./styles/productoInicio.css"

const ProductoInicio = (props) => {
    
    return(
      
                     
            <div class="col-md-3 col-sm-6 col-xs-6 mb-5">
                
                <div class="card product tarjeta">
                    <Link to={"/producto/" + props.id}  className="enlaceInicio"> 
                        <div class="img-overlay img-container">
                            {props.imagen == "" ? (
                                <img id="imgTarjeta" src={imgProducto} alt="Nombre del producto" class="card-img-top "style={{ objectFit: "cover" }}
                                height="300"/>

                                ) :(
                                    <img id="imgTarjeta" src={props.imagen} alt="Nombre del producto" class="card-img-top " style={{ objectFit: "cover" }}
                                    height="300"/>
                                )
                            }
                        </div>
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h5 class="card-title">{props.nombre}</h5>
                            <span class="card-text fs-3">{props.precio}€</span>
                            
                        </div>
                    </Link>
                </div>
               
            </div>
        
                       
    )
      
}

export default ProductoInicio;