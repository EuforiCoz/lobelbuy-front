import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import "./styles/subirProducto.css"
import axios from "axios"
import { useNavigate , useParams } from "react-router-dom";
import ProductoInicio from "./ProductoInicio";
import PantallaLoad from "./PantallaLoad";
import Skeleton from '@mui/material/Skeleton';

const EditarProducto = () => {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState();
    const [estado, setEstado] = useState();
    const [descripcion, setDescripcion] = useState();
    const [detalles, setDetalles] = useState([]);
    var contador = 1;

    const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));

    const [producto, setProducto] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const params = useParams();

    useEffect(() => {
        if(usuarioConectado == null) {
            navigate("/login")
        }
    })

    useEffect(()=>{

        obtenerDatos();   
        console.log(producto)
       

    }, [producto.length])

    const obtenerDatos = () => {
        const datos =  {
            id: params.id
        }

        axios.post("https://backend-lobelbuy.onrender.com/mostrarFichaProducto", datos)
        .then(res => {
           
            setProducto(res.data);
            setLoaded(true)
            
            const selectCategoria = document.getElementById('categoriaEditar');
            var opcion1 = selectCategoria.querySelector("option[value=" + res.data.categoria + "]");
            console.log(selectCategoria)
            if(opcion1 == null){
                opcion1 = selectCategoria.querySelector("option[value='porDefectoCategoria']");
            } 
            
            opcion1.setAttribute('selected', 'selected');
            
            const selectEstado = document.getElementById('estadoEditar');
            var productoEstado;
    
            if(res.data.estado == "Sin abrir"){
                productoEstado = "sin-abrir";
            } else if(res.data.estado == "Como nuevo"){
                productoEstado = "como-nuevo";
            } else {
                productoEstado = "Usado";
            }
               
            var opcion2 = selectEstado.querySelector("option[value=" + productoEstado + "]");
            
            if(opcion2 == null){
                opcion2 = selectEstado.querySelector("option[value='porDefectoEstado']");
            } 
    
            opcion2.setAttribute('selected', 'selected');
    
            
            var detalles = res.data.detalles;
            detalles = detalles.split(",");
            var arrayDetalles = [];
            for (let i = 0; i < detalles.length; i++) 
            {
                if(detalles[i].trim() != ""){
                    arrayDetalles.push(detalles[i])
                }
            }
            contador = arrayDetalles.length;
            setDetalles(arrayDetalles);

            document.getElementById("categoriaEditar").removeAttribute("hidden");
            document.getElementById("estadoEditar").removeAttribute("hidden");
            document.getElementById("inputs-container").removeAttribute("hidden");
           
            
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
        var nombre = document.getElementById("nombreEditar");
        var precio = document.getElementById("precioEditar");
        var descripcion = document.getElementById("descripcionEditar");
        var envio = null;
        var enMano = document.getElementById("en-mano");
        var envioCasa = document.getElementById("envio-casa");

        nombre.classList.remove("is-invalid");
        precio.classList.remove("is-invalid");
        descripcion.classList.remove("is-invalid");

        if(nombre.value == ""){
          
            nombre.classList.add("is-invalid")
        }

        if(precio.value  == ""){
            
            precio.classList.add("is-invalid");
        }

        if(descripcion.value == ""){
        
            descripcion.classList.add("is-invalid");    
        }

        if(enMano.checked && !envioCasa.checked){
            envio = 0;
          } else if(envioCasa.checked && !enMano.checked){
            envio = 1;
          }else if(envioCasa.checked && enMano.checked){
            envio = 2;
          }
    
          if(!envioCasa.checked && !enMano.checked){
           
            enMano.classList.add("is-invalid");
            envioCasa.classList.add("is-invalid");
          }

        var estadoEditar;
        if(document.getElementById("estadoEditar").value == "sin-abrir"){
            estadoEditar = "Sin abrir";
        } else if(document.getElementById("estadoEditar").value == "como-nuevo"){
            estadoEditar = "Como nuevo";
        } else {
            estadoEditar = "Usado";
        }

        if(nombre.value != "" && precio.value  != ""  && descripcion.value != "" && envio != null){
            document.getElementById("modalEditandoProducto").style.display = "block";

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
    }

    const agregarInput = () =>{
        contador++;

        if(contador <= 5){
            var nuevoInput = document.createElement("input");
            nuevoInput.type = "text";
            nuevoInput.classList.add("form-control");
            nuevoInput.classList.add("mb-3");
            nuevoInput.setAttribute("placeholder", "Detalle " + contador);
            
            // Agrega el nuevo input al contenedor de inputs
            var inputsContainer = document.getElementById("inputs-container");
            inputsContainer.appendChild(nuevoInput);
        }
    }
   
    return(
        <div id="editarProducto" className="py-5" style={{background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
        <div class="container p-5" style={{background: "linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
        <h1>Editar producto</h1>
    <form>
      <div class="form-group mb-3">
        <input type="number" value={producto.id} id="idEditar" hidden/>
        <label for="nombreProducto" className="mb-2">Nombre del producto*:</label>
        {!loaded && 
            <Skeleton variant="text" sx={{ fontSize: '2rem' , bgcolor: 'white.100'}}/>
        }

        {loaded && 
            <input type="text" class="form-control" id="nombreEditar" defaultValue={producto.nombre} placeholder="Escribe aquí el nombre del producto" required/>
         }
      </div>
      <div class="form-group mb-3">
        <label for="nombreProducto" className="mb-2">Precio*:</label>
        {!loaded && 
            <Skeleton variant="text" sx={{ fontSize: '2rem' , bgcolor: 'white.100'}}/>
        }

        {loaded && 
            <input type="number" class="form-control" id="precioEditar" defaultValue={producto.precio} placeholder="Escribe un precio razonable" required/>
        }
      </div>
      <div class="form-group mb-3">
        <label for="categoria" className="mb-2">Categoría*:</label>
        {!loaded &&
            <Skeleton variant="text" sx={{ fontSize: '2rem' , bgcolor: 'white.100'}}/>
        }

        <select class="form-control" id="categoriaEditar" hidden>
            <option disabled value="porDefectoCategoria" selected>Selecciona una categoría</option>
            <option value="Deporte">Deporte</option>
            <option value="Vehículos">Vehículos</option>
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
        {!loaded && 
            <Skeleton variant="text" sx={{ fontSize: '2rem' , bgcolor: 'white.100'}}/>
        }

        <select class="form-control" id="estadoEditar" hidden>
            <option disabled value="porDefectoEstado" selected>Selecciona un estado</option>
            <option value="sin-abrir">Sin abrir</option>
            <option value="como-nuevo">Como nuevo</option>
            <option value="Usado">Usado</option>
        </select>
        
      </div>
      <div class="form-group mb-3">
        <label for="descripcion" className="mb-2">Descripción*:</label>
        {!loaded && 
            <Skeleton variant="text" sx={{ fontSize: '5rem' , bgcolor: 'white.100'}}/>
        }

        {loaded && 
            <textarea class="form-control" id="descripcionEditar" defaultValue={producto.descripcion} rows="3" required></textarea>
        }
      </div>
      <div class="form-group mb-3">
        <label for="lista" className="mb-2">Detalles</label>
        {!loaded && 
            <Skeleton variant="text" sx={{ fontSize: '5rem' , bgcolor: 'white.100'}}/>
        }

            <div id="inputs-container" hidden>
            {detalles.length == 0 &&
                 <input type="text" class="form-control mb-3" placeholder="Detalle 1"/>
            }

            {detalles.length != 0 &&
                detalles.map((detalle, index) => {
                    return(<input type="text" value={detalle} class="form-control mb-3" placeholder={"Detalle " + (index + 1)}/>)
                })
            }
            </div>
       
       
        <button type="button" onClick={agregarInput} className="btn btnVerProducto">Nuevo Detalle</button>
      </div>
      <label>Métodos de envío*</label>
        {!loaded && 
            <>
                <Skeleton variant="text" sx={{width: "200px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
                <Skeleton variant="text" sx={{width: "200px", fontSize: '1rem' , bgcolor: 'white.100'}}/>
            </>
        }

        {loaded && 
        <div>
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
             </div>
        }
     
<div class="form-group mb-3">
        <label for="imagen" className="mb-3">Imagen*:</label>
        <div className="img-overlay img-container d-flex justify-content-center mb-3">
        {!loaded && 
           <Skeleton variant="rounded" sx={{width: "300px", height: "300px", bgcolor: 'white.100' }}/>
        }

        {loaded && 
            <img src={producto.imagen} className="img-fluid" style={{width: "300px", height: "300px"}}/>
        }
        </div>
        <input type="text" value={producto.imagen} id="imagenEditar" hidden/>
        {!loaded && 
           <Skeleton variant="text" sx={{ fontSize: '3rem' , bgcolor: 'white.100'}}/>
        }
        
        {loaded && 
            <input type="file" id="imagenEditarProducto" class="form-control" rows="3" required/>
        }
       
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" class="btn btnVerProducto" onClick={editarProducto}>Guardar cambios</button>
      </div>
    </form>
      </div> 
      <div id="modalEditandoProducto" style={{display: "none"}}>
            <PantallaLoad texto="Guardando cambios"/>
        </div> 
      </div>
      )  
           
}

export default EditarProducto;
