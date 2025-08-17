import { useSession } from '@/components/auth-provider';
import {
  LucideIcon,
  Home,
  ProjectorIcon,
  Package,
  MessageSquareShare,
  BookAIcon,
  Settings,
  TrendingUp,
} from 'lucide-react';

interface NavigationRouteItem {
  title: string;
  path: string;
  icon: LucideIcon;
  target?: string;
}

export function useNavigationRoutes(): (NavigationRouteItem | '---')[] {
  const { profile } = useSession();

  return [
    {
      title: 'Home',
      path: '/',
      icon: Home,
    },
    profile && {
      title: 'Trending',
      path: '/trending',
      icon: TrendingUp,
    },
    {
      title: 'Showcase',
      path: '/showcase',
      icon: ProjectorIcon,
    },
    {
      title: 'Events',
      path: '/events',
      icon: Home,
    },
    {
      title: 'Sponsors',
      path: '/sponsors',
      icon: Package,
    },
    {
      title: "Members",
      path: '/users',
    },
    {
      title: 'Chatroom',
      path: '/community',
      icon: MessageSquareShare,
    },
    {
      title: 'About us',
      path: '/teams',
      icon: BookAIcon,
    },
    profile && '---', // Separator
    profile && {
      title: 'Profile',
      path: `/@${profile?.alias}`,
      icon: BookAIcon,
    },
    profile && {
      title: 'Setting',
      path: '/profile/setup',
      icon: Settings,
    },
  ].filter(Boolean) as (NavigationRouteItem | '---')[];
}
