import { ReactNode } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Users, 
  Settings,
  Bell,
  LogOut,
  User,
  Home,
  Menu,
  X
} from 'lucide-react'
import logoImage from '@assets/logo_1757250363416.jpg'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth()
  const [location, navigate] = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.name || 
           user?.email?.split('@')[0] || 
           'User'
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3" data-testid="sidebar-logo">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src={logoImage} alt="ChartFlow Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-foreground">ChartFlow</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            data-testid="button-close-sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.path
            const IconComponent = item.icon
            
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                `}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="text-white text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate" data-testid="sidebar-username">
                {getUserDisplayName()}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-notifications"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              data-testid="button-open-sidebar"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded overflow-hidden">
                <img src={logoImage} alt="ChartFlow Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold text-foreground">ChartFlow</span>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}