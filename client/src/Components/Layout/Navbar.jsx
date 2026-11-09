import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DreekkMark } from '@/Components/ui/dreekk-mark'
import { SITE } from '@/Components/UiElement/site'
import { cn } from '@/lib/utils'

// Sections that exist on this page scroll into view; the rest are ready for their own sections/pages.
export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Work', href: '#work' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Insights', href: '#insights' },
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#careers' },
]

/* Apple-style "liquid glass" capsules floating over a transparent bar: dark-tinted translucent
   fill (readable on light and dark sections), strong backdrop blur + saturation, a bright
   hairline on top, a soft dark edge below and a gentle drop shadow. */
/* Full-width bar: clear frosted glass, no colour tint. */
const GLASS_BAR =
  'bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.06),0_10px_30px_-18px_rgba(0,0,0,0.45)]'
const GLASS_PILL =
  'bg-[rgba(16,16,20,0.48)] backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.3),0_10px_30px_-12px_rgba(0,0,0,0.55)]'
const GLASS_LENS =
  'bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.07))] backdrop-blur-md backdrop-saturate-200 border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_1px_rgba(0,0,0,0.25),0_4px_14px_-4px_rgba(0,0,0,0.5)]'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hovered, setHovered] = useState('')
  const itemRefs = useRef({})
  const [lens, setLens] = useState({ x: 0, w: 0, visible: false })

  // which section is on screen
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          setActive((cur) => (e.isIntersecting ? `#${e.target.id}` : cur === `#${e.target.id}` ? '' : cur)),
        ),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // the glass lens slides to the hovered link, otherwise rests on the active one
  const target = hovered || active
  const measure = useCallback(() => {
    const el = target && itemRefs.current[target]
    if (!el) return setLens((l) => ({ ...l, visible: false }))
    setLens({ x: el.offsetLeft, w: el.offsetWidth, visible: true })
  }, [target])
  useLayoutEffect(() => { measure() }, [measure])
  useEffect(() => {
    window.addEventListener('resize', measure)
    document.fonts?.ready?.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // close the mobile menu with Escape or when the screen gets wide
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1280px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50', GLASS_BAR)}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:h-20 lg:px-8" aria-label="Main">
        <a href="#" className={cn('flex shrink-0 items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-white', GLASS_PILL)} onClick={() => { setOpen(false); setActive('') }}>
          <DreekkMark className="h-7 lg:h-8" />
          <span className="font-display text-base font-bold tracking-tight lg:text-lg">
            Dreekk <span className="font-medium text-white/70">Innovation</span>
          </span>
        </a>

        {/* desktop links in a glass pill, with a sliding glass lens */}
        <ul className={cn('relative hidden items-center rounded-full p-1 xl:flex', GLASS_PILL)} onMouseLeave={() => setHovered('')}>
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute bottom-1 left-0 top-1 rounded-full transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.34,1.45,.64,1)]',
              GLASS_LENS,
              lens.visible ? 'opacity-100' : 'opacity-0',
            )}
            style={{ width: lens.w, transform: `translateX(${lens.x}px)` }}
          />
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                ref={(el) => { itemRefs.current[l.href] = el }}
                href={l.href}
                onClick={() => setActive(l.href)}
                onMouseEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                onBlur={() => setHovered('')}
                aria-current={active === l.href ? 'location' : undefined}
                className={cn(
                  'relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  target === l.href ? 'text-white' : 'text-white/75 hover:text-white',
                )}
              >
                {l.label}
                {active === l.href ? (
                  <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E5322B] shadow-[0_0_8px_2px_rgba(229,50,43,0.8)]" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={SITE.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/20 bg-[#E5322B]/90 px-5 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-10px_rgba(229,50,43,0.8)] backdrop-blur-md transition-colors hover:bg-[#E5322B] sm:inline-block"
          >
            Get a quote
          </a>

          {/* mobile / tablet toggle */}
          <button
            type="button"
            className={cn('inline-flex h-10 w-10 items-center justify-center rounded-full text-white xl:hidden', GLASS_PILL)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={cn('absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300', open && 'translate-y-[6px] rotate-45')} />
              <span className={cn('absolute left-0 top-[6px] h-0.5 w-5 rounded bg-current transition-opacity duration-200', open && 'opacity-0')} />
              <span className={cn('absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition-transform duration-300', open && '-translate-y-[6px] -rotate-45')} />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile / tablet menu */}
      <div id="mobile-menu" className={cn('grid transition-[grid-template-rows] duration-300 ease-out xl:hidden', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <ul className={cn('mx-4 mb-4 space-y-1 rounded-3xl p-3 sm:mx-6', GLASS_PILL)}>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => { setActive(l.href); setOpen(false) }}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white transition-colors',
                    active === l.href ? GLASS_LENS : 'text-white/85 hover:bg-white/10',
                  )}
                >
                  {l.label}
                  {active === l.href ? <span className="h-1.5 w-1.5 rounded-full bg-[#E5322B]" /> : null}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                href={SITE.website}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="block rounded-full bg-[#E5322B] px-6 py-3 text-center text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
              >
                Get a quote
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
