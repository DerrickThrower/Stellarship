import React, { useState } from 'react'

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hello! I'm your scholarship assistant. I can help you with:\n\n• Finding scholarships that match your profile\n• Understanding eligibility requirements\n• Application tips and best practices\n• Scholarship deadlines and timelines\n• Writing strong scholarship essays\n• Preparing for scholarship interviews\n\nHere are some questions you can ask me:\n• What scholarships am I eligible for?\n• How do I write a winning scholarship essay?\n• What are some tips for scholarship interviews?\n• When are the deadlines for popular scholarships?\n• How do I find local scholarships?\n\nWhat would you like to know about scholarships?",
      sender: 'bot'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-4 right-4"
      >
        <img 
          src="/bot.png" 
          alt="Chatbot" 
          className="w-12 h-12"
        />
      </button>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = { text: message, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text })
      })
      const data = await res.json()
      
      // Add bot response
      const botMessage: Message = { text: data.response, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    // Reset to initial message
    setMessages([{
      text: "👋 Hello! I'm your scholarship assistant. I can help you with:\n\n• Finding scholarships that match your profile\n• Understanding eligibility requirements\n• Application tips and best practices\n• Scholarship deadlines and timelines\n• Writing strong scholarship essays\n• Preparing for scholarship interviews\n\nHere are some questions you can ask me:\n• What scholarships am I eligible for?\n• How do I write a winning scholarship essay?\n• What are some tips for scholarship interviews?\n• When are the deadlines for popular scholarships?\n• How do I find local scholarships?\n\nWhat would you like to know about scholarships?",
      sender: 'bot'
    }])
    setMessage('')
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Chatbot</h1>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 ml-auto' 
                  : 'bg-gray-700'
              } max-w-[80%]`}
            >
              <div className="whitespace-pre-line">
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-700 max-w-[80%]">
              Typing...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-2 rounded"
            placeholder="Type your message..."
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}