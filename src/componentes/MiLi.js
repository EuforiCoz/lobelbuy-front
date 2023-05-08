import React from "react"
import "./styles/sidebar.css"
import {BsFillPersonFill} from 'react-icons/bs';
import {RiMessage2Fill} from 'react-icons/ri';
import {Link} from "react-router-dom"


const Sidebar = (props) => {

    //const claseCSS = "nav-link active"

    return(

        <li class="nav-item">
            <Link class={props.clase} to={props.enlace}>
                <i class="fa fa-home"></i>
                {props.nombre == "Perfil" && <BsFillPersonFill/>}
                {props.nombre == "Chats" && <RiMessage2Fill/>}
               
               
                {props.nombre}
            </Link>
        </li>
                       
    )
      
}

export default Sidebar;
