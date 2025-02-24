import { ReactNode } from 'react';

type SectionVariant = 'primary' | 'secondary' | 'accent' | 'neutral';

interface LandingPageSectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function LandingPageSection({
  children,
  variant = 'neutral',
  fullWidth = false,
  className = '',
  id,
}: LandingPageSectionProps) {
  const bgColors = {
    primary: 'bg-blue-50 dark:bg-blue-950',
    secondary: 'bg-gray-50 dark:bg-gray-900',
    accent: 'bg-amber-50 dark:bg-amber-950',
    neutral: 'bg-white dark:bg-gray-950'
  };

  return (
    <section 
      id={id}
      className={`py-12 md:py-16 ${bgColors[variant]} ${className}`}
    >
      <div className={`mx-auto ${fullWidth ? 'w-full px-4' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
        {children}
      </div>
    </section>
  );
}
