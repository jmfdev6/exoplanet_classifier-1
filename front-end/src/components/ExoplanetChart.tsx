import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

const discoveryData = [
  { year: '1995-2000', count: 45 },
  { year: '2001-2005', count: 78 },
  { year: '2006-2010', count: 156 },
  { year: '2011-2015', count: 234 },
  { year: '2016-2020', count: 389 },
  { year: '2021-2024', count: 456 },
];

const detectionMethodData = [
  { name: 'Trânsito', value: 45, color: '#8884d8' },
  { name: 'Velocidade Radial', value: 25, color: '#82ca9d' },
  { name: 'Imagem Direta', value: 15, color: '#ffc658' },
  { name: 'Microlente', value: 10, color: '#ff7300' },
  { name: 'Outros', value: 5, color: '#8dd1e1' },
];

const habitabilityData = [
  { year: 2015, confirmed: 12, potentially: 45 },
  { year: 2016, confirmed: 18, potentially: 52 },
  { year: 2017, confirmed: 25, potentially: 68 },
  { year: 2018, confirmed: 31, potentially: 78 },
  { year: 2019, confirmed: 42, potentially: 89 },
  { year: 2020, confirmed: 55, potentially: 102 },
  { year: 2021, confirmed: 67, potentially: 115 },
  { year: 2022, confirmed: 78, potentially: 128 },
  { year: 2023, confirmed: 89, potentially: 142 },
  { year: 2024, confirmed: 98, potentially: 156 },
];

export function ExoplanetChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Análise de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="discoveries" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discoveries" className="text-xs">Descobertas</TabsTrigger>
            <TabsTrigger value="methods" className="text-xs">Métodos</TabsTrigger>
            <TabsTrigger value="habitability" className="text-xs">Habitabilidade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discoveries" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={discoveryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Número de exoplanetas descobertos por período
            </p>
          </TabsContent>
          
          <TabsContent value="methods" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={detectionMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {detectionMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {detectionMethodData.map((method) => (
                <div key={method.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: method.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {method.name} ({method.value}%)
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="habitability" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={habitabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confirmed" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="potentially" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary" />
                <span className="text-xs text-muted-foreground">Confirmados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-muted-foreground border-dashed" />
                <span className="text-xs text-muted-foreground">Potencialmente Habitáveis</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}