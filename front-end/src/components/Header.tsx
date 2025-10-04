import { Search, Menu, Globe, Users, ChartBar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Navigation, NavigationView } from './Navigation';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  currentView: NavigationView;
  onViewChange: (view: NavigationView) => void;
}

export function Header({ onSearchChange, searchQuery, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Globe className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <div>
              <h1 className="font-medium text-sm md:text-base">ExoPlanet Hub</h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Plataforma Colaborativa</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar exoplanetas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="hidden md:block">
              <Navigation currentView={currentView} onViewChange={onViewChange} />
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden lg:flex"
                onClick={() => onViewChange('collaboration')}
              >
                <Users className="h-4 w-4 mr-2" />
                Colaborar
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden lg:flex"
                onClick={() => onViewChange('data')}
              >
                <ChartBar className="h-4 w-4 mr-2" />
                Dados
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:hidden mt-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar exoplanetas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-center">
            <Navigation currentView={currentView} onViewChange={onViewChange} />
          </div>
        </div>
      </div>
    </header>
  );
}