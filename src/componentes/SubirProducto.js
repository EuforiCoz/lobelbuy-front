import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/subirProducto.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SubirProducto = () => {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState();
    const [estado, setEstado] = useState();
    const [descripcion, setDescripcion] = useState();
    var contador = 1;

    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    useEffect(() => {
        if(usuarioConectado == null) {
            navigate("/login")
        }
    })
   
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handleChangeEstado = (event) => {
        setEstado(event.target.value)
    }

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const subirProducto = () => {
        /*
        const datos = {
            nombre: document.getElementById("nombre").value,
            categoria: categoria,
            precio: document.getElementById("precio").value,
            estado: estado,
            descripcion: descripcion,
            usuario: usuarioConectado.usuario_id,
            file: document.getElementById("imagenSubirProducto").files[0]
        }*/

        const formSubir = new FormData();
        formSubir.append("nombre", document.getElementById("nombreSubir").value);
        formSubir.append("categoria", document.getElementById("categoriaSubir").value);
        formSubir.append("precio", document.getElementById("precioSubir").value);
        formSubir.append("estado", document.getElementById("estadoSubir").value);
        formSubir.append("descripcion", document.getElementById("descripcionSubir").value);
        formSubir.append("usuario", usuarioConectado.usuario_id);
        formSubir.append("file", document.getElementById("imagenSubirProducto").files[0]);

        

        axios.post("http://localhost:5000/subirProducto", formSubir)
        .then(({data}) => {
            console.log(data)
            if(data == "Subido correctamente") {
                navigate("/cuenta/productos")
            }
        })
        .catch(({response}) => {
            console.log(response.data);
        })
    }

    const agregarInput = () =>{
        contador++;
        var nuevoInput = document.createElement("input");
        nuevoInput.type = "text";
        nuevoInput.classList.add("form-control");
        nuevoInput.classList.add("mb-3");
        nuevoInput.setAttribute("placeholder", "Especificación " + contador);
        
        // Agrega el nuevo input al contenedor de inputs
        var inputsContainer = document.getElementById("inputs-container");
        inputsContainer.appendChild(nuevoInput);
    }
   
    return(
        <div id="subirProducto" className="py-5" style={{background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
        <div class="container p-5" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
        <h1>Subir producto</h1>
    <form>
      <div class="form-group mb-3">
        <label for="nombreProducto" className="mb-2">Nombre del producto*:</label>
        <input type="text" class="form-control" id="nombreSubir" placeholder="Escribe aquí el nombre del producto" required/>
      </div>
      <div class="form-group mb-3">
        <label for="nombreProducto" className="mb-2">Precio*:</label>
        <input type="number" class="form-control" id="precioSubir" placeholder="Escribe un precio razonable" required/>
      </div>
      <div class="form-group mb-3">
        <label for="categoria" className="mb-2">Categoría*:</label>
        <select class="form-control" id="categoriaSubir" required onChange={handleChangeCategoria}>
        <option disabled selected>Selecciona una categoría</option>
                            <option>Deporte</option>
                            <option>Vehiculos</option>
                            <option>Videojuegos</option>
                            <option>Moda</option>
                            <option>Móviles</option>
                            <option>Informática</option>
                            <option>Inmobiliaria</option>
                            <option>Cocina</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="estado" className="mb-2">Estado*:</label>
        <select class="form-control" id="estadoSubir" required onChange={handleChangeEstado}>
        <option disabled selected>Selecciona un estado</option>
                            <option>Sin abrir</option>
                            <option>Como nuevo</option>
                            <option>Usado</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="descripcion" className="mb-2">Descripción*:</label>
        <textarea class="form-control" id="descripcionSubir" rows="3" required onChange={handleChangeDescripcion}></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="lista" className="mb-2">Especificaciones</label>
        <div id="inputs-container">
            <input type="text" class="form-control mb-3" placeholder="Especificación 1"/>
        </div>
        <button type="button" onClick={agregarInput} className="btn btnVerProducto">Nueva Especificación</button>
      </div>
      <label>Métodos de envío*</label>
      <div class="form-check">
  <input class="form-check-input" type="checkbox" value="En mano" id="en-mano"/>
  <label class="form-check-label" for="en-mano">
    En mano
  </label>
</div>
<div class="form-check mb-5">
  <input class="form-check-input" type="checkbox" value="Envío a casa" id="envio-casa"/>
  <label class="form-check-label" for="envio-casa">
    Envío a casa
  </label>
</div>
<div class="form-group mb-3">
        <label for="imagen" className="mb-2">Imagen*:</label>
        <input type="file" id="imagenSubirProducto" class="form-control" rows="3" required onChange={handleChangeDescripcion}/>
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" class="btn btnVerProducto" onClick={subirProducto}>Subir</button>
      </div>
    </form>
      </div> 
      </div>
      )  
            {/**
            <div className="py-5 d-flex justify-content-center align-items-center">
                <form className="w-50 py-5" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                    <p className="h2 text-center">Sube tu producto</p>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Nombre Producto</label>
                        <input type="text" id="nombre" placeholder="Añade un nombre a tu producto" className="texto col-2 form-control" required/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Categoría</label>
                        <select onChange={handleChangeCategoria} name="selectCategoría" placeholder="Elige la categoría de tu producto" className="texto col-2 form-control" required>
                            <option disabled selected>Selecciona una categoría</option>
                            <option>Deporte</option>
                            <option>Vehiculos</option>
                            <option>Videojuegos</option>
                            <option>Moda</option>
                            <option>Móviles</option>
                            <option>Informática</option>
                            <option>Inmobiliaria</option>
                            <option>Cocina</option>
                        </select>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Precio</label>
                        <input type="number" id="precio" placeholder="Elija un precio" min="0" max="100000" className="texto col-2 form-control" required/>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Estado</label>
                        <select  onChange={handleChangeEstado} name="selectEstado" className="texto col-2 form-control" required>
                            <option disabled selected>Selecciona un estado</option>
                            <option>Sin abrir</option>
                            <option>Como nuevo</option>
                            <option>Usado</option>
                        </select>
                    </div>
                    <div className="row my-5 d-flex justify-content-center">
                        <label className="col-2">Descripción</label>
                        <textarea onChange={handleChangeDescripcion} className="texto col-5 form-control" rows="10" placeholder="Añade una descripción" name="descripcion"></textarea>
                    </div>
                    <div className="pt-2 d-flex justify-content-center align-items-center">
                        <input type="button" value="Subir producto" className="btn btnVerProducto" onClick={subirProducto}/>
                    </div>
                </form> 
            </div>
        </div>
         */}
   
}

export default SubirProducto;