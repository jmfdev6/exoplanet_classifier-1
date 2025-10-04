import React from 'react';
import { ArrowLeft, Settings, Palette, Bell, Shield, Database, Globe, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
            <p className="text-muted-foreground">Personalize sua experiência na plataforma</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Aparência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Personalize a aparência da interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="density">Densidade da Interface</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a densidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compacta</SelectItem>
                    <SelectItem value="comfortable">Confortável</SelectItem>
                    <SelectItem value="spacious">Espaçosa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar animações e transições
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Alto Contraste</Label>
                  <p className="text-sm text-muted-foreground">
                    Melhorar contraste para acessibilidade
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações do navegador
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Som de Notificação</Label>
                  <p className="text-sm text-muted-foreground">
                    Reproduzir som ao receber notificações
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificações por email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequência de Notificações</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Imediata</SelectItem>
                    <SelectItem value="hourly">A cada hora</SelectItem>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dados e Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Dados e Privacidade
              </CardTitle>
              <CardDescription>
                Gerencie seus dados e configurações de privacidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics Anônimos</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir coleta de dados de uso anônimos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookies Essenciais</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir cookies necessários para o funcionamento
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookies de Marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir cookies para personalização de conteúdo
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Retenção de Dados</Label>
                <Select defaultValue="1year">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 meses</SelectItem>
                    <SelectItem value="1year">1 ano</SelectItem>
                    <SelectItem value="2years">2 anos</SelectItem>
                    <SelectItem value="indefinite">Indefinido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Performance
              </CardTitle>
              <CardDescription>
                Otimize a performance da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quality">Qualidade das Imagens</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a qualidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa (Rápido)</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta (Qualidade)</SelectItem>
                    <SelectItem value="auto">Automática</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cache de Dados</Label>
                  <p className="text-sm text-muted-foreground">
                    Armazenar dados em cache para melhor performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lazy Loading</Label>
                  <p className="text-sm text-muted-foreground">
                    Carregar conteúdo conforme necessário
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="refresh">Atualização Automática</Label>
                <Select defaultValue="5min">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 minuto</SelectItem>
                    <SelectItem value="5min">5 minutos</SelectItem>
                    <SelectItem value="15min">15 minutos</SelectItem>
                    <SelectItem value="30min">30 minutos</SelectItem>
                    <SelectItem value="disabled">Desabilitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline">
            Restaurar Padrões
          </Button>
          <Button>
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
}
