import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, glass = true, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-2xl p-6 transition-all duration-300",
                glass ? "glass-card glass-card-hover" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className, ...props }) => {
    const variants = {
        primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
        danger: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
        info: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
    };

    return (
        <span
            className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};
