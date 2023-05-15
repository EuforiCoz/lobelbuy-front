import React from "react"
import "./styles/sidebar.css"
import MiLi from "./MiLi"

const Sidebar = (props) => {
    return(
        <div class="sidebar">
            <h3>Mi cuenta</h3>
            <hr/>
            <ul class="nav flex-column">
                {props.componente === "perfil" ? 
                        (
                            <MiLi nombre="Perfil" enlace="/cuenta/perfil" clase="nav-link active"/>
                         ): (
                            <MiLi nombre="Perfil" enlace="/cuenta/perfil" clase="nav-link"/>
                        )
                }
                  {props.componente === "productos" ? 
                        (
                            <MiLi nombre="Productos" enlace="/cuenta/productos" clase="nav-link active"/>
                         ): (
                            <MiLi nombre="Productos" enlace="/cuenta/productos" clase="nav-link"/>
                        )
                    } 
                     {props.componente === "favoritos" ? 
                        (
                            <MiLi nombre="Favoritos" enlace="/cuenta/favoritos" clase="nav-link active"/>
                         ): (
                            <MiLi nombre="Favoritos" enlace="/cuenta/favoritos" clase="nav-link"/>
                        )
                    } 
                {props.componente === "chats" ? 
                        (
                            <MiLi nombre="Chats" enlace="/cuenta/chats" clase="nav-link active"/>
                         ): (
                            <MiLi nombre="Chats" enlace="/cuenta/chats" clase="nav-link"/> 
                        )
                    } 
                {props.componente === "resenas" ? 
                        (
                            <MiLi nombre="Reseñas" enlace="/cuenta/resenas" clase="nav-link active"/>
                         ): (
                            <MiLi nombre="Reseñas" enlace="/cuenta/resenas" clase="nav-link"/> 
                        )
                }  
            </ul>
        </div>
    )
        {/*
        <div id="sidebar">
            <div>
                <button className="btnAbrirSidebar btn"><FaBars/></button>
            </div>
            <nav className="links">
                <ul className="nav flex-column">
                    {props.componente === "perfil" ? 
                        (
                            <MiLi nombre="Perfil" enlace="/cuenta/perfil" clase="productosSidebar"/>
                         ): (
                            <MiLi nombre="Perfil" enlace="/cuenta/perfil" clase=""/>
                        )
                    }

                     {props.componente === "productos" ? 
                        (
                            <MiLi nombre="Productos" enlace="/cuenta/productos" clase="productosSidebar"/>
                         ): (
                            <MiLi nombre="Productos" enlace="/cuenta/productos" clase=""/>
                        )
                    } 

                     {props.componente === "chats" ? 
                        (
                            <MiLi nombre="Chats" enlace="/cuenta/chats" clase="productosSidebar"/>
                         ): (
                            <MiLi nombre="Chats" enlace="/cuenta/chats" clase=""/> 
                        )
                    } 

                     {props.componente === "configuración" ? 
                        (
                            <MiLi nombre="Configuración" enlace="/cuenta/configuracion" clase="productosSidebar"/>
                         ): (
                            <MiLi nombre="Configuración" enlace="/cuenta/configuracion" clase=""/> 
                        )
                    }  
                </ul>
            </nav>
            {
                
                 <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: "280px"}}>
                <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Cuenta</span>
                </a>
                <hr></hr>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <a href="#" class="nav-link text-white"> Perfil</a>
                    </li>
                    <li class="nav-item">
                        <a  href="#" class="nav-link active" aria-current="page"> Productos</a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">Chats</a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">Configuración</a>
                    </li>
                </ul>
                <hr/>
            </div>
                
        </div> */
         }

       
    
      
}

export default Sidebar;
