import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Filter, TrendingUp } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    detectionMethod: string;
    habitableZone: boolean;
    discoveryYear: number[];
  };
  onFiltersChange: (filters: any) => void;
  stats: {
    total: number;
    habitableZone: number;
    recentDiscoveries: number;
  };
}

export function FilterPanel({ filters, onFiltersChange, stats }: FilterPanelProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-2 block">Método de Detecção</Label>
            <Select
              value={filters.detectionMethod}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, detectionMethod: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os métodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os métodos</SelectItem>
                <SelectItem value="transit">Trânsito</SelectItem>
                <SelectItem value="radial-velocity">Velocidade Radial</SelectItem>
                <SelectItem value="direct-imaging">Imagem Direta</SelectItem>
                <SelectItem value="microlensing">Microlente Gravitacional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="habitable-zone" className="text-sm">
              Apenas Zona Habitável
            </Label>
            <Switch
              id="habitable-zone"
              checked={filters.habitableZone}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, habitableZone: checked })
              }
            />
          </div>
          
          <div>
            <Label className="text-sm mb-3 block">
              Ano de Descoberta: {filters.discoveryYear[0]} - {filters.discoveryYear[1]}
            </Label>
            <Slider
              value={filters.discoveryYear}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, discoveryYear: value })
              }
              min={1995}
              max={2024}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total de Exoplanetas</span>
            <Badge variant="secondary">{stats.total}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Zona Habitável</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {stats.habitableZone}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Descobertas Recentes</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {stats.recentDiscoveries}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}