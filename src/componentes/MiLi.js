import React from "react"
import "./styles/sidebar.css"
import {BsFillPersonFill} from 'react-icons/bs';
import {RiMessage2Fill} from 'react-icons/ri';


const Sidebar = (props) => {

    //const claseCSS = "nav-link active"

    return(

        <li class="nav-item">
            <a class={props.clase} href={props.enlace}>
                <i class="fa fa-home"></i>
                {props.nombre == "Perfil" && <BsFillPersonFill/>}
                {props.nombre == "Chats" && <RiMessage2Fill/>}
               
               
                {props.nombre}
            </a>
        </li>
                       
    )
      
}

export default Sidebar;