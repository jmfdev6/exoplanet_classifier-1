import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, MessageSquare, Plus, Search, Heart, MessageCircle, 
  Share2, TrendingUp, Users, BookOpen, Hash, Clock, Star
} from 'lucide-react';

interface CommunityDiscussionsPageProps {
  onBack: () => void;
}

interface DiscussionCategory {
  id: string;
  name: string;
  members: number;
  discussions: number;
  isActive?: boolean;
}

interface DiscussionPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  isLiked: boolean;
  replies?: DiscussionReply[];
}

interface DiscussionReply {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
}

interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
}

export function CommunityDiscussionsPage({ onBack }: CommunityDiscussionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock categories data
  const [categories] = useState<DiscussionCategory[]>([
    { id: 'all', name: 'Todas as Discussões', members: 2847, discussions: 0, isActive: true },
    { id: 'kepler', name: 'Pesquisadores Kepler', members: 234, discussions: 127 },
    { id: 'atmospheres', name: 'Observadores de Atmosferas', members: 189, discussions: 203 },
    { id: 'habitable', name: 'Zonas Habitáveis', members: 156, discussions: 98 },
    { id: 'detection', name: 'Métodos de Detecção', members: 98, discussions: 67 },
    { id: 'modeling', name: 'Modelagem', members: 145, discussions: 89 }
  ]);

  // Mock discussions data
  const [discussions] = useState<DiscussionPost[]>([
    {
      id: '1',
      author: 'Dr. Maria Silva',
      avatar: 'MS',
      timestamp: '2h',
      content: 'Acabei de analisar os dados mais recentes do Kepler-452b e encontrei algumas características muito interessantes que podem indicar condições favoráveis para a vida. As variações na composição atmosférica são particularmente promissoras.',
      likes: 24,
      comments: 8,
      shares: 5,
      category: 'kepler',
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: 'Prof. João Santos',
          avatar: 'JS',
          timestamp: '1h42m',
          content: 'Que interessante! Que instrumentos você utilizou para essa análise?',
          likes: 3
        },
        {
          id: '1-2',
          author: 'Ana Costa',
          avatar: 'AC',
          timestamp: '1h30m',
          content: 'Também estou muito interessada! Seria ótimo se pudéssemos discutir isso em mais detalhes.',
          likes: 2
        }
      ]
    },
    {
      id: '2',
      author: 'Dr. Robert Chen',
      avatar: 'RC',
      timestamp: '3h',
      content: 'Compartilhando minha pesquisa sobre novos algoritmos para detecção de trânsitos planetários. Os resultados mostram uma melhoria significativa na sensibilidade para planetas menores.',
      likes: 18,
      comments: 6,
      shares: 3,
      category: 'detection',
      isLiked: true,
      replies: [
        {
          id: '2-1',
          author: 'Dra. Elena Rodriguez',
          avatar: 'ER',
          timestamp: '2h15m',
          content: 'Excelente trabalho! Como isso se compara com os métodos tradicionais?',
          likes: 4
        }
      ]
    },
    {
      id: '3',
      author: 'Ana Costa',
      avatar: 'AC',
      timestamp: '4h',
      content: 'Gostaria de discutir os critérios atuais para definição de zona habitável. Será que estamos sendo muito restritivos considerando os novos dados do JWST?',
      likes: 31,
      comments: 12,
      shares: 7,
      category: 'habitable',
      isLiked: false,
      replies: [
        {
          id: '3-1',
          author: 'Dr. Maria Silva',
          avatar: 'MS',
          timestamp: '3h20m',
          content: 'Ótima pergunta! Os dados do JWST realmente estão mudando nossa compreensão. Precisamos revisar os modelos.',
          likes: 8
        },
        {
          id: '3-2',
          author: 'Prof. João Santos',
          avatar: 'JS',
          timestamp: '3h10m',
          content: 'Concordo completamente. Os novos dados mostram que nossa definição pode estar muito conservadora.',
          likes: 5
        }
      ]
    }
  ]);

  // Mock trending topics
  const [trendingTopics] = useState<TrendingTopic[]>([
    { id: '1', name: 'JWST Discoveries', posts: 24 },
    { id: '2', name: 'Biossinaturas', posts: 18 },
    { id: '3', name: 'Super-Terras', posts: 15 },
    { id: '4', name: 'TRAPPIST-1', posts: 12 },
    { id: '5', name: 'Atmosferas', posts: 8 }
  ]);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    console.log('Liking post:', postId);
  };

  const handleReply = (postId: string) => {
    console.log('Replying to post:', postId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discussões da Comunidade</h1>
              <p className="text-sm text-gray-500">Conecte-se com pesquisadores e compartilhe descobertas</p>
            </div>
          </div>
          
          <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nova Discussão
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        {category.id !== 'all' && (
                          <div className="text-xs text-gray-500">
                            {category.members}m • {category.discussions}d
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Discussions Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {discussion.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{discussion.author}</h3>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                        </div>
                        
                        <p className="text-gray-800 mb-4 leading-relaxed">{discussion.content}</p>
                        
                        <div className="flex items-center gap-6 mb-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(discussion.id)}
                            className={`${discussion.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${discussion.isLiked ? 'fill-current' : ''}`} />
                            {discussion.likes}
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {discussion.comments}
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                            <Share2 className="h-4 w-4 mr-1" />
                            {discussion.shares}
                          </Button>
                        </div>

                        {/* Replies */}
                        {discussion.replies && discussion.replies.length > 0 && (
                          <div className="ml-6 space-y-4 border-l-2 border-gray-100 pl-4">
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {reply.avatar}
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-gray-900 text-sm">{reply.author}</h4>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  
                                  <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                  
                                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-red-500">
                                    <Heart className="h-3 w-3 mr-1" />
                                    {reply.likes}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReply(discussion.id)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            Responder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Exoplanets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Buscar Exoplanetas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar exoplanetas"
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tópicos em Alta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-sm">{topic.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {topic.posts} posts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">2,847 Membros ativos</p>
                      <p className="text-xs text-gray-500">+12 esta semana</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">156 Posts hoje</p>
                      <p className="text-xs text-gray-500">+8% vs ontem</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">12 Grupos ativos</p>
                      <p className="text-xs text-gray-500">6 categorias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Discussion Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Nova Discussão</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                  className="hover:bg-gray-100 rounded-full"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Categoria</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Selecione uma categoria...</option>
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Conteúdo da Discussão</label>
                  <textarea
                    placeholder="Compartilhe suas ideias, perguntas ou descobertas..."
                    rows={6}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Publicar Discussão
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
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