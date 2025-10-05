import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, Users, MessageSquare, Star, Share2, Heart, ThumbsUp, 
  Plus, Hash, Settings, Search, Phone, Video, MoreVertical, 
  Send, Smile, Paperclip, Mic, Volume2, VolumeX, Bell, BellOff
} from 'lucide-react';
import { UsersPage } from './UsersPage';
import { Exoplanet } from './ExoplanetCard';

interface CollaborationPageProps {
  exoplanets: Exoplanet[];
  onBack: () => void;
}

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatar?: string;
  isMuted?: boolean;
}

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOnline: boolean;
  avatar?: string;
  reactions?: { emoji: string; count: number }[];
  isOwn?: boolean;
}

export function CollaborationPage({ exoplanets, onBack }: CollaborationPageProps) {
  const [currentTab, setCurrentTab] = useState<'groups' | 'users'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false); // Para controlar visibilidade do chat em mobile
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: 'general'
  });

  // Mock groups data
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Pesquisadores Kepler',
      description: 'Discussões sobre dados da missão Kepler',
      category: 'research',
      memberCount: 45,
      isOnline: true,
      lastMessage: 'Novos dados do Kepler-452b são promissores!',
      lastMessageTime: '2 min',
      unreadCount: 3,
      avatar: '🔬',
      isMuted: false
    },
    {
      id: '2',
      name: 'Observadores Amadores',
      description: 'Comunidade de astrônomos amadores',
      category: 'amateur',
      memberCount: 128,
      isOnline: true,
      lastMessage: 'Alguém tem dicas para telescópios?',
      lastMessageTime: '15 min',
      unreadCount: 0,
      avatar: '🔭',
      isMuted: false
    },
    {
      id: '3',
      name: 'Zonas Habitáveis',
      description: 'Discussões sobre habitabilidade',
      category: 'habitability',
      memberCount: 67,
      isOnline: false,
      lastMessage: 'Critérios de habitabilidade precisam ser revisados',
      lastMessageTime: '1h',
      unreadCount: 1,
      avatar: '🌍',
      isMuted: true
    },
    {
      id: '4',
      name: 'Métodos de Detecção',
      description: 'Técnicas avançadas de detecção',
      category: 'methodology',
      memberCount: 89,
      isOnline: true,
      lastMessage: 'Espectroscopia de alta resolução é o futuro',
      lastMessageTime: '30 min',
      unreadCount: 0,
      avatar: '📊',
      isMuted: false
    }
  ]);

  // Mock messages data
  const [messages] = useState<Message[]>([
    {
      id: '1',
      author: 'Dr. Maria Silva',
      content: 'Olá pessoal! Acabei de analisar os dados mais recentes do Kepler-452b e encontrei algumas características muito interessantes.',
      timestamp: '14:30',
      isOnline: true,
      avatar: '👩‍🔬',
      reactions: [{ emoji: '👍', count: 5 }, { emoji: '❤️', count: 3 }],
      isOwn: false
    },
    {
      id: '2',
      author: 'Prof. João Santos',
      content: 'Que interessante! Pode compartilhar mais detalhes sobre essas características?',
      timestamp: '14:32',
      isOnline: true,
      avatar: '👨‍🔬',
      isOwn: false
    },
    {
      id: '3',
      author: 'Ana Costa',
      content: 'Também estou muito interessada! Seria ótimo se pudéssemos discutir isso em mais detalhes.',
      timestamp: '14:35',
      isOnline: false,
      avatar: '👩‍💼',
      isOwn: false
    },
    {
      id: '4',
      author: 'Dr. Maria Silva',
      content: 'Claro! Vou preparar um relatório detalhado e compartilhar aqui. As principais descobertas incluem variações na composição atmosférica que podem indicar atividade biológica.',
      timestamp: '14:38',
      isOnline: true,
      avatar: '👩‍🔬',
      reactions: [{ emoji: '🎉', count: 8 }, { emoji: '🤔', count: 2 }],
      isOwn: false
    }
  ]);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedGroupData = groups.find(g => g.id === selectedGroup);

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      console.log('Criando grupo:', newGroup);
      setShowCreateGroup(false);
      setNewGroup({ name: '', description: '', category: 'general' });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'amateur': return 'bg-green-100 text-green-800 border-green-200';
      case 'habitability': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'methodology': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'research': return 'Pesquisa';
      case 'amateur': return 'Amador';
      case 'habitability': return 'Habitabilidade';
      case 'methodology': return 'Metodologia';
      default: return 'Geral';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="self-start sm:self-center hover:bg-gray-100 min-h-[44px] text-base sm:text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">ExoPlanet Hub</h1>
              <p className="text-xs sm:text-sm text-gray-500">Plataforma Colaborativa</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 self-center">
              <button
                onClick={() => setCurrentTab('groups')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors min-h-[44px] ${
                  currentTab === 'groups'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Hash className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                <span className="hidden sm:inline">Grupos</span>
                <span className="sm:hidden">Grupos</span>
              </button>
              <button
                onClick={() => setCurrentTab('users')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors min-h-[44px] ${
                  currentTab === 'users'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 inline" />
                <span className="hidden sm:inline">Usuários</span>
                <span className="sm:hidden">Usuários</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar exoplanetas..."
                className="pl-10 w-full sm:w-64 bg-gray-50 border-gray-200 min-h-[44px] text-base sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Tab */}
      {currentTab === 'users' ? (
        <UsersPage onBack={onBack} />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Groups List */}
          <div className={`${showChat ? 'hidden sm:flex' : 'flex'} w-full sm:w-80 bg-white border-r border-gray-200 flex-col`}>
            {/* Search and Create */}
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar grupos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <Button 
                  onClick={() => setShowCreateGroup(true)} 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] px-3 sm:px-4"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group.id);
                    setShowChat(true);
                  }}
                  className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                    selectedGroup === group.id ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-sm">
                        {group.avatar}
                      </div>
                      {group.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{group.name}</h3>
                        <div className="flex items-center gap-1">
                          {group.isMuted && (
                            <BellOff className="h-3 w-3 text-gray-400" />
                          )}
                          {group.unreadCount && group.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                              {group.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 truncate mb-2">{group.description}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs px-2 py-0.5 border ${getCategoryColor(group.category)}`}>
                            {getCategoryLabel(group.category)}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {group.memberCount}
                          </span>
                        </div>
                        
                        {group.lastMessageTime && (
                          <span className="text-xs text-gray-500">{group.lastMessageTime}</span>
                        )}
                      </div>
                      
                      {group.lastMessage && (
                        <p className="text-xs sm:text-sm text-gray-500 truncate mt-1 leading-relaxed">
                          {group.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Chat Area */}
          <div className={`${showChat ? 'flex' : 'hidden sm:flex'} flex-1 flex-col bg-gray-50`}>
            {selectedGroup ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowChat(false)}
                        className="sm:hidden hover:bg-gray-100 min-h-[44px]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                        {selectedGroupData?.avatar}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedGroupData?.name}</h2>
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {selectedGroupData?.memberCount} membros • 
                          <span className={`ml-1 ${selectedGroupData?.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                            {selectedGroupData?.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px] hidden sm:flex">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px] hidden sm:flex">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px]">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px]">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-2 sm:gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm shadow-sm">
                          {message.avatar}
                        </div>
                        {message.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className={`flex-1 max-w-[75%] sm:max-w-[70%] ${message.isOwn ? 'text-right' : ''}`}>
                        <div className={`flex items-center gap-2 mb-1 ${message.isOwn ? 'justify-end' : ''}`}>
                          <span className="font-medium text-gray-900 text-xs sm:text-sm">{message.author}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        
                        <div className={`bg-white rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-100 ${
                          message.isOwn ? 'bg-blue-500 text-white' : ''
                        }`}>
                          <p className={`text-xs sm:text-sm leading-relaxed ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>
                            {message.content}
                          </p>
                        </div>
                        
                        {message.reactions && message.reactions.length > 0 && (
                          <div className={`flex gap-1 sm:gap-2 mt-1 sm:mt-2 ${message.isOwn ? 'justify-end' : ''}`}>
                            {message.reactions.map((reaction, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-5 sm:h-6 px-1 sm:px-2 text-xs hover:bg-gray-100 rounded-full"
                              >
                                {reaction.emoji} {reaction.count}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px] hidden sm:flex">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-full min-h-[44px] text-base sm:text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 min-h-[40px]"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 min-h-[44px] hidden sm:flex">
                      <Mic className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-4 min-h-[44px]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Group Selected */
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um grupo</h3>
                  <p className="text-gray-500">
                    Escolha um grupo da lista para começar a colaborar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ease-out">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Criar Novo Grupo</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateGroup(false)}
                  className="hover:bg-gray-100 rounded-full min-h-[44px]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName" className="text-sm font-medium text-gray-700">Nome do Grupo</Label>
                  <Input
                    id="groupName"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite o nome do grupo..."
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="groupDescription" className="text-sm font-medium text-gray-700">Descrição</Label>
                  <Textarea
                    id="groupDescription"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o propósito do grupo..."
                    rows={3}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg min-h-[44px] text-base sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupCategory" className="text-sm font-medium text-gray-700">Categoria</Label>
                  <Select value={newGroup.category} onValueChange={(value) => setNewGroup(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg min-h-[44px] text-base sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Geral</SelectItem>
                      <SelectItem value="research">Pesquisa</SelectItem>
                      <SelectItem value="amateur">Amador</SelectItem>
                      <SelectItem value="habitability">Habitabilidade</SelectItem>
                      <SelectItem value="methodology">Metodologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    onClick={handleCreateGroup} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium min-h-[44px] text-base sm:text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Grupo
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateGroup(false)}
                    className="border-gray-200 hover:bg-gray-50 rounded-lg font-medium min-h-[44px] text-base sm:text-sm"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}