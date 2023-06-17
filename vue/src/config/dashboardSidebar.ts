import { DashboardSidebarItems } from "./types";

const items: DashboardSidebarItems[] = [
  { name: "Dashboard", icon: ["fa", "user"], current: false, href: "#" },
  {
    name: "Team",
    icon: ["fa", "user"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Projects",
    icon: ["fa", "lock"],
    current: false,
    children: [{ name: "Settings", href: "#" }],
  },
  {
    name: "Calendar",
    icon: ["fa", "door-open"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Reports",
    icon: ["fa", "check"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
];

export default items;
