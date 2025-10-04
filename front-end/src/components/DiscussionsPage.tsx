import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, Search, MessageCircle, Heart, Reply, 
  TrendingUp, Clock, Users, Plus, Filter, Pin
} from 'lucide-react';
import { useState } from 'react';

interface DiscussionsPageProps {
  onBack: () => void;
}

export function DiscussionsPage({ onBack }: DiscussionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');

  const discussions = [
    {
      id: '1',
      title: 'Nova técnica de análise atmosférica revoluciona detecção de biossinaturas',
      author: 'Dr. Maria Silva',
      avatar: 'MS',
      timeAgo: '2h',
      replies: 23,
      likes: 45,
      views: 234,
      category: 'Pesquisa',
      isPinned: true,
      preview: 'Descobrimos uma nova abordagem para analisar a composição atmosférica de exoplanetas usando espectroscopia avançada combinada com IA...',
      tags: ['espectroscopia', 'biossinaturas', 'IA'],
    },
    {
      id: '2',
      title: 'TRAPPIST-1e: Evidências crescentes de água líquida na superfície',
      author: 'Prof. João Santos',
      avatar: 'JS',
      timeAgo: '5h',
      replies: 18,
      likes: 67,
      views: 456,
      category: 'Descoberta',
      isPinned: false,
      preview: 'Novos dados do James Webb sugerem possível presença de vapor d\'água na atmosfera de TRAPPIST-1e. Os resultados são promissores...',
      tags: ['TRAPPIST-1', 'água', 'James Webb'],
    },
    {
      id: '3',
      title: 'Debate: Critérios para confirmar biossinaturas em K2-18b',
      author: 'Dra. Ana Costa',
      avatar: 'AC',
      timeAgo: '1d',
      replies: 34,
      likes: 89,
      views: 789,
      category: 'Discussão',
      isPinned: false,
      preview: 'Que evidências precisamos para confirmar biossinaturas? Vamos discutir os critérios científicos rigorosos necessários...',
      tags: ['K2-18b', 'biossinaturas', 'metodologia'],
    },
    {
      id: '4',
      title: 'Colaboração internacional: Projeto de mapeamento de exoplanetas habitáveis',
      author: 'Dr. Robert Chen',
      avatar: 'RC',
      timeAgo: '2d',
      replies: 12,
      likes: 34,
      views: 567,
      category: 'Colaboração',
      isPinned: false,
      preview: 'Estamos formando uma colaboração internacional para mapear sistematicamente exoplanetas potencialmente habitáveis...',
      tags: ['colaboração', 'mapeamento', 'internacional'],
    },
    {
      id: '5',
      title: 'Simulação computacional: Clima de super-Terras em zonas habitáveis',
      author: 'Dra. Elena Rodriguez',
      avatar: 'ER',
      timeAgo: '3d',
      replies: 28,
      likes: 56,
      views: 432,
      category: 'Pesquisa',
      isPinned: false,
      preview: 'Resultados de nossa simulação mostram padrões climáticos complexos em super-Terras. Implicações para habitabilidade...',
      tags: ['simulação', 'super-Terra', 'clima'],
    },
  ];

  const categories = ['Todos', 'Pesquisa', 'Descoberta', 'Discussão', 'Colaboração', 'Educação'];
  const sortOptions = ['Mais recentes', 'Mais populares', 'Mais comentados', 'Sem resposta'];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      discussion.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>Discussões da Comunidade</h1>
          <p className="text-muted-foreground">
            Compartilhe descobertas, faça perguntas e colabore com pesquisadores
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar discussões, tópicos ou tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <Select defaultValue="recent">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option.toLowerCase().replace(' ', '-')}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowNewPost(!showNewPost)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Nova Discussão</span>
            <span className="sm:hidden">Nova</span>
          </Button>
        </div>
      </div>

      {showNewPost && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Discussão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Título da discussão..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Select
              value={newPost.category}
              onValueChange={(value) => setNewPost({ ...newPost, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Compartilhe seus insights, descobertas ou faça uma pergunta detalhada..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="min-h-[120px]"
            />
            <div className="flex gap-2">
              <Button>Publicar Discussão</Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNewPost(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categorias - Responsivo */}
      <div className="space-y-4">
        {/* Versão desktop/tablet - Tabs */}
        <div className="hidden sm:block">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category.toLowerCase()}
                  className="text-xs md:text-sm px-2 md:px-3 py-2 whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                          <AvatarFallback className="text-xs sm:text-sm">{discussion.avatar}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {discussion.isPinned && (
                                <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              )}
                              <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-w-0">
                                {discussion.title}
                              </h3>
                            </div>
                            <Badge variant="outline" className="text-xs w-fit flex-shrink-0">
                              {discussion.category}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {discussion.preview}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span className="hidden sm:inline">{discussion.author}</span>
                                <span className="sm:hidden">{discussion.author.split(' ')[0]}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {discussion.timeAgo}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {discussion.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {discussion.replies}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                <span className="hidden sm:inline">{discussion.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredDiscussions.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Nenhuma discussão encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Não encontramos discussões que correspondem à sua busca.
                  </p>
                  <Button onClick={() => setShowNewPost(true)}>
                    Criar Nova Discussão
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Versão mobile - Select */}
        <div className="sm:hidden">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecionar categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="mt-6">
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <AvatarFallback className="text-xs sm:text-sm">{discussion.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {discussion.isPinned && (
                              <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                            )}
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-w-0">
                              {discussion.title}
                            </h3>
                          </div>
                          <Badge variant="outline" className="text-xs w-fit flex-shrink-0">
                            {discussion.category}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {discussion.preview}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span className="hidden sm:inline">{discussion.author}</span>
                              <span className="sm:hidden">{discussion.author.split(' ')[0]}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {discussion.timeAgo}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {discussion.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {discussion.replies}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span className="hidden sm:inline">{discussion.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredDiscussions.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Nenhuma discussão encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Não encontramos discussões que correspondem à sua busca.
                </p>
                <Button onClick={() => setShowNewPost(true)}>
                  Criar Nova Discussão
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}