import { useEffect } from 'react';

export const Navbar = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('lexai-theme', 'light');
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div>
          <p className="text-sm text-slate-500">AI-Powered Legal Workspace</p>
          <h1 className="text-lg font-semibold text-slate-900">LexAI</h1>
        </div>
      </div>
    </header>
  );
};
