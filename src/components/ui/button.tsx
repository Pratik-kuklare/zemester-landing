import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_auto] text-white shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 hover:bg-[position:100%_center] hover:shadow-xl hover:shadow-fuchsia-500/30 active:translate-y-0",
        secondary:
          "border border-violet-200/80 bg-white text-ink shadow-sm shadow-violet-500/5 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md",
        ghost: "text-muted hover:bg-violet-50 hover:text-ink",
        outline:
          "border border-line bg-transparent text-ink hover:border-violet-300 hover:bg-white",
        play:
          "border border-line bg-ink text-white shadow-lg shadow-indigo-900/15 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-xl",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-[52px] px-8 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
