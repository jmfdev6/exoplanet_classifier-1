import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, Users, Globe, BookOpen, Award, Star, 
  Search, MessageCircle, User, MapPin, Calendar, 
  TrendingUp, Clock, Mail, Phone, Video, ChevronRight,
  Filter, SlidersHorizontal, GraduationCap, Building2, MapPin as LocationIcon
} from 'lucide-react';
import { ResearcherProfilePage } from './ResearcherProfilePage';

interface CommunityResearchersPageProps {
  onBack: () => void;
  onNavigateToProfile?: (researcher: Researcher, topContributors: TopContributor[], newMembers: NewMember[]) => void;
}

interface Researcher {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  bio: string;
  affiliation: string;
  expertise: string[];
  memberSince: string;
  contributions: number;
  projects: number;
  collaborations: number;
  recentWork: string;
  badges: string[];
  isOnline: boolean;
  location: string;
  email: string;
  education: string;
  institution: string;
}

interface TopContributor {
  id: string;
  name: string;
  avatar: string;
  contributions: number;
}

interface NewMember {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
}

export function CommunityResearchersPage({ onBack, onNavigateToProfile }: CommunityResearchersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'profile'>('list');
  const [advancedFilters, setAdvancedFilters] = useState({
    expertise: '',
    institution: '',
    location: '',
    minRating: 0,
    minContributions: 0
  });

  // Mock researchers data
  const [researchers] = useState<Researcher[]>([
    {
      id: '1',
      name: 'Dr. Maria Silva',
      role: 'Coordenadora de Pesquisa',
      avatar: 'MS',
      rating: 4.9,
      bio: 'Especialista em análise atmosférica de exoplanetas com foco em habitabilidade e detecção de biossinaturas.',
      affiliation: 'Universidade de São Paulo',
      expertise: ['Astrofísica', 'Espectroscopia', 'Habitabilidade'],
      memberSince: '14/03/2021',
      contributions: 127,
      projects: 8,
      collaborations: 23,
      recentWork: 'Análise espectroscópica de TRAPPIST-1e',
      badges: ['Descobridor Pioneer', 'Colaborador Expert', 'Líder de Equipe'],
      isOnline: true,
      location: 'São Paulo, Brasil',
      email: 'maria.silva@usp.br',
      education: 'PhD em Astrofísica',
      institution: 'USP'
    },
    {
      id: '2',
      name: 'Prof. João Santos',
      role: 'Pesquisador Senior',
      avatar: 'JS',
      rating: 4.7,
      bio: 'Focado em estudos de habitabilidade planetária e busca por evidências de vida em exoplanetas.',
      affiliation: 'Instituto Nacional de Pesquisas Espaciais',
      expertise: ['Astrobiologia', 'Habitabilidade', 'Detecção'],
      memberSince: '07/11/2020',
      contributions: 89,
      projects: 12,
      collaborations: 34,
      recentWork: 'Metodologia para detecção de biossinaturas',
      badges: ['Mentor da Comunidade', 'Colaborador Expert'],
      isOnline: true,
      location: 'São José dos Campos, Brasil',
      email: 'joao.santos@inpe.br',
      education: 'PhD em Astrobiologia',
      institution: 'INPE'
    },
    {
      id: '3',
      name: 'Dra. Elena Rodriguez',
      role: 'Pesquisadora Principal',
      avatar: 'ER',
      rating: 4.8,
      bio: 'Especialista em modelagem atmosférica e análise de dados de missões espaciais.',
      affiliation: 'NASA Ames Research Center',
      expertise: ['Modelagem', 'Atmosferas', 'JWST'],
      memberSince: '22/01/2020',
      contributions: 203,
      projects: 15,
      collaborations: 45,
      recentWork: 'Análise de dados JWST de exoplanetas',
      badges: ['NASA Fellow', 'Publicação Nature', 'Líder de Equipe'],
      isOnline: false,
      location: 'Mountain View, EUA',
      email: 'elena.rodriguez@nasa.gov',
      education: 'PhD em Física',
      institution: 'NASA'
    },
    {
      id: '4',
      name: 'Dr. Robert Chen',
      role: 'Pesquisador Associado',
      avatar: 'RC',
      rating: 4.6,
      bio: 'Especialista em métodos de detecção e caracterização de exoplanetas.',
      affiliation: 'MIT',
      expertise: ['Detecção', 'Transit', 'Radial Velocity'],
      memberSince: '19/01/2022',
      contributions: 156,
      projects: 9,
      collaborations: 28,
      recentWork: 'Novos algoritmos para detecção de trânsitos',
      badges: ['MIT Fellow', 'Inovador'],
      isOnline: true,
      location: 'Cambridge, EUA',
      email: 'robert.chen@mit.edu',
      education: 'PhD em Astronomia',
      institution: 'MIT'
    },
    {
      id: '5',
      name: 'Ana Costa',
      role: 'Pesquisadora Júnior',
      avatar: 'AC',
      rating: 4.3,
      bio: 'Focada em análise de dados de telescópios terrestres e observações amadoras.',
      affiliation: 'Observatório Nacional',
      expertise: ['Observação', 'Dados', 'Amador'],
      memberSince: '13/02/2023',
      contributions: 45,
      projects: 3,
      collaborations: 12,
      recentWork: 'Análise de dados do Kepler',
      badges: ['Novato Promissor'],
      isOnline: true,
      location: 'Rio de Janeiro, Brasil',
      email: 'ana.costa@on.br',
      education: 'MSc em Astronomia',
      institution: 'ON'
    },
    {
      id: '6',
      name: 'Dr. Ahmed Hassan',
      role: 'Pesquisador Visitante',
      avatar: 'AH',
      rating: 4.4,
      bio: 'Especialista em instrumentação astronômica e desenvolvimento de telescópios espaciais.',
      affiliation: 'Agência Espacial Europeia',
      expertise: ['Instrumentação', 'Telescópios Espaciais', 'Óptica'],
      memberSince: '02/09/2021',
      contributions: 68,
      projects: 4,
      collaborations: 10,
      recentWork: 'Design do futuro telescópio ARIEL',
      badges: ['Inovador Tecnológico'],
      isOnline: false,
      location: 'Paris, França',
      email: 'ahmed.hassan@esa.int',
      education: 'PhD em Engenharia',
      institution: 'ESA'
    },
    {
      id: '7',
      name: 'Dr. Sarah Miller',
      role: 'Professora Adjunta',
      avatar: 'SM',
      rating: 4.7,
      bio: 'Pesquisa sobre formação e evolução de atmosferas planetárias em exoplanetas rochosos.',
      affiliation: 'Universidade de Toronto',
      expertise: ['Atmosferas Planetárias', 'Geofísica', 'Modelagem'],
      memberSince: '18/06/2020',
      contributions: 95,
      projects: 7,
      collaborations: 15,
      recentWork: 'Impacto de ventos estelares em atmosferas',
      badges: ['Educador Científico'],
      isOnline: true,
      location: 'Toronto, Canadá',
      email: 'sarah.miller@utoronto.ca',
      education: 'PhD em Física',
      institution: 'UofT'
    },
    {
      id: '8',
      name: 'Dr. Kenji Tanaka',
      role: 'Pós-doutorando',
      avatar: 'KT',
      rating: 4.5,
      bio: 'Interessado em exoplanetas de baixa massa e suas interações com estrelas anãs vermelhas.',
      affiliation: 'Universidade de Tóquio',
      expertise: ['Exoplanetas de Baixa Massa', 'Estrelas Anãs Vermelhas', 'Simulação'],
      memberSince: '10/01/2022',
      contributions: 112,
      projects: 5,
      collaborations: 18,
      recentWork: 'Caracterização de atmosferas de super-Terras',
      badges: ['Jovem Pesquisador'],
      isOnline: false,
      location: 'Tóquio, Japão',
      email: 'kenji.tanaka@u-tokyo.ac.jp',
      education: 'PhD em Astronomia',
      institution: 'UTokyo'
    }
  ]);

  // Mock top contributors
  const [topContributors] = useState<TopContributor[]>([
    { id: '1', name: 'Prof. Lisa Thompson', avatar: 'LT', contributions: 245 },
    { id: '2', name: 'Dra. Elena Rodriguez', avatar: 'ER', contributions: 203 },
    { id: '3', name: 'Dr. Robert Chen', avatar: 'RC', contributions: 156 },
    { id: '4', name: 'Dr. Maria Silva', avatar: 'MS', contributions: 127 },
    { id: '5', name: 'Dr. Kenji Tanaka', avatar: 'KT', contributions: 112 }
  ]);

  // Mock new members
  const [newMembers] = useState<NewMember[]>([
    { id: '1', name: 'Ana Costa', avatar: 'AC', joinDate: '13/02/2023' },
    { id: '2', name: 'Dr. Robert Chen', avatar: 'RC', joinDate: '19/01/2022' },
    { id: '3', name: 'Dr. Ahmed Hassan', avatar: 'AH', joinDate: '02/09/2021' }
  ]);

  const filteredResearchers = researchers.filter(researcher => {
    const matchesSearch = researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         researcher.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         researcher.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         researcher.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'senior' && researcher.role.includes('Senior')) ||
                         (selectedFilter === 'online' && researcher.isOnline) ||
                         (selectedFilter === 'brazil' && researcher.location.includes('Brasil')) ||
                         (selectedFilter === 'junior' && researcher.role.includes('Júnior')) ||
                         (selectedFilter === 'principal' && researcher.role.includes('Principal')) ||
                         (selectedFilter === 'coordenador' && researcher.role.includes('Coordenadora')) ||
                         (selectedFilter === 'professor' && researcher.role.includes('Professor'));

    const matchesAdvanced = (!advancedFilters.expertise || researcher.expertise.some(exp => 
      exp.toLowerCase().includes(advancedFilters.expertise.toLowerCase()))) &&
      (!advancedFilters.institution || researcher.institution.toLowerCase().includes(advancedFilters.institution.toLowerCase())) &&
      (!advancedFilters.location || researcher.location.toLowerCase().includes(advancedFilters.location.toLowerCase())) &&
      researcher.rating >= advancedFilters.minRating &&
      researcher.contributions >= advancedFilters.minContributions;
    
    return matchesSearch && matchesFilter && matchesAdvanced;
  });

  const getBadgeColor = (badge: string) => {
    if (badge.includes('Pioneer') || badge.includes('NASA')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (badge.includes('Expert') || badge.includes('Nature')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (badge.includes('Líder') || badge.includes('Mentor')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (badge.includes('Novato')) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Set default selected researcher
  React.useEffect(() => {
    if (!selectedResearcher && researchers.length > 0) {
      setSelectedResearcher(researchers[0]);
    }
  }, [researchers, selectedResearcher]);

  // Se estamos na view de perfil e é mobile, renderiza a página de perfil
  if (currentView === 'profile' && selectedResearcher && window.innerWidth < 1024) {
    return (
      <ResearcherProfilePage
        researcher={selectedResearcher}
        topContributors={topContributors}
        newMembers={newMembers}
        onBack={() => setCurrentView('list')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="self-start sm:self-center hover:bg-gray-100 min-h-[44px] text-base sm:text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="text-center sm:text-left">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Pesquisadores da Comunidade</h1>
            <p className="text-xs sm:text-sm text-gray-500">Conheça os especialistas e colaboradores da plataforma</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-3 sm:mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">Pesquisadores</p>
                  <p className="text-xl sm:text-3xl font-bold">{researchers.length}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs sm:text-sm font-medium">Online agora</p>
                  <p className="text-xl sm:text-3xl font-bold">{researchers.filter(r => r.isOnline).length}</p>
                </div>
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs sm:text-sm font-medium">Projetos ativos</p>
                  <p className="text-xl sm:text-3xl font-bold">78</p>
                </div>
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs sm:text-sm font-medium">Contribuições</p>
                  <p className="text-xl sm:text-3xl font-bold">1044</p>
                </div>
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Left Panel - Search, Filters and Researcher List */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-2 sm:mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pesquisadores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 min-h-[44px] text-base sm:text-sm"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-2 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-1 overflow-x-auto">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                      selectedFilter === 'all'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Todos ({researchers.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('senior')}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                      selectedFilter === 'senior'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Senior ({researchers.filter(r => r.role.includes('Senior')).length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('online')}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                      selectedFilter === 'online'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Online ({researchers.filter(r => r.isOnline).length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('brazil')}
                    className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[44px] ${
                      selectedFilter === 'brazil'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Brasil ({researchers.filter(r => r.location.includes('Brasil')).length})
                  </button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2 min-h-[44px] text-base sm:text-sm"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtros Avançados</span>
                  <span className="sm:hidden">Filtros</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <Card className="mb-2 sm:mb-4">
                  <CardContent className="p-2 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Especialidade</label>
                        <Input
                          placeholder="Ex: Astrofísica"
                          value={advancedFilters.expertise}
                          onChange={(e) => setAdvancedFilters(prev => ({ ...prev, expertise: e.target.value }))}
                          className="min-h-[44px] text-base sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Instituição</label>
                        <Input
                          placeholder="Ex: USP, NASA"
                          value={advancedFilters.institution}
                          onChange={(e) => setAdvancedFilters(prev => ({ ...prev, institution: e.target.value }))}
                          className="min-h-[44px] text-base sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Localização</label>
                        <Input
                          placeholder="Ex: São Paulo"
                          value={advancedFilters.location}
                          onChange={(e) => setAdvancedFilters(prev => ({ ...prev, location: e.target.value }))}
                          className="min-h-[44px] text-base sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Rating Mínimo</label>
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="0.0"
                          value={advancedFilters.minRating}
                          onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) || 0 }))}
                          className="min-h-[44px] text-base sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Contribuições Mínimas</label>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={advancedFilters.minContributions}
                          onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minContributions: parseInt(e.target.value) || 0 }))}
                          className="min-h-[44px] text-base sm:text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          onClick={() => setAdvancedFilters({
                            expertise: '',
                            institution: '',
                            location: '',
                            minRating: 0,
                            minContributions: 0
                          })}
                          className="w-full min-h-[44px] text-base sm:text-sm"
                        >
                          Limpar Filtros
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-2">
                <Button
                  variant={selectedFilter === 'junior' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('junior')}
                  className={`${selectedFilter === 'junior' ? 'bg-blue-600 text-white' : ''} min-h-[44px] text-xs sm:text-sm`}
                >
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Júnior ({researchers.filter(r => r.role.includes('Júnior')).length})
                </Button>
                <Button
                  variant={selectedFilter === 'principal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('principal')}
                  className={`${selectedFilter === 'principal' ? 'bg-blue-600 text-white' : ''} min-h-[44px] text-xs sm:text-sm`}
                >
                  <Star className="h-3 w-3 mr-1" />
                  Principal ({researchers.filter(r => r.role.includes('Principal')).length})
                </Button>
                <Button
                  variant={selectedFilter === 'coordenador' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('coordenador')}
                  className={`${selectedFilter === 'coordenador' ? 'bg-blue-600 text-white' : ''} min-h-[44px] text-xs sm:text-sm`}
                >
                  <Building2 className="h-3 w-3 mr-1" />
                  Coordenador ({researchers.filter(r => r.role.includes('Coordenadora')).length})
                </Button>
                <Button
                  variant={selectedFilter === 'professor' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('professor')}
                  className={`${selectedFilter === 'professor' ? 'bg-blue-600 text-white' : ''} min-h-[44px] text-xs sm:text-sm`}
                >
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Professor ({researchers.filter(r => r.role.includes('Professor')).length})
                </Button>
              </div>
            </div>

            {/* Researchers List */}
            <div className="space-y-1">
              {filteredResearchers.map((researcher) => (
                <Card 
                  key={researcher.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedResearcher?.id === researcher.id 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedResearcher(researcher);
                    // Em mobile, navega para a página de perfil
                    if (window.innerWidth < 1024) {
                      setCurrentView('profile');
                    }
                    // Se há callback externo, usa ele também
                    if (onNavigateToProfile) {
                      onNavigateToProfile(researcher, topContributors, newMembers);
                    }
                  }}
                >
                  <CardContent className="p-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          {researcher.avatar}
                        </div>
                        {/* Fixed status indicator */}
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                          researcher.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{researcher.name}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{researcher.role}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2 w-2 sm:h-3 sm:w-3 ${
                                  i < Math.floor(researcher.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{researcher.rating}</span>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Panel - Selected Researcher Profile */}
          <div className="lg:col-span-1 mt-6 lg:mt-0 hidden lg:block">
            {selectedResearcher ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Selected Researcher Profile */}
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold mx-auto mb-3">
                        {selectedResearcher.avatar}
                      </div>
                      
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{selectedResearcher.name}</h2>
                      <p className="text-sm sm:text-base text-gray-600 mb-2">{selectedResearcher.role}</p>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < Math.floor(selectedResearcher.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{selectedResearcher.rating}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button variant="outline" size="sm" className="min-h-[44px] text-base sm:text-sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contatar
                        </Button>
                        <Button variant="outline" size="sm" className="min-h-[44px] text-base sm:text-sm">
                          <User className="h-4 w-4 mr-2" />
                          Perfil
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{selectedResearcher.bio}</p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          {selectedResearcher.affiliation}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                          {selectedResearcher.education}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          Membro desde {selectedResearcher.memberSince}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <LocationIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          {selectedResearcher.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          {selectedResearcher.contributions} Contribuições
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                          {selectedResearcher.projects} Projetos • {selectedResearcher.collaborations} Colaborações
                        </div>
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Trabalho Recente:</p>
                        <p className="text-xs sm:text-sm text-gray-600 italic">"{selectedResearcher.recentWork}"</p>
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Especialidades:</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedResearcher.expertise.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Conquistas:</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedResearcher.badges.map((badge, index) => (
                            <Badge key={index} className={`text-xs border ${getBadgeColor(badge)}`}>
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Top Contribuidores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      {topContributors.map((contributor, index) => (
                        <div key={contributor.id} className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                            {contributor.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-xs sm:text-sm">{contributor.name}</p>
                            <p className="text-xs text-gray-500">{contributor.contributions} contribuições</p>
                          </div>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* New Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Novos Membros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      {newMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-xs sm:text-sm">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.joinDate}</p>
                          </div>
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Selecione um pesquisador</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Escolha um pesquisador da lista para ver o perfil detalhado
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}