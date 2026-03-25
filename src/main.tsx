import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './styles/globals.css'

import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import SeriesPage from '@/pages/SeriesPage'
import ResumePage from '@/pages/ResumePage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminSeries from '@/pages/admin/AdminSeries'
import AdminArtworks from '@/pages/admin/AdminArtworks'
import AdminCv from '@/pages/admin/AdminCv'
import AdminInbox from '@/pages/admin/AdminInbox'
import AdminSettings from '@/pages/admin/AdminSettings'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/series/:slug', element: <SeriesPage /> },
      { path: '/resume-media', element: <ResumePage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'series', element: <AdminSeries /> },
      { path: 'series/:seriesId/artworks', element: <AdminArtworks /> },
      { path: 'cv', element: <AdminCv /> },
      { path: 'inbox', element: <AdminInbox /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  { path: '*', element: <Layout />, children: [{ path: '*', element: <NotFoundPage /> }] },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
)
