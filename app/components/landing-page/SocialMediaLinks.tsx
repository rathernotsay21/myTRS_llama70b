import { ReactNode } from 'react';

interface SocialMediaLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'website' | 'other';
  url: string;
  label?: string;
  icon?: ReactNode;
}

interface SocialMediaLinksProps {
  title?: string;
  links: SocialMediaLink[];
}

export function SocialMediaLinks({
  title = "Follow Us",
  links
}: SocialMediaLinksProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label || link.platform}
          </a>
        ))}
      </div>
    </div>
  );
}