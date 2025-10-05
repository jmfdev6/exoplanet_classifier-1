import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, MessageCircle, User, Building2, GraduationCap, 
  Calendar, MapPin as LocationIcon, TrendingUp, BookOpen, 
  Star, Clock, Award, Users
} from 'lucide-react';

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

interface ResearcherProfilePageProps {
  researcher: Researcher;
  topContributors: TopContributor[];
  newMembers: NewMember[];
  onBack: () => void;
}

export function ResearcherProfilePage({ researcher, topContributors, newMembers, onBack }: ResearcherProfilePageProps) {
  const getBadgeColor = (badge: string) => {
    if (badge.includes('Pioneer') || badge.includes('NASA')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (badge.includes('Expert') || badge.includes('Nature')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (badge.includes('Líder') || badge.includes('Mentor')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (badge.includes('Novato')) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="hover:bg-gray-100 min-h-[44px] text-base sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Perfil do Pesquisador</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Researcher Profile Card */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold mx-auto mb-3">
                  {researcher.avatar}
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{researcher.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-2">{researcher.role}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(researcher.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{researcher.rating}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" size="sm" className="min-h-[44px] text-base sm:text-sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contatar
                  </Button>
                  <Button variant="outline" size="sm" className="min-h-[44px] text-base sm:text-sm">
                    <User className="h-4 w-4 mr-2" />
                    Perfil Completo
                  </Button>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{researcher.bio}</p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    {researcher.affiliation}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                    {researcher.education}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    Membro desde {researcher.memberSince}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <LocationIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    {researcher.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    {researcher.contributions} Contribuições
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                    {researcher.projects} Projetos • {researcher.collaborations} Colaborações
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Trabalho Recente:</p>
                  <p className="text-xs sm:text-sm text-gray-600 italic">"{researcher.recentWork}"</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {researcher.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Conquistas:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {researcher.badges.map((badge, index) => (
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
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Award className="h-4 w-4" />
                Top Contribuidores
              </CardTitle>
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
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Users className="h-4 w-4" />
                Novos Membros
              </CardTitle>
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
      </div>
    </div>
  );
}
