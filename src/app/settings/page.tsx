// ==========================================
// Settings Page - Tin12 Pro Canh Diep
// Profile, Security, Notifications, Theme settings
// ==========================================

'use client';

import { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { mockUser } from '@/content/demo';

// ============ ICONS (inline SVG) ============
const IconUser = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const IconShield = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const IconBell = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.822M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.25h3l-3 4.5h-3M15 12h3l-3 4.5h-3M6.75 8.25h3l-3 4.5h-3" />
  </svg>
);

const IconGear = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h2.086c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v2.086c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.389.966.45 1.45.12l.738-.527c.418-.28.509-1.065.12-1.45l-.774-.773a1.125 1.125 0 00-1.449-.12l-.738.527c-.35.25-.806.272-1.203.107-.397-.165-.71-.505-.781-.929l-.149-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconUpload = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a22.05 22.05 0 00-3.592 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

// ============ TYPES ============
type SettingsTab = 'profile' | 'security' | 'notifications' | 'theme' | 'account';

interface SettingSection {
  id: string;
  title: string;
  description: string;
}

const _sections: Record<SettingsTab, SettingSection[]> = {
  profile: [
    { id: 'avatar', title: 'Avatar', description: 'Upload new photo or choose from library' },
    { id: 'name', title: 'Full Name', description: 'Display name on profile' },
    { id: 'email', title: 'Email', description: 'Email linked to account' },
    { id: 'bio', title: 'Bio', description: 'A few lines about you' },
    { id: 'class', title: 'Class', description: 'Current class' },
  ],
  security: [
    { id: 'password', title: 'Password', description: 'Update new password' },
    { id: '2fa', title: '2-Factor Auth', description: 'Protect account with 2FA' },
    { id: 'sessions', title: 'Login Sessions', description: 'Manage logged in devices' },
    { id: 'devices', title: 'Devices', description: 'List of active devices' },
  ],
  notifications: [
    { id: 'email-notif', title: 'Email Notifications', description: 'Receive emails about learning activity' },
    { id: 'push-notif', title: 'Push Notifications', description: 'Notifications on browser' },
    { id: 'reminder', title: 'Learning Reminders', description: 'Streak and assignment reminders' },
    { id: 'achievements', title: 'Achievement Alerts', description: 'Notify when earning badges' },
    { id: 'weekly', title: 'Weekly Report', description: 'Weekly activity summary on Sunday' },
  ],
  theme: [
    { id: 'mode', title: 'Display Mode', description: 'Light / Dark / Auto' },
    { id: 'accent', title: 'Accent Color', description: 'Accent color for interface' },
    { id: 'font', title: 'Font Size', description: 'Text size' },
    { id: 'compact', title: 'Compact Mode', description: 'Compact UI for small screens' },
  ],
  account: [
    { id: 'plan', title: 'Subscription', description: 'View and manage current plan' },
    { id: 'billing', title: 'Billing', description: 'History and payment methods' },
    { id: 'export', title: 'Export Data', description: 'Download all your data' },
    { id: 'delete', title: 'Delete Account', description: 'Permanently delete account and data' },
  ],
};

