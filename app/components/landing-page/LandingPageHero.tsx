interface LandingPageHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    logoUrl?: string;
    organizationName?: string;
  }
  
  export function LandingPageHero({
    title,
    subtitle,
    backgroundImage,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    logoUrl,
    organizationName,
  }: LandingPageHeroProps) {
    return (
      <div className="relative">
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt={title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}
        
        <div className={`relative z-10 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28 ${backgroundImage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          <div className="mx-auto max-w-7xl">
            {(logoUrl || organizationName) && (
              <div className="mb-8 flex items-center">
                {logoUrl && (
                  <img src={logoUrl} alt={organizationName || "Organization logo"} className="mr-3 h-12 w-auto" />
                )}
                {organizationName && (
                  <h2 className="text-xl font-semibold">{organizationName}</h2>
                )}
              </div>
            )}
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-4 max-w-3xl text-xl">
                {subtitle}
              </p>
            )}
            
            {(primaryButtonText || secondaryButtonText) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryButtonText && (
                  <a
                    href={primaryButtonLink || "#volunteer-form"}
                    className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {primaryButtonText}
                  </a>
                )}
                
                {secondaryButtonText && (
                  <a
                    href={secondaryButtonLink || "#learn-more"}
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  >
                    {secondaryButtonText}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  