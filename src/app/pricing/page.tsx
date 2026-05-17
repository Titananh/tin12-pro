// ==========================================
// Pricing Page - Tin12 Pro Canh Diep
// Free/Pro/Premium tier comparison with mock data
// ==========================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { mockUser } from '@/content/demo';

// ============ ICONS (inline SVG) ============
const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconX = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const IconTag = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c1.172 1.172 3.072 1.172 4.243 0 1.172-1.172 1.172-3.072 0-4.243L12.73 4.99a2.25 2.25 0 00-1.591-.659H5.25zM6.75 7.5l3 3M12 7.5l-3 3m3 0l3 3" />
  </svg>
);

// ============ TYPES ============
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
  badge?: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'For students starting their learning journey',
    color: 'slate',
    features: [
      { text: 'First 5 lessons', included: true },
      { text: 'Practice quizzes', included: true },
      { text: '50 flashcards', included: true },
      { text: '1 practice exam', included: true },
      { text: 'Basic AI Tutor', included: true },
      { text: 'Knowledge board', included: true },
      { text: 'Lab practice', included: false, note: 'Demo only' },
      { text: 'Multi-device sync', included: false },
      { text: 'Detailed progress reports', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99000,
    period: '/month',
    description: 'For serious students who want effective learning',
    color: 'blue',
    badge: 'Most Popular',
    popular: true,
    features: [
      { text: 'All lessons (20+)', included: true },
      { text: 'Unlimited quizzes', included: true },
      { text: '200+ flashcards', included: true },
      { text: '10 practice exams', included: true },
      { text: 'Advanced AI Tutor', included: true },
      { text: 'Full knowledge board', included: true },
      { text: 'All lab exercises', included: true },
      { text: 'Multi-device sync', included: true },
      { text: 'Detailed progress reports', included: true },
      { text: 'Chat support', included: false },
    ],
    cta: 'Upgrade to Pro',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199000,
    period: '/month',
    description: 'Full package for THPT exam preparation',
    color: 'violet',
    badge: 'Recommended for THPT',
    features: [
      { text: 'All lessons (20+)', included: true },
      { text: 'Unlimited quizzes', included: true },
      { text: '500+ flashcards', included: true },
      { text: '20+ exams + AI-generated', included: true },
      { text: 'AI Tutor with Real LLM', included: true },
      { text: 'Knowledge board + review', included: true },
      { text: 'All labs + evaluation', included: true },
      { text: 'Multi-device sync', included: true },
      { text: 'Advanced progress reports', included: true },
      { text: '24/7 Priority support', included: true },
    ],
    cta: 'Choose Premium',
  },
];

const faqs = [
  {
    q: 'Can I change plans?',
    a: 'Yes, you can upgrade or downgrade anytime. Fees will be calculated pro-rata.',
  },
  {
    q: 'Is there a trial period?',
    a: 'Free plan is always available. Pro/Premium can be tried free for 7 days.',
  },
  {
    q: 'How do I pay?',
    a: 'We support VNPay, MoMo, and Visa/Mastercard.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes, 100% refund within 7 days if not satisfied.',
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
    return Math.round(monthlyPrice * 0.8);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-violet-600/5 dark:from-blue-600/10 dark:to-violet-600/10" />
        <div className="relative max-w-4xl mx-auto">
          <Badge variant="blue" className="mb-4">
            <IconTag />
            Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            From free to premium - all help you learn Informatics 12 effectively
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Yearly
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
              ? '/month (yearly)'
              : plan.period;

            return (
              <Card
                key={plan.id}
                className={`relative p-6 lg:p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.id === 'free' ? 'bg-slate-100 dark:bg-slate-700' :
                      plan.id === 'pro' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-violet-100 dark:bg-violet-900/30'
                    }`}>
                      <span className={`text-xl font-bold ${
                        plan.id === 'free' ? 'text-slate-600 dark:text-slate-300' :
                        plan.id === 'pro' ? 'text-blue-600 dark:text-blue-400' :
                        'text-violet-600 dark:text-violet-400'
                      }`}>
                        {plan.name.charAt(0)}
                      </span>
                    </div>
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
                      Save 20% vs monthly
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
                          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-emerald-600 dark:text-emerald-400"><IconCheck /></span>
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-slate-400"><IconX /></span>
                          </span>
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
                    Current plan: <span className="text-blue-600 dark:text-blue-400 font-medium">Free</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Earned</p>
                  <p className="font-bold text-cyan-600 dark:text-cyan-400">{user.xp.toLocaleString()} XP</p>
                </div>
                <Button variant="secondary" size="sm">
                  Upgrade
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <Card className="p-6 lg:p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Detailed Plan Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-600 dark:text-slate-400">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">Pro</th>
                  <th className="text-center py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {[
                  ['Lessons', '5 lessons', '20+ lessons', '20+ lessons'],
                  ['Quizzes', '50 questions', 'Unlimited', 'Unlimited'],
                  ['Flashcards', '50 cards', '200+ cards', '500+ cards'],
                  ['Practice Exams', '1 exam', '10 exams', '20+ exams'],
                  ['AI Tutor', 'Basic', 'Advanced', 'Real LLM'],
                  ['Lab Exercises', 'Demo', 'All', 'All + Evaluation'],
                  ['Device Sync', '--', 'Yes', 'Yes'],
                  ['Detailed Reports', '--', 'Yes', 'Advanced'],
                  ['Priority Support', '--', '--', '24/7'],
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
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} padding="none" className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                <span className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                  <IconChevronDown />
                </span>
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
            Ready to Start Learning?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Register free today and begin your journey to master Informatics 12
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-slate-100 transition-colors"
            >
              Start Free
            </Link>
            <button className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
              Try Pro 7 Days
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
}