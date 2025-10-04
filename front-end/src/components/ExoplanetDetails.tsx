import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Download, Star, Globe, Thermometer, Ruler, Calendar, MapPin } from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';

interface ExoplanetDetailsProps {
  exoplanet: Exoplanet;
  onBack: () => void;
}

export function ExoplanetDetails({ exoplanet, onBack }: ExoplanetDetailsProps) {
  const handleExport = () => {
    const dataStr = JSON.stringify(exoplanet, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exoplanet.name.replace(/\s+/g, '_')}_complete_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTessDispositionLabel = (disp: string) => {
    const labels = {
      'PC': 'Planetary Candidate',
      'CP': 'Confirmed Planet',
      'FP': 'False Positive',
      'FA': 'False Alarm',
      'APC': 'Ambiguous Planetary Candidate',
      'KP': 'Known Planet'
    };
    return labels[disp as keyof typeof labels] || disp;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">{exoplanet.name}</h1>
        <Button onClick={handleExport} size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Image and Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback
                src={exoplanet.image}
                alt={exoplanet.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4">
                {exoplanet.habitableZone && (
                  <Badge variant="secondary" className="bg-green-500/90 text-white">
                    Zona Habitável
                  </Badge>
                )}
                {exoplanet.tessData?.toi && (
                  <Badge variant="outline" className="bg-blue-500/90 text-white ml-2">
                    TOI-{exoplanet.tessData.toi}
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{exoplanet.name}</h2>
              <p className="text-muted-foreground mb-4">{exoplanet.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Estrela:</span>
                  <span className="text-sm">{exoplanet.hostStar}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Descoberto:</span>
                  <span className="text-sm">{exoplanet.discoveryYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Raio:</span>
                  <span className="text-sm">{exoplanet.radius}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Temperatura:</span>
                  <span className="text-sm">{exoplanet.temperature}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TESS Data */}
          {exoplanet.tessData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Dados TESS (TESS Objects of Interest)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* TESS Identification */}
                <div>
                  <h3 className="font-semibold mb-3">Identificação TESS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">TOI:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.toi || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">TIC ID:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.tid || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CTOI Alias:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.ctoi_alias || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Candidatos Planetários:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_pnum || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Disposição TFOPWG:</span>
                        <Badge variant="outline" className="text-xs">
                          {exoplanet.tessData.tfopwg_disp ? getTessDispositionLabel(exoplanet.tessData.tfopwg_disp) : 'N/A'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Position Data */}
                <div>
                  <h3 className="font-semibold mb-3">Posição</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">RA [graus]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.ra || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dec [graus]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.dec || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">PMRA [mas/ano]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_pmra || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">PMDec [mas/ano]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_pmdec || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Planet Properties */}
                <div>
                  <h3 className="font-semibold mb-3">Propriedades do Planeta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ponto Médio do Trânsito [BJD]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_tranmid || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Período Orbital [dias]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_orbper || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Duração do Trânsito [horas]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_trandurh || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Profundidade do Trânsito [ppm]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_trandep || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Raio do Planeta [R⊕]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_rade || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Insolação [Fluxo Terrestre]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_insol || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stellar Properties */}
                <div>
                  <h3 className="font-semibold mb-3">Propriedades Estelares</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Magnitude TESS:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_tmag || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Distância [pc]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_dist || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Temperatura Efetiva [K]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_teff || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">log(g) [cm/s²]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_logg || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Raio Estelar [R☉]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.st_rad || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Temperatura de Equilíbrio [K]:</span>
                        <span className="text-sm font-medium">{exoplanet.tessData.pl_eqt || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Massa:</span>
                  <span className="text-sm font-medium">{exoplanet.mass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Distância:</span>
                  <span className="text-sm font-medium">{exoplanet.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Método de Detecção:</span>
                  <Badge variant="outline" className="text-xs">
                    {exoplanet.detectionMethod === 'transit' ? 'Trânsito' : 'Velocidade Radial'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Curtidas:</span>
                <span className="text-sm font-medium">{exoplanet.likes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Comentários:</span>
                <span className="text-sm font-medium">{exoplanet.comments}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}