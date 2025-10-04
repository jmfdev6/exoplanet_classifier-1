import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download, FileText, Table, ArrowLeft } from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';

interface ExportDataPageProps {
  exoplanets: Exoplanet[];
  onBack: () => void;
}

export function ExportDataPage({ exoplanets, onBack }: ExportDataPageProps) {
  const [selectedFormat, setSelectedFormat] = useState('json');

  const handleExport = () => {
    if (selectedFormat === 'json') {
      const dataStr = JSON.stringify(exoplanets, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `exoplanets-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (selectedFormat === 'csv') {
      const headers = ['Nome', 'Estrela Hospedeira', 'Ano Descoberta', 'Massa', 'Raio', 'Temperatura', 'Distância', 'Zona Habitável', 'Método Detecção'];
      const csvContent = [
        headers.join(','),
        ...exoplanets.map(planet => [
          `"${planet.name}"`,
          `"${planet.hostStar}"`,
          planet.discoveryYear,
          `"${planet.mass}"`,
          `"${planet.radius}"`,
          `"${planet.temperature}"`,
          `"${planet.distance}"`,
          planet.habitableZone ? 'Sim' : 'Não',
          `"${planet.detectionMethod}"`
        ].join(','))
      ].join('\n');
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `exoplanets-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Exportar Dados</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Exoplanetas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Formato de Exportação</label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    JSON
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    CSV
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Informações do Export</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Total de exoplanetas: <span className="font-medium">{exoplanets.length}</span></p>
              <p>• Formato selecionado: <span className="font-medium">{selectedFormat.toUpperCase()}</span></p>
              <p>• Data de exportação: <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span></p>
            </div>
          </div>

          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
