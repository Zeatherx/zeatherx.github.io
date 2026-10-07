import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Hero from './components/Hero'
import Works from './components/Works'
import Activities from './components/Activities'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import Navbar from './components/Navbar'
import Terminal from './components/Terminal'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark')
    document.documentElement.classList.toggle('theme-light', theme === 'light')
  }, [theme])

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const updateTheme = () => {
      flushSync(() => {
        setTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
      })
    }

    document.documentElement.style.setProperty('--theme-x', `${x}px`)
    document.documentElement.style.setProperty('--theme-y', `${y}px`)
    document.documentElement.style.setProperty('--theme-radius', `${endRadius}px`)

    if (document.startViewTransition) {
      document.startViewTransition(updateTheme)
    } else {
      updateTheme()
    }
  }

  const normalizedPath = window.location.pathname.toLowerCase().replace(/\/+$/, '')
  const isTerminalRoute = normalizedPath.endsWith('/terminal')

  if (isTerminalRoute) {
    return (
      <div className={`app-shell theme-${theme} bg-slate-950 text-slate-100 min-h-screen`}>
        <Terminal />
        <Footer />
        <Navbar theme={theme} onToggleTheme={toggleTheme} isCtf />
      </div>
    )
  }

  return (
    <div className={`app-shell theme-${theme} bg-slate-950 text-slate-100 min-h-screen`}>
      <ScrollReveal><Hero /></ScrollReveal>
      <ScrollReveal><Works /></ScrollReveal>
      <ScrollReveal><Activities /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
    </div>
  )
}

export default App