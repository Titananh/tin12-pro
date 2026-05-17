'use client';

import Link from 'next/link';
import { LandingNav } from '@/components/landing/LandingNav';

const stats = [
  ['5', 'khóa học', 'Nền tảng, CS, ICT, luyện thi, portfolio'],
  ['21', 'bài học', 'Giải thích dễ hiểu, chuẩn kiến thức, deep dive'],
  ['224', 'câu hỏi', 'MCQ, đúng/sai nhóm, code reading'],
  ['8', 'labs', 'HTML/CSS, mạng, dữ liệu, project'],
  ['100', 'flashcards', 'Spaced repetition theo chủ đề'],
  ['194', 'tests pass', 'Engine học tập đã được kiểm thử'],
];

const tracks = [
  ['Nền tảng chung', 'AI, mạng, đạo đức số, HTML/CSS, hướng nghiệp', '01'],
  ['Khoa học máy tính', 'LAN, học máy, dữ liệu, mô phỏng, thuật toán', '02'],
  ['Tin học ứng dụng', 'Thiết bị số, website, biểu mẫu, xuất bản web', '03'],
  ['Luyện thi THPT', 'Đề 50 phút, câu đúng/sai, phân tích lỗi sai', '04'],
  ['Portfolio CNTT', 'Website cá nhân, báo cáo dữ liệu, hồ sơ năng lực', '05'],
];

const proof = [
  ['Chẩn đoán trước khi học', 'Placement test phân loại mất gốc, nền yếu, chuẩn thi hoặc nâng cao.'],
  ['Học bằng cockpit', 'Dashboard gom việc hôm nay, mastery map, câu sai, lab và flashcards.'],
  ['Thực hành thật', 'Lab có starter code, checklist, hint, rubric và live preview sandbox.'],
  ['Thi thử có phân tích', 'Part 1, Part 2, timer, navigator, result analysis và lộ trình vá lỗi.'],
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ProductConsole() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] rounded-[2rem] border border-white/12 bg-[#101a2b]/92 p-4 shadow-[0_40px_120px_rgba(4,12,24,0.48)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#9ab5ab]">Academy cockpit</p>
          <p className="mt-1 text-lg font-bold text-white">Minh Anh, track THPT</p>
        </div>
        <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          84% sẵn sàng
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Streak', '14', '+2 ngày'],
          ['XP tuần', '2,450', '+360 XP'],
          ['Đề gần nhất', '8.2', '+0.5 điểm'],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs text-[#9ab5ab]">{label}</p>
            <p className="mt-2 text-2xl font-black text-white">{value}</p>
            <p className="mt-1 text-xs text-emerald-200">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-white">Việc nên làm hôm nay</p>
            <span className="text-xs text-[#9ab5ab]">42 phút</span>
          </div>
          <div className="space-y-3">
            {[
              ['Ôn CSS layout', 'Vì mastery CSS còn 58%'],
              ['10 câu mạng LAN', 'Sai nhiều router/switch'],
              ['Lab portfolio card', 'Chuyển lý thuyết thành kỹ năng'],
            ].map(([title, sub], index) => (
              <div key={title} className="flex gap-3 rounded-xl bg-[#0b1220]/60 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-xs font-bold text-emerald-200">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-[#9ab5ab]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <p className="mb-4 font-semibold text-white">Mastery map</p>
          {[
            ['HTML/CSS', 76],
            ['Mạng', 49],
            ['AI', 68],
            ['Đạo đức số', 83],
          ].map(([topic, score]) => (
            <div key={topic} className="mb-4 last:mb-0">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-[#cbd5d0]">{topic}</span>
                <span className="font-semibold text-white">{score}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#0f766e] to-[#f2c078]" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-100/80">AI Tutor</p>
        <p className="mt-2 text-sm leading-relaxed text-white">
          Em đang nhầm router với switch. Hãy nhớ: switch nối thiết bị trong LAN, router nối các mạng khác nhau.
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#f7f4ec] text-[#0b1220]">
      <LandingNav />

      <section className="relative bg-[#0b1220] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.28),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(217,119,6,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div className="max-w-[680px]">
            <div className="mb-7 inline-flex rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-[#cbd5d0] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              Tin học 12 Cánh Diều, từ mất gốc đến sẵn sàng thi
            </div>
            <h1 className="text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Học Tin 12 như một nền tảng luyện thi cao cấp.
            </h1>
            <p className="mt-7 max-w-[61ch] text-lg leading-8 text-[#cbd5d0] sm:text-xl">
              Tin12 Pro gom lộ trình cá nhân hóa, bài học dễ hiểu, lab HTML/CSS, đề 50 phút, flashcards và AI Tutor vào một cockpit học tập duy nhất.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/onboarding" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#f7f4ec] px-7 text-base font-black text-[#0b1220] shadow-[0_18px_55px_rgba(247,244,236,0.22)] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Kiểm tra trình độ miễn phí
                <ArrowIcon />
              </Link>
              <Link href="/dashboard" className="inline-flex h-13 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] px-7 text-base font-bold text-white transition-colors hover:bg-white/10">
                Xem cockpit học tập
              </Link>
            </div>

            <div className="mt-9 grid gap-3 text-sm text-[#cbd5d0] sm:grid-cols-3">
              {['Không cần thẻ', 'Có dữ liệu mẫu thật', 'Thi thử 50 phút'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-300/10 text-emerald-200"><CheckIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <ProductConsole />
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map(([value, label, sub]) => (
            <div key={label} className="rounded-[1.75rem] border border-[#d8d2c5] bg-white/70 p-5 shadow-[0_18px_55px_rgba(11,18,32,0.06)]">
              <p className="text-4xl font-black tracking-tight text-[#0f766e]">{value}</p>
              <p className="mt-2 font-bold text-[#0b1220]">{label}</p>
              <p className="mt-1 text-xs leading-5 text-[#64716b]">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#0f766e]">Learning architecture</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Không phải blog tài liệu. Đây là hệ thống học có dữ liệu.</h2>
            <p className="mt-4 text-lg leading-8 text-[#5d6761]">Mỗi buổi học có mục tiêu, bài đọc, quiz, lab, câu thi, flashcard và đề xuất tiếp theo dựa trên mastery.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {proof.map(([title, desc], index) => (
              <div key={title} className={`rounded-[2rem] border p-6 ${index === 0 ? 'border-[#0f766e]/30 bg-[#0f766e] text-white lg:col-span-2' : 'border-[#d8d2c5] bg-white/75 text-[#0b1220]'}`}>
                <span className={`mb-10 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${index === 0 ? 'bg-white/12 text-white' : 'bg-[#0b1220] text-white'}`}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-black tracking-tight">{title}</h3>
                <p className={`mt-3 leading-7 ${index === 0 ? 'text-emerald-50' : 'text-[#5d6761]'}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1220] px-6 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f2c078]">Roadmap</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Từ nền tảng đến portfolio CNTT.</h2>
            <p className="mt-5 text-lg leading-8 text-[#cbd5d0]">Học đủ phần chung, chọn nhánh CS hoặc ICT, luyện đề theo cấu trúc và kết thúc bằng sản phẩm có thể đưa vào hồ sơ cá nhân.</p>
            <Link href="/courses" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#f7f4ec] px-6 font-black text-[#0b1220]">
              Khám phá khóa học
              <ArrowIcon />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tracks.map(([title, desc, number]) => (
              <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.2em] text-[#9ab5ab]">TRACK</span>
                  <span className="text-sm font-black text-[#f2c078]">{number}</span>
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-[#cbd5d0]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div className="rounded-[2.5rem] border border-[#d8d2c5] bg-white p-6 shadow-[0_24px_90px_rgba(11,18,32,0.08)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Đề thi 50 phút', '24 câu trắc nghiệm, 6 nhóm đúng/sai, có timer và navigator.'],
                ['Lab workspace', 'Đề bài, checklist, hint, editor, preview và rubric trong một màn hình.'],
                ['Mistake analytics', 'Phân loại lỗi sai theo chủ đề, dạng bẫy, tốc độ và độ khó.'],
                ['AI Tutor guardrails', 'Gợi ý từng bước khi đang làm bài, không đưa đáp án ngay.'],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-[1.75rem] bg-[#f7f4ec] p-5">
                  <p className="font-black text-[#0b1220]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5d6761]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#0f766e]">Practice proof</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Thi thật trước khi thi thật.</h2>
            <p className="mt-5 text-lg leading-8 text-[#5d6761]">Không chỉ học thuộc. Học sinh luyện đề, làm lab, xem lỗi sai và nhận lộ trình vá lỗi theo dữ liệu của chính mình.</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px] rounded-[2.5rem] bg-[#0f766e] p-8 text-center text-white shadow-[0_32px_110px_rgba(15,118,110,0.28)] sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-100">Start now</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Bắt đầu bằng bài test 5 phút.</h2>
          <p className="mx-auto mt-5 max-w-[62ch] text-lg leading-8 text-emerald-50">Hệ thống sẽ phân loại trình độ, chọn track phù hợp và tạo kế hoạch học hôm nay. Không cần thẻ, không cần cấu hình.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/onboarding" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#f7f4ec] px-8 font-black text-[#0b1220]">
              Kiểm tra trình độ miễn phí
              <ArrowIcon />
            </Link>
            <Link href="/pricing" className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-8 font-bold text-white hover:bg-white/10">
              Xem gói học
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
