import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, 
  Thermometer, Ruler, Weight, Clock, MapPin, Telescope,
  Users, Send, MoreHorizontal
} from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';
import { useState } from 'react';

interface ExoplanetDetailsProps {
  exoplanet: Exoplanet;
  onBack: () => void;
}

export function ExoplanetDetails({ exoplanet, onBack }: ExoplanetDetailsProps) {
  const [newComment, setNewComment] = useState('');
  const [comments] = useState([
    {
      id: '1',
      author: 'Dr. Ana Silva',
      content: 'Fascinante! As últimas observações do James Webb mostram características atmosféricas muito interessantes.',
      timeAgo: '2h',
      likes: 12,
      isLiked: false,
    },
    {
      id: '2',
      author: 'Prof. Carlos Santos',
      content: 'Este exoplaneta é um excelente candidato para estudos de habitabilidade. Alguém tem dados sobre a composição atmosférica?',
      timeAgo: '5h',
      likes: 8,
      isLiked: true,
    },
    {
      id: '3',
      author: 'Maria Costa',
      content: 'Participei da equipe que descobriu este planeta. Posso compartilhar alguns insights sobre o processo de descoberta.',
      timeAgo: '1d',
      likes: 24,
      isLiked: false,
    },
  ]);

  const specifications = [
    { label: 'Massa', value: exoplanet.mass, icon: Weight },
    { label: 'Raio', value: exoplanet.radius, icon: Ruler },
    { label: 'Temperatura', value: exoplanet.temperature, icon: Thermometer },
    { label: 'Distância da Terra', value: exoplanet.distance, icon: MapPin },
    { label: 'Ano de Descoberta', value: exoplanet.discoveryYear.toString(), icon: Clock },
    { label: 'Método de Detecção', value: exoplanet.detectionMethod, icon: Telescope },
  ];

  const habitabilityFactors = [
    { name: 'Zona Habitável', score: exoplanet.habitableZone ? 95 : 20, color: exoplanet.habitableZone ? 'bg-green-500' : 'bg-red-500' },
    { name: 'Temperatura', score: 75, color: 'bg-yellow-500' },
    { name: 'Composição Atmosférica', score: 60, color: 'bg-blue-500' },
    { name: 'Tamanho Relativo', score: 85, color: 'bg-green-500' },
    { name: 'Estabilidade Orbital', score: 90, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>{exoplanet.name}</h1>
          <p className="text-muted-foreground">Sistema {exoplanet.hostStar}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={exoplanet.image}
                  alt={exoplanet.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  {exoplanet.habitableZone && (
                    <Badge className="bg-green-500/90 text-white">
                      Zona Habitável
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8">
                    <Heart className="h-3 w-3 mr-1" />
                    {exoplanet.likes}
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8">
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8">
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {exoplanet.description}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="habitability">Habitabilidade</TabsTrigger>
              <TabsTrigger value="research">Pesquisas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Técnicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => {
                      const Icon = spec.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">{spec.label}</p>
                            <p className="font-medium">{spec.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="habitability" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Habitabilidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {habitabilityFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{factor.name}</span>
                        <span className="text-sm text-muted-foreground">{factor.score}%</span>
                      </div>
                      <Progress value={factor.score} className="h-2" />
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">
                      <strong>Pontuação Geral de Habitabilidade: 81%</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Este exoplaneta apresenta condições promissoras para a existência de água líquida e potencial habitabilidade.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="research" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquisas Relacionadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Análise Espectroscópica da Atmosfera</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Estudo detalhado da composição atmosférica usando dados do Telescópio James Webb.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Publicado</Badge>
                      <Badge variant="outline">Nature Astronomy</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Modelagem Climática Avançada</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Simulações computacionais do clima planetário e padrões meteorológicos.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Em andamento</Badge>
                      <Badge variant="outline">MIT</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Discussões ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Compartilhe suas observações ou faça uma pergunta..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button size="sm" className="w-full">
                  <Send className="h-3 w-3 mr-2" />
                  Publicar Comentário
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.timeAgo}</p>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current text-red-500' : ''}`} />
                            <span className="text-xs">{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            <span className="text-xs">Responder</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {comment.id !== comments[comments.length - 1].id && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pesquisadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Dr. Maria Silva</p>
                  <p className="text-xs text-muted-foreground">Descobridora Principal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Prof. Carlos Santos</p>
                  <p className="text-xs text-muted-foreground">Especialista em Atmosferas</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Ver Toda a Equipe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}