import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/subirProducto.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import PantallaLoad from "./PantallaLoad";

const SubirProducto = () => {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState();
    const [estado, setEstado] = useState();
    const [descripcion, setDescripcion] = useState();
    const [errorNombre, setErrorNombre] = useState(true);
    const [errorCategoria, setErrorCategoria] = useState(true);
    const [errorEstado, setErrorEstado] = useState(true);
    const [errorPrecio, setErrorPrecio] = useState(true);
    const [errorDescripcion, setErrorDescripcion] = useState(true);
    const [errorEnvio, setErrorEnvio] = useState(true);
    const [errorFichero, setErrorFichero] = useState(true);
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
      var nombre = document.getElementById("nombreSubir").value.trim();
      //var categoria = document.getElementById("categoríaSubir").value;
      var precio = document.getElementById("precioSubir").value;
      //var estado = document.getElementById("estadoSubir").value;
      //var descripcion = document.getElementById("descripcionSubir").value;
      var enMano = document.getElementById("en-mano");
      var envioCasa = document.getElementById("envio-casa");
      var envio = null;
      var file = document.getElementById("imagenSubirProducto").files[0];
      
      var arrayInputs = document.getElementsByClassName("detalles");
      var arrayDetalles = [];

      for (let i = 0; i < arrayInputs.length; i++) 
      {
       
        arrayDetalles.push(arrayInputs[i].value)
        
      }
    
      var detalles = arrayDetalles.join(",");
      
      document.getElementById("nombreSubir").classList.remove("is-invalid");
      document.getElementById("categoriaSubir").classList.remove("is-invalid");
      document.getElementById("precioSubir").classList.remove("is-invalid");
      document.getElementById("estadoSubir").classList.remove("is-invalid");
      document.getElementById("descripcionSubir").classList.remove("is-invalid");
      document.getElementById("imagenSubirProducto").classList.remove("is-invalid");
      
      if(nombre == ""){
        setErrorNombre(false);
        document.getElementById("nombreSubir").classList.add("is-invalid")
      }

      if(categoria == null){
        setErrorCategoria(false);
        document.getElementById("categoriaSubir").classList.add("is-invalid");
      }

      if(precio  == ""){
        setErrorPrecio(false);
        document.getElementById("precioSubir").classList.add("is-invalid");
      }

      if(estado == null){
        setErrorEstado(false);
        document.getElementById("estadoSubir").classList.add("is-invalid");
      }

      if(descripcion == null){
        setErrorDescripcion(false);
        document.getElementById("descripcionSubir").classList.add("is-invalid");
        
      }

      if(enMano.checked && !envioCasa.checked){
        envio = 0;
      } else if(envioCasa.checked && !enMano.checked){
        envio = 1;
      }else if(envioCasa.checked && enMano.checked){
        envio = 2;
      }

      if(!envioCasa.checked && !enMano.checked){
        setErrorEnvio(false);
        document.getElementById("en-mano").classList.add("is-invalid");
        document.getElementById("envio-casa").classList.add("is-invalid");
      }

      if(file == null){
        setErrorFichero(false);
        document.getElementById("imagenSubirProducto").classList.add("is-invalid");
      }
      

      if(nombre != null && categoria != null && precio  != null && estado != null && descripcion != null && envio != null && file != null){
        
        document.getElementById("modalSubiendoProducto").style.display = "block";
       
        const formSubir = new FormData();
        formSubir.append("nombre", nombre);
        formSubir.append("categoria", categoria);
        formSubir.append("precio", precio);
        formSubir.append("estado", estado);
        formSubir.append("descripcion", descripcion);
        formSubir.append("detalles", detalles);
        formSubir.append("envio", envio);
        formSubir.append("usuario", usuarioConectado.usuario_id);
        formSubir.append("file", file);
        
        axios.post("https://backend-lobelbuy.onrender.com/subirProducto", formSubir)
        .then(({data}) => {
            console.log(data)
            if(data == "Subido correctamente") {
                navigate("/cuenta/productos")
            }
        })
        .catch(({response}) => {
            console.log(response.data);
            document.getElementById("modalSubiendoProducto").style.display = "none";
        })
      }
    }

    const agregarInput = () =>{
        contador++;

        if(contador <= 5) {
          var nuevoInput = document.createElement("input");
          nuevoInput.type = "text";
          nuevoInput.classList.add("form-control");
          nuevoInput.classList.add("mb-3");
          nuevoInput.classList.add("detalles");
          nuevoInput.setAttribute("placeholder", "Detalle " + contador);
          
          // Agrega el nuevo input al contenedor de inputs
          var inputsContainer = document.getElementById("inputs-container");
          inputsContainer.appendChild(nuevoInput);
        }
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
                  <option>Vehículos</option>
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
                <label for="lista" className="mb-2">Detalles:</label>
                <div id="inputs-container">
                    <input type="text" class="detalles form-control mb-3" placeholder="Detalle 1"/>
                    <input type="text" class="detalles form-control mb-3" placeholder="Detalle 2"/>
                    <input type="text" class="detalles form-control mb-3" placeholder="Detalle 3"/>
                    <input type="text" class="detalles form-control mb-3" placeholder="Detalle 4"/>
                    <input type="text" class="detalles form-control mb-3" placeholder="Detalle 5"/>
                </div>
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
                <input type="file" id="imagenSubirProducto" class="form-control" rows="3" required/>
              </div>
              <div className="d-flex justify-content-center">
                <button type="button" class="btnVerProducto" onClick={subirProducto}>Subir</button>
              </div>
            </form>
          </div> 

          <div id="modalSubiendoProducto" style={{display: "none"}}>
            <PantallaLoad texto="Subiendo producto"/>
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