const NotificationToggle = ({ label, description, enabled, onChange }: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
    <div>
      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled ? 'translate-x-6' : ''
        }`}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saving, setSaving] = useState(false);
  const user = mockUser;

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminder: true,
    achievements: true,
    weekly: false,
  });

  const [themeSettings, setThemeSettings] = useState({
    mode: 'dark',
    accent: '#2563EB',
    fontSize: 'medium',
    compact: false,
  });

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <IconUser /> },
    { id: 'security', label: 'Security', icon: <IconShield /> },
    { id: 'notifications', label: 'Notifications', icon: <IconBell /> },
    { id: 'theme', label: 'Theme', icon: <IconPalette /> },
    { id: 'account', label: 'Account', icon: <IconGear /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <IconGear />
          </div>
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account and customize your learning experience
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:w-64 p-3 flex-shrink-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" padding="none">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <IconUser />
                Profile Information
              </h2>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">{user.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{user.email}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <IconUpload />
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full h-11 px-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full h-11 px-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Class
                  </label>
                  <select className="w-full h-11 px-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>12A1</option>
                    <option>12A2</option>
                    <option>12A3</option>
                    <option>12B1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="A few lines about you..."
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave} isLoading={saving}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <IconShield />
                Account Security
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Password</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: 15/05/2026</p>
                  </div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">2-Factor Authentication</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Not enabled - Enhance security</p>
                  </div>
                  <Badge variant="amber" size="sm">Not Active</Badge>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium text-slate-900 dark:text-white">Login Sessions</p>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'Hanoi, VN', time: 'Active now', current: true },
                      { device: 'Safari on iPhone', location: 'Hanoi, VN', time: '2 hours ago', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{session.device}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{session.location} - {session.time}</p>
                        </div>
                        {session.current && <Badge variant="emerald" size="sm">Current</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <IconBell />
                Notification Settings
              </h2>

              <div className="space-y-1">
                <NotificationToggle
                  label="Email Notifications"
                  description="Receive emails about learning activity"
                  enabled={notifications.email}
                  onChange={(v) => setNotifications(n => ({ ...n, email: v }))}
                />
                <NotificationToggle
                  label="Push Notifications"
                  description="Notifications on browser"
                  enabled={notifications.push}
                  onChange={(v) => setNotifications(n => ({ ...n, push: v }))}
                />
                <NotificationToggle
                  label="Learning Reminders"
                  description="Streak and daily assignment reminders"
                  enabled={notifications.reminder}
                  onChange={(v) => setNotifications(n => ({ ...n, reminder: v }))}
                />
                <NotificationToggle
                  label="Achievement Alerts"
                  description="Notify when earning badges or completing milestones"
                  enabled={notifications.achievements}
                  onChange={(v) => setNotifications(n => ({ ...n, achievements: v }))}
                />
                <NotificationToggle
                  label="Weekly Report"
                  description="Weekly activity summary on Sunday"
                  enabled={notifications.weekly}
                  onChange={(v) => setNotifications(n => ({ ...n, weekly: v }))}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={handleSave} isLoading={saving}>
                  Save Changes
                </Button>
              </div>
            </Card>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <IconPalette />
                Appearance
              </h2>

              <div className="space-y-8">
                {/* Display Mode */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Display Mode
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'light', label: 'Light' },
                      { id: 'dark', label: 'Dark' },
                      { id: 'auto', label: 'Auto' },
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setThemeSettings(s => ({ ...s, mode: mode.id }))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${
                          themeSettings.mode === mode.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                        }`}
                      >
                        <span className="font-medium text-sm">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { color: '#2563EB', label: 'Blue' },
                      { color: '#7C3AED', label: 'Purple' },
                      { color: '#06B6D4', label: 'Cyan' },
                      { color: '#16A34A', label: 'Green' },
                      { color: '#F97316', label: 'Orange' },
                      { color: '#DC2626', label: 'Red' },
                    ].map(c => (
                      <button
                        key={c.color}
                        onClick={() => setThemeSettings(s => ({ ...s, accent: c.color }))}
                        className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 flex items-center justify-center`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      >
                        {themeSettings.accent === c.color && (
                          <span className="text-white"><IconCheck /></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Font Size
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'small', label: 'Small', size: 'text-sm' },
                      { id: 'medium', label: 'Medium', size: 'text-base' },
                      { id: 'large', label: 'Large', size: 'text-lg' },
                    ].map(size => (
                      <button
                        key={size.id}
                        onClick={() => setThemeSettings(s => ({ ...s, fontSize: size.id }))}
                        className={`px-5 py-2.5 rounded-lg border-2 transition-colors ${
                          themeSettings.fontSize === size.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                        }`}
                      >
                        <span className={size.size}>{size.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compact Mode */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Compact Mode</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Compact UI for small screens</p>
                  </div>
                  <button
                    onClick={() => setThemeSettings(s => ({ ...s, compact: !s.compact }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      themeSettings.compact ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        themeSettings.compact ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={handleSave} isLoading={saving}>
                  Apply
                </Button>
              </div>
            </Card>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <IconGear />
                Account Management
              </h2>

              <div className="space-y-6">
                {/* Current Plan */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Current Plan: Free</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">You are using the free plan</p>
                    </div>
                    <Badge variant="default">Free</Badge>
                  </div>
                  <Button variant="primary" size="sm" className="mt-3">
                    Upgrade to Pro
                  </Button>
                </div>

                {/* Billing */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Payment Method</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">No payment method added</p>
                  </div>
                  <Button variant="outline" size="sm">Add</Button>
                </div>

                {/* Export Data */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Export Data</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Download all your data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <IconUpload />
                    Export
                  </Button>
                </div>

                {/* Delete Account */}
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400">Delete Account</p>
                      <p className="text-sm text-red-500/80">Permanently delete account and all data</p>
                    </div>
                    <Button variant="danger" size="sm">
                      <IconTrash />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}