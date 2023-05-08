import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/subirProducto.css"
import axios from "axios"
import { useNavigate , useParams } from "react-router-dom";
import ProductoInicio from "./ProductoInicio";

const EditarProducto = () => {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState();
    const [estado, setEstado] = useState();
    const [descripcion, setDescripcion] = useState();
    var contador = 1;

    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    const [producto, setProducto] = useState([]);

    const params = useParams();

    useEffect(() => {
        if(usuarioConectado == null) {
            navigate("/login")
        }
    })

    useEffect(()=>{

        obtenerDatos();   
        console.log(producto)
        const selectCategoria = document.getElementById('categoriaEditar');
            var opcion1 = selectCategoria.querySelector("option[value=" + producto.categoria + "]");
            
            if(opcion1 == null){
                opcion1 = selectCategoria.querySelector("option[value='porDefectoCategoria']");
            } 
            
            opcion1.setAttribute('selected', 'selected');
            
        const selectEstado = document.getElementById('estadoEditar');
        var productoEstado;

        if(producto.estado == "Sin abrir"){
            productoEstado = "sin-abrir";
        } else if(producto.estado == "Como nuevo"){
            productoEstado = "como-nuevo";
        } else {
            productoEstado = "Usado";
        }
           
            var opcion2 = selectEstado.querySelector("option[value=" + productoEstado + "]");
           
            if(opcion2 == null){
                opcion2 = selectEstado.querySelector("option[value='porDefectoEstado']");
            } 

            opcion2.setAttribute('selected', 'selected');
    }, [producto.length])

    const obtenerDatos = () => {
        const datos =  {
            id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarFichaProducto", datos)
        .then(res => {
            setProducto(res.data);
        })
        .catch(res => {
            console.log(res);
        })
    }
    
   /*
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handleChangeEstado = (event) => {
        setEstado(event.target.value)
    }

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
    }
*/
    const editarProducto = () => {
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
        var estadoEditar;
        if(document.getElementById("estadoEditar").value == "sin-abrir"){
            estadoEditar = "Sin abrir";
        } else if(document.getElementById("estadoEditar").value == "como-nuevo"){
            estadoEditar = "Como nuevo";
        } else {
            estadoEditar = "Usado";
        }

        const formEditar = new FormData();
        formEditar.append("id", document.getElementById("idEditar").value);
        formEditar.append("nombre", document.getElementById("nombreEditar").value);
        formEditar.append("categoria", document.getElementById("categoriaEditar").value);
        formEditar.append("precio", document.getElementById("precioEditar").value);
        formEditar.append("estado", estadoEditar);
        formEditar.append("descripcion", document.getElementById("descripcionEditar").value);
        formEditar.append("imagen", document.getElementById("imagenEditar").value);
        formEditar.append("file", document.getElementById("imagenEditarProducto").files[0]);
        console.log(formEditar.get("nombre"))        

        axios.post("http://localhost:5000/editarProducto", formEditar)
        .then(({data}) => {
            console.log(data)
           
            if(data == "Editado correctamente") {
                navigate("/cuenta/productos");
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
        <div id="editarProducto" className="py-5" style={{background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
        <div class="container p-5" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
        <h1>Editar producto</h1>
    <form>
      <div class="form-group mb-3">
        <input type="number" value={producto.id} id="idEditar" hidden/>
        <label for="nombreProducto" className="mb-2">Nombre del producto*:</label>
        <input type="text" class="form-control" id="nombreEditar" defaultValue={producto.nombre} placeholder="Escribe aquí el nombre del producto" required/>
      </div>
      <div class="form-group mb-3">
        <label for="nombreProducto" className="mb-2">Precio*:</label>
        <input type="number" class="form-control" id="precioEditar" defaultValue={producto.precio} placeholder="Escribe un precio razonable" required/>
      </div>
      <div class="form-group mb-3">
        <label for="categoria" className="mb-2">Categoría*:</label>
        <select class="form-control" id="categoriaEditar">
        <option disabled value="porDefectoCategoria" selected>Selecciona una categoría</option>
                            <option value="Deporte">Deporte</option>
                            <option value="Vehiculos">Vehiculos</option>
                            <option value="Videojuegos">Videojuegos</option>
                            <option value="Moda">Moda</option>
                            <option value="Móviles">Móviles</option>
                            <option value="Informática">Informática</option>
                            <option value="Inmobiliaria">Inmobiliaria</option>
                            <option value="Cocina">Cocina</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="estado" className="mb-2">Estado*:</label>
        <select class="form-control" id="estadoEditar">
        <option disabled value="porDefectoEstado" selected>Selecciona un estado</option>
                            <option value="sin-abrir">Sin abrir</option>
                            <option value="como-nuevo">Como nuevo</option>
                            <option value="Usado">Usado</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="descripcion" className="mb-2">Descripción*:</label>
        <textarea class="form-control" id="descripcionEditar" defaultValue={producto.descripcion} rows="3" required></textarea>
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
        <label for="imagen" className="mb-3">Imagen*:</label>
        <div className="img-overlay img-container d-flex justify-content-center mb-3">
            <img src={producto.imagen} className="img-fluid" style={{width: "300px", height: "300px"}}/>
        </div>
        <input type="text" value={producto.imagen} id="imagenEditar" hidden/>
        <input type="file" id="imagenEditarProducto" class="form-control" rows="3" required/>
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" class="btn btnVerProducto" onClick={editarProducto}>Guardar cambios</button>
      </div>
    </form>
      </div> 
      </div>
      )  
           
}

export default EditarProducto;