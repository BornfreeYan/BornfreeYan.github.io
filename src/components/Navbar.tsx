import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sun, Moon, Monitor, ChevronDown } from 'lucide-react'
import { useTheme, type Theme } from '../hooks/useTheme'

/**
 * 顶部导航栏
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const themeIcon: Record<Theme, React.ReactNode> = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
  }

  const cycleTheme = () => {
    const order: Theme[] = ['light', 'dark', 'system']
    const next = order[(order.indexOf(theme) + 1) % order.length]
    setTheme(next)
  }

  return (
    <header className="sticky top-0 z-50 bg-ivory/80 dark:bg-ivory-dark/80 backdrop-blur-md border-b border-border dark:border-border-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-accent/20 dark:bg-accent-dark/20 flex items-center justify-center text-accent dark:text-accent-dark font-heading font-bold text-sm">
            B
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight">Bornfree</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Article dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setArticleDropdownOpen(true)}
            onMouseLeave={() => setArticleDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors nav-link-underline">
              Article
              <ChevronDown className={`w-3 h-3 transition-transform ${articleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {articleDropdownOpen && (
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 dropdown-menu ${articleDropdownOpen ? 'is-open' : ''}`}>
                <div className="bg-card/95 dark:bg-card-dark/95 backdrop-blur-md border border-border dark:border-border-dark rounded-xl shadow-lg py-2 px-1 min-w-[120px]">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 rounded-lg transition-colors"
                  >
                    分类
                  </Link>
                  <Link
                    to="/tags"
                    className="block px-4 py-2 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 rounded-lg transition-colors"
                  >
                    标签
                  </Link>
                  <Link
                    to="/archive"
                    className="block px-4 py-2 text-sm text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 rounded-lg transition-colors"
                  >
                    归档
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-sm transition-colors nav-link-underline ${isActive ? 'text-ink dark:text-ink-dark' : 'text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark'
            }`}
          >
            Project
          </NavLink>
          <NavLink
            to="/memos"
            className={({ isActive }) =>
              `text-sm transition-colors nav-link-underline ${isActive ? 'text-ink dark:text-ink-dark' : 'text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark'
            }`}
          >
            Memo
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm transition-colors nav-link-underline ${isActive ? 'text-ink dark:text-ink-dark' : 'text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark'
            }`}
          >
            About
          </NavLink>

          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 hover:text-ink dark:hover:text-ink-dark transition-colors pressable"
            title={`当前主题: ${theme}`}
          >
            {themeIcon[theme]}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 transition-colors pressable"
          >
            {themeIcon[theme]}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:bg-ivory dark:hover:bg-ivory-dark/50 transition-colors pressable"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border dark:border-border-dark bg-ivory dark:bg-ivory-dark px-6 py-4 space-y-4 animate-fade-in-up">
          <Link
            to="/articles"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink dark:text-ink-dark font-medium"
          >
            Article
          </Link>
          <div className="pl-4 space-y-2 border-l border-border dark:border-border-dark">
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-ink-muted dark:text-ink-muted-dark"
            >
              分类
            </Link>
            <Link
              to="/tags"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-ink-muted dark:text-ink-muted-dark"
            >
              标签
            </Link>
            <Link
              to="/archive"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-ink-muted dark:text-ink-muted-dark"
            >
              归档
            </Link>
          </div>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink dark:text-ink-dark font-medium"
          >
            Project
          </Link>
          <Link
            to="/memos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink dark:text-ink-dark font-medium"
          >
            Memo
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink dark:text-ink-dark font-medium"
          >
            About
          </Link>
        </nav>
      )}
    </header>
  )
}
