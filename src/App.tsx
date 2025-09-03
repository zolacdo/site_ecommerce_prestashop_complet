import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Phone, Video } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const MiniChat: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const { 
    isOpen, 
    openChat, 
    closeChat, 
    conversations, 
    currentConversation, 
    messages, 
    unreadCount,
    selectConversation,
    sendMessage 
  } = useChat();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={openChat}
        className="fixed bottom-6 right-6 bg-blue-900 hover:bg-blue-800 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-100'
    }`}>
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <div>
            <p className="font-semibold">Support PrestaShop Academy</p>
            <p className="text-xs text-blue-200">En ligne</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={closeChat}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {/* Welcome message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                <span className="text-xs text-gray-500">Il y a 2 min</span>
              </div>
            </div>

            {/* User messages */}
            {messages.slice(-3).map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-2 ${
                msg.senderId.startsWith('admin') ? '' : 'flex-row-reverse space-x-reverse'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                  msg.senderId.startsWith('admin') ? 'bg-blue-900' : 'bg-orange-500'
                }`}>
                  {msg.senderName.charAt(0)}
                </div>
                <div className={`rounded-lg p-3 max-w-xs ${
                  msg.senderId.startsWith('admin') 
                    ? 'bg-gray-100' 
                    : 'bg-blue-900 text-white'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <span className={`text-xs ${
                    msg.senderId.startsWith('admin') ? 'text-gray-500' : 'text-blue-200'
                  }`}>
                    {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniChat;