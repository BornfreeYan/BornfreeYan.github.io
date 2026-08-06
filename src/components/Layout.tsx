import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * 全局页面布局
 */
interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-ivory dark:bg-ivory-dark text-ink dark:text-ink-dark transition-colors duration-300">
      <Navbar />
      <main
        key={location.pathname}
        className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 animate-fade-in"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
