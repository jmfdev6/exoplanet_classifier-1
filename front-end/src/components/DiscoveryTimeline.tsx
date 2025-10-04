import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, Calendar, Telescope, MapPin, TrendingUp, 
  Filter, Star, Eye, Award, Zap
} from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';
import { useState } from 'react';

interface DiscoveryTimelineProps {
  exoplanets: Exoplanet[];
  onBack: () => void;
}

export function DiscoveryTimeline({ exoplanets, onBack }: DiscoveryTimelineProps) {
  const [filterYear, setFilterYear] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  const discoveries = [
    {
      id: '1',
      date: '2024-03-15',
      title: 'Descoberta de TOI-715 b: Super-Terra na zona habitável',
      description: 'Nova super-Terra descoberta pelo TESS apresenta características promissoras para habitabilidade.',
      method: 'Trânsito',
      importance: 'high',
      team: 'NASA TESS',
      image: 'https://images.unsplash.com/photo-1754851361624-fb8351390ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuZXQlMjBzdXJmYWNlJTIwc3BhY2V8ZW58MXx8fHwxNzU5NTc3Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Localizada a 137 anos-luz, esta super-Terra orbita uma estrela anã vermelha a cada 19 dias.',
    },
    {
      id: '2',
      date: '2024-01-22',
      title: 'Confirmação de atmosfera rica em vapor d\'água em K2-18 b',
      description: 'James Webb confirma presença significativa de vapor d\'água na atmosfera deste sub-Netuno.',
      method: 'Espectroscopia',
      importance: 'critical',
      team: 'James Webb Consortium',
      image: 'https://images.unsplash.com/photo-1745661554426-66afd48de282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGV4b3BsYW5ldHN8ZW58MXx8fHwxNzU5NTg5MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Observações espectroscópicas revelam composição atmosférica complexa com possíveis biossinaturas.',
    },
    {
      id: '3',
      date: '2023-11-08',
      title: 'Sistema TRAPPIST-1: Novos dados sobre habitabilidade',
      description: 'Estudos aprofundados revelam que TRAPPIST-1e e 1f podem ter oceanos estáveis.',
      method: 'Modelagem',
      importance: 'high',
      team: 'Universidade de Washington',
      image: 'https://images.unsplash.com/photo-1754851361624-fb8351390ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuZXQlMjBzdXJmYWNlJTIwc3BhY2V8ZW58MXx8fHwxNzU5NTc3Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Modelos climáticos avançados sugerem condições favoráveis para água líquida na superfície.',
    },
    {
      id: '4',
      date: '2023-08-14',
      title: 'Proxima Centauri c: Confirmação de segundo planeta',
      description: 'Confirmada a existência de um segundo planeta no sistema estelar mais próximo.',
      method: 'Velocidade Radial',
      importance: 'medium',
      team: 'ESO',
      image: 'https://images.unsplash.com/photo-1745661554426-66afd48de282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGV4b3BsYW5ldHN8ZW58MXx8fHwxNzU5NTg5MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Super-Terra fria orbitando além da zona habitável, importante para estudos comparativos.',
    },
    {
      id: '5',
      date: '2023-05-29',
      title: 'HD 110067: Sistema de seis sub-Netunos em ressonância',
      description: 'Descoberto raro sistema com seis planetas em perfeita ressonância orbital.',
      method: 'Trânsito',
      importance: 'high',
      team: 'TESS/CHEOPS',
      image: 'https://images.unsplash.com/photo-1754851361624-fb8351390ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuZXQlMjBzdXJmYWNlJTIwc3BhY2V8ZW58MXx8fHwxNzU5NTc3Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Sistema pristino que preserva características da formação planetária original.',
    },
    {
      id: '6',
      date: '2023-02-12',
      title: 'TOI-849 b: Núcleo exposto de gigante gasoso',
      description: 'Planeta único que pode ser o núcleo exposto de um antigo gigante gasoso.',
      method: 'Trânsito',
      importance: 'medium',
      team: 'Universidade de Warwick',
      image: 'https://images.unsplash.com/photo-1745661554426-66afd48de282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMGV4b3BsYW5ldHN8ZW58MXx8fHwxNzU5NTg5MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      details: 'Oferece insights únicos sobre a estrutura interna e evolução de planetas gigantes.',
    },
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];
  const methods = ['all', 'Trânsito', 'Velocidade Radial', 'Espectroscopia', 'Modelagem'];

  const filteredDiscoveries = discoveries.filter(discovery => {
    const yearMatch = filterYear === 'all' || discovery.date.startsWith(filterYear);
    const methodMatch = filterMethod === 'all' || discovery.method === filterMethod;
    return yearMatch && methodMatch;
  });

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <Award className="h-4 w-4 text-yellow-500" />;
      case 'high': return <Star className="h-4 w-4 text-blue-500" />;
      case 'medium': return <Eye className="h-4 w-4 text-green-500" />;
      default: return <Zap className="h-4 w-4 text-gray-500" />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'critical': return <Badge className="bg-yellow-500">Crítica</Badge>;
      case 'high': return <Badge className="bg-blue-500">Alta</Badge>;
      case 'medium': return <Badge variant="secondary">Média</Badge>;
      default: return <Badge variant="outline">Baixa</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>Timeline de Descobertas</h1>
          <p className="text-muted-foreground">
            Acompanhe as descobertas mais recentes e marcos importantes da astronomia
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros da Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Ano</label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === 'all' ? 'Todos os anos' : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Método</label>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method === 'all' ? 'Todos os métodos' : method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredDiscoveries.map((discovery, index) => (
          <div key={discovery.id} className="relative">
            {index < filteredDiscoveries.length - 1 && (
              <div className="absolute left-8 top-20 bottom-0 w-px bg-border" />
            )}
            
            <Card className="ml-16 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    {getImportanceIcon(discovery.importance)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium mb-1">{discovery.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(discovery.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Telescope className="h-3 w-3" />
                            {discovery.method}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {discovery.team}
                          </div>
                        </div>
                      </div>
                      {getImportanceBadge(discovery.importance)}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {discovery.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <p className="text-sm mb-3">{discovery.details}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{discovery.method}</Badge>
                          <Badge variant="outline">{discovery.team}</Badge>
                        </div>
                      </div>
                      
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={discovery.image}
                          alt={discovery.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredDiscoveries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">Nenhuma descoberta encontrada</h3>
            <p className="text-muted-foreground">
              Não há descobertas que correspondem aos filtros selecionados.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas da Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Total de Descobertas</h4>
              <p className="text-2xl font-medium text-primary mt-1">
                {filteredDiscoveries.length}
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Descobertas Críticas</h4>
              <p className="text-2xl font-medium text-yellow-500 mt-1">
                {filteredDiscoveries.filter(d => d.importance === 'critical').length}
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Método Mais Usado</h4>
              <p className="text-sm font-medium mt-1">
                Trânsito
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium">Ano Mais Produtivo</h4>
              <p className="text-sm font-medium mt-1">
                2024
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}