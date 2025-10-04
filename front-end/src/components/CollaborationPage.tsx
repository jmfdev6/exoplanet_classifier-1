import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, Users, Trophy, GitBranch, MessageSquare, 
  Plus, Search, MapPin, Calendar, Star, Clock, Target
} from 'lucide-react';
import { useState } from 'react';

interface CollaborationPageProps {
  onBack: () => void;
}

export function CollaborationPage({ onBack }: CollaborationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    {
      id: '1',
      name: 'Atmosferas Exoplanetárias',
      description: 'Especializada em análise espectroscópica de atmosferas',
      members: 45,
      projects: 12,
      leader: 'Dra. Maria Silva',
      location: 'Internacional',
      status: 'Ativa',
      expertise: ['Espectroscopia', 'Modelagem Atmosférica', 'James Webb'],
    },
    {
      id: '2',
      name: 'Habitabilidade Planetária',
      description: 'Pesquisa condições para vida em exoplanetas',
      members: 38,
      projects: 8,
      leader: 'Prof. João Santos',
      location: 'América Latina',
      status: 'Recrutando',
      expertise: ['Zona Habitável', 'Astrobiologia', 'Modelagem Climática'],
    },
    {
      id: '3',
      name: 'Detecção de Trânsitos',
      description: 'Desenvolvimento de algoritmos para detecção automatizada',
      members: 32,
      projects: 15,
      leader: 'Dr. Robert Chen',
      location: 'Global',
      status: 'Ativa',
      expertise: ['Machine Learning', 'Processamento de Dados', 'TESS'],
    },
  ];

  const contributors = [
    {
      id: '1',
      name: 'Dra. Maria Silva',
      role: 'Especialista em Atmosferas',
      institution: 'Universidade de São Paulo',
      contributions: 127,
      rating: 4.9,
      specialties: ['Espectroscopia', 'Análise Atmosférica'],
      joinDate: '2021-03-15',
      avatar: 'MS',
    },
    {
      id: '2',
      name: 'Prof. João Santos',
      role: 'Astrobiólogo',
      institution: 'Instituto Nacional de Pesquisas Espaciais',
      contributions: 89,
      rating: 4.8,
      specialties: ['Habitabilidade', 'Modelagem Climática'],
      joinDate: '2020-11-22',
      avatar: 'JS',
    },
    {
      id: '3',
      name: 'Dr. Robert Chen',
      role: 'Cientista de Dados',
      institution: 'MIT',
      contributions: 156,
      rating: 4.9,
      specialties: ['Machine Learning', 'Análise de Dados'],
      joinDate: '2019-08-10',
      avatar: 'RC',
    },
    {
      id: '4',
      name: 'Dra. Elena Rodriguez',
      role: 'Modelagem Computacional',
      institution: 'Universidade de Barcelona',
      contributions: 98,
      rating: 4.7,
      specialties: ['Simulação', 'Dinâmica Orbital'],
      joinDate: '2022-01-18',
      avatar: 'ER',
    },
  ];

  const projects = [
    {
      id: '1',
      title: 'Catálogo Unificado de Atmosferas',
      description: 'Criação de um banco de dados centralizado de composições atmosféricas',
      status: 'Em andamento',
      progress: 65,
      team: 'Atmosferas Exoplanetárias',
      participants: 23,
      deadline: '2024-12-15',
      priority: 'Alta',
    },
    {
      id: '2',
      title: 'Algoritmo de Detecção Automatizada',
      description: 'IA para identificação automática de candidatos a exoplanetas',
      status: 'Em andamento',
      progress: 82,
      team: 'Detecção de Trânsitos',
      participants: 15,
      deadline: '2024-11-30',
      priority: 'Crítica',
    },
    {
      id: '3',
      title: 'Índice de Habitabilidade Global',
      description: 'Desenvolvimento de métrica unificada para avaliar habitabilidade',
      status: 'Planejamento',
      progress: 25,
      team: 'Habitabilidade Planetária',
      participants: 18,
      deadline: '2025-06-20',
      priority: 'Média',
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'Descobridor Pioneer',
      description: 'Primeira contribuição para descoberta de exoplaneta',
      icon: Star,
      recipients: 234,
      rarity: 'Comum',
    },
    {
      id: '2',
      title: 'Colaborador Expert',
      description: '100+ contribuições verificadas',
      icon: Trophy,
      recipients: 67,
      rarity: 'Raro',
    },
    {
      id: '3',
      title: 'Líder de Equipe',
      description: 'Liderou projeto colaborativo com 20+ membros',
      icon: Users,
      recipients: 23,
      rarity: 'Épico',
    },
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContributors = contributors.filter(contributor =>
    contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contributor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>Colaboração Científica</h1>
          <p className="text-muted-foreground">
            Conecte-se com pesquisadores e participe de projetos colaborativos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-medium">2,847</p>
                <p className="text-sm text-muted-foreground">Colaboradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GitBranch className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-medium">156</p>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-medium">89</p>
                <p className="text-sm text-muted-foreground">Descobertas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-medium">12.3K</p>
                <p className="text-sm text-muted-foreground">Contribuições</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar equipes, colaboradores ou projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Criar Projeto
        </Button>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="teams">Equipes</TabsTrigger>
          <TabsTrigger value="contributors">Colaboradores</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant={team.status === 'Ativa' ? 'default' : 'secondary'}>
                      {team.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Líder:</span>
                      <span>{team.leader}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Membros:</span>
                      <span>{team.members}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projetos:</span>
                      <span>{team.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Localização:</span>
                      <span>{team.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {team.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Solicitar Participação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contributors" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContributors.map((contributor) => (
              <Card key={contributor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg">{contributor.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg mb-1">{contributor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{contributor.role}</p>
                      <p className="text-xs text-muted-foreground mb-3">{contributor.institution}</p>
                      
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{contributor.rating}</span>
                        </div>
                        <div>
                          {contributor.contributions} contribuições
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contributor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Conectar</Button>
                        <Button size="sm" variant="outline">Mensagem</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-lg">{project.title}</h3>
                        <Badge variant={
                          project.priority === 'Crítica' ? 'destructive' :
                          project.priority === 'Alta' ? 'default' : 'secondary'
                        }>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Equipe: {project.team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{project.participants} participantes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-48 space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <Button className="w-full" size="sm">
                        Participar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${
                        achievement.rarity === 'Épico' ? 'bg-purple-100 text-purple-600' :
                        achievement.rarity === 'Raro' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="font-medium text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    <div className="flex justify-center gap-2">
                      <Badge variant={
                        achievement.rarity === 'Épico' ? 'default' :
                        achievement.rarity === 'Raro' ? 'secondary' : 'outline'
                      }>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline">
                        {achievement.recipients} conquistaram
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}