export interface DashboardSidebarItems {
  name: string;
  icon: string[];
  current: boolean;
  href?: string;
  children?: DashboardSidebarChildren[];
}

interface DashboardSidebarChildren {
  name: string;
  href: string;
}

export interface DashboardTopNavItems {
  name: string;
  href: string;
}
