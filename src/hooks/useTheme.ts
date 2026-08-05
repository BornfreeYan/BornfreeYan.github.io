import { useEffect, useState } from 'react'

/**
 * 主题 Hook：支持 light / dark / system
 */
export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    const root = window.document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const isDark =
        theme === 'dark' || (theme === 'system' && systemDark.matches)

      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    applyTheme()
    localStorage.setItem('theme', theme)

    const listener = () => {
      if (theme === 'system') {
        applyTheme()
      }
    }

    systemDark.addEventListener('change', listener)
    return () => systemDark.removeEventListener('change', listener)
  }, [theme])

  return { theme, setTheme }
}
