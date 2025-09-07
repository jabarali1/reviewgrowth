import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AuthModal from '@/components/AuthModal'
import { useAuth } from '@/hooks/useAuth'
import { BarChart3, Rocket, Zap, Shield, Puzzle } from 'lucide-react'
import logoImage from '@assets/logo_1757250363416.jpg'

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const { user } = useAuth()

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="min-h-screen relative hero-pattern">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3" data-testid="logo">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src={logoImage} alt="ChartFlow Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-foreground">ChartFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Button
              variant="ghost"
              onClick={() => openAuthModal('login')}
              className="text-primary hover:text-primary/80"
              data-testid="button-signin"
            >
              Sign In
            </Button>
          </div>
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6" data-testid="coming-soon-badge">
              <Rocket className="w-4 h-4 mr-2" />
              Coming Soon - Early Access Available
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Analytics That
              <span className="gradient-bg bg-clip-text text-transparent"> Drive Results</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="hero-description">
              Transform your data into actionable insights with our powerful analytics platform.
              Join thousands of teams making data-driven decisions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => openAuthModal('signup')}
              className="gradient-bg text-primary-foreground px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity group"
              data-testid="button-get-started"
            >
              Get Started Free
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="border-border px-8 py-4 text-lg font-semibold hover:bg-accent transition-colors"
              data-testid="button-view-demo"
            >
              View Demo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 border-none shadow-none bg-transparent" data-testid="feature-realtime">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-primary text-xl" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">Monitor your metrics as they happen with live dashboards.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-none shadow-none bg-transparent" data-testid="feature-secure">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary text-xl" />
                </div>
                <h3 className="font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-muted-foreground">Enterprise-grade security with GDPR compliance built-in.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-none shadow-none bg-transparent" data-testid="feature-integration">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Puzzle className="text-primary text-xl" />
                </div>
                <h3 className="font-semibold mb-2">Easy Integration</h3>
                <p className="text-muted-foreground">Connect with your favorite tools in just a few clicks.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}
