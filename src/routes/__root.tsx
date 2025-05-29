import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import Footer from '@/components/Footer'
import TalkToUsTab from '@/components/talkToUsTab'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="pt-[90px]">
        <Outlet />
      </main>
      <Footer />
      <TalkToUsTab/>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
