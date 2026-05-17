'use client';

import Link from 'next/link';

const navLinks = [
  { href: '/courses', label: 'Khóa học' },
  { href: '/labs', label: 'Thực hành' },
  { href: '/exams', label: 'Thi thử' },
  { href: '/ai-tutor', label: 'AI Tutor' },
  { href: '/pricing', label: 'Gói học' },
];

export function LandingNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1220]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Tin12 Pro home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 text-sm font-black tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-transform group-hover:scale-[1.03]">
            T12
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">Tin12 Pro</span>
            <span className="block text-xs text-[#a8b6ad]">Cánh Diều Academy</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#cbd5d0] transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#cbd5d0] transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Vào học
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex h-11 items-center rounded-full bg-[#f7f4ec] px-5 text-sm font-bold text-[#0b1220] shadow-[0_12px_40px_rgba(247,244,236,0.18)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Kiểm tra trình độ
          </Link>
        </div>
      </div>
    </nav>
  );
}
