import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  TrendingUp, 
  MousePointer, 
  ShoppingCart,
  Plus,
  Download,
  Settings,
  UserPlus,
  DollarSign,
  BarChart
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('7d')

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.name || 
           user?.email?.split('@')[0] || 
           'User'
  }

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Click Rate',
      value: '3.4%',
      change: '-3%',
      changeType: 'negative' as const,
      icon: MousePointer
    },
    {
      title: 'Conversions',
      value: '189',
      change: '+15%',
      changeType: 'positive' as const,
      icon: ShoppingCart
    }
  ]

  const activities = [
    {
      title: 'New user registered',
      time: '2 minutes ago',
      icon: UserPlus,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      title: 'Payment received',
      time: '5 minutes ago',
      icon: DollarSign,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100'
    },
    {
      title: 'Report generated',
      time: '12 minutes ago',
      icon: BarChart,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    }
  ]

  const quickActions = [
    {
      title: 'Create Report',
      description: 'Generate a new analytics report',
      icon: Plus,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/20',
      cardBg: 'bg-primary/5 hover:bg-primary/10'
    },
    {
      title: 'Export Data',
      description: 'Download your analytics data',
      icon: Download,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-200',
      cardBg: 'bg-emerald-50 hover:bg-emerald-100'
    },
    {
      title: 'Settings',
      description: 'Configure your preferences',
      icon: Settings,
      iconColor: 'text-orange-700',
      iconBg: 'bg-orange-200',
      cardBg: 'bg-orange-50 hover:bg-orange-100'
    }
  ]

  return (
    <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="welcome-message">
            Hello <span className="text-primary">{getUserDisplayName()}</span>! 👋
          </h1>
          <p className="text-muted-foreground">Welcome back to your analytics dashboard.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} data-testid={`card-stat-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="text-primary text-xl" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-destructive bg-red-50'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card data-testid="card-analytics">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Analytics Overview</CardTitle>
              <Select value={timeRange} onValueChange={setTimeRange} data-testid="select-timerange">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="3m">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="text-primary text-4xl mb-3 mx-auto" />
                  <p className="text-muted-foreground">Chart Component Here</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This would integrate with a charting library like Chart.js or Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-activity">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <Button variant="link" className="text-primary text-sm hover:text-primary/80" data-testid="button-view-all">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={index} className="flex items-start space-x-3" data-testid={`activity-${index}`}>
                      <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`${activity.iconColor} text-xs`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card data-testid="card-quick-actions">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg transition-colors text-left ${action.cardBg}`}
                    data-testid={`button-quick-action-${index}`}
                  >
                    <div className={`w-10 h-10 ${action.iconBg} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={action.iconColor} />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
