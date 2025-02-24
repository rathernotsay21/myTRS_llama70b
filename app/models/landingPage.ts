export interface LandingPageTheme {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    buttonStyle: 'rounded' | 'square' | 'pill';
  }
  
  export interface LandingPageSocialMedia {
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'website' | 'other';
    url: string;
    label?: string;
  }
  
  export interface LandingPageFormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    description?: string;
  }
  
  export interface LandingPageEventInfo {
    date: string;
    time: string;
    location: string;
    description: string;
  }
  
  export interface LandingPage {
    id: string;
    organizationId: string;
    title: string;
    subtitle?: string;
    slug: string;
    eventInfo: LandingPageEventInfo;
    formFields: LandingPageFormField[];
    socialMedia: LandingPageSocialMedia[];
    theme: LandingPageTheme;
    logoUrl?: string;
    backgroundImageUrl?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  