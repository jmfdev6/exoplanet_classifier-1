import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, MessageSquare, Star, Share2, Heart, ThumbsUp } from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';

interface CollaborationPageProps {
  exoplanets: Exoplanet[];
  onBack: () => void;
}

interface DiscussionPost {
  id: string;
  author: string;
  title: string;
  content: string;
  exoplanetId?: string;
  category: string;
  likes: number;
  replies: number;
  createdAt: string;
  isLiked: boolean;
}

export function CollaborationPage({ exoplanets, onBack }: CollaborationPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    exoplanetId: '',
    category: 'general'
  });

  // Mock discussions data
  const [discussions] = useState<DiscussionPost[]>([
    {
      id: '1',
      author: 'Dr. Maria Silva',
      title: 'Análise do Kepler-452b: Possibilidades de Vida',
      content: 'Recentemente analisei os dados mais recentes do Kepler-452b e encontrei algumas características interessantes que podem indicar condições favoráveis para a vida...',
      exoplanetId: '1',
      category: 'research',
      likes: 12,
      replies: 5,
      createdAt: '2024-01-15',
      isLiked: false
    },
    {
      id: '2',
      author: 'Prof. João Santos',
      title: 'Novos Métodos de Detecção de Exoplanetas',
      content: 'Compartilhando minha pesquisa sobre técnicas avançadas de detecção usando espectroscopia de alta resolução...',
      category: 'methodology',
      likes: 8,
      replies: 3,
      createdAt: '2024-01-14',
      isLiked: true
    },
    {
      id: '3',
      author: 'Ana Costa',
      title: 'Discussão sobre Zonas Habitáveis',
      content: 'Gostaria de discutir os critérios atuais para definição de zona habitável. Será que estamos sendo muito restritivos?',
      category: 'general',
      likes: 15,
      replies: 8,
      createdAt: '2024-01-13',
      isLiked: false
    }
  ]);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      // Aqui você implementaria a lógica para criar um novo post
      console.log('Criando post:', newPost);
      setShowCreateForm(false);
      setNewPost({ title: '', content: '', exoplanetId: '', category: 'general' });
    }
  };

  const handleLike = (postId: string) => {
    // Implementar lógica de like
    console.log('Liking post:', postId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Colaboração da Comunidade</h1>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar discussões..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="research">Pesquisa</SelectItem>
                <SelectItem value="methodology">Metodologia</SelectItem>
                <SelectItem value="general">Geral</SelectItem>
                <SelectItem value="observations">Observações</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowCreateForm(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Nova Discussão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Discussão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Digite o título da discussão..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exoplanet">Exoplaneta Relacionado (Opcional)</Label>
              <Select value={newPost.exoplanetId} onValueChange={(value) => setNewPost(prev => ({ ...prev, exoplanetId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um exoplaneta..." />
                </SelectTrigger>
                <SelectContent>
                  {exoplanets.map(planet => (
                    <SelectItem key={planet.id} value={planet.id}>
                      {planet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Geral</SelectItem>
                  <SelectItem value="research">Pesquisa</SelectItem>
                  <SelectItem value="methodology">Metodologia</SelectItem>
                  <SelectItem value="observations">Observações</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Compartilhe suas ideias, perguntas ou descobertas..."
                rows={6}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCreatePost} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Publicar Discussão
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {discussion.category === 'research' ? 'Pesquisa' :
                         discussion.category === 'methodology' ? 'Metodologia' :
                         discussion.category === 'observations' ? 'Observações' : 'Geral'}
                      </Badge>
                      {discussion.exoplanetId && (
                        <Badge variant="secondary" className="text-xs">
                          {exoplanets.find(p => p.id === discussion.exoplanetId)?.name}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{discussion.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      Por <span className="font-medium">{discussion.author}</span> • {discussion.createdAt}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{discussion.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(discussion.id)}
                      className={`${discussion.isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${discussion.isLiked ? 'fill-current' : ''}`} />
                      {discussion.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {discussion.replies} respostas
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Participar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma discussão encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou criar uma nova discussão.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}