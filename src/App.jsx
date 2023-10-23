import { useState } from 'react'
import mircLogo from './assets/mirc.jpg'
import './App.css'

function App() {
  const [messages, setMessages] = useState([{ id: 1, text: 'Hello', sender: 'faiz'}, { id: 2, text: 'World', sender: 'abu'}])
  const [currentUser, setCurrentUser] = useState('faiz')

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

      <div className="border border-black-800 rounded-lg h-64 mt-10 bg-slate-300 mx-auto w-full ">
        {messages.map((message) => (
          <div key={message.id} className={ message.sender == currentUser ? "flex justify-end pt-1 px-1" : "flex justify-start pt-1 px-1" }>
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
          <input className="border border-black-800 rounded-lg h-10 w-full px-2" type="text" placeholder="Username" />
        </div>
        <div className="col mt-5 w-96 p-1">
          <input className="border border-black-800 rounded-lg h-10 w-full px-2" type="text" placeholder="Type your message here" />
        </div>
        <div className="col mt-5 w-20 p-1">
          <button className="border border-black-800 rounded-lg h-10 w-full px-2 bg-blue-600 text-white" type="button">Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
