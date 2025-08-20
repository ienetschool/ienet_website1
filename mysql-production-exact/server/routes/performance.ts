import type { Express } from "express";
import { storage } from "../storage";
import { isAuthenticated } from "../replitAuth";

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  trend: 'up' | 'down' | 'stable';
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface UserAchievement {
  id: string;
  userId: string;
  achievementType: string;
  title: string;
  description: string;
  points: number;
  unlockedAt: Date;
}

export function registerPerformanceRoutes(app: Express) {
  
  // Get current performance metrics
  app.get('/api/performance/metrics', async (req, res) => {
    try {
      // In a real implementation, these would come from monitoring tools like:
      // - Google PageSpeed Insights API
      // - Lighthouse CI
      // - New Relic
      // - DataDog
      // For now, we'll simulate realistic performance data
      
      const metrics: PerformanceMetric[] = [
        {
          name: "First Contentful Paint",
          value: Math.random() * 0.5 + 1.0, // 1.0-1.5s
          target: 1.8,
          unit: "s",
          status: "excellent",
          trend: Math.random() > 0.5 ? "up" : "stable",
          impact: "high",
          timestamp: new Date()
        },
        {
          name: "Largest Contentful Paint", 
          value: Math.random() * 0.8 + 1.8, // 1.8-2.6s
          target: 2.5,
          unit: "s", 
          status: Math.random() > 0.7 ? "excellent" : "good",
          trend: Math.random() > 0.33 ? "up" : Math.random() > 0.5 ? "down" : "stable",
          impact: "high",
          timestamp: new Date()
        },
        {
          name: "Cumulative Layout Shift",
          value: Math.random() * 0.05 + 0.05, // 0.05-0.1
          target: 0.1,
          unit: "",
          status: Math.random() > 0.8 ? "excellent" : "good", 
          trend: Math.random() > 0.6 ? "down" : "stable",
          impact: "medium",
          timestamp: new Date()
        },
        {
          name: "Time to Interactive",
          value: Math.random() * 1.0 + 2.5, // 2.5-3.5s
          target: 3.8,
          unit: "s",
          status: "excellent",
          trend: "up",
          impact: "high", 
          timestamp: new Date()
        },
        {
          name: "Server Response Time",
          value: Math.random() * 50 + 150, // 150-200ms
          target: 200,
          unit: "ms",
          status: Math.random() > 0.5 ? "excellent" : "good",
          trend: "stable",
          impact: "medium",
          timestamp: new Date()
        },
        {
          name: "Total Blocking Time",
          value: Math.random() * 100 + 20, // 20-120ms
          target: 300,
          unit: "ms", 
          status: "excellent",
          trend: Math.random() > 0.7 ? "down" : "stable",
          impact: "high",
          timestamp: new Date()
        }
      ];

      res.json({ metrics });
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // Get optimization suggestions
  app.get('/api/performance/suggestions', async (req, res) => {
    try {
      const suggestions = [
        {
          id: "img-compression",
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
          id: "cdn-setup", 
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
          id: "css-optimization",
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
          id: "db-optimization",
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
          id: "gzip-compression",
          title: "Enable Gzip Compression",
          description: "Compress text-based assets to reduce transfer size",
          difficulty: "easy", 
          impact: "medium",
          category: "Server",
          estimatedImprovement: "20-30% smaller payloads",
          points: 30,
          completed: true
        },
        {
          id: "caching-strategy",
          title: "Implement Browser Caching",
          description: "Set proper cache headers for static assets",
          difficulty: "easy",
          impact: "high",
          category: "Caching", 
          estimatedImprovement: "40-50% faster repeat visits",
          points: 60,
          completed: false
        },
        {
          id: "js-minification",
          title: "JavaScript Minification",
          description: "Minify and compress JavaScript bundles",
          difficulty: "easy",
          impact: "medium",
          category: "JavaScript",
          estimatedImprovement: "15-20% smaller JS bundles", 
          points: 35,
          completed: false
        },
        {
          id: "preload-resources",
          title: "Preload Critical Resources",
          description: "Use resource hints to preload important assets",
          difficulty: "medium",
          impact: "medium", 
          category: "Loading",
          estimatedImprovement: "10-15% faster critical path",
          points: 45,
          completed: false
        }
      ];

      res.json({ suggestions });
    } catch (error) {
      console.error("Error fetching optimization suggestions:", error);
      res.status(500).json({ message: "Failed to fetch optimization suggestions" });
    }
  });

  // Get user gamification stats (requires authentication)
  app.get('/api/performance/stats', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Get user's performance achievements and stats
      const userStats = await storage.getUserPerformanceStats(userId);
      
      res.json({
        totalPoints: userStats?.totalPoints || 0,
        currentLevel: userStats?.currentLevel || 1,
        nextLevelPoints: userStats?.nextLevelPoints || 500,
        completedOptimizations: userStats?.completedOptimizations || 0,
        achievementsUnlocked: userStats?.achievementsUnlocked || 0
      });
    } catch (error) {
      console.error("Error fetching user performance stats:", error);
      res.status(500).json({ message: "Failed to fetch user performance stats" });
    }
  });

  // Complete an optimization (requires authentication)
  app.post('/api/performance/complete/:suggestionId', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.claims?.sub;
      const suggestionId = req.params.suggestionId;
      
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Award points for completing optimization
      const result = await storage.completeOptimization(userId, suggestionId);
      
      res.json({
        success: true,
        pointsEarned: result.pointsEarned,
        newTotal: result.newTotal,
        levelUp: result.levelUp,
        newLevel: result.newLevel
      });
    } catch (error) {
      console.error("Error completing optimization:", error);
      res.status(500).json({ message: "Failed to complete optimization" });
    }
  });

  // Get achievements
  app.get('/api/performance/achievements', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const achievements = await storage.getUserAchievements(userId);
      
      res.json({ achievements });
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Get performance history
  app.get('/api/performance/history', async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      
      // Generate historical performance data
      const history = [];
      const now = new Date();
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        history.push({
          date: date.toISOString().split('T')[0],
          performanceScore: Math.floor(Math.random() * 20 + 75), // 75-95
          firstContentfulPaint: Math.random() * 0.5 + 1.0,
          largestContentfulPaint: Math.random() * 0.8 + 1.8,
          cumulativeLayoutShift: Math.random() * 0.05 + 0.05,
          timeToInteractive: Math.random() * 1.0 + 2.5
        });
      }
      
      res.json({ history });
    } catch (error) {
      console.error("Error fetching performance history:", error);
      res.status(500).json({ message: "Failed to fetch performance history" });
    }
  });

  // Performance audit endpoint (simulates running Lighthouse)
  app.post('/api/performance/audit', async (req, res) => {
    try {
      // Simulate audit delay
      setTimeout(() => {
        const auditResult = {
          timestamp: new Date().toISOString(),
          overall: Math.floor(Math.random() * 15 + 85), // 85-100
          metrics: {
            firstContentfulPaint: Math.random() * 0.5 + 1.0,
            largestContentfulPaint: Math.random() * 0.8 + 1.8,
            timeToInteractive: Math.random() * 1.0 + 2.5,
            cumulativeLayoutShift: Math.random() * 0.05 + 0.05,
            totalBlockingTime: Math.random() * 100 + 20
          },
          opportunities: [
            "Serve images in next-gen formats",
            "Remove unused JavaScript", 
            "Efficiently encode images",
            "Enable text compression"
          ]
        };
        
        res.json({ audit: auditResult });
      }, 2000); // 2 second delay to simulate real audit
      
    } catch (error) {
      console.error("Error running performance audit:", error);
      res.status(500).json({ message: "Failed to run performance audit" });
    }
  });
}