export const navbarData = [
  {
    name: 'Home',
    icon: 'home',
    route: '/home',
  },
  {
    name: 'Istanze',
    icon: 'manage_accounts',
    route: '/instances',
  },
  {
    name: 'Pacchetti',
    icon: 'inventory_2',
    route: '/packages',
  },
  {
    name: 'Consumi',
    icon: 'leaderboard',
    route: '/statistics',
  },
];

export const navbarBottomData = [
  {
    name: 'Impostazioni',
    icon: 'settings',
    route: '/settings',
    children: [
      {
        name: 'Monitoring',
        icon: 'show_chart',
        route: '/settings/monitoring',
      },
    ],
  },
  {
    name: 'Profilo',
    icon: 'account_circle',
    route: '/profile',
    action: () => {},
  },
  {
    name: 'Logout',
    icon: 'logout',
    action: () => {},
  },
];
