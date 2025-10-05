import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, Users, MessageSquare, UserPlus, Search, 
  Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic,
  Crown, Shield, Star, MapPin, Calendar, Award
} from 'lucide-react';

interface UsersPageProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role: 'admin' | 'moderator' | 'researcher' | 'amateur' | 'student';
  location: string;
  joinDate: string;
  expertise: string[];
  achievements: string[];
  lastSeen?: string;
  isVerified: boolean;
}

interface DirectMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar: string;
}

export function UsersPage({ onBack }: UsersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedGroupForInvite, setSelectedGroupForInvite] = useState('');

  // Mock users data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Maria Silva',
      email: 'maria.silva@astro.edu',
      avatar: '👩‍🔬',
      status: 'online',
      role: 'researcher',
      location: 'São Paulo, Brasil',
      joinDate: '2023-01-15',
      expertise: ['Exoplanetas', 'Espectroscopia', 'Kepler'],
      achievements: ['Publicação Nature', 'Prêmio Astronomia'],
      isVerified: true
    },
    {
      id: '2',
      name: 'Prof. João Santos',
      email: 'joao.santos@university.edu',
      avatar: '👨‍🔬',
      status: 'away',
      role: 'researcher',
      location: 'Rio de Janeiro, Brasil',
      joinDate: '2023-03-20',
      expertise: ['Detecção', 'Métodos Transit'],
      achievements: ['Descoberta Kepler-452b'],
      lastSeen: '2 horas atrás',
      isVerified: true
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      avatar: '👩‍💼',
      status: 'online',
      role: 'amateur',
      location: 'Belo Horizonte, Brasil',
      joinDate: '2023-06-10',
      expertise: ['Observação Amadora', 'Telescópios'],
      achievements: ['Primeira Descoberta'],
      isVerified: false
    },
    {
      id: '4',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@student.edu',
      avatar: '👨‍🎓',
      status: 'busy',
      role: 'student',
      location: 'Porto Alegre, Brasil',
      joinDate: '2023-09-05',
      expertise: ['Análise de Dados', 'Python'],
      achievements: [],
      lastSeen: '30 min atrás',
      isVerified: false
    },
    {
      id: '5',
      name: 'Dr. Elena Rodriguez',
      email: 'elena.rodriguez@space.org',
      avatar: '👩‍🚀',
      status: 'online',
      role: 'admin',
      location: 'Madrid, Espanha',
      joinDate: '2022-11-12',
      expertise: ['Habitabilidade', 'Astrobiologia'],
      achievements: ['Prêmio Nobel', 'Diretora NASA'],
      isVerified: true
    }
  ]);

  // Mock groups for invitation
  const [groups] = useState([
    { id: '1', name: 'Pesquisadores Kepler', memberCount: 45 },
    { id: '2', name: 'Observadores Amadores', memberCount: 128 },
    { id: '3', name: 'Zonas Habitáveis', memberCount: 67 },
    { id: '4', name: 'Métodos de Detecção', memberCount: 89 }
  ]);

  // Mock direct messages
  const [directMessages] = useState<DirectMessage[]>([
    {
      id: '1',
      author: 'Dr. Maria Silva',
      content: 'Olá! Vi que você está trabalhando com dados do Kepler. Podemos colaborar?',
      timestamp: '14:30',
      isOwn: false,
      avatar: '👩‍🔬'
    },
    {
      id: '2',
      author: 'Você',
      content: 'Claro! Seria ótimo trabalhar juntos. Que tipo de análise você está fazendo?',
      timestamp: '14:32',
      isOwn: true,
      avatar: '👤'
    },
    {
      id: '3',
      author: 'Dr. Maria Silva',
      content: 'Estou analisando variações na composição atmosférica de exoplanetas na zona habitável.',
      timestamp: '14:35',
      isOwn: false,
      avatar: '👩‍🔬'
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Ausente';
      case 'busy': return 'Ocupado';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderator': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'researcher': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'amateur': return 'bg-green-100 text-green-800 border-green-200';
      case 'student': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'moderator': return 'Moderador';
      case 'researcher': return 'Pesquisador';
      case 'amateur': return 'Amador';
      case 'student': return 'Estudante';
      default: return 'Usuário';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Enviando mensagem direta:', newMessage);
      setNewMessage('');
    }
  };

  const handleInviteToGroup = () => {
    if (selectedUser && selectedGroupForInvite) {
      console.log(`Convidando ${selectedUser.name} para o grupo ${selectedGroupForInvite}`);
      setShowInviteModal(false);
      setSelectedGroupForInvite('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Usuários da Plataforma</h1>
            <p className="text-sm text-gray-500">Conecte-se e colabore com outros pesquisadores</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Users List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuários..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                  selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
                      {user.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} border-2 border-white rounded-full shadow-sm`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">{user.name}</h3>
                      {user.isVerified && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">
                          <Star className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 truncate mb-2">{user.email}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs px-2 py-0.5 border ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </Badge>
                      <span className="text-xs text-gray-500">{getStatusLabel(user.status)}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {user.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                          {skill}
                        </Badge>
                      ))}
                      {user.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          +{user.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - User Profile & Chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedUser ? (
            <>
              {/* User Profile Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-sm">
                      {selectedUser.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                        {selectedUser.isVerified && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Star className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{selectedUser.email}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedUser.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Membro desde {new Date(selectedUser.joinDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowInviteModal(true)}
                      className="border-gray-200 hover:bg-gray-50"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Convidar para Grupo
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* User Info Sidebar */}
                <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Status */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${getStatusColor(selectedUser.status)} rounded-full`}></div>
                        <span className="text-sm text-gray-600">{getStatusLabel(selectedUser.status)}</span>
                        {selectedUser.lastSeen && (
                          <span className="text-xs text-gray-500">({selectedUser.lastSeen})</span>
                        )}
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Função</h3>
                      <Badge className={`px-3 py-1 border ${getRoleColor(selectedUser.role)}`}>
                        {getRoleLabel(selectedUser.role)}
                      </Badge>
                    </div>

                    {/* Expertise */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Especialidades</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {selectedUser.achievements.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Conquistas</h3>
                        <div className="space-y-2">
                          {selectedUser.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Award className="h-4 w-4 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {directMessages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm shadow-sm">
                            {message.avatar}
                          </div>
                        </div>
                        
                        <div className={`flex-1 max-w-[70%] ${message.isOwn ? 'text-right' : ''}`}>
                          <div className={`flex items-center gap-2 mb-1 ${message.isOwn ? 'justify-end' : ''}`}>
                            <span className="font-medium text-gray-900 text-sm">{message.author}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          
                          <div className={`bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 ${
                            message.isOwn ? 'bg-blue-500 text-white' : ''
                          }`}>
                            <p className={`text-sm leading-relaxed ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="bg-white border-t border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="pr-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-full"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                        <Mic className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No User Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um usuário</h3>
                <p className="text-gray-500">
                  Escolha um usuário da lista para ver o perfil e iniciar uma conversa
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite to Group Modal */}
      {showInviteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Convidar para Grupo</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowInviteModal(false)}
                  className="hover:bg-gray-100 rounded-full"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedUser.name}</p>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Selecionar Grupo</label>
                  <select 
                    value={selectedGroupForInvite}
                    onChange={(e) => setSelectedGroupForInvite(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Escolha um grupo...</option>
                    {groups.map(group => (
                      <option key={group.id} value={group.name}>
                        {group.name} ({group.memberCount} membros)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleInviteToGroup}
                    disabled={!selectedGroupForInvite}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Enviar Convite
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowInviteModal(false)}
                    className="border-gray-200 hover:bg-gray-50 rounded-lg font-medium"
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
