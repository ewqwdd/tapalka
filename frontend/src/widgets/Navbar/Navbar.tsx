import { NavLink, useLocation } from 'react-router-dom'
import { cva } from '@/lib/cva'
import { navBarRoutes, noNavBarRoutes } from '@/router/routerConfig'
import { useDemo } from '@/contexts/demoContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const { isDemo } = useDemo()
  // @ts-ignore
  if (noNavBarRoutes.includes(pathname)) {
    return null
  }

  return (
    <>
      <figure className="bg-linear-bottom h-[16.25rem] w-full fixed bottom-0 left-0 pointer-events-none" />
      <nav className="fixed py-2 px-[0.625rem] bg-overlay-2/60 grid grid-cols-5 bottom-4 w-11/12 left-1/2 -translate-x-1/2 rounded-2xl overflow-clip backdrop-blur-sm">
        {navBarRoutes.map(({ title, url, icon }) => (
          <NavLink
            key={title}
            to={url === '/' ? (isDemo ? '/demo' : '/') : url}
            className={({ isActive }) =>
              'text-xss ' +
              cva(
                'font-semibold flex uppercase items-center justify-center h-[3.25rem] gap-1 flex-col text-foreground-2 relative',
                {
                  'text-foreground-1 after:-bottom-8 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-9 after:bg-primary/70 after:blur-[14px] after:absolute':
                    isActive,
                }
              )
            }
          >
            {icon}
            {title}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
