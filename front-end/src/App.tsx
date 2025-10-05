import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ExoplanetCard, Exoplanet } from './components/ExoplanetCard';
import { FilterPanel } from './components/FilterPanel';
import { DiscussionPanel } from './components/DiscussionPanel';
import { ExoplanetChart } from './components/ExoplanetChart';
import { ExoplanetDetails } from './components/ExoplanetDetails';
import { DiscussionsPage } from './components/DiscussionsPage';
import { ComparisonPage } from './components/ComparisonPage';
import { DiscoveryTimeline } from './components/DiscoveryTimeline';
import { CommunityResearchersPage } from './components/CommunityResearchersPage';
import { CommunityDiscussionsPage } from './components/CommunityDiscussionsPage';
import { DataManagementPage } from './components/DataManagementPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { ExportDataPage } from './components/ExportDataPage';
import { CreateExoplanetPage } from './components/CreateExoplanetPage';
import { ImportExoplanetPage } from './components/ImportExoplanetPage';
// import { CommunityPage } from './components/CommunityPage'; // Removed - community page disabled
import { NavigationView } from './components/Navigation';
// import SpaceAuth from './components/SpaceAuth'; // Removed - authentication disabled

// Mock data for exoplanets
const mockExoplanets: Exoplanet[] = [
  {
    id: '1',
    name: 'Kepler-452b',
    hostStar: 'Kepler-452',
    discoveryYear: 2015,
    mass: '5.0 M⊕',
    radius: '1.6 R⊕',
    temperature: '265 K',
    distance: '1,402 anos-luz',
    habitableZone: true,
    detectionMethod: 'transit',
    image: 'https://images.unsplash.com/photo-1640386355103-83ebf7c6c83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGxpa2UlMjBwbGFuZXQlMjByZW5kZXJ8ZW58MXx8fHwxNzU5NTkwMTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Conhecido como "primo da Terra", este exoplaneta está localizado na zona habitável de sua estrela, com características similares ao nosso planeta.',
    likes: 127,
    comments: 34,
    isLiked: false,
  },
  {
    id: '2',
    name: 'TRAPPIST-1e',
    hostStar: 'TRAPPIST-1',
    discoveryYear: 2016,
    mass: '0.77 M⊕',
    radius: '0.92 R⊕',
    temperature: '251 K',
    distance: '40 anos-luz',
    habitableZone: true,
    detectionMethod: 'transit',
    image: 'https://images.unsplash.com/photo-1759252477206-0ff5c26a7a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NreSUyMHBsYW5ldCUyMHN1cmZhY2V8ZW58MXx8fHwxNzU5NTkwMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Parte do sistema TRAPPIST-1 com sete planetas rochosos, este mundo pode ter condições adequadas para água líquida.',
    likes: 89,
    comments: 28,
    isLiked: true,
  },
  {
    id: '3',
    name: 'Proxima Centauri b',
    hostStar: 'Proxima Centauri',
    discoveryYear: 2016,
    mass: '1.17 M⊕',
    radius: '1.1 R⊕',
    temperature: '234 K',
    distance: '4.24 anos-luz',
    habitableZone: true,
    detectionMethod: 'radial-velocity',
    image: 'https://images.unsplash.com/photo-1632395627727-3b97d0724814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHBsYW5ldCUyMHNwYWNlJTIwcmVuZGVyfGVufDF8fHx8MTc1OTU5MDA5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'O exoplaneta mais próximo da Terra, orbitando a estrela mais próxima do Sol. Alvo prioritário para futuras missões espaciais.',
    likes: 203,
    comments: 67,
    isLiked: false,
  },
  {
    id: '4',
    name: 'HD 209458 b',
    hostStar: 'HD 209458',
    discoveryYear: 1999,
    mass: '0.69 MJ',
    radius: '1.38 RJ',
    temperature: '1,130 K',
    distance: '159 anos-luz',
    habitableZone: false,
    detectionMethod: 'transit',
    image: 'https://images.unsplash.com/photo-1711560217887-c06025ce46bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBnaWFudCUyMHBsYW5ldHxlbnwxfHx8fDE3NTk1OTAxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Primeiro exoplaneta detectado pelo método de trânsito, revolucionando a astronomia e abrindo caminho para descobertas futuras.',
    likes: 156,
    comments: 42,
    isLiked: true,
  },
  {
    id: '5',
    name: 'Gliese 581g',
    hostStar: 'Gliese 581',
    discoveryYear: 2010,
    mass: '3.1 M⊕',
    radius: '1.5 R⊕',
    temperature: '228 K',
    distance: '20.3 anos-luz',
    habitableZone: true,
    detectionMethod: 'radial-velocity',
    image: 'https://images.unsplash.com/photo-1636471815144-616b00e21f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuZXQlMjBzcGhlcmUlMjAzZHxlbnwxfHx8fDE3NTk1OTAxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Super-Terra localizada na zona habitável, este planeta gerou grande interesse científico por seu potencial de abrigar vida.',
    likes: 98,
    comments: 23,
    isLiked: false,
  },
  {
    id: '6',
    name: 'WASP-121b',
    hostStar: 'WASP-121',
    discoveryYear: 2015,
    mass: '1.18 MJ',
    radius: '1.81 RJ',
    temperature: '2,500 K',
    distance: '880 anos-luz',
    habitableZone: false,
    detectionMethod: 'transit',
    image: 'https://images.unsplash.com/photo-1701690774955-7d06cfd3f857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG9wbGFuZXQlMjBkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc1OTU5MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Júpiter quente extremo com temperaturas que fazem metais vaporizarem. Seus ventos atingem velocidades supersônicas.',
    likes: 76,
    comments: 19,
    isLiked: false,
  },
];

