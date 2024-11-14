import { ReactNode } from 'react'

import DemoPage from '@/pages/DemoPage'
import FaqPage from '@/pages/FaqPage'
import GamePage from '@/pages/GamePage'
import StatsPage from '@/pages/StatsPage'
import ShopPage from '@/pages/ShopPage'
import FriendsPage from '@/pages/FriendsPage'
import TasksPage from '@/pages/TasksPage'

import User from '@/icons/User.svg'
import Tasks from '@/icons/Tasks.svg'
import Diamond from '@/icons/Diamond.svg'
import Graph from '@/icons/Graph.svg'
import Energy from '@/icons/Energy.svg'
import { StartPage } from '@/pages/StartPage'
import { DevelopmentPage } from '@/pages/DevelopmentPage'

export interface Route {
  url: string
  title: string
  icon: ReactNode
}

export const navBarRoutes: Route[] = [
  // TODO: Replace title with icon
  { url: '/friends', title: 'Friends', icon: <User /> },
  // TODO: Replace title with icon
  { url: '/tasks', title: 'Tasks', icon: <Tasks /> },
  // TODO: Replace title with icon
  { url: '/', title: 'Play', icon: <Diamond /> },
  // TODO: Replace title with icon
  { url: '/stats', title: 'Stats', icon: <Graph /> },
  // TODO: Replace title with icon
  { url: '/enhance', title: 'Enhance', icon: <Energy /> },
]

export type NavBarRoutes = '/' | '/stats' | '/friends' | '/tasks' | '/enhance'
// TODO: comment '/demopage' before GO LIVE!
export type AdditionalRoutes = '/faq' | '/start' | '/demo'

export type AppRoutes = NavBarRoutes | AdditionalRoutes

export const noNavBarRoutes: Partial<AppRoutes>[] = ['/start']

export const headerRoutes: Partial<AppRoutes>[] = ['/']

export interface RouteProps {
  component: ReactNode
  requireAuth?: boolean
  title?: string
  skeleton?: ReactNode
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
  '/': {
    component: <GamePage />,
  },
  '/stats': {
    component: <StatsPage />,
  },
  '/friends': {
    component: <FriendsPage />,
  },
  '/tasks': {
    component: <TasksPage />,
  },
  '/enhance': {
    component: <DevelopmentPage />,
  },
  '/faq': {
    component: <FaqPage />,
  },
  '/start': {
    component: <StartPage />,
  },
  '/demo': {
    component: <DemoPage />,
  },
}
