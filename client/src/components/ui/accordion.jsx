import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from './utils';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({ className, ...props }) => (
  <AccordionPrimitive.Item className={cn('rounded-xl border border-slate-200 dark:border-slate-800', className)} {...props} />
);

export const AccordionTrigger = ({ className, children, ...props }) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({ className, ...props }) => (
  <AccordionPrimitive.Content className={cn('px-4 pb-4 text-sm text-slate-600 dark:text-slate-300', className)} {...props} />
);
