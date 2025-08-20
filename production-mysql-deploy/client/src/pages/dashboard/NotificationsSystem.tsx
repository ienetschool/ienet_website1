import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Settings,
  Mail,
  MessageSquare,
  User,
  Activity,
  Search,
  Globe,
  FileText,
  TrendingUp,
  Clock,
  Eye,
  EyeOff,
  Archive,
  Trash2,
  Filter,
  RefreshCw,
  Plus,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'form_submission' | 'seo_issue' | 'user_activity' | 'system_alert' | 'performance_warning';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  category: 'forms' | 'seo' | 'users' | 'system' | 'performance';
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
  userId?: number;
  metadata?: Record<string, any>;
  actionUrl?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  formSubmissions: boolean;
  seoIssues: boolean;
  userActivity: boolean;
  systemAlerts: boolean;
  performanceWarnings: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function NotificationsSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    formSubmissions: true,
    seoIssues: true,
    userActivity: false,
    systemAlerts: true,
    performanceWarnings: true,
    dailyDigest: false,
    weeklyReport: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dashboard/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/dashboard/notifications/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch notification settings:', error);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(`/api/dashboard/notifications/${notificationId}/read`, {
        method: 'PUT'
      });

      if (response.ok) {
        setNotifications(notifications.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        ));
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/dashboard/notifications/read-all', {
        method: 'PUT'
      });

      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        toast({
          title: "Success",
          description: "All notifications marked as read"
        });
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive"
      });
    }
  };

  const archiveNotification = async (notificationId: number) => {
    try {
      const response = await fetch(`/api/dashboard/notifications/${notificationId}/archive`, {
        method: 'PUT'
      });

      if (response.ok) {
        setNotifications(notifications.map(n => 
          n.id === notificationId ? { ...n, isArchived: true } : n
        ));
      }
    } catch (error) {
      console.error('Failed to archive notification:', error);
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      const response = await fetch(`/api/dashboard/notifications/${notificationId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setNotifications(notifications.filter(n => n.id !== notificationId));
        toast({
          title: "Success",
          description: "Notification deleted"
        });
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive"
      });
    }
  };

  const updateSettings = async (newSettings: NotificationSettings) => {
    try {
      const response = await fetch('/api/dashboard/notifications/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setSettings(newSettings);
        toast({
          title: "Success",
          description: "Notification settings updated"
        });
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive"
      });
    }
  };

  const getSeverityIcon = (severity: Notification['severity']) => {
    switch (severity) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'forms': return <MessageSquare className="h-4 w-4" />;
      case 'seo': return <Search className="h-4 w-4" />;
      case 'users': return <User className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      case 'performance': return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.isRead) return false;
    if (filter === 'archived' && !notification.isArchived) return false;
    if (filter === 'all' && notification.isArchived) return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications System</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={fetchNotifications}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              {unreadCount > 0 && (
                <Button size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="forms">Forms</SelectItem>
                    <SelectItem value="seo">SEO Issues</SelectItem>
                    <SelectItem value="users">User Activity</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={filter} className="mt-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                      <p className="text-muted-foreground">
                        {filter === 'unread' ? 'All caught up! No unread notifications.' :
                         filter === 'archived' ? 'No archived notifications found.' :
                         'No notifications to display.'}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={`border-l-4 transition-all hover:shadow-md ${
                          getSeverityColor(notification.severity)
                        } ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getSeverityIcon(notification.severity)}
                                {getCategoryIcon(notification.category)}
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                                {!notification.isRead && (
                                  <Badge variant="default" className="text-xs">
                                    New
                                  </Badge>
                                )}
                              </div>
                              
                              <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(notification.createdAt).toLocaleString()}
                                </div>
                                
                                {notification.actionUrl && (
                                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 ml-4">
                              {!notification.isRead && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => archiveNotification(notification.id)}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold mb-3">Delivery Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, emailNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Show desktop notifications</p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, pushNotifications: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <div>
                      <Label htmlFor="form-submissions">Form Submissions</Label>
                      <p className="text-xs text-muted-foreground">New contact form submissions</p>
                    </div>
                  </div>
                  <Switch 
                    id="form-submissions"
                    checked={settings.formSubmissions}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, formSubmissions: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <div>
                      <Label htmlFor="seo-issues">SEO Issues</Label>
                      <p className="text-xs text-muted-foreground">Schema errors and SEO warnings</p>
                    </div>
                  </div>
                  <Switch 
                    id="seo-issues"
                    checked={settings.seoIssues}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, seoIssues: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <div>
                      <Label htmlFor="user-activity">User Activity</Label>
                      <p className="text-xs text-muted-foreground">User registrations and logins</p>
                    </div>
                  </div>
                  <Switch 
                    id="user-activity"
                    checked={settings.userActivity}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, userActivity: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <div>
                      <Label htmlFor="system-alerts">System Alerts</Label>
                      <p className="text-xs text-muted-foreground">Critical system notifications</p>
                    </div>
                  </div>
                  <Switch 
                    id="system-alerts"
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, systemAlerts: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <div>
                      <Label htmlFor="performance-warnings">Performance Warnings</Label>
                      <p className="text-xs text-muted-foreground">Slow queries and performance issues</p>
                    </div>
                  </div>
                  <Switch 
                    id="performance-warnings"
                    checked={settings.performanceWarnings}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, performanceWarnings: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Summary Reports</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-digest">Daily Digest</Label>
                    <p className="text-xs text-muted-foreground">Daily summary of activity</p>
                  </div>
                  <Switch 
                    id="daily-digest"
                    checked={settings.dailyDigest}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, dailyDigest: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-report">Weekly Report</Label>
                    <p className="text-xs text-muted-foreground">Weekly analytics and insights</p>
                  </div>
                  <Switch 
                    id="weekly-report"
                    checked={settings.weeklyReport}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, weeklyReport: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Quiet Hours</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
                    <p className="text-xs text-muted-foreground">Pause notifications during specified hours</p>
                  </div>
                  <Switch 
                    id="quiet-hours"
                    checked={settings.quietHours.enabled}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        quietHours: {...settings.quietHours, enabled: checked}
                      })
                    }
                  />
                </div>
                
                {settings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quiet-start">Start Time</Label>
                      <Input 
                        id="quiet-start"
                        type="time"
                        value={settings.quietHours.start}
                        onChange={(e) => 
                          setSettings({
                            ...settings,
                            quietHours: {...settings.quietHours, start: e.target.value}
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiet-end">End Time</Label>
                      <Input 
                        id="quiet-end"
                        type="time"
                        value={settings.quietHours.end}
                        onChange={(e) => 
                          setSettings({
                            ...settings,
                            quietHours: {...settings.quietHours, end: e.target.value}
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={() => updateSettings(settings)}>
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}