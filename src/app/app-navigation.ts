type NavigationItem = { path?: string; text: string; icon?: string; items?: NavigationItem[] };
export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Menu',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile',
      },
      {
        text: 'Tasks',
        path: '/tasks',
      },
    ],
  },
  {
    text: 'Contato',
    icon: 'folder',
    items: [
      {
        text: 'Agenda',
        path: 'lista-contatos',
      },
      {
        text: 'Novo Contato',
        path: 'adicionar-contato',
      },
    ],
  },
];
