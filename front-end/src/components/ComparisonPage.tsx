import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, Plus, X, Scale, Thermometer, 
  Ruler, Weight, MapPin, Clock, Telescope
} from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';
import { useState } from 'react';

interface ComparisonPageProps {
  exoplanets: Exoplanet[];
  onBack: () => void;
}

export function ComparisonPage({ exoplanets, onBack }: ComparisonPageProps) {
  const [selectedPlanets, setSelectedPlanets] = useState<Exoplanet[]>([exoplanets[0], exoplanets[1]]);
  const [availablePlanets] = useState(exoplanets);

  const addPlanet = (planetId: string) => {
    const planet = availablePlanets.find(p => p.id === planetId);
    if (planet && selectedPlanets.length < 4 && !selectedPlanets.find(p => p.id === planetId)) {
      setSelectedPlanets([...selectedPlanets, planet]);
    }
  };

  const removePlanet = (planetId: string) => {
    if (selectedPlanets.length > 1) {
      setSelectedPlanets(selectedPlanets.filter(p => p.id !== planetId));
    }
  };

  const parseNumericValue = (value: string): number => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    return parseFloat(cleanValue) || 0;
  };

  const getComparisonMetrics = () => {
    return [
      {
        label: 'Massa',
        icon: Weight,
        getValue: (planet: Exoplanet) => planet.mass,
        getNumericValue: (planet: Exoplanet) => parseNumericValue(planet.mass),
        unit: 'M⊕/MJ',
      },
      {
        label: 'Raio',
        icon: Ruler,
        getValue: (planet: Exoplanet) => planet.radius,
        getNumericValue: (planet: Exoplanet) => parseNumericValue(planet.radius),
        unit: 'R⊕/RJ',
      },
      {
        label: 'Temperatura',
        icon: Thermometer,
        getValue: (planet: Exoplanet) => planet.temperature,
        getNumericValue: (planet: Exoplanet) => parseNumericValue(planet.temperature),
        unit: 'K',
      },
      {
        label: 'Distância',
        icon: MapPin,
        getValue: (planet: Exoplanet) => planet.distance,
        getNumericValue: (planet: Exoplanet) => parseNumericValue(planet.distance),
        unit: 'anos-luz',
      },
      {
        label: 'Descoberta',
        icon: Clock,
        getValue: (planet: Exoplanet) => planet.discoveryYear.toString(),
        getNumericValue: (planet: Exoplanet) => planet.discoveryYear,
        unit: 'ano',
      },
    ];
  };

  const getHabitabilityScore = (planet: Exoplanet): number => {
    let score = 0;
    
    // Zona habitável
    if (planet.habitableZone) score += 40;
    
    // Temperatura (ideal entre 200-300K)
    const temp = parseNumericValue(planet.temperature);
    if (temp >= 200 && temp <= 300) score += 30;
    else if (temp >= 150 && temp <= 400) score += 15;
    
    // Tamanho (ideal entre 0.5-2 Earth radii)
    const radius = parseNumericValue(planet.radius);
    if (radius >= 0.5 && radius <= 2) score += 20;
    else if (radius >= 0.3 && radius <= 3) score += 10;
    
    // Proximidade (quanto mais próximo, melhor para estudos)
    const distance = parseNumericValue(planet.distance);
    if (distance <= 50) score += 10;
    else if (distance <= 200) score += 5;
    
    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 h-auto">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1>Comparação de Exoplanetas</h1>
          <p className="text-muted-foreground">
            Compare características e propriedades de diferentes exoplanetas
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Seleção de Planetas ({selectedPlanets.length}/4)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedPlanets.map((planet) => (
              <Badge key={planet.id} variant="secondary" className="flex items-center gap-2">
                {planet.name}
                {selectedPlanets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removePlanet(planet.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
          
          {selectedPlanets.length < 4 && (
            <div className="flex items-center gap-2">
              <Select onValueChange={addPlanet}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Adicionar planeta para comparação" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlanets
                    .filter(planet => !selectedPlanets.find(p => p.id === planet.id))
                    .map((planet) => (
                      <SelectItem key={planet.id} value={planet.id}>
                        {planet.name} ({planet.hostStar})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visualização Comparativa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPlanets.map((planet) => (
                <div key={planet.id} className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border">
                    <ImageWithFallback
                      src={planet.image}
                      alt={planet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="text-xs">
                      {planet.name}
                    </Badge>
                  </div>
                  {planet.habitableZone && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-green-500/90 text-white text-xs">
                        Habitável
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pontuação de Habitabilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPlanets.map((planet) => {
              const score = getHabitabilityScore(planet);
              return (
                <div key={planet.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{planet.name}</span>
                    <Badge variant={score >= 70 ? 'default' : score >= 40 ? 'secondary' : 'outline'}>
                      {score}%
                    </Badge>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparação Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Propriedade</th>
                  {selectedPlanets.map((planet) => (
                    <th key={planet.id} className="text-center p-2 min-w-32">
                      {planet.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Sistema Estelar</td>
                  {selectedPlanets.map((planet) => (
                    <td key={planet.id} className="text-center p-2">
                      {planet.hostStar}
                    </td>
                  ))}
                </tr>
                
                {getComparisonMetrics().map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <tr key={metric.label} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{metric.label}</span>
                        </div>
                      </td>
                      {selectedPlanets.map((planet) => (
                        <td key={planet.id} className="text-center p-2">
                          {metric.getValue(planet)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                
                <tr className="border-b">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Telescope className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Método de Detecção</span>
                    </div>
                  </td>
                  {selectedPlanets.map((planet) => (
                    <td key={planet.id} className="text-center p-2">
                      <Badge variant="outline" className="text-xs">
                        {planet.detectionMethod}
                      </Badge>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="p-2 font-medium">Zona Habitável</td>
                  {selectedPlanets.map((planet) => (
                    <td key={planet.id} className="text-center p-2">
                      <Badge 
                        variant={planet.habitableZone ? 'default' : 'outline'}
                        className={planet.habitableZone ? 'bg-green-500' : ''}
                      >
                        {planet.habitableZone ? 'Sim' : 'Não'}
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Comparação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Maior Potencial Habitável</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPlanets.reduce((best, current) => 
                    getHabitabilityScore(current) > getHabitabilityScore(best) ? current : best
                  ).name} com {getHabitabilityScore(
                    selectedPlanets.reduce((best, current) => 
                      getHabitabilityScore(current) > getHabitabilityScore(best) ? current : best
                    )
                  )}% de pontuação
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Mais Próximo da Terra</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPlanets.reduce((closest, current) => 
                    parseNumericValue(current.distance) < parseNumericValue(closest.distance) ? current : closest
                  ).name} a {selectedPlanets.reduce((closest, current) => 
                    parseNumericValue(current.distance) < parseNumericValue(closest.distance) ? current : closest
                  ).distance}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Análise Geral</h4>
              <p className="text-sm text-muted-foreground">
                Dos {selectedPlanets.length} planetas comparados, {selectedPlanets.filter(p => p.habitableZone).length} 
                {selectedPlanets.filter(p => p.habitableZone).length === 1 ? ' está' : ' estão'} na zona habitável. 
                A temperatura média é de {Math.round(selectedPlanets.reduce((sum, p) => sum + parseNumericValue(p.temperature), 0) / selectedPlanets.length)}K.
                {selectedPlanets.filter(p => getHabitabilityScore(p) >= 70).length > 0 && 
                  ` ${selectedPlanets.filter(p => getHabitabilityScore(p) >= 70).length} planeta(s) apresenta(m) alta pontuação de habitabilidade.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}