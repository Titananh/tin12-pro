// ==========================================
// Pricing Page - Tin12 Pro Cánh Diều
// Free/Pro/Premium tier comparison with mock data
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { mockUser } from '@/content/demo';

type PlanTier = 'free' | 'pro' | 'premium';

interface PlanFeature {
  text: string;
  included: boolean;
  note?: string;
}

interface PricingPlan {
  id: PlanTier;
  name: string;
  price: number | string;
  period: string;
  description: string;
  color: string;
  icon: string;
  badge?: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Miễn phí',
    price: 0,
    period: 'vĩnh viễn',
    description: 'Dành cho học sinh bắt đầu học tập',
    color: 'slate',
    icon: '🌱',
    features: [
      { text: '5 bài học đầu tiên', included: true },
      { text: 'Quiz thực hành', included: true },
      { text: '50 flashcards', included: true },
      { text: '1 đề thi thử', included: true },
      { text: 'AI Tutor cơ bản', included: true },
      { text: 'Bảng kiến thức', included: true },
      { text: 'Lab thực hành', included: false, note: 'Chỉ xem demo' },
      { text: 'Đồng bộ đa thiết bị', included: false },
      { text: 'Báo cáo học tập chi tiết', included: false },
      { text: 'Hỗ trợ ưu tiên', included: false },
    ],
    cta: 'Bắt đầu miễn phí',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99000,
    period: '/tháng',
    description: 'Cho học sinh nghiêm túc muốn học hiệu quả',
    color: 'blue',
    icon: '🚀',
    badge: 'Phổ biến',
    popular: true,
    features: [
      { text: 'Tất cả bài học (20+)', included: true },
      { text: 'Quiz không giới hạn', included: true },
      { text: '200+ flashcards', included: true },
      { text: '10 đề thi thử', included: true },
      { text: 'AI Tutor nâng cao', included: true },
      { text: 'Bảng kiến thức đầy đủ', included: true },
      { text: 'Tất cả Lab thực hành', included: true },
      { text: 'Đồng bộ đa thiết bị', included: true },
      { text: 'Báo cáo học tập chi tiết', included: true },
      { text: 'Hỗ trợ qua chat', included: false },
    ],
    cta: 'Nâng cấp lên Pro',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199000,
    period: '/tháng',
    description: 'Gói đầy đủ nhất cho học sinh thi THPT',
    color: 'violet',
    icon: '💎',
    badge: 'Đề xuất cho thi THPT',
    features: [
      { text: 'Tất cả bài học (20+)', included: true },
      { text: 'Quiz không giới hạn', included: true },
      { text: '500+ flashcards', included: true },
      { text: '20 đề thi thử + đề AI', included: true },
      { text: 'AI Tutor với LLM thật', included: true },
      { text: 'Bảng kiến thức + ôn tập', included: true },
      { text: 'Tất cả Lab + đánh giá', included: true },
      { text: 'Đồng bộ đa thiết bị', included: true },
      { text: 'Báo cáo học tập nâng cao', included: true },
      { text: 'Hỗ trợ ưu tiên 24/7', included: true },
    ],
    cta: 'Chọn Premium',
  },
];

