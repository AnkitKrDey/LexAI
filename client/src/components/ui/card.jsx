import { cn } from './utils';

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900',
      className
    )}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn('text-base font-semibold text-slate-900 dark:text-slate-100', className)} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={cn('text-sm text-slate-600 dark:text-slate-400', className)} {...props} />
);
