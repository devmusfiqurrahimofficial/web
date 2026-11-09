import { Button } from '@/Components/ui/button'
import { DreekkMark } from '@/Components/ui/dreekk-mark'
import { SITE } from '@/Components/UiElement/site'
import { NAV_LINKS } from './Navbar'

const SERVICES = [
  'App development',
  'Website development',
  'Special offers',
  'Digital marketing',
  'Promotional video',
  'Aerial video shooting',
]

// Offices as listed on dreekkinnovation.com
const OFFICES = [
  { country: 'Bangladesh', address: 'House M-100, West Merul Badda, Gulshan, Dhaka-1212', phone: SITE.phoneBD },
  { country: 'United States', address: '7515 White Barnwood Ct, Cypress, TX 77433', phone: SITE.phoneUS },
]

const tel = (p) => `tel:${p.replace(/[^\d+]/g, '')}`

const Icon = {
  facebook: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.25-1.5 1.55-1.5h1.6V4.2a21 21 0 0 0-2.35-.12c-2.33 0-3.92 1.42-3.92 4.03v2.29H7.75v3.1h2.63V21z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.6 5.2 2 2 0 0 1 4.6 3h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.6 10.9a16 16 0 0 0 4.5 4.5l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
}

const SOCIAL = [
  { label: 'Facebook', href: SITE.facebook, icon: Icon.facebook, external: true },
  { label: 'Website', href: SITE.website, icon: Icon.globe, external: true },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: Icon.mail },
]

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Heading({ children }) {
  return <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{children}</h3>
}

const linkCls = 'text-muted-foreground transition-colors hover:text-foreground'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative isolate scroll-mt-16 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* call to action */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-foreground/10 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Let’s work together</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Have a project in mind?{' '}
              <span className="bg-gradient-to-r from-[#ff8a80] to-[#E5322B] bg-clip-text text-transparent">Let’s build it.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell us what you are building. We reply within one business day with next steps and a rough scope.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold shadow-[0_14px_40px_-12px_rgba(229,50,43,.75)]">
              <a href={SITE.website} {...ext}>Start a project {Icon.arrow}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 bg-transparent px-7 font-semibold hover:bg-foreground/10 hover:text-foreground">
              <a href={`mailto:${SITE.email}`}>Email us</a>
            </Button>
          </div>
        </div>

        {/* columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <DreekkMark className="h-10" />
              <span className="font-display text-xl font-bold tracking-tight">
                Dreekk <span className="font-medium text-foreground/70">Innovation</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              A creative and software agency building apps, websites, marketing and video for brands that want to move.
              Based in Dhaka and Texas.
            </p>
            <ul className="mt-6 flex gap-3">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    {...(s.external ? ext : {})}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Heading>Company</Heading>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}><a href={l.href} className={linkCls}>{l.label}</a></li>
              ))}
              <li><a href={SITE.website} {...ext} className={linkCls}>Our work</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Heading>Services</Heading>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s}><a href="#services" className={linkCls}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Heading>Contact</Heading>
            <ul className="mt-5 space-y-6">
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 break-all font-medium text-foreground transition-colors hover:text-primary">
                  {Icon.mail} {SITE.email}
                </a>
              </li>
              {OFFICES.map((o) => (
                <li key={o.country} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">{o.country}</p>
                  <p className="flex gap-2 text-sm leading-relaxed text-muted-foreground">{Icon.pin}<span>{o.address}</span></p>
                  <a href={tel(o.phone)} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {Icon.phone} {o.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="-mb-[0.16em] bg-gradient-to-b from-primary/40 to-transparent bg-clip-text text-center font-display text-[21vw] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.12)]">
          DREEKK
        </p>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-foreground/10 bg-background/80 backdrop-blur">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground sm:flex-row lg:px-8">
          <p>© {year} Dreekk Innovation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={SITE.website} {...ext} className="hidden transition-colors hover:text-foreground sm:inline">{SITE.websiteLabel}</a>
            <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
              Back to top {Icon.up}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
