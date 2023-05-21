import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/pantallaLoad.css"
import { useAppContext } from "../AppProvider";

const PantallaLoad = (props) => {

    return(
        <div className="pantallaCargandoPequena">
            <div className="pantallaBackgroundPequena"></div>
            <div className="pantallaPequena">
              <div className="contenedorCargando">
                <div className="contenedorAnimacion">
                  <h2 className="textSubiendo">{props.texto}</h2>
                  <div id="spinner" class="spinner-border text-primary" role="status" style={{width: "60px", height: "60px", borderWidth: "6px"}}>
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
        
    
}

export default PantallaLoad;
