import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MessageCircle, Users, Clock, Plus } from 'lucide-react';
import { useState } from 'react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  timeAgo: string;
  replies: number;
  category: string;
  preview: string;
}

interface DiscussionPanelProps {
  discussions: Discussion[];
}

export function DiscussionPanel({ discussions }: DiscussionPanelProps) {
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm sm:text-base">Discussões</span>
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => setShowNewDiscussion(!showNewDiscussion)}
            className="h-7 sm:h-8 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Nova</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showNewDiscussion && (
          <div className="border rounded-lg p-3 space-y-3 bg-muted/30">
            <input
              type="text"
              placeholder="Título da discussão..."
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border rounded-md bg-background"
            />
            <Textarea
              placeholder="Compartilhe suas descobertas ou faça uma pergunta..."
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              className="min-h-[80px] text-sm"
            />
            <div className="flex gap-2">
              <Button size="sm" className="h-7 text-xs">Publicar</Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowNewDiscussion(false)}
                className="h-7 text-xs"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="border rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-start gap-2 sm:gap-3">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {discussion.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight flex-1">{discussion.title}</h4>
                    <Badge variant="outline" className="text-xs px-1 flex-shrink-0">
                      {discussion.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                    {discussion.preview}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span className="truncate max-w-16 sm:max-w-none">{discussion.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {discussion.timeAgo}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {discussion.replies}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full text-xs">
          Ver Todas as Discussões
        </Button>
      </CardContent>
    </Card>
  );
}