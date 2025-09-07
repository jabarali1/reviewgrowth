import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  CreditCard,
  Save,
  Upload
} from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.name || 
           user?.email?.split('@')[0] || 
           'User'
  }

  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    fullName: getUserDisplayName(),
    email: user?.email || '',
    phone: '',
    timezone: 'America/New_York',
    language: 'en',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
    
    // Privacy & Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    dataSharing: false,
    
    // Appearance
    theme: 'light',
    compactView: false,
    
    // Billing
    currency: 'USD',
    invoiceEmail: user?.email || ''
  })

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    // Show success message (would integrate with toast system)
    alert('Settings saved successfully!')
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" data-testid="settings-title">
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account preferences and configuration</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="gradient-bg text-primary-foreground"
          data-testid="button-save-settings"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card data-testid="card-profile-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => handleSettingChange('fullName', e.target.value)}
                data-testid="input-full-name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                data-testid="input-email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => handleSettingChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Appearance */}
        <Card data-testid="card-notifications-appearance">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications & Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium">Notifications</h4>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  data-testid="switch-email-notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  data-testid="switch-push-notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <Switch
                  id="weekly-reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  data-testid="switch-weekly-reports"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <Switch
                  id="marketing-emails"
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  data-testid="switch-marketing-emails"
                />
              </div>
            </div>

            <Separator />

            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </h4>
              
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                  <SelectTrigger data-testid="select-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Compact View</Label>
                <Switch
                  id="compact-view"
                  checked={settings.compactView}
                  onCheckedChange={(checked) => handleSettingChange('compactView', checked)}
                  data-testid="switch-compact-view"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Billing */}
        <Card data-testid="card-security-billing">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Security */}
            <div className="space-y-4">
              <h4 className="font-medium">Security</h4>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                <Switch
                  id="two-factor-auth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  data-testid="switch-two-factor-auth"
                />
              </div>
              
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                  <SelectTrigger data-testid="select-session-timeout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="data-sharing">Allow Data Sharing</Label>
                <Switch
                  id="data-sharing"
                  checked={settings.dataSharing}
                  onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  data-testid="switch-data-sharing"
                />
              </div>
            </div>

            <Separator />

            {/* Billing */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </h4>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                  <SelectTrigger data-testid="select-currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="invoice-email">Invoice Email</Label>
                <Input
                  id="invoice-email"
                  type="email"
                  value={settings.invoiceEmail}
                  onChange={(e) => handleSettingChange('invoiceEmail', e.target.value)}
                  data-testid="input-invoice-email"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}