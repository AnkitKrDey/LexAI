import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 p-4 dark:from-slate-950 dark:to-slate-900">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <LoginForm />
      </motion.div>
    </div>
  );
}
