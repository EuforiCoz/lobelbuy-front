import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/cuenta.css"
import "./styles/resenasForm.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cuenta = () => {
   
    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
    const [valoracion, setValoracion] = useState();
    const [comentario, setComentario] = useState();
    const navigate = useNavigate();
    const params = useParams()

    const handleChangeValoracion = (event) => {
        setValoracion(event.target.value)
    }

    const handleChangeComentario = (event) => {
        setComentario(event.target.value)
    }

    const enviarResena = () => {
        const datos  = {
            
            valoracion: valoracion,
            comentario: comentario,
            producto_id: params.id,
            usuario_id: usuarioConectado.usuario_id,
        }

        axios.post("http://localhost:5000/enviarResena", datos)
        .then(res => {

            navigate("/cuenta/productos");
            
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    return(
        <div id="resenaForm" className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "70%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
            <div class="container p-5" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                <div className="">
                    <h1>Formulario reseña</h1>
                    <form>
                        <div class="form-group mb-3">
                        <label for="nombreProducto" className="mb-2">Valoración*:</label>
                        <input type="number" class="form-control" id="nombreSubir" min="1" max="5" onChange={handleChangeValoracion} placeholder="Valoración del 1 al 5" required/>
                        </div>
                        <div class="form-group mb-3">
                            <label for="descripcion" className="mb-2">Descripción*:</label>
                            <textarea class="form-control" id="descripcionSubir" onChange={handleChangeComentario} rows="4" required ></textarea>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button type="button"  onClick={enviarResena}>Enviar reseña</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    )
        
    
}

export default Cuenta;
