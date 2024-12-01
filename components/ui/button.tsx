import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {Loader} from "lucide-react";

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl active:translate-y-[1px] text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-primary text-primary bg-transparent hover:bg-secondary',
        secondary: 'bg-secondary text-primary hover:bg-secondary/50',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-3.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
  size?: 'default' | 'sm' | 'lg' | 'icon',
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loading, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={ cn(buttonVariants({ variant, size, className }), {'opacity-60' : loading}) }
            disabled={ disabled || loading }
            ref={ ref } { ...props }>
        { children }
        { loading && <Loader className="w-5 h-5 animate-spin absolute" /> }
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
