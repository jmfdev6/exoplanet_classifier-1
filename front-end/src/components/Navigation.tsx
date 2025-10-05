import React from 'react';
import { Button } from './ui/button';
import { 
  Home, MessageSquare, GitCompare, Clock, 
  Telescope, Users, Settings, BookOpen, Download, Upload, Plus, Hash
} from 'lucide-react';

export type NavigationView = 'home' | 'details' | 'discussions' | 'comparison' | 'timeline' | 'researchers' | 'community-discussions' | 'data' | 'profile' | 'settings' | 'export' | 'create' | 'import';

interface NavigationProps {
  currentView: NavigationView;
  onViewChange: (view: NavigationView) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navigationItems = [
    { id: 'home' as NavigationView, label: 'Catálogo', icon: Home },
    { id: 'create' as NavigationView, label: 'Contribuir', icon: Plus },
    { id: 'export' as NavigationView, label: 'Exportar', icon: Download },
    { id: 'import' as NavigationView, label: 'Importar', icon: Upload },
    { id: 'community-discussions' as NavigationView, label: 'Discussões', icon: MessageSquare },
    { id: 'researchers' as NavigationView, label: 'Pesquisadores', icon: Users },
    { id: 'comparison' as NavigationView, label: 'Comparação', icon: GitCompare },
    { id: 'timeline' as NavigationView, label: 'Timeline', icon: Clock },
  ];

  return (
    <nav className="flex items-center gap-1 flex-wrap">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentView === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange(item.id)}
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
          >
            <Icon className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}