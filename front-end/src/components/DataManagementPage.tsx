import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, Download, Upload, Database, FileText, 
  CheckCircle, AlertTriangle, RefreshCw, Filter,
  BarChart3, FileCheck, Globe, Calendar
} from 'lucide-react';
import { useState } from 'react';

interface DataManagementPageProps {
  onBack: () => void;
}

export function DataManagementPage({ onBack }: DataManagementPageProps) {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [correctionData, setCorrectionData] = useState({
    planetName: '',
    field: '',
    currentValue: '',
    newValue: '',
    source: '',
    description: '',
  });

  const dataStats = {
    totalExoplanets: 6847,
    verifiedPlanets: 6234,
    pendingVerification: 613,
    lastUpdate: '2024-12-15',
    dataSources: 15,
    contributors: 2847,
  };

  const dataSources = [
    {
      id: '1',
      name: 'NASA Exoplanet Archive',
      url: 'https://exoplanetarchive.ipac.caltech.edu',
      type: 'Oficial',
      lastSync: '2024-12-15 14:30',
      status: 'Ativo',
      entries: 5234,
    },
    {
      id: '2',
      name: 'Exoplanet.eu Database',
      url: 'http://exoplanet.eu',
      type: 'Oficial',
      lastSync: '2024-12-15 12:15',
      status: 'Ativo',
      entries: 4876,
    },
    {
      id: '3',
      name: 'Open Exoplanet Catalogue',
      url: 'https://openexoplanetcatalogue.com',
      type: 'Comunidade',
      lastSync: '2024-12-14 18:45',
      status: 'Sincronizando',
      entries: 3456,
    },
    {
      id: '4',
      name: 'Contribuições da Comunidade',
      url: 'Internal',
      type: 'Comunidade',
      lastSync: '2024-12-15 16:00',
      status: 'Ativo',
      entries: 789,
    },
  ];

  const pendingCorrections = [
    {
      id: '1',
      planet: 'Kepler-452b',
      field: 'Temperatura',
      current: '265 K',
      proposed: '268 K',
      contributor: 'Dr. Maria Silva',
      source: 'Nature Astronomy 2024',
      status: 'Pendente',
      votes: { approve: 12, reject: 2 },
    },
    {
      id: '2',
      planet: 'TRAPPIST-1e',
      field: 'Massa',
      current: '0.77 M⊕',
      proposed: '0.81 M⊕',
      contributor: 'Prof. João Santos',
      source: 'Astrophysical Journal 2024',
      status: 'Em revisão',
      votes: { approve: 8, reject: 1 },
    },
    {
      id: '3',
      planet: 'Proxima Centauri b',
      field: 'Raio',
      current: '1.1 R⊕',
      proposed: '1.07 R⊕',
      contributor: 'Dr. Chen Wang',
      source: 'Science 2024',
      status: 'Aprovada',
      votes: { approve: 15, reject: 0 },
    },
  ];

  const exportFormats = [
    { value: 'json', label: 'JSON', description: 'Formato estruturado para APIs' },
    { value: 'csv', label: 'CSV', description: 'Planilha compatível com Excel' },
    { value: 'xml', label: 'XML', description: 'Formato estruturado padrão' },
    { value: 'fits', label: 'FITS', description: 'Formato astronômico padrão' },
  ];

  const handleExport = () => {
    // Simular download
    console.log(`Exportando dados em formato ${selectedFormat}`);
    alert(`Iniciando download dos dados em formato ${selectedFormat.toUpperCase()}`);
  };

  const handleSubmitCorrection = () => {
    console.log('Submetendo correção:', correctionData);
    alert('Correção submetida para revisão pela comunidade!');
    setCorrectionData({
      planetName: '',
      field: '',
      currentValue: '',
      newValue: '',
      source: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>Gerenciamento de Dados</h1>
          <p className="text-muted-foreground">
            Exporte, importe e contribua com correções de dados científicos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-medium">{dataStats.totalExoplanets.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total de Exoplanetas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-medium">{dataStats.verifiedPlanets.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Dados Verificados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-medium">{dataStats.pendingVerification}</p>
                <p className="text-sm text-muted-foreground">Aguardando Verificação</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="export">Exportar</TabsTrigger>
          <TabsTrigger value="import">Importar</TabsTrigger>
          <TabsTrigger value="corrections">Correções</TabsTrigger>
          <TabsTrigger value="sources">Fontes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato de Exportação</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exportFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <div className="flex flex-col">
                            <span>{format.label}</span>
                            <span className="text-xs text-muted-foreground">{format.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtros de Dados</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Ano de Descoberta</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os anos</SelectItem>
                          <SelectItem value="2020+">2020 ou posterior</SelectItem>
                          <SelectItem value="2010-2020">2010-2020</SelectItem>
                          <SelectItem value="2010-">Antes de 2010</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Zona Habitável</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="habitable">Apenas habitáveis</SelectItem>
                          <SelectItem value="non-habitable">Não habitáveis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Os dados exportados incluem metadados sobre fontes e última atualização para garantir rastreabilidade científica.
                  </AlertDescription>
                </Alert>
                
                <Button onClick={handleExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar {dataStats.totalExoplanets.toLocaleString()} Registros
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Dados Verificados</span>
                    <span className="font-medium">{((dataStats.verifiedPlanets / dataStats.totalExoplanets) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(dataStats.verifiedPlanets / dataStats.totalExoplanets) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Última Atualização</p>
                    <p className="font-medium">{dataStats.lastUpdate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fontes Ativas</p>
                    <p className="font-medium">{dataStats.dataSources}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Contribuidores</p>
                    <p className="font-medium">{dataStats.contributors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Métodos de Detecção</p>
                    <p className="font-medium">12 tipos</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Distribuição por Método</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trânsito</span>
                      <span>67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Velocidade Radial</span>
                      <span>23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outros</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Importar Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Importações de dados passam por revisão da comunidade científica antes da publicação. Certifique-se de incluir fontes confiáveis.
                </AlertDescription>
              </Alert>
              
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Arraste arquivos ou clique para selecionar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Formatos suportados: JSON, CSV, XML, FITS (máximo 50MB)
                </p>
                <Button variant="outline">
                  Selecionar Arquivo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fonte dos Dados</label>
                  <Input placeholder="Ex: Kepler Mission Data Release 25" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL de Referência</label>
                  <Input placeholder="https://..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição dos Dados</label>
                <Textarea 
                  placeholder="Descreva o conteúdo, metodologia e quaisquer considerações especiais sobre os dados..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button className="w-full" disabled>
                <Upload className="h-4 w-4 mr-2" />
                Submeter para Revisão
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="corrections" className="mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  Propor Correção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Exoplaneta</label>
                    <Input 
                      placeholder="Ex: Kepler-452b"
                      value={correctionData.planetName}
                      onChange={(e) => setCorrectionData({...correctionData, planetName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Campo a Corrigir</label>
                    <Select 
                      value={correctionData.field}
                      onValueChange={(value) => setCorrectionData({...correctionData, field: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mass">Massa</SelectItem>
                        <SelectItem value="radius">Raio</SelectItem>
                        <SelectItem value="temperature">Temperatura</SelectItem>
                        <SelectItem value="distance">Distância</SelectItem>
                        <SelectItem value="orbital-period">Período Orbital</SelectItem>
                        <SelectItem value="discovery-year">Ano de Descoberta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valor Atual</label>
                    <Input 
                      placeholder="Ex: 5.0 M⊕"
                      value={correctionData.currentValue}
                      onChange={(e) => setCorrectionData({...correctionData, currentValue: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Novo Valor</label>
                    <Input 
                      placeholder="Ex: 5.2 M⊕"
                      value={correctionData.newValue}
                      onChange={(e) => setCorrectionData({...correctionData, newValue: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fonte da Correção</label>
                  <Input 
                    placeholder="Ex: Nature Astronomy, Vol. 8, 2024"
                    value={correctionData.source}
                    onChange={(e) => setCorrectionData({...correctionData, source: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Justificativa</label>
                  <Textarea 
                    placeholder="Explique a razão da correção e forneça contexto científico..."
                    value={correctionData.description}
                    onChange={(e) => setCorrectionData({...correctionData, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button onClick={handleSubmitCorrection} className="w-full">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Submeter Correção
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Correções Pendentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingCorrections.map((correction) => (
                  <div key={correction.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{correction.planet}</h4>
                        <p className="text-sm text-muted-foreground">
                          {correction.field}: {correction.current} → {correction.proposed}
                        </p>
                      </div>
                      <Badge variant={
                        correction.status === 'Aprovada' ? 'default' :
                        correction.status === 'Em revisão' ? 'secondary' : 'outline'
                      }>
                        {correction.status}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Por: {correction.contributor}</p>
                      <p>Fonte: {correction.source}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-4">
                        <span className="text-green-600">
                          ✓ {correction.votes.approve} aprovar
                        </span>
                        <span className="text-red-600">
                          ✗ {correction.votes.reject} rejeitar
                        </span>
                      </div>
                      {correction.status === 'Pendente' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-7">
                            Aprovar
                          </Button>
                          <Button size="sm" variant="outline" className="h-7">
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Fontes de Dados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{source.name}</h4>
                        <Badge variant={source.type === 'Oficial' ? 'default' : 'secondary'}>
                          {source.type}
                        </Badge>
                        <Badge variant={
                          source.status === 'Ativo' ? 'default' :
                          source.status === 'Sincronizando' ? 'secondary' : 'outline'
                        }>
                          {source.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>URL: </span>
                          <span className="truncate">{source.url}</span>
                        </div>
                        <div>
                          <span>Última Sincronização: </span>
                          <span>{source.lastSync}</span>
                        </div>
                        <div>
                          <span>Entradas: </span>
                          <span>{source.entries.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sincronizar
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}