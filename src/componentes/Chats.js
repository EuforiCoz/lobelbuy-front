import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import "./styles/chats.css"
import axios from "axios";
import {AiOutlineSend} from 'react-icons/ai';
import Skeleton from '@mui/material/Skeleton';

const socket = io('https://backend-lobelbuy.onrender.com/');

function Chats() {
  const usuarioConectado = JSON.parse(window.localStorage.getItem('usuario'));
  const [conversacionElegida, setConversacionElegida] = useState();
  const [conversaciones, setConversaciones] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [otraPersona, setOtraPersona] = useState('Elige una conversación');
  const [otraPersonaImagen, setOtraPersonaImagen] = useState(null);
  const [recibe, setRecibe] = useState();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const messageListRef = useRef();
  
  useEffect(() => {
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
    /*
    <div className='row d-flex flex-row py-5"' style={{background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
        <div className='col-3 py-5 px-5'>
            
            {conversaciones.map((conversaciones) => {
                return (
                    <div className='mt-3'  onClick={() => handleJoinRoom(conversaciones)} style={{width: "100%", height: "100px", background: "linear-gradient(to bottom, #e6f2ff, #99ccff)", borderRadius: "10px ", cursor: "pointer"}}>
                       
                        {conversaciones.usuario1_id == usuarioConectado.usuario_id &&
                          <span className='mx-2'>Usuario: {conversaciones.nombre_usuario2}</span>
                        }

                        {conversaciones.usuario2_id == usuarioConectado.usuario_id &&
                          <span className='mx-2'>Usuario: {conversaciones.nombre_usuario1}</span>
                        }

                        <span className='mx-2'>Room id: {conversaciones.id}</span>
                    </div>
                )
            })
            }
            
        </div>
        <div className="col-9 container py-5 px-5">
            <div className="row">
                <div className="col-12">
                <h1>Chat</h1>
                </div>
            </div>
            <div className="row">
              {conversacionElegida == null ? (
                 <h4>Ninguna conversación elegida</h4>
                ) : (
                  <h4>{conversacionElegida}</h4>
                )
              }
             
            </div>
            <div className="row">
                <div className="col-12">
                <ul className="list-group" style={{ height: '600px', overflowY: 'scroll' }} ref={messageListRef}>
                    {messages.map((messages, index) => (
                    <div>
                      {messages.recibe == recibe ? (
                        <li className="list-group-item" key={index}>
                          <strong>{messages.envia}: </strong>{messages.mensaje}
                        </li>
                      ) : (
                        <li className="list-group-item" key={index} style={{background: "lightblue"}}>
                          <strong>{messages.envia}: </strong>{messages.mensaje}
                        </li>
                        )
                      }
                    </div>
                    
                    ))}
                </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Message" value={messageText} onChange={e => setMessageText(e.target.value)} onKeyPress={handleKeyPress} />
                </div>
                </div>
                <div className="col-md-6">
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    </div>*/
    <div id="chats" style={{background: "linear-gradient(to bottom, #1E90FF,#87CEEB)"}}>
      <div class="container pt-5 ">
      <div class="row clearfix" >
          <div class="col-lg-12">
              <div class="card chat-app" style={{backgroundColor:"aliceblue"}}>
                  <div class="row">

                  
                  <div id="plist" class="people-list col-md-4 col-xs-12">
                      <div class="input-group">
                          <h2>Chats</h2>
                      </div>
                      <ul class="list-unstyled chat-list mt-2 mb-0">
                        {!loaded &&
                          Array.from({ length: 5 }, (_, index) => (
                            <li class="clearfix d-flex flex-row justify-content-start align-items-center">
                              <Skeleton variant="circular" sx={{width: "45px", height: "45px", bgcolor: 'lightblue' }}/>
                              <div class="about">
                                <Skeleton variant="text" sx={{width: 150, fontSize: '1rem' , bgcolor: 'lightblue'}}/>  
                               </div>
                            </li>
                          ))
                        }
                      {conversaciones.length == 0 && loaded &&
                          <h6>No hay conversaciones</h6>
                      }

                      {conversaciones.length != 0 &&
                            conversaciones.map((conversaciones) => {
                              return (
                                  <div onClick={() => handleJoinRoom(conversaciones, this)}>
                                      {conversaciones.usuario1_id == usuarioConectado.usuario_id &&
                                        //<span className='mx-2'>Usuario: {conversaciones.nombre_usuario2}</span>
                                        <li class="clearfix">
                                            <img src={conversaciones.foto_usuario2} alt="avatar" style={{width: "45px", height: "45px"}}/>
                                            <div class="about">
                                                <div class="name">{conversaciones.nombre_usuario2}</div>
                                                <div class="status"> <i class="fa fa-circle offline"></i> online </div>                                            
                                            </div>
                                        </li>
                                      }
      
                                      {conversaciones.usuario2_id == usuarioConectado.usuario_id &&
                                        <li class="clearfix">
                                            <img src={conversaciones.foto_usuario1} alt="avatar"/>
                                            <div class="about">
                                                <div class="name">{conversaciones.nombre_usuario1}</div>
                                                <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                                            </div>
                                        </li>
                                      }
                                 </div>
                              )
                              })
                            
                      }
                    
                        
                      </ul>
                  </div>
                  <div class="chat col-md-8 col-xs-12">
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
                          <ul id="scrollUl" class="m-b-0" style={{ height: '600px', overflowY: 'scroll' }} ref={messageListRef}>
                            {messages.length == 0 &&
                              <h3 className='text-center' style={{lineHeight: "600px"}}>Empiece a chatear</h3>
                            }
                          {messages.map((messages, index) => (
                            <div className='mt-3'>
                              {messages.recibe == recibe ? (
                                <li class="clearfix me-2"  key={index}>
                                  <div class="message other-message float-right">{messages.mensaje}</div>                                    
                                </li> 
                              
                              ) : (
                                <li class="clearfix" key={index}>
                                  <div class="message my-message"> {messages.mensaje}</div>
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
