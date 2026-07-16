import { motion } from 'framer-motion';
import {
  FileText,
  ShieldAlert,
  ScrollText,
  PencilLine,
  FileDown,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  { icon: FileText, title: 'Generate', text: 'Create polished contracts in seconds from structured business inputs.' },
  { icon: ShieldAlert, title: 'Analyze Risk', text: 'Instantly detect imbalanced legal terms and problematic clauses.' },
  { icon: ScrollText, title: 'Summarize', text: 'Turn dense legal language into plain English for quick review.' },
  { icon: PencilLine, title: 'Edit Clauses', text: 'Refine clauses with a collaborative and intuitive clause editor.' },
  { icon: FileDown, title: 'Export PDF', text: 'Generate styled, shareable PDFs with signatures and page numbers.' },
  { icon: Lock, title: 'Secure & Private', text: 'Firebase auth, Firestore access control, and secure backend validation.' },
];

const testimonials = [
  {
    name: 'Sofia Kim',
    role: 'Founder, OrbitScale',
    quote: 'LexAI cut our contract turnaround from 3 days to under 30 minutes.',
    avatar: 'SK',
  },
  {
    name: 'David Miller',
    role: 'Legal Ops Lead, BrightLoop',
    quote: 'Risk analysis catches the red flags before anything reaches signature.',
    avatar: 'DM',
  },
  {
    name: 'Ava Thompson',
    role: 'Freelance Consultant',
    quote: 'I generate client agreements in one flow and export polished PDFs instantly.',
    avatar: 'AT',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-grid" />
        <motion.div
          className="absolute inset-x-0 -top-20 mx-auto h-72 w-72 rounded-full bg-gradient-to-r from-blue-400/40 to-cyan-400/40 blur-3xl"
          animate={{ x: [0, 40, -20, 0], y: [0, 20, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <div className="container relative z-10 py-20 text-center md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
          >
            Generate Legally Structured Contracts in Seconds with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300"
          >
            LexAI helps founders, freelancers, and teams draft, review, and export production-grade contracts with built-in risk intelligence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/signup">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary">
                See Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="features" className="container py-16">
        <h2 className="mb-8 text-3xl font-semibold">Everything you need for modern contract workflows</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <feature.icon className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <h2 className="mb-6 text-3xl font-semibold">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {['Select Type', 'Generate with AI', 'Export PDF'].map((step, idx) => (
            <Card key={step} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">{idx + 1}</div>
              <h3 className="text-lg font-semibold">{step}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <h2 className="mb-6 text-3xl font-semibold">What customers say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">“{item.quote}”</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="container py-16">
        <h2 className="mb-6 text-3xl font-semibold">Simple pricing</h2>
        <Card className="overflow-auto p-0">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">Free</th>
                <th className="px-4 py-3">Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3">Monthly generations</td><td className="px-4 py-3">10</td><td className="px-4 py-3">Unlimited</td></tr>
              <tr className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3">Risk analysis</td><td className="px-4 py-3">Basic</td><td className="px-4 py-3">Advanced</td></tr>
              <tr className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3">Export PDF</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-t border-slate-200 dark:border-slate-800"><td className="px-4 py-3">Team seats</td><td className="px-4 py-3">1</td><td className="px-4 py-3">5+</td></tr>
            </tbody>
          </table>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
