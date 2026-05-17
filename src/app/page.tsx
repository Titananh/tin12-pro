// ==========================================
// Landing Page - Tin12 Pro Cánh Diều
// Premium EdTech SaaS landing page
// ==========================================

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-40 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T12</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">Tin12 Pro</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/courses" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600">Khóa học</Link>
          <Link href="/ai-tutor" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600">AI Tutor</Link>
          <Link href="/exams" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600">Thi thử</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/onboarding"
            className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full flex items-center"
          >
            Bắt đầu ngay
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Đã có hơn 10,000+ học sinh tin tưởng
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Từ <span className="text-blue-600 dark:text-blue-400">mất gốc</span> Tin học 12
                <br />
                đến <span className="text-violet-600 dark:text-violet-400">làm chủ</span> kiến thức
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Tin12 Pro Cánh Diều - Nền tảng học tập thông minh với lộ trình cá nhân hóa, 
                AI Tutor hỗ trợ 24/7 và ngân hàng câu hỏi phong phú giúp bạn tự tin bước vào kỳ thi THPT.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboarding"
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  Bắt đầu học miễn phí
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/courses"
                  className="h-12 px-6 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Khám phá khóa học
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Học miễn phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Không cần thẻ</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Học mọi lúc</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700 animate-fade-in">
                {/* Mock dashboard preview */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-lg">📚</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Kiến trúc máy tính</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Bài 1 • 45 phút</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full">Hoàn thành</span>
                  </div>

                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">85%</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Điểm TB</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">7</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Ngày streak</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">156</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Tại sao chọn Tin12 Pro?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Nền tảng EdTech được thiết kế riêng cho chương trình Tin học 12 Cánh Diều
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 dark:text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sẵn sàng bắt đầu hành trình?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Đăng ký ngay hôm nay và nhận lộ trình học tập cá nhân hóa, 
              hoàn toàn miễn phí cho học sinh Việt Nam.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex h-12 px-8 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Bắt đầu ngay - Hoàn toàn miễn phí
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T12</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Tin12 Pro Cánh Diều</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 Tin12 Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    title: 'Lộ trình cá nhân hóa',
    description: 'AI phân tích năng lực và đề xuất lộ trình học tập phù hợp với mục tiêu của bạn.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    color: 'bg-blue-600',
  },
  {
    title: 'AI Tutor 24/7',
    description: 'Gia sư AI hỗ trợ giải đáp thắc mắc mọi lúc, giúp bạn hiểu sâu thay vì chỉ có đáp án.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    color: 'bg-violet-600',
  },
  {
    title: 'Ngân hàng 500+ câu hỏi',
    description: 'Câu hỏi đa dạng theo cấu trúc đề thi THPT, có giải thích chi tiết từng đáp án.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: 'bg-emerald-600',
  },
  {
    title: 'Luyện thi sát thực tế',
    description: 'Thi thử với đề mô phỏng 50 phút, cấu trúc y hệt kỳ thi tốt nghiệp THPT.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    color: 'bg-amber-500',
  },
  {
    title: 'Flashcards thông minh',
    description: 'Hệ thống spaced repetition giúp bạn nhớ lâu hơn với 100+ flashcards theo chủ đề.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    color: 'bg-cyan-600',
  },
  {
    title: 'Theo dõi tiến độ',
    description: 'Dashboard trực quan hiển thị điểm mạnh/yếu, streak học tập và XP leveling.',
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    color: 'bg-pink-600',
  },
];

const STATS = [
  { value: '10,000+', label: 'Học sinh đang học' },
  { value: '500+', label: 'Câu hỏi trong ngân hàng' },
  { value: '50+', label: 'Bài học video' },
  { value: '95%', label: 'Học sinh cải thiện điểm số' },
];