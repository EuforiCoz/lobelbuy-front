import io from "socket.io-client"
import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';

const ChatPrivado = ({socket, login, room}) => {

  //const params = useParams();
  //const nombre = params.nombre;
  //const login = params.login;
  console.log(socket)
  console.log(login)
  console.log(room)
  
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const nuevoMensaje = {
      body: mensaje,
      from: login,
      //to: nombre,
      room: room
    }

    await socket.emit("send_message", nuevoMensaje)
    
  }

  useEffect(() => {
    
    socket.on("new_message", (mensaje) => {
      setMensajes([...mensajes, mensaje])
    })
  }, [mensajes])

  return (
    <div className="chatPrivado">
      
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMensaje(e.target.value)} value={mensaje}/>
        <button>Enviar</button>
      </form>

      {
          mensajes.map((mensaje) => (
            <div>
              <p>{mensaje.from}: {mensaje.body}</p>
            </div>
          ))
        }

    </div>
  );
}

export default ChatPrivado;
