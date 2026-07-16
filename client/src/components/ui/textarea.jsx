import { cn } from './utils';

export const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      'min-h-28 w-full rounded-xl border border-input bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100',
      className
    )}
    {...props}
  />
);
