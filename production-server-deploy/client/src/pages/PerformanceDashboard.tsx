import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock,
  Database,
  Gauge,
  Award,
  Star,
  ChevronUp,
  ChevronDown,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'high' | 'medium' | 'low';
  category: string;
  estimatedImprovement: string;
  points: number;
  completed: boolean;
}

export default function PerformanceDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [nextLevelPoints, setNextLevelPoints] = useState(1500);

  // Mock performance data - in real implementation, this would come from APIs
  const performanceMetrics: PerformanceMetric[] = [
    {
      name: "First Contentful Paint",
      value: 1.2,
      target: 1.8,
      unit: "s",
      status: "excellent",
      trend: "up",
      impact: "high"
    },
    {
      name: "Largest Contentful Paint",
      value: 2.1,
      target: 2.5,
      unit: "s",
      status: "good",
      trend: "stable",
      impact: "high"
    },
    {
      name: "Cumulative Layout Shift",
      value: 0.08,
      target: 0.1,
      unit: "",
      status: "good",
      trend: "down",
      impact: "medium"
    },
    {
      name: "Time to Interactive",
      value: 2.8,
      target: 3.8,
      unit: "s",
      status: "excellent",
      trend: "up",
      impact: "high"
    },
    {
      name: "Server Response Time",
      value: 180,
      target: 200,
      unit: "ms",
      status: "good",
      trend: "stable",
      impact: "medium"
    },
    {
      name: "Total Blocking Time",
      value: 45,
      target: 300,
      unit: "ms",
      status: "excellent",
      trend: "down",
      impact: "high"
    }
  ];

  const optimizationSuggestions: OptimizationSuggestion[] = [
    {
      id: "1",
      title: "Enable Image Compression",
      description: "Implement WebP image format and lazy loading to reduce load times",
      difficulty: "easy",
      impact: "high",
      category: "Images",
      estimatedImprovement: "15-25% faster loading",
      points: 50,
      completed: false
    },
    {
      id: "2",
      title: "Implement CDN",
      description: "Use a Content Delivery Network to serve static assets faster globally",
      difficulty: "medium",
      impact: "high",
      category: "Infrastructure",
      estimatedImprovement: "30-40% faster loading",
      points: 75,
      completed: true
    },
    {
      id: "3",
      title: "Optimize CSS Delivery",
      description: "Inline critical CSS and defer non-critical stylesheets",
      difficulty: "medium",
      impact: "medium",
      category: "CSS",
      estimatedImprovement: "10-15% faster rendering",
      points: 40,
      completed: false
    },
    {
      id: "4",
      title: "Database Query Optimization",
      description: "Add database indexes and optimize slow queries",
      difficulty: "hard",
      impact: "high",
      category: "Backend",
      estimatedImprovement: "50-60% faster API responses",
      points: 100,
      completed: false
    },
    {
      id: "5",
      title: "Enable Gzip Compression",
      description: "Compress text-based assets to reduce transfer size",
      difficulty: "easy",
      impact: "medium",
      category: "Server",
      estimatedImprovement: "20-30% smaller payloads",
      points: 30,
      completed: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 dark:text-green-400';
      case 'good': return 'text-blue-600 dark:text-blue-400';
      case 'needs-improvement': return 'text-yellow-600 dark:text-yellow-400';
      case 'poor': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'needs-improvement': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'poor': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const averageScore = Math.round(
    performanceMetrics.reduce((acc, metric) => {
      const score = Math.min(100, (metric.target / metric.value) * 100);
      return acc + score;
    }, 0) / performanceMetrics.length
  );

  const completedSuggestions = optimizationSuggestions.filter(s => s.completed).length;
  const totalSuggestions = optimizationSuggestions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Gauge className="w-10 h-10 text-blue-500" />
            Performance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your website performance and earn points by implementing optimizations
          </p>
        </div>

        {/* Gamification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Performance Score</p>
                  <p className="text-3xl font-bold">{averageScore}</p>
                  <p className="text-blue-200 text-xs">out of 100</p>
                </div>
                <Gauge className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Level {currentLevel}</p>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                  <p className="text-purple-200 text-xs">{nextLevelPoints - totalPoints} to next level</p>
                </div>
                <Trophy className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Optimizations</p>
                  <p className="text-3xl font-bold">{completedSuggestions}/{totalSuggestions}</p>
                  <p className="text-green-200 text-xs">completed</p>
                </div>
                <Target className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Achievements</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-orange-200 text-xs">unlocked</p>
                </div>
                <Award className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Level Progress
            </CardTitle>
            <CardDescription>
              Complete optimizations to earn points and unlock new levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Level {currentLevel}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {totalPoints} / {nextLevelPoints} XP
                </span>
              </div>
              <Progress 
                value={(totalPoints / nextLevelPoints) * 100} 
                className="h-3"
                data-testid="progress-level"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Performance Enthusiast</span>
                <span>Next: Speed Demon</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Core Metrics
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Optimizations
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedMetric === metric.name ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedMetric(selectedMetric === metric.name ? null : metric.name)}
                  data-testid={`card-metric-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      {metric.name}
                      <div className="flex items-center gap-1">
                        {getStatusIcon(metric.status)}
                        {metric.trend === 'up' && <ChevronUp className="w-3 h-3 text-green-500" />}
                        {metric.trend === 'down' && <ChevronDown className="w-3 h-3 text-red-500" />}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                          {metric.value}
                        </span>
                        <span className="text-sm text-gray-500">{metric.unit}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">
                          Target: {metric.target}{metric.unit}
                        </span>
                        <Badge variant="outline" className={`${getStatusColor(metric.status)} border-current`}>
                          {metric.status}
                        </Badge>
                      </div>
                      <Progress 
                        value={Math.min(100, (metric.target / metric.value) * 100)} 
                        className="h-2"
                        data-testid={`progress-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <div className="space-y-4">
              {optimizationSuggestions.map((suggestion) => (
                <Card 
                  key={suggestion.id}
                  className={`${suggestion.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                  data-testid={`card-suggestion-${suggestion.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          {suggestion.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {suggestion.title}
                        </CardTitle>
                        <CardDescription>{suggestion.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{suggestion.points} pts</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge className={getDifficultyColor(suggestion.difficulty)}>
                          {suggestion.difficulty}
                        </Badge>
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {suggestion.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {suggestion.estimatedImprovement}
                        </span>
                        {!suggestion.completed && (
                          <Button size="sm" data-testid={`button-implement-${suggestion.id}`}>
                            Implement
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Speed Demon</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Achieve sub-2s loading times
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Optimization Expert</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Complete 5 optimizations
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Perfect Score</h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Reach 100 performance score
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>
                  Track your website's performance improvements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Performance Timeline
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Historical performance data and trends will be displayed here.
                  </p>
                  <Button data-testid="button-view-history">
                    View Detailed History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}