import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

export default function Badge({ 
  className = '', 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
    success: 'bg-success text-success-foreground hover:bg-success/80',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/80',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return <div className={classes} {...props} />;
}