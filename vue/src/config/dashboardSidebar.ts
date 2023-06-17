import { DashboardSidebarItems } from "./types";

const items: DashboardSidebarItems[] = [
  { name: "Dashboard", icon: ["fa", "user"], current: false, to: "/dashboard" },
  {
    name: "Team",
    icon: ["fa", "user"],
    current: false,
    children: [
      { name: "About", to: "/dashboard/about" },
      { name: "Settings", to: "/dashboard/settings" },
    ],
  },
  {
    name: "Projects",
    icon: ["fa", "lock"],
    current: false,
    children: [{ name: "Settings", to: "#" }],
  },
  {
    name: "Calendar",
    icon: ["fa", "door-open"],
    current: false,
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
    current: false,
    children: [
      { name: "Overview", to: "#" },
      { name: "Members", to: "#" },
      { name: "Calendar", to: "#" },
      { name: "Settings", to: "#" },
    ],
  },
];

export default items;
