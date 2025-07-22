import {
  LucideIcon,
  Home,
  ProjectorIcon,
  Package,
  MessageSquareShare,
  BookAIcon,
  Settings,
} from 'lucide-react';

interface NavigationRouteItem {
  title: string;
  path: string;
  icon: LucideIcon;
  target?: string;
}

export const NavigationRoutes: (NavigationRouteItem | '---')[] = [
  {
    title: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'Showcase',
    path: '#',
    icon: ProjectorIcon,
    target: '_blank',
  },
  {
    title: 'Events',
    path: '#',
    icon: Home,
  },
  {
    title: 'Sponsors',
    path: '/sponsors',
    icon: Package,
  },
  {
    title: 'Chatroom',
    path: '/community',
    icon: MessageSquareShare,
  },
  {
    title: 'About us',
    path: '#',
    icon: BookAIcon,
    target: '_blank',
  },
  '---', // Separator
  {
    title: 'Profile',
    path: '#',
    icon: BookAIcon,
    target: '_blank',
  },
  {
    title: 'Setting',
    path: '/profile/setup',
    icon: Settings,
  },
];
