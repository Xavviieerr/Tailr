export interface SideBarItemType {
  label: string;
  href: string;
  active: boolean;
  icon?: React.ReactNode;
}

export interface DashboardApplicationType {
  id: string;
  name: string;
  createdAt: string;
  company: string;
  jobTitle: string;
  status: string;
}
