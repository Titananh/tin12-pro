// ==========================================
// Layout Components - Tin12 Pro Cánh Diều
// Academy Cockpit shell (Navbar + Footer)
// ==========================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ---- SVG Icons ---- */
const IconHome = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const IconBook = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const IconCode = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const IconExam = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const IconSparkle = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const IconTeacher = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconAdmin = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconPricing = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconMenu = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconX = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ---- Nav items ---- */
const NAV_ITEMS = [
  { href: '/courses',  label: 'Courses',   Icon: IconBook      },
  { href: '/dashboard', label: 'Dashboard', Icon: IconHome    },
  { href: '/labs',      label: 'Labs',      Icon: IconCode    },
  { href: '/exams',     label: 'Exams',     Icon: IconExam     },
  { href: '/ai-tutor',  label: 'AI Tutor',  Icon: IconSparkle  },
  { href: '/teacher',   label: 'Teacher',   Icon: IconTeacher  },
  { href: '/admin',     label: 'Admin',     Icon: IconAdmin    },
  { href: '/pricing',   label: 'Pricing',   Icon: IconPricing  },
];

interface NavbarProps {
  user?: { name: string; avatar?: string; role?: string };
}

/* ============================================================
   NAVBAR
   ============================================================ */
export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="navbar glass-panel--sticky">
        <div className="navbar__inner">

          {/* Mobile hamburger */}
          <button
            className="navbar__mobile-toggle focus-ring"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>

          {/* Logo */}
          <Link href="/" className="navbar__logo focus-ring" aria-label="Tin12 Pro — Trang chủ">
            <div className="navbar__logo-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#ccfbf1" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#5eead4" opacity="0.7" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#5eead4" opacity="0.5" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0d9488" />
              </svg>
            </div>
            <div>
              <span className="navbar__logo-text">Tin12 Pro</span>
              <span className="navbar__logo-badge">Cánh Diều</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={`navbar__link${pathname === href ? ' navbar__link--active' : ''}`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                <Icon />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="navbar__actions">
            <div className="navbar__stat navbar__stat--streak" title="Learning streak">
              <svg className="navbar__stat-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1.5c-.5 0-1 .3-1.2.7L5.5 5.5 2 5.5c-.6 0-1 .4-1 1s.4 1 1 1l4 0c.3 0 .6.2.7.5l1.3 3.5c.2.4.6.5 1 .5s.8-.2 1-.5l1.3-3.5c.1-.3.4-.5.7-.5l4 0c.6 0 1-.4 1-1s-.4-1-1-1l-3.5 0-1.3-3.3c-.2-.4-.7-.7-1.2-.7z" />
              </svg>
              <span>7</span>
            </div>
            <div className="navbar__stat navbar__stat--xp" title="Experience points">
              <svg className="navbar__stat-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
              </svg>
              <span>2,450 XP</span>
            </div>
            {user ? (
              <Link href="/dashboard" className="navbar__avatar focus-ring" aria-label={`Profile — ${user.name}`}>
                {user.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </Link>
            ) : (
              <Link href="/dashboard" className="navbar__avatar focus-ring" aria-label="Profile — Minh">
                M
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          className={`navbar__mobile-menu${mobileOpen ? ' navbar__mobile-menu--open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <nav className="navbar__mobile-links container" aria-label="Mobile navigation">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`navbar__link${pathname === href ? ' navbar__link--active' : ''}`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                <Icon />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#ccfbf1" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#5eead4" opacity="0.7" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#5eead4" opacity="0.5" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0d9488" />
              </svg>
            </div>
            <div>
              <span className="navbar__logo-text">Tin12 Pro</span>
              <span className="navbar__logo-badge">Cánh Diều</span>
            </div>
          </div>
          <p className="footer__desc">
            Nền tảng EdTech cao cấp dành cho học sinh lớp 12 theo chương trình Tin học Cánh Diều. Học từ mất gốc đến luyện thi THPT với AI Tutor 24/7.
          </p>
        </div>

        <div>
          <h3 className="footer__col-title">Nền tảng</h3>
          <ul className="footer__links">
            <li><Link href="/courses"   className="footer__link">Khóa học</Link></li>
            <li><Link href="/labs"       className="footer__link">Labs</Link></li>
            <li><Link href="/exams"     className="footer__link">Đề thi</Link></li>
            <li><Link href="/ai-tutor"  className="footer__link">AI Tutor</Link></li>
            <li><Link href="/pricing"   className="footer__link">Bảng giá</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__col-title">Tài nguyên</h3>
          <ul className="footer__links">
            <li><Link href="/dashboard"   className="footer__link">Dashboard</Link></li>
            <li><Link href="/flashcards" className="footer__link">Flashcards</Link></li>
            <li><Link href="/leaderboard" className="footer__link">Xếp hạng</Link></li>
            <li><Link href="/onboarding"  className="footer__link">Bắt đầu</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__col-title">Hỗ trợ</h3>
          <ul className="footer__links">
            <li><a href="#" className="footer__link">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="footer__link">Liên hệ</a></li>
            <li><a href="#" className="footer__link">Điều khoản</a></li>
            <li><a href="#" className="footer__link">Bảo mật</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">&copy; 2026 Tin12 Pro Cánh Diều. Mọi quyền được bảo lưu.</p>
        <p className="footer__copy">Chương trình Giáo dục Phổ thông 2018</p>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN LAYOUT
   ============================================================ */
interface MainLayoutProps {
  children: React.ReactNode;
  user?: NavbarProps['user'];
}

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="academy-shell">
      <Navbar user={user} />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
