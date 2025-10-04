import React from 'react';
import { ArrowLeft, User, Mail, Settings, Shield, Bell, Globe, Database, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface ProfilePageProps {
  user: { name: string; email: string };
  onBack: () => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onBack, onLogout }: ProfilePageProps) {
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
            <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
            <p className="text-muted-foreground">Gerencie suas informações e configurações</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Atualize suas informações básicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Input
                    id="bio"
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliation">Afiliação Institucional</Label>
                  <Input
                    id="affiliation"
                    placeholder="Universidade, Instituto, etc."
                  />
                </div>
                <Button className="w-full">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            {/* Configurações de Notificações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novas Discussões</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações sobre novas discussões
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Descobertas de Exoplanetas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre novas descobertas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Atualizações de Projetos</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre projetos colaborativos
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Resumo semanal por email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">127</div>
                  <div className="text-sm text-muted-foreground">Exoplanetas Favoritos</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">34</div>
                  <div className="text-sm text-muted-foreground">Discussões Participadas</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Projetos Colaborativos</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Contribuições</div>
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Privacidade */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">
                      Tornar perfil visível para outros usuários
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar Atividade</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibir atividade recente no perfil
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir Mensagens</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que outros usuários enviem mensagens
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Configurações de Idioma */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Idioma e Região
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Input
                    id="language"
                    defaultValue="Português (Brasil)"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input
                    id="timezone"
                    defaultValue="UTC-3 (Brasília)"
                    readOnly
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Alterar Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Botão de Logout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  Sessão
                </CardTitle>
                <CardDescription>
                  Encerre sua sessão atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  onClick={onLogout} 
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
