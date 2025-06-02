import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import Footer from '@/components/Footer'
import TalkToUsTab from '@/components/TalkToUsTab'
import { AuthProvider } from '@/utils/authContext'

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <Header />
        <main className="pt-[90px]">
          <Outlet />
        </main>
        <Footer />
        <TalkToUsTab />
        {/* <TanStackRouterDevtools /> */}
      </AuthProvider>
    </>
  ),
})