const faqs = [
  {
    q: 'Tôi có thể đổi gói không?',
    a: 'Có, bạn có thể nâng cấp hoặc hạ cấp bất kỳ lúc nào. Phí sẽ được tính theo tỷ lệ.',
  },
  {
    q: 'Có dùng thử không?',
    a: 'Gói Free luôn có sẵn. Gói Pro/Premium có thể dùng thử 7 ngày miễn phí.',
  },
  {
    q: 'Thanh toán như thế nào?',
    a: 'Chúng tôi hỗ trợ VNPay, MoMo, và thẻ Visa/Mastercard.',
  },
  {
    q: 'Hoàn tiền có được không?',
    a: 'Có, hoàn tiền 100% trong 7 ngày đầu nếu không hài lòng.',
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const user = mockUser;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getAnnualPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 0.8); // 20% discount
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-violet-600/5 dark:from-blue-600/10 dark:to-violet-600/10" />
        <div className="relative max-w-4xl mx-auto">
          <Badge variant="blue" className="mb-4">💰 Bảng giá</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Chọn gói học tập phù hợp
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Từ miễn phí đến premium - tất cả đều giúp bạn học Tin học 12 hiệu quả
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Theo tháng
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Theo năm
              <Badge variant="emerald" size="sm" className="-mr-1">-20%</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const displayPrice = typeof plan.price === 'number' && plan.price > 0
              ? billingCycle === 'yearly' ? getAnnualPrice(plan.price) : plan.price
              : plan.price;
            const period = billingCycle === 'yearly' && typeof plan.price === 'number' && plan.price > 0
              ? '/tháng (theo năm)'
              : plan.period;

            return (
              <Card
                key={plan.id}
                className={`relative p-6 lg:p-8 ${
                  plan.popular
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-xl shadow-blue-500/10'
                    : ''
                }`}
                padding="none"
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant={plan.popular ? 'blue' : 'violet'} size="md">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="p-6 lg:p-8 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{plan.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {typeof displayPrice === 'number' ? formatPrice(displayPrice) : displayPrice}
                    </span>
                    {typeof plan.price === 'number' && plan.price > 0 && (
                      <span className="text-slate-500 dark:text-slate-400">{period}</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && typeof plan.price === 'number' && plan.price > 0 && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      Tiết kiệm 20% so với thanh toán tháng
                    </p>
                  )}
                </div>

                <div className="p-6 lg:p-8">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full mb-6"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>
                          {feature.text}
                          {feature.note && (
                            <span className="text-xs text-slate-400 block">{feature.note}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Current Plan Indicator */}
      {user && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <Card className="p-6 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gói hiện tại: <span className="text-blue-600 dark:text-blue-400 font-medium">Free</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Đã đạt</p>
                  <p className="font-bold text-cyan-600 dark:text-cyan-400">{user.xp.toLocaleString()} XP</p>
                </div>
                <Button variant="secondary" size="sm">
                  Nâng cấp
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <Card className="p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            So sánh chi tiết các gói
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Tính năng</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">Pro</th>
                  <th className="text-center py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  ['Bài học', '5 bài', '20+ bài', '20+ bài'],
                  ['Quiz', '50 câu', 'Không giới hạn', 'Không giới hạn'],
                  ['Flashcards', '50 thẻ', '200+ thẻ', '500+ thẻ'],
                  ['Đề thi thử', '1 đề', '10 đề', '20+ đề'],
                  ['AI Tutor', 'Cơ bản', 'Nâng cao', 'LLM thật'],
                  ['Lab thực hành', 'Demo', 'Tất cả', 'Tất cả + đánh giá'],
                  ['Đồng bộ thiết bị', '✗', '✓', '✓'],
                  ['Báo cáo chi tiết', '✗', '✓', 'Nâng cao'],
                  ['Hỗ trợ ưu tiên', '✗', '✗', '24/7'],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-200">{row[0]}</td>
                    <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">{row[1]}</td>
                    <td className="py-3 px-4 text-center text-blue-600 dark:text-blue-400 font-medium">{row[2]}</td>
                    <td className="py-3 px-4 text-center text-violet-600 dark:text-violet-400 font-medium">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Câu hỏi thường gặp
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} padding="none" className="overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400">
                  {faq.a}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <Card className="p-8 lg:p-12 text-center bg-gradient-to-r from-blue-600 to-violet-600 border-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu học?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Đăng ký miễn phí ngay hôm nay và bắt đầu hành trình chinh phục Tin học 12
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-slate-100 transition-colors"
            >
              Bắt đầu miễn phí
            </Link>
            <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
              Dùng thử Pro 7 ngày
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
}