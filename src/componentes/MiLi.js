import React from "react"
import "./styles/sidebar.css"
import {BsFillPersonFill} from 'react-icons/bs';
import {RiMessage2Fill} from 'react-icons/ri';
import {BsFillInboxFill} from 'react-icons/bs';
import {RiSettings4Fill} from 'react-icons/ri';
import {Link} from "react-router-dom"


const MiLi = (props) => {

    //const claseCSS = "nav-link active"

    return(

        <li class="nav-item fs-5">
            <Link class={props.clase} to={props.enlace}>
                <i class="fa fa-home"></i>
                {props.nombre == "Perfil" && <BsFillPersonFill/>}
                {props.nombre == "Productos" && <BsFillInboxFill/>}
                {props.nombre == "Chats" && <RiMessage2Fill/>}
                {props.nombre == "Configuración" && <RiSettings4Fill/>}
                <span className="mx-2">{props.nombre}</span>
                
            </Link>
        </li>
                       
    )
      
}

export default MiLi;
