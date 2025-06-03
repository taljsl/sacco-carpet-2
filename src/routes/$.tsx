import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  beforeLoad: () => {
    // Redirect any non-existent route to home
    throw redirect({
      to: '/',
    })
  },
  component: () => null, // This component will never render due to redirect
})