
export interface LoadingProps {
  onComplete: () => void;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SharedProps {
  onOpenContact: () => void;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  ABOUT = 'about',
  CONTACT = 'contact'
}
