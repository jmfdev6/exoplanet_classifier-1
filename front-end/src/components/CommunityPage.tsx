import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, MessageSquare, Plus, Settings, UserPlus, Hash } from 'lucide-react';

interface CommunityPageProps {
  onBack: () => void;
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isPublic: boolean;
  isJoined: boolean;
  createdAt: string;
  tags: string[];
}

export function CommunityPage({ onBack }: CommunityPageProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: 'general',
    isPublic: true,
    tags: ''
  });

  // Mock communities data
  const [communities] = useState<CommunityGroup[]>([
    {
      id: '1',
      name: 'Pesquisadores Kepler',
      description: 'Grupo dedicado à análise e discussão de dados da missão Kepler. Compartilhamos descobertas, metodologias e colaboramos em projetos de pesquisa.',
      category: 'research',
      memberCount: 45,
      isPublic: true,
      isJoined: false,
      createdAt: '2024-01-10',
      tags: ['kepler', 'pesquisa', 'dados']
    },
    {
      id: '2',
      name: 'Observadores Amadores',
      description: 'Comunidade de astrônomos amadores interessados em exoplanetas. Compartilhamos observações, equipamentos e técnicas de detecção.',
      category: 'amateur',
      memberCount: 128,
      isPublic: true,
      isJoined: true,
      createdAt: '2024-01-08',
      tags: ['amador', 'observação', 'equipamentos']
    },
    {
      id: '3',
      name: 'Zonas Habitáveis',
      description: 'Discussões especializadas sobre critérios de habitabilidade, modelos climáticos e possibilidades de vida em exoplanetas.',
      category: 'habitability',
      memberCount: 67,
      isPublic: true,
      isJoined: false,
      createdAt: '2024-01-05',
      tags: ['habitabilidade', 'vida', 'clima']
    },
    {
      id: '4',
      name: 'Métodos de Detecção',
      description: 'Grupo técnico focado em técnicas avançadas de detecção de exoplanetas: trânsito, velocidade radial, imagem direta e microlente.',
      category: 'methodology',
      memberCount: 89,
      isPublic: false,
      isJoined: false,
      createdAt: '2024-01-03',
      tags: ['detecção', 'técnicas', 'instrumentação']
    }
  ]);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      // Aqui você implementaria a lógica para criar um novo grupo
      console.log('Criando grupo:', newGroup);
      setShowCreateForm(false);
      setNewGroup({ name: '', description: '', category: 'general', isPublic: true, tags: '' });
    }
  };

  const handleJoinGroup = (groupId: string) => {
    // Implementar lógica de entrada no grupo
    console.log('Entrando no grupo:', groupId);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      research: 'Pesquisa',
      amateur: 'Amador',
      habitability: 'Habitabilidade',
      methodology: 'Metodologia',
      general: 'Geral'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Comunidades de Discussão</h1>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar comunidades..."
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
                <SelectItem value="amateur">Amador</SelectItem>
                <SelectItem value="habitability">Habitabilidade</SelectItem>
                <SelectItem value="methodology">Metodologia</SelectItem>
                <SelectItem value="general">Geral</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Comunidade
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Community Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Comunidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Comunidade</Label>
              <Input
                id="name"
                value={newGroup.name}
                onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Pesquisadores TESS"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newGroup.description}
                onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o propósito e objetivos da comunidade..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={newGroup.category} onValueChange={(value) => setNewGroup(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={newGroup.tags}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Ex: tess, pesquisa, dados"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={newGroup.isPublic}
                onCheckedChange={(checked) => setNewGroup(prev => ({ ...prev, isPublic: checked }))}
              />
              <Label htmlFor="isPublic">Comunidade Pública</Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCreateGroup} className="flex-1">
                <Hash className="h-4 w-4 mr-2" />
                Criar Comunidade
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Communities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommunities.map((community) => (
          <Card key={community.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryLabel(community.category)}
                    </Badge>
                    {!community.isPublic && (
                      <Badge variant="secondary" className="text-xs">
                        Privado
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {community.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {community.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{community.memberCount} membros</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>Ativo</span>
                  </div>
                </div>
                <span className="text-muted-foreground">
                  Criado em {new Date(community.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="flex gap-2">
                {community.isJoined ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Entrar na Discussão
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleJoinGroup(community.id)}
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Entrar no Grupo
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma comunidade encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou criar uma nova comunidade.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
