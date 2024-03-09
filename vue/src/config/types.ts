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

export interface DashboardTopNavItem {
  name: string;
  value: string;
  href: string;
}
