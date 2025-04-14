import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import './index.css'
import { queryClient } from './lib/query.ts'
import Access from './pages/Access.tsx'
import Home from './pages/Home.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shortUrl" element={<Access />} />
          <Route path='/404' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
