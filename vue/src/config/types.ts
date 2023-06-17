export interface SidebarItems {
  name: string;
  icon: string[];
  current: boolean;
  href?: string;
  children?: SidebarChildren[];
}

interface SidebarChildren {
  name: string;
  href: string;
}
