import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, MessageCircle, ExternalLink, Thermometer, Ruler, Download } from 'lucide-react';

export interface TessData {
  toi?: string;
  tid?: string;
  ctoi_alias?: string;
  pl_pnum?: number;
  tfopwg_disp?: string;
  ra?: string;
  dec?: string;
  st_pmra?: string;
  st_pmdec?: string;
  pl_tranmid?: string;
  pl_orbper?: string;
  pl_trandurh?: string;
  pl_trandep?: string;
  pl_rade?: string;
  pl_insol?: string;
  pl_eqt?: string;
  st_tmag?: string;
  st_dist?: string;
  st_teff?: string;
  st_logg?: string;
  st_rad?: string;
}

export interface Exoplanet {
  id: string;
  name: string;
  hostStar: string;
  discoveryYear: number;
  mass: string;
  radius: string;
  temperature: string;
  distance: string;
  habitableZone: boolean;
  detectionMethod: string;
  image: string;
  description: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tessData?: TessData;
}

interface ExoplanetCardProps {
  exoplanet: Exoplanet;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onViewDetails: (id: string) => void;
  onExport?: (exoplanet: Exoplanet) => void;
}

export function ExoplanetCard({ exoplanet, onLike, onComment, onViewDetails, onExport }: ExoplanetCardProps) {
  const handleExport = () => {
    if (onExport) {
      onExport(exoplanet);
    } else {
      // Fallback: export individual exoplanet
      const dataStr = JSON.stringify(exoplanet, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${exoplanet.name.replace(/\s+/g, '_')}_data.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={exoplanet.image}
          alt={exoplanet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          {exoplanet.habitableZone && (
            <Badge variant="secondary" className="bg-green-500/90 text-white text-xs">
              Zona Habitável
            </Badge>
          )}
          {exoplanet.tessData?.toi && (
            <Badge variant="outline" className="bg-blue-500/90 text-white text-xs ml-1">
              TOI-{exoplanet.tessData.toi}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <Badge variant="outline" className="bg-background/90 text-xs">
            {exoplanet.detectionMethod === 'transit' ? 'Trânsito' : 'Velocidade Radial'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium mb-1 text-sm sm:text-base line-clamp-1">{exoplanet.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
              Sistema: {exoplanet.hostStar}
            </p>
          </div>
          <Badge variant="outline" className="flex-shrink-0 text-xs">
            {exoplanet.discoveryYear}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {exoplanet.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Ruler className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Raio:</span>
            <span className="truncate">{exoplanet.radius}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Thermometer className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Temp:</span>
            <span className="truncate">{exoplanet.temperature}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(exoplanet.id)}
              className={`p-1 h-7 sm:h-auto ${exoplanet.isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${exoplanet.isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{exoplanet.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(exoplanet.id)}
              className="p-1 h-7 sm:h-auto"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs">{exoplanet.comments}</span>
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              onClick={() => onViewDetails(exoplanet.id)}
              className="h-7 sm:h-8 text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Detalhes</span>
              <span className="sm:hidden">Ver</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              className="h-7 sm:h-8 text-xs"
              title="Exportar dados"
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}