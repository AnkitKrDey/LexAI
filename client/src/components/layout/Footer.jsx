export const Footer = () => (
  <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
    <div className="container flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
      <p>© {new Date().getFullYear()} LexAI. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#features" className="hover:text-slate-900 dark:hover:text-slate-100">Features</a>
        <a href="#pricing" className="hover:text-slate-900 dark:hover:text-slate-100">Pricing</a>
        <a href="/login" className="hover:text-slate-900 dark:hover:text-slate-100">Sign In</a>
      </div>
    </div>
  </footer>
);
