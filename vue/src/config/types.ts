export interface DashboardSidebarItems {
  name: string;
  icon: string[];
  to?: string;
  children?: DashboardSidebarChildren[];
}

interface DashboardSidebarChildren {
  name: string;
  to: string;
}

export interface DashboardTopNavItems {
  name: string;
  href: string;
}
