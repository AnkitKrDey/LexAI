import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from './utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn('inline-flex h-10 w-full items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800', className)}
    {...props}
  />
);

export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex flex-1 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow dark:text-slate-300 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100',
      className
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content className={cn('mt-4', className)} {...props} />
);
