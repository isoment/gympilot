import { DashboardSidebarItems } from "./types";

const items: DashboardSidebarItems[] = [
  { name: "Dashboard", icon: ["fa", "user"], to: "/dashboard" },
  {
    name: "Team",
    icon: ["fa", "user"],
    children: [
      { name: "About", to: "/dashboard/about" },
      { name: "Settings", to: "/dashboard/settings" },
    ],
  },
  {
    name: "Home",
    icon: ["fa", "lock"],
    children: [{ name: "Return", to: "/dashboard" }],
  },
  {
    name: "Calendar",
    icon: ["fa", "door-open"],
    children: [
      { name: "Overview", to: "#" },
      { name: "Members", to: "#" },
      { name: "Calendar", to: "#" },
      { name: "Settings", to: "#" },
    ],
  },
  {
    name: "Reports",
    icon: ["fa", "check"],
    children: [
      { name: "Overview", to: "#" },
      { name: "Members", to: "#" },
      { name: "Calendar", to: "#" },
      { name: "Settings", to: "#" },
    ],
  },
];

export default items;
