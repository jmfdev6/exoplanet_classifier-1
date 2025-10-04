import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Save, ArrowLeft, Plus, Download } from 'lucide-react';
import { Exoplanet } from './ExoplanetCard';

interface CreateExoplanetPageProps {
  onBack: () => void;
  onSave: (exoplanet: Exoplanet) => void;
}

export function CreateExoplanetPage({ onBack, onSave }: CreateExoplanetPageProps) {
  const [formData, setFormData] = useState({
    // TESS Identification
    toi: '',
    tid: '',
    ctoi_alias: '',
    pl_pnum: 1,
    tfopwg_disp: 'PC',
    
    // Position
    ra: '',
    dec: '',
    st_pmra: '',
    st_pmdec: '',
    
    // Planet Properties
    pl_tranmid: '',
    pl_orbper: '',
    pl_trandurh: '',
    pl_trandep: '',
    pl_rade: '',
    pl_insol: '',
    pl_eqt: '',
    
    // Stellar Properties
    st_tmag: '',
    st_dist: '',
    st_teff: '',
    st_logg: '',
    st_rad: '',
    
    // Additional fields for display
    name: '',
    hostStar: '',
    discoveryYear: new Date().getFullYear(),
    mass: '',
    radius: '',
    temperature: '',
    distance: '',
    habitableZone: false,
    detectionMethod: 'transit',
    image: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExoplanet: Exoplanet = {
      id: Date.now().toString(),
      name: formData.name || `TOI-${formData.toi}`,
      hostStar: formData.hostStar || `TIC-${formData.tid}`,
      discoveryYear: formData.discoveryYear,
      mass: formData.mass || `${formData.pl_rade || 'N/A'} M⊕`,
      radius: formData.radius || `${formData.pl_rade || 'N/A'} R⊕`,
      temperature: formData.temperature || `${formData.pl_eqt || 'N/A'} K`,
      distance: formData.distance || `${formData.st_dist || 'N/A'} pc`,
      habitableZone: formData.habitableZone,
      detectionMethod: formData.detectionMethod,
      image: formData.image,
      description: formData.description || `Exoplaneta TOI-${formData.toi} descoberto pela missão TESS.`,
      likes: 0,
      comments: 0,
      isLiked: false,
      // Additional TESS data
      tessData: {
        toi: formData.toi,
        tid: formData.tid,
        ctoi_alias: formData.ctoi_alias,
        pl_pnum: formData.pl_pnum,
        tfopwg_disp: formData.tfopwg_disp,
        ra: formData.ra,
        dec: formData.dec,
        st_pmra: formData.st_pmra,
        st_pmdec: formData.st_pmdec,
        pl_tranmid: formData.pl_tranmid,
        pl_orbper: formData.pl_orbper,
        pl_trandurh: formData.pl_trandurh,
        pl_trandep: formData.pl_trandep,
        pl_rade: formData.pl_rade,
        pl_insol: formData.pl_insol,
        pl_eqt: formData.pl_eqt,
        st_tmag: formData.st_tmag,
        st_dist: formData.st_dist,
        st_teff: formData.st_teff,
        st_logg: formData.st_logg,
        st_rad: formData.st_rad
      }
    };
    
    onSave(newExoplanet);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Criar Exoplaneta TESS</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TESS Identification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Identificação TESS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="toi">TOI (TESS Object of Interest)</Label>
                <Input
                  id="toi"
                  value={formData.toi}
                  onChange={(e) => handleInputChange('toi', e.target.value)}
                  placeholder="Ex: 1234.01"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tid">TIC ID (TESS Input Catalog)</Label>
                <Input
                  id="tid"
                  value={formData.tid}
                  onChange={(e) => handleInputChange('tid', e.target.value)}
                  placeholder="Ex: 123456789"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctoi_alias">CTOI Alias</Label>
                <Input
                  id="ctoi_alias"
                  value={formData.ctoi_alias}
                  onChange={(e) => handleInputChange('ctoi_alias', e.target.value)}
                  placeholder="Ex: 123456789.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pl_pnum">Número de Candidatos Planetários</Label>
                <Input
                  id="pl_pnum"
                  type="number"
                  value={formData.pl_pnum}
                  onChange={(e) => handleInputChange('pl_pnum', parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tfopwg_disp">Disposição TFOPWG</Label>
              <Select value={formData.tfopwg_disp} onValueChange={(value) => handleInputChange('tfopwg_disp', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC">PC - Planetary Candidate</SelectItem>
                  <SelectItem value="CP">CP - Confirmed Planet</SelectItem>
                  <SelectItem value="FP">FP - False Positive</SelectItem>
                  <SelectItem value="FA">FA - False Alarm</SelectItem>
                  <SelectItem value="APC">APC - Ambiguous Planetary Candidate</SelectItem>
                  <SelectItem value="KP">KP - Known Planet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Position */}
        <Card>
          <CardHeader>
            <CardTitle>Posição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ra">RA [graus]</Label>
                <Input
                  id="ra"
                  value={formData.ra}
                  onChange={(e) => handleInputChange('ra', e.target.value)}
                  placeholder="Ex: 123.456"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dec">Dec [graus]</Label>
                <Input
                  id="dec"
                  value={formData.dec}
                  onChange={(e) => handleInputChange('dec', e.target.value)}
                  placeholder="Ex: -45.678"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="st_pmra">PMRA [mas/ano]</Label>
                <Input
                  id="st_pmra"
                  value={formData.st_pmra}
                  onChange={(e) => handleInputChange('st_pmra', e.target.value)}
                  placeholder="Ex: 12.34"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="st_pmdec">PMDec [mas/ano]</Label>
                <Input
                  id="st_pmdec"
                  value={formData.st_pmdec}
                  onChange={(e) => handleInputChange('st_pmdec', e.target.value)}
                  placeholder="Ex: -5.67"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planet Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Propriedades do Planeta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pl_tranmid">Ponto Médio do Trânsito [BJD]</Label>
                <Input
                  id="pl_tranmid"
                  value={formData.pl_tranmid}
                  onChange={(e) => handleInputChange('pl_tranmid', e.target.value)}
                  placeholder="Ex: 2458325.1234"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pl_orbper">Período Orbital [dias]</Label>
                <Input
                  id="pl_orbper"
                  value={formData.pl_orbper}
                  onChange={(e) => handleInputChange('pl_orbper', e.target.value)}
                  placeholder="Ex: 3.456"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pl_trandurh">Duração do Trânsito [horas]</Label>
                <Input
                  id="pl_trandurh"
                  value={formData.pl_trandurh}
                  onChange={(e) => handleInputChange('pl_trandurh', e.target.value)}
                  placeholder="Ex: 2.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pl_trandep">Profundidade do Trânsito [ppm]</Label>
                <Input
                  id="pl_trandep"
                  value={formData.pl_trandep}
                  onChange={(e) => handleInputChange('pl_trandep', e.target.value)}
                  placeholder="Ex: 1500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pl_rade">Raio do Planeta [R⊕]</Label>
                <Input
                  id="pl_rade"
                  value={formData.pl_rade}
                  onChange={(e) => handleInputChange('pl_rade', e.target.value)}
                  placeholder="Ex: 1.2"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pl_insol">Insolação [Fluxo Terrestre]</Label>
                <Input
                  id="pl_insol"
                  value={formData.pl_insol}
                  onChange={(e) => handleInputChange('pl_insol', e.target.value)}
                  placeholder="Ex: 1.1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pl_eqt">Temperatura de Equilíbrio [K]</Label>
                <Input
                  id="pl_eqt"
                  value={formData.pl_eqt}
                  onChange={(e) => handleInputChange('pl_eqt', e.target.value)}
                  placeholder="Ex: 265"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stellar Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Propriedades Estelares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="st_tmag">Magnitude TESS</Label>
                <Input
                  id="st_tmag"
                  value={formData.st_tmag}
                  onChange={(e) => handleInputChange('st_tmag', e.target.value)}
                  placeholder="Ex: 12.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="st_dist">Distância Estelar [pc]</Label>
                <Input
                  id="st_dist"
                  value={formData.st_dist}
                  onChange={(e) => handleInputChange('st_dist', e.target.value)}
                  placeholder="Ex: 140.2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="st_teff">Temperatura Efetiva [K]</Label>
                <Input
                  id="st_teff"
                  value={formData.st_teff}
                  onChange={(e) => handleInputChange('st_teff', e.target.value)}
                  placeholder="Ex: 5778"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="st_logg">log(g) [cm/s²]</Label>
                <Input
                  id="st_logg"
                  value={formData.st_logg}
                  onChange={(e) => handleInputChange('st_logg', e.target.value)}
                  placeholder="Ex: 4.44"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="st_rad">Raio Estelar [R☉]</Label>
                <Input
                  id="st_rad"
                  value={formData.st_rad}
                  onChange={(e) => handleInputChange('st_rad', e.target.value)}
                  placeholder="Ex: 1.0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Display Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais para Exibição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Exoplaneta</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: TOI-1234.01 b"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hostStar">Nome da Estrela Hospedeira</Label>
                <Input
                  id="hostStar"
                  value={formData.hostStar}
                  onChange={(e) => handleInputChange('hostStar', e.target.value)}
                  placeholder="Ex: TOI-1234"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva características importantes do exoplaneta..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="habitableZone"
                checked={formData.habitableZone}
                onCheckedChange={(checked) => handleInputChange('habitableZone', checked)}
              />
              <Label htmlFor="habitableZone">Zona Habitável</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Salvar Exoplaneta TESS
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
