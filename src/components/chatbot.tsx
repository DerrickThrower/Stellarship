import React, { useState } from 'react'

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-4 right-4"
      >
        <img 
          src="/bot.png" 
          alt="Chatbot" 
          className="w-8 h-8"
        />
      </button>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="p-4 fixed bottom-4 right-4 bg-gray-800 text-white rounded-lg shadow-lg">

        <div className="h-100">
            <h1 className="text-lg font-bold text-center">Chatbot</h1>
            <p className="text-sm">Ask me anything</p>


        </div>
      
      
      
      
      
      
      
      
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
      {response && (
        <div className="border p-4 rounded">
          <p>{response}</p>
        </div>
      )}
      <button onClick={() => setIsOpen(false)}>Close Chatbot</button>
    </div>
  )
}