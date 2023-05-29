import { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import "./styles/chats.css"
import axios from "axios";
import {AiOutlineSend} from 'react-icons/ai';

const socket = io('https://backend-lobelbuy.onrender.com/');

function Chats() {
  const location = useLocation();
  const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
  const [usuario, setUsuario] = useState(new URLSearchParams(location.search).get('usuario'))
  const [conversacionElegida, setConversacionElegida] = useState();
  const [conversaciones, setConversaciones] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [otraPersona, setOtraPersona] = useState('Elige una conversación');
  const [otraPersonaImagen, setOtraPersonaImagen] = useState(null);
  const [recibe, setRecibe] = useState();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [liElegido, setLiElegido] = useState(0);

  const messageListRef = useRef();
  
  useEffect(() => {
    window.history.pushState(null, '',"http://localhost:3000/cuenta/chats"); // Modifica la URL utilizando pushState
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    const datos =  {
        usuario_id: usuarioConectado.usuario_id
    }

    axios.post("https://backend-lobelbuy.onrender.com/obtenerConversaciones", datos)
    .then(res => {

        //setProductos(res.data)
        if(res.data != "No hay conversaciones"){
          setConversaciones(res.data);

          if(usuario != null){
            
              for (let i = 0; i < res.data.length; i++) {
                if(res.data[i].usuario1_id == usuarioConectado.usuario_id && res.data[i].usuario2_id == usuario){
                 
                  setRoomId(res.data[i].id);
                  setMessages([]);

                  setOtraPersona(res.data[i].nombre_usuario2);
                  setOtraPersonaImagen(res.data[i].foto_usuario2);
                  setConversacionElegida(res.data[i].nombre_usuario2);
                  setRecibe(res.data[i].nombre_usuario2);
                 
                  obtenerMensajes(res.data[i].id);
                  socket.emit('joinRoom', res.data[i].id);
                } else if(res.data[i].usuario2_id == usuarioConectado.usuario_id && res.data[i].usuario1_id == usuario){
                  setRoomId(res.data[i].id);
                  setMessages([]);
                  setOtraPersona(res.data[i].nombre_usuario1);
                  setOtraPersonaImagen(res.data[i].foto_usuario1);
                  setConversacionElegida(res.data[i].nombre_usuario1);
                  setRecibe(res.data[i].nombre_usuario1);
                  obtenerMensajes(res.data[i].id);
                  socket.emit('joinRoom', res.data[i].id);
                }
              }
          }
        }
        
        setUsername(usuarioConectado.nombre);
        
    })
    .catch(({response}) => {
      
    })
  }

  useEffect(() => {
   
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]);
      setTimeout(() => {
        const container = document.getElementById("scrollUl");
       
        container.scrollTo(0,  container.scrollHeight);
      }, 1); 
    });

  }, [messages]);

  useEffect(() => {
     // Conectarse al socket.io cuando el componente se monta
    socket.connect();

    // Desconectarse del socket.io cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  },[])

  const handleJoinRoom = (conversacion, persona) => {
    
    document.getElementsByClassName("liConversacion")[liElegido].classList.remove("active");
    
    document.getElementsByClassName("liConversacion")[persona].classList.add("active");
    setLiElegido(persona);
    setRoomId(conversacion.id);
  
    setMessages([]);
   
    if(conversacion.usuario1_id == usuarioConectado.usuario_id){
      setOtraPersona(conversacion.nombre_usuario2);
      setOtraPersonaImagen(conversacion.foto_usuario2);
      setConversacionElegida(conversacion.nombre_usuario2);
      setRecibe(conversacion.nombre_usuario2);
    } else{
      setOtraPersona(conversacion.nombre_usuario1);
      setOtraPersonaImagen(conversacion.foto_usuario1);
      setConversacionElegida(conversacion.nombre_usuario1);
      setRecibe(conversacion.nombre_usuario1);
    }

    obtenerMensajes(conversacion.id);

    socket.emit('joinRoom', conversacion.id);
  };

  const obtenerMensajes = (sala) =>{
   
    const datos =  {
      conversacion: sala
    }
    
    axios.post("https://backend-lobelbuy.onrender.com/obtenerMensajes", datos)
    .then(res => {
        setMessages(res.data);
        setTimeout(() => {
          const container = document.getElementById("scrollUl");
          
            container.scrollTo(0,  container.scrollHeight);
       
          
        }, 1); 
       
    })
    .catch(({response}) => {
      
    })
  }

  const handleSend = () => {
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 19).replace('T', ' ');
    
    const message = {
      conversacion_id: roomId,
      mensaje: messageText,
      envia: username,
      recibe: recibe,
      fecha: fechaFormateada
    };

    console.log(message);
    
    socket.emit('message', message);
    console.log(message)
    setMessageText('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

 
  return (
    
    <div id="chats" className='d-flex justify-content-center align-items-center' style={{minHeight: "80%",background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
      <div class="container pt-5 ">
      <div class="row clearfix">
          <div class="col-lg-12">
              <div class="card chat-app">
                  <div class="row">

                  
                  <div id="plist" class="people-list col-md-4 col-xs-12" style={{background:"linear-gradient(to bottom, #e6f2ff, #99ccff)"}}>
                      <div class="input-group">
                          <h2>Chats</h2>
                      </div>
                      <ul class="list-unstyled chat-list mt-2 mb-0">
                        {console.log(conversaciones)}
                      {conversaciones.length == 0 &&
                          <h6>No hay conversaciones</h6>
                      }

                      {conversaciones.length != 0 &&
                            conversaciones.map((conversaciones, index) => {
                              return (
                                  <div onClick={() => handleJoinRoom(conversaciones, index)}>
                                      {conversaciones.usuario1_id == usuarioConectado.usuario_id &&
                                        //<span className='mx-2'>Usuario: {conversaciones.nombre_usuario2}</span>
                                        <li class={"liConversacion clearfix d-flex align-items-center "} style={{borderTop: "1px solid white", borderBottom: "1px solid white"}}>
                                            <img src={conversaciones.foto_usuario2} alt="avatar" style={{width: "45px", height: "45px"}}/>
                                            <div class="about">
                                                <div class="name">{conversaciones.nombre_usuario2}</div>
                                            </div>
                                        </li>
                                      }
      
                                      {conversaciones.usuario2_id == usuarioConectado.usuario_id &&
                                        <li class={"liConversacion clearfix d-flex align-items-center"}  style={{borderTop: "1px solid white", borderBottom: "1px solid white"}}>
                                            <img src={conversaciones.foto_usuario1} alt="avatar" style={{width: "45px", height: "45px"}}/>
                                            <div class="about">
                                                <div class="name">{conversaciones.nombre_usuario1}</div>
                                            </div>
                                        </li>
                                      }
                                 </div>
                              )
                              })
                            
                      }
                    
                        
                      </ul>
                  </div>
                  <div class="chat col-md-8 col-xs-12" style={{backgroundColor:"aliceblue"}}>
                      <div class="chat-header clearfix">
                          <div class="row">
                              <div class="col-lg-6">
                                  <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                      {otraPersonaImagen != null &&
                                      <img src={otraPersonaImagen} alt="avatar" style={{width: "45px", height: "45px"}}/>

                                      }
                                  </a>
                                  <div class="chat-about mt-2">
                                      <h6 class="my-auto">{otraPersona}</h6>
                                  </div>
                              </div>
                            
                          </div>
                      </div>
                      <div class="chat-history">
                          <ul id="scrollUl" class="m-b-0" ref={messageListRef}>
                            {messages.length == 0 &&
                              <h3 className='text-center' style={{lineHeight: "300px"}}>Empiece a chatear</h3>
                            }
                          {messages.map((messages, index) => (
                            <div className='mt-3'>
                              {messages.recibe == recibe ? (
                                <li class="clearfix me-2"  key={index}>
                                  <div class="message other-message float-right">{messages.mensaje}</div>                                    
                                </li> 
                              
                              ) : (
                                <li class="clearfix" key={index}>
                                  <div class="message my-message" style={{backgroundColor:"#99ccff"}}> {messages.mensaje}</div>
                              </li>
                              
                                )
                              }
                            </div>
                            
                          ))}
                          </ul>
                      </div>
                      <div class="chat-message clearfix">
                          <div class="input-group mb-0">
                              <div class="input-group-prepend"  onClick={handleSend}>
                                  <span class="input-group-text" style={{cursor: "pointer"}}><AiOutlineSend style={{width: "25px", height: "25px"}}/></span>
                              </div>
                              <input type="text" class="form-control" placeholder="Enter text here... " value={messageText} onChange={e => setMessageText(e.target.value)} onKeyPress={handleKeyPress}/>                                    
                          </div>
                      </div>
                  </div>
              </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  );
}

export default Chats;