// Mock discussions data
const mockDiscussions = [
  {
    id: '1',
    title: 'Nova técnica de análise atmosférica',
    author: 'Dr. Maria Silva',
    timeAgo: '2h',
    replies: 12,
    category: 'Pesquisa',
    preview: 'Descobrimos uma nova abordagem para analisar a composição atmosférica de exoplanetas usando espectroscopia avançada...',
  },
  {
    id: '2',
    title: 'TRAPPIST-1: Evidências de água líquida?',
    author: 'João Santos',
    timeAgo: '5h',
    replies: 8,
    category: 'Descoberta',
    preview: 'Novos dados do James Webb sugerem possível presença de vapor d\'água na atmosfera de TRAPPIST-1e...',
  },
  {
    id: '3',
    title: 'Debate: Biossinaturas em K2-18b',
    author: 'Ana Costa',
    timeAgo: '1d',
    replies: 24,
    category: 'Discussão',
    preview: 'Que evidências precisamos para confirmar biossinaturas? Vamos discutir os critérios científicos...',
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>({ name: 'Usuário', email: 'usuario@exemplo.com' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<NavigationView>('home');
  const [selectedExoplanet, setSelectedExoplanet] = useState<Exoplanet | null>(null);
  const [exoplanets, setExoplanets] = useState<Exoplanet[]>(mockExoplanets);
  const [filters, setFilters] = useState({
    detectionMethod: 'all',
    habitableZone: false,
    discoveryYear: [1995, 2024],
  });

  // Filter and search logic
  const filteredExoplanets = useMemo(() => {
    return exoplanets.filter((exoplanet) => {
      const matchesSearch = exoplanet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exoplanet.hostStar.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMethod = filters.detectionMethod === 'all' || 
                           exoplanet.detectionMethod === filters.detectionMethod;
      
      const matchesHabitable = !filters.habitableZone || exoplanet.habitableZone;
      
      const matchesYear = exoplanet.discoveryYear >= filters.discoveryYear[0] && 
                         exoplanet.discoveryYear <= filters.discoveryYear[1];
      
      return matchesSearch && matchesMethod && matchesHabitable && matchesYear;
    });
  }, [searchQuery, filters, exoplanets]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = filteredExoplanets.length;
    const habitableZone = filteredExoplanets.filter(p => p.habitableZone).length;
    const recentDiscoveries = filteredExoplanets.filter(p => p.discoveryYear >= 2020).length;
    
    return { total, habitableZone, recentDiscoveries };
  }, [filteredExoplanets]);

  const handleLike = (id: string) => {
    // In a real app, this would make an API call
    console.log('Liked exoplanet:', id);
  };

  const handleComment = (id: string) => {
    // In a real app, this would open a comment dialog
    console.log('Comment on exoplanet:', id);
  };

  const handleViewDetails = (id: string) => {
    const exoplanet = exoplanets.find(p => p.id === id);
    if (exoplanet) {
      setSelectedExoplanet(exoplanet);
      setCurrentView('details');
    }
  };

  const handleSaveExoplanet = (newExoplanet: Exoplanet) => {
    setExoplanets(prev => [...prev, newExoplanet]);
    setCurrentView('home');
  };

  const handleImportExoplanets = (importedExoplanets: Exoplanet[]) => {
    setExoplanets(prev => [...prev, ...importedExoplanets]);
  };

  const handleExportExoplanet = (exoplanet: Exoplanet) => {
    const dataStr = JSON.stringify(exoplanet, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exoplanet.name.replace(/\s+/g, '_')}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedExoplanet(null);
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'details':
        return selectedExoplanet ? (
          <ExoplanetDetails 
            exoplanet={selectedExoplanet} 
            onBack={handleBackToHome}
          />
        ) : (
          <div>Exoplaneta não encontrado</div>
        );
      
      case 'discussions':
        return <DiscussionsPage onBack={handleBackToHome} />;
      
      case 'comparison':
        return (
          <ComparisonPage 
            exoplanets={exoplanets} 
            onBack={handleBackToHome}
          />
        );
      
      case 'timeline':
        return (
          <DiscoveryTimeline 
            exoplanets={exoplanets} 
            onBack={handleBackToHome}
          />
        );
      
      case 'researchers':
        return <CommunityResearchersPage onBack={handleBackToHome} />;
      
      case 'community-discussions':
        return <CommunityDiscussionsPage onBack={handleBackToHome} />;
      
      case 'export':
        return <ExportDataPage exoplanets={exoplanets} onBack={handleBackToHome} />;
      
      case 'create':
        return <CreateExoplanetPage onBack={handleBackToHome} onSave={handleSaveExoplanet} />;
      
      case 'import':
        return <ImportExoplanetPage onBack={handleBackToHome} onImport={handleImportExoplanets} />;
      
      // case 'community':
      //   return <CommunityPage onBack={handleBackToHome} />;
      
      case 'data':
        return <DataManagementPage onBack={handleBackToHome} />;
      
      case 'profile':
        return user ? <ProfilePage user={user} onBack={handleBackToHome} onLogout={handleLogout} /> : <div>Usuário não encontrado</div>;
      
      case 'settings':
        return <SettingsPage onBack={handleBackToHome} />;
      
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {/* Filters - Above content on mobile/tablet, left sidebar on desktop */}
            <div className="lg:col-span-1 xl:col-span-1 order-1">
              <FilterPanel 
                filters={filters}
                onFiltersChange={setFilters}
                stats={stats}
              />
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2 xl:col-span-2 order-2 space-y-4 lg:space-y-6">
              <div>
                <h2 className="mb-4">
                  Catálogo de Exoplanetas
                  <span className="text-muted-foreground ml-2 block sm:inline">
                    ({filteredExoplanets.length} encontrados)
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 gap-3 lg:gap-4">
                  {filteredExoplanets.map((exoplanet) => (
                    <ExoplanetCard
                      key={exoplanet.id}
                      exoplanet={exoplanet}
                      onLike={handleLike}
                      onComment={handleComment}
                      onViewDetails={handleViewDetails}
                      onExport={handleExportExoplanet}
                    />
                  ))}
                </div>
                
                {filteredExoplanets.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nenhum exoplaneta encontrado com os filtros atuais.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right sidebar - Discussions and Charts */}
            <div className="lg:col-span-3 xl:col-span-1 order-3 space-y-4 lg:space-y-6">
              <div className="hidden lg:block">
                <ExoplanetChart />
              </div>
              <DiscussionPanel discussions={mockDiscussions} />
            </div>
          </div>
        );
    }
  };

  // Authentication removed - app now starts directly
  // if (!isAuthenticated) {
  //   return (
  //     <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
  //       <SpaceAuth onLogin={handleLogin} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
      />
      
      <main className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
}