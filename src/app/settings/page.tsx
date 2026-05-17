// ==========================================
// Settings Page - Tin12 Pro Cánh Diều
// Profile, Security, Notifications, Theme settings
// ==========================================

'use client';

import { useState } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { mockUser } from '@/content/demo';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'theme' | 'account';

interface SettingSection {
  id: string;
  title: string;
  description: string;
}

const _sections: Record<SettingsTab, SettingSection[]> = {
  profile: [
    { id: 'avatar', title: 'Ảnh đại diện', description: 'Tải lên ảnh mới hoặc chọn từ thư viện' },
    { id: 'name', title: 'Họ và tên', description: 'Tên hiển thị trên profile' },
    { id: 'email', title: 'Email', description: 'Email liên kết với tài khoản' },
    { id: 'bio', title: 'Giới thiệu bản thân', description: 'Một vài dòng về bạn' },
    { id: 'class', title: 'Lớp', description: 'Lớp học hiện tại' },
  ],
  security: [
    { id: 'password', title: 'Đổi mật khẩu', description: 'Cập nhật mật khẩu mới' },
    { id: '2fa', title: 'Xác thực 2 yếu tố', description: 'Bảo vệ tài khoản với 2FA' },
    { id: 'sessions', title: 'Phiên đăng nhập', description: 'Quản lý các thiết bị đã đăng nhập' },
    { id: 'devices', title: 'Thiết bị', description: 'Danh sách thiết bị đang hoạt động' },
  ],
  notifications: [
    { id: 'email-notif', title: 'Email thông báo', description: 'Nhận email về hoạt động học tập' },
    { id: 'push-notif', title: 'Push notification', description: 'Thông báo trên trình duyệt' },
    { id: 'reminder', title: 'Nhắc nhở học tập', description: 'Nhắc nhở streak và bài tập' },
    { id: 'achievements', title: 'Thông báo thành tích', description: 'Thông báo khi đạt huy hiệu mới' },
    { id: 'weekly', title: 'Báo cáo tuần', description: 'Tổng kết hoạt động hàng tuần' },
  ],
  theme: [
    { id: 'mode', title: 'Chế độ hiển thị', description: 'Sáng / Tối / Tự động' },
    { id: 'accent', title: 'Màu chủ đạo', description: 'Màu accent cho giao diện' },
    { id: 'font', title: 'Cỡ chữ', description: 'Kích thước văn bản' },
    { id: 'compact', title: 'Chế độ tiết kiệm', description: 'Giao diện compact cho màn hình nhỏ' },
  ],
  account: [
    { id: 'plan', title: ' Gói dịch vụ', description: 'Xem và quản lý gói đang sử dụng' },
    { id: 'billing', title: ' Thanh toán', description: 'Lịch sử và phương thức thanh toán' },
    { id: 'export', title: 'Xuất dữ liệu', description: 'Tải xuống toàn bộ dữ liệu của bạn' },
    { id: 'delete', title: 'Xóa tài khoản', description: 'Xóa vĩnh viễn tài khoản và dữ liệu' },
  ],
};

const _ThemeOption = ({ color, label }: { color: string; label: string }) => (
  <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
    <div className={`w-10 h-10 rounded-full bg-${color}-500`} style={{ backgroundColor: color }} />
    <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
  </button>
);

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

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Hồ sơ', icon: '👤' },
    { id: 'security', label: 'Bảo mật', icon: '🔒' },
    { id: 'notifications', label: 'Thông báo', icon: '🔔' },
    { id: 'theme', label: 'Giao diện', icon: '🎨' },
    { id: 'account', label: 'Tài khoản', icon: '⚙️' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          ⚙️ Cài đặt
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Quản lý tài khoản và tùy chỉnh trải nghiệm học tập
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:w-64 p-3 flex-shrink-0" padding="none">
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
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                👤 Thông tin hồ sơ
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
                    <Button variant="outline" size="sm">Tải ảnh mới</Button>
                    <Button variant="ghost" size="sm">Xóa ảnh</Button>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Họ và tên
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
                    Lớp
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
                    Giới thiệu bản thân
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Một vài dòng về bạn..."
                    className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave} isLoading={saving}>
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                🔒 Bảo mật tài khoản
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Mật khẩu</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Cập nhật lần cuối: 15/05/2026</p>
                  </div>
                  <Button variant="outline" size="sm">Đổi mật khẩu</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Xác thực 2 yếu tố</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Chưa bật - Tăng cường bảo mật</p>
                  </div>
                  <Badge variant="amber" size="sm">Chưa kích hoạt</Badge>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-medium text-slate-900 dark:text-white">Phiên đăng nhập</p>
                    <Button variant="ghost" size="sm">Xem tất cả</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome trên Windows', location: 'Hà Nội, VN', time: 'Đang hoạt động', current: true },
                      { device: 'Safari trên iPhone', location: 'Hà Nội, VN', time: '2 giờ trước', current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{session.device}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{session.location} • {session.time}</p>
                        </div>
                        {session.current && <Badge variant="emerald" size="sm">Hiện tại</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                🔔 Cài đặt thông báo
              </h2>

              <div className="space-y-1">
                <NotificationToggle
                  label="Email thông báo"
                  description="Nhận email về hoạt động học tập"
                  enabled={notifications.email}
                  onChange={(v) => setNotifications(n => ({ ...n, email: v }))}
                />
                <NotificationToggle
                  label="Push notification"
                  description="Thông báo trên trình duyệt"
                  enabled={notifications.push}
                  onChange={(v) => setNotifications(n => ({ ...n, push: v }))}
                />
                <NotificationToggle
                  label="Nhắc nhở học tập"
                  description="Nhắc nhở streak và bài tập hàng ngày"
                  enabled={notifications.reminder}
                  onChange={(v) => setNotifications(n => ({ ...n, reminder: v }))}
                />
                <NotificationToggle
                  label="Thông báo thành tích"
                  description="Thông báo khi đạt huy hiệu hoặc hoàn thành mốc"
                  enabled={notifications.achievements}
                  onChange={(v) => setNotifications(n => ({ ...n, achievements: v }))}
                />
                <NotificationToggle
                  label="Báo cáo tuần"
                  description="Tổng kết hoạt động hàng tuần vào Chủ Nhật"
                  enabled={notifications.weekly}
                  onChange={(v) => setNotifications(n => ({ ...n, weekly: v }))}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={handleSave} isLoading={saving}>
                  Lưu thay đổi
                </Button>
              </div>
            </Card>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                🎨 Giao diện
              </h2>

              <div className="space-y-8">
                {/* Display Mode */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Chế độ hiển thị
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'light', label: 'Sáng', icon: '☀️' },
                      { id: 'dark', label: 'Tối', icon: '🌙' },
                      { id: 'auto', label: 'Tự động', icon: '⚙️' },
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
                        <span>{mode.icon}</span>
                        <span className="font-medium text-sm">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Màu chủ đạo
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { color: '#2563EB', label: 'Xanh dương' },
                      { color: '#7C3AED', label: 'Tím' },
                      { color: '#06B6D4', label: 'Cyan' },
                      { color: '#16A34A', label: 'Xanh lá' },
                      { color: '#F97316', label: 'Cam' },
                      { color: '#DC2626', label: 'Đỏ' },
                    ].map(c => (
                      <button
                        key={c.color}
                        onClick={() => setThemeSettings(s => ({ ...s, accent: c.color }))}
                        className={`w-12 h-12 rounded-xl transition-transform hover:scale-110 flex items-center justify-center`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      >
                        {themeSettings.accent === c.color && (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Cỡ chữ
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: 'small', label: 'Nhỏ', size: 'text-sm' },
                      { id: 'medium', label: 'Vừa', size: 'text-base' },
                      { id: 'large', label: 'Lớn', size: 'text-lg' },
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
                    <p className="font-medium text-slate-900 dark:text-white">Chế độ tiết kiệm</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Giao diện compact cho màn hình nhỏ</p>
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
                  Áp dụng
                </Button>
              </div>
            </Card>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                ⚙️ Quản lý tài khoản
              </h2>

              <div className="space-y-6">
                {/* Current Plan */}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Gói hiện tại: Free</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Bạn đang sử dụng gói miễn phí</p>
                    </div>
                    <Badge variant="default">Miễn phí</Badge>
                  </div>
                  <Button variant="primary" size="sm" className="mt-3">
                    Nâng cấp lên Pro
                  </Button>
                </div>

                {/* Billing */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Phương thức thanh toán</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Chưa có phương thức thanh toán</p>
                  </div>
                  <Button variant="outline" size="sm">Thêm</Button>
                </div>

                {/* Export Data */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Xuất dữ liệu</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tải xuống toàn bộ dữ liệu của bạn</p>
                  </div>
                  <Button variant="outline" size="sm">Xuất</Button>
                </div>

                {/* Delete Account */}
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400">Xóa tài khoản</p>
                      <p className="text-sm text-red-500/80">Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu</p>
                    </div>
                    <Button variant="danger" size="sm">Xóa</Button>
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