import { useState, useEffect } from 'react'
import mircLogo from './assets/mirc.jpg'
import './App.css'
import io from 'socket.io-client'; 

function App() {
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState('faiz')
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io.connect('https://chat-be-b2wz.onrender.com' || 'http://localhost:3000'); 
    newSocket.on('receive_message', (data) => {
      setMessages((state) => [
        ...state,
        data,
      ]);
    });

    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, []);

  const submitMessage = () => {
    socket.emit('send_message', { text: message, id: new Date().getTime(), sender: currentUser });
    setMessage('');
  }

  return (
    <div className='container mx-auto py-10 '>
      <div className='col'>
        <img src={mircLogo} className="logo m-auto" alt="Mirc logo" />
      </div>
      <div className="col ">
        <h1 className="text-3xl font-bold underline m-auto">
          Chat App With Websocket
        </h1>
      </div>

      <div className="border border-black-800 rounded-lg h-64 mt-10 bg-slate-300 mx-auto  overflow-auto mx-6">
        {messages.map((message) => (
          <div key={message.id} className={ message.sender == currentUser ? "flex justify-end pt-1 px-2" : "flex justify-start pt-1 px-2" }>
            <div>
              <div
                className={`relative max-w-xl rounded-xl px-4 py-2 ${message.sender == currentUser ? ' rounded-br-none bg-blue-600 ' : ' rounded-bl-none bg-gray-800'}`}>
                <span className="text-sm font-medium text-white">
                  {message.text}
                </span>
              </div>
              <div className={ message.sender == currentUser ? "flex justify-end" : "flex justify-start" }>{message.sender}</div>
            </div>
            
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <div className="col mt-5 w-60 p-1">
          <input
            className="border border-black-800 rounded-lg h-10 w-full px-2"
            type="text" placeholder="Username"
            onChange={(e) => setCurrentUser(e.target.value)}
          />
        </div>
        <div className="col mt-5 w-96 p-1">
          <input
            className="border border-black-800 rounded-lg h-10 w-full px-2"
            type="text"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
          />
        </div>
        <div className="col mt-5 w-20 p-1">
          <button
            className="border border-black-800 rounded-lg h-10 w-full px-2 bg-blue-600 text-white"
            type="button"
            onClick = {submitMessage}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
