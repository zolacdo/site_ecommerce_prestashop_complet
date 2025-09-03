import { useState, useContext, createContext, ReactNode } from 'react';
import { ChatMessage, ChatConversation } from '../types/Admin';

interface ChatContextType {
  conversations: ChatConversation[];
  currentConversation: ChatConversation | null;
  messages: ChatMessage[];
  isOpen: boolean;
  unreadCount: number;
  openChat: () => void;
  closeChat: () => void;
  selectConversation: (conversation: ChatConversation) => void;
  sendMessage: (content: string) => void;
  markAsRead: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);

  const mockConversations: ChatConversation[] = [
    {
      id: 'conv-1',
      userId: 'user-1',
      userName: 'Marie Dubois',
      lastMessage: 'Bonjour, j\'ai une question sur la formation...',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isActive: true
    },
    {
      id: 'conv-2',
      userId: 'user-2',
      userName: 'Jean Martin',
      lastMessage: 'Merci pour votre aide !',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      isActive: false
    }
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      senderId: 'user-1',
      senderName: 'Marie Dubois',
      content: 'Bonjour, j\'ai une question sur la formation PrestaShop complète.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: true
    },
    {
      id: 'msg-2',
      senderId: 'admin-1',
      senderName: 'Support',
      content: 'Bonjour Marie ! Je suis là pour vous aider. Quelle est votre question ?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      isRead: true
    },
    {
      id: 'msg-3',
      senderId: 'user-1',
      senderName: 'Marie Dubois',
      content: 'Comment puis-je accéder aux vidéos de la formation après l\'achat ?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false
    }
  ];

  const [conversations] = useState<ChatConversation[]>(mockConversations);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const selectConversation = (conversation: ChatConversation) => {
    setCurrentConversation(conversation);
  };

  const sendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'admin-1',
      senderName: 'Support',
      content,
      timestamp: new Date(),
      isRead: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markAsRead = (conversationId: string) => {
    // Mark conversation as read
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      messages,
      isOpen,
      unreadCount,
      openChat,
      closeChat,
      selectConversation,
      sendMessage,
      markAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}