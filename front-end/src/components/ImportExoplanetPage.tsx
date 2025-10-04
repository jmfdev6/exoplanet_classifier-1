import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Upload, ArrowLeft, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Exoplanet } from './ExoplanetCard';

interface ImportExoplanetPageProps {
  onBack: () => void;
  onImport: (exoplanets: Exoplanet[]) => void;
}

export function ImportExoplanetPage({ onBack, onImport }: ImportExoplanetPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importSource, setImportSource] = useState('');
  const [importDescription, setImportDescription] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const text = await selectedFile.text();
      let importedData: any[] = [];

      if (selectedFile.name.endsWith('.json')) {
        importedData = JSON.parse(text);
      } else if (selectedFile.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        importedData = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
          });
          return obj;
        }).filter(obj => obj.nome || obj.name);
      }

      // Converter para formato Exoplanet
      const exoplanets: Exoplanet[] = importedData.map((item, index) => ({
        id: `imported-${Date.now()}-${index}`,
        name: item.nome || item.name || `Exoplaneta ${index + 1}`,
        hostStar: item.estrelahospedeira || item.hoststar || 'Desconhecida',
        discoveryYear: parseInt(item.anodescoberta || item.discoveryyear || '2020'),
        mass: item.massa || item.mass || 'N/A',
        radius: item.raio || item.radius || 'N/A',
        temperature: item.temperatura || item.temperature || 'N/A',
        distance: item.distancia || item.distance || 'N/A',
        habitableZone: item.zonahabitavel === 'Sim' || item.habitablezone === 'true' || item.habitablezone === true,
        detectionMethod: item.metododeteccao || item.detectionmethod || 'transit',
        image: item.imagem || item.image || '',
        description: item.descricao || item.description || '',
        likes: 0,
        comments: 0,
        isLiked: false
      }));

      onImport(exoplanets);
      
      setImportResult({
        success: true,
        message: `Importação realizada com sucesso!`,
        count: exoplanets.length
      });

      // Reset form
      setSelectedFile(null);
      setImportSource('');
      setImportDescription('');
      
    } catch (error) {
      setImportResult({
        success: false,
        message: 'Erro ao processar o arquivo. Verifique o formato e tente novamente.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Importar Exoplanetas</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Arquivo de Dados</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  <FileText className="h-4 w-4 mr-2" />
                  Selecionar Arquivo
                </Button>
                {selectedFile && (
                  <div className="text-sm text-muted-foreground">
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Fonte dos Dados</Label>
              <Input
                id="source"
                value={importSource}
                onChange={(e) => setImportSource(e.target.value)}
                placeholder="Ex: NASA Exoplanet Archive, Kepler Mission"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Importação</Label>
              <Textarea
                id="description"
                value={importDescription}
                onChange={(e) => setImportDescription(e.target.value)}
                placeholder="Descreva a origem e características dos dados..."
                rows={3}
              />
            </div>
          </div>

          {importResult && (
            <Alert className={importResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {importResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={importResult.success ? "text-green-800" : "text-red-800"}>
                {importResult.message}
                {importResult.count && (
                  <div className="mt-1 text-sm">
                    {importResult.count} exoplanetas importados com sucesso.
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={handleImport} 
              disabled={isImporting || !selectedFile}
              className="flex-1"
            >
              {isImporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Dados
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onBack}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Formatos Suportados</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div>
            <strong>JSON:</strong> Arquivo com estrutura de objetos exoplaneta
          </div>
          <div>
            <strong>CSV:</strong> Arquivo com colunas: Nome, Estrela Hospedeira, Ano Descoberta, Massa, Raio, Temperatura, Distância, Zona Habitável, Método Detecção
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
