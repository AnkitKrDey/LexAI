import { cva } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-neon hover:brightness-110 hover:shadow-[0_0_20px_hsl(192,100%,50%,0.8)]',
        secondary: 'bg-secondary text-secondary-foreground hover:brightness-110 border border-slate-800',
        ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_10px_rgba(220,38,38,0.5)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = ({ className, variant, size, ...props }) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
);
