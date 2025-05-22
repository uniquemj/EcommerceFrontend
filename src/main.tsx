import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'

import {routeTree} from './routeTree.gen'
import { useAuth } from './store/auth.store'



const router = createRouter({
  routeTree,
  context: {
    auth: useAuth,
  }
})

declare module '@tanstack/react-router' {
  interface Register{
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
