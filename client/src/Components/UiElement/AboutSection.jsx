import { motion } from 'framer-motion'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { GlassLogoImage } from '@/Components/ui/glass-logo'
import { SITE } from './site'

// Figures published on dreekkinnovation.com
const STATS = [
  { value: '120+', label: 'Projects delivered' },
  { value: '40+', label: 'Brands served' },
  { value: '7', label: 'Years running' },
  { value: '12', label: 'People in-house' },
]

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const ICONS = {
  app: <Svg><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></Svg>,
  web: <Svg><rect x="2.5" y="4" width="19" height="15" rx="2" /><path d="M2.5 8.5h19M6 6.25h.01M8.5 6.25h.01" /><path d="m10 12.5-2 2 2 2M14 12.5l2 2-2 2" /></Svg>,
  offer: <Svg><path d="M3 12.6V4.5A1.5 1.5 0 0 1 4.5 3h8.1a1.5 1.5 0 0 1 1 .44l7 7a1.5 1.5 0 0 1 0 2.12l-8.1 8.1a1.5 1.5 0 0 1-2.12 0l-7-7a1.5 1.5 0 0 1-.38-.56Z" /><circle cx="8" cy="8" r="1.5" /></Svg>,
  marketing: <Svg><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M15 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /></Svg>,
  video: <Svg><rect x="2.5" y="5" width="14" height="14" rx="2" /><path d="m16.5 10 5-3v10l-5-3" /></Svg>,
  drone: <Svg><circle cx="5" cy="5" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" /><rect x="9.5" y="9.5" width="5" height="5" rx="1.5" /></Svg>,
  globe: <Svg><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5Z" /></Svg>,
  facebook: <Svg><path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5v7H14v-7h2.6l.4-3.5h-3V8.9a.9.9 0 0 1 .5-.9Z" /></Svg>,
  mail: <Svg><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3 6.5 9 6.5 9-6.5" /></Svg>,
  phone: <Svg><path d="M21 16.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.6 5.2 2 2 0 0 1 4.6 3h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.6 10.9a16 16 0 0 0 4.5 4.5l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2Z" /></Svg>,
  arrow: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>,
}

const SERVICES = [
  { icon: 'app', title: 'App development', text: 'iOS and Android apps, designed, built and launched to the stores.' },
  { icon: 'web', title: 'Website development', text: 'Fast, responsive websites, e-commerce stores and web apps that convert.' },
  { icon: 'offer', title: 'Special offers', text: 'Bundled launch packages for new brands. Ask us about this month’s offer.' },
  { icon: 'marketing', title: 'Digital marketing', text: 'Social media, Meta and Google ads, and SEO, with tracking that proves results.' },
  { icon: 'video', title: 'Promotional video', text: 'Ad films, reels and product videos, from script to final edit.' },
  { icon: 'drone', title: 'Aerial video shooting', text: 'Cinematic drone footage for real estate, events, resorts and brand films.' },
]

const CONTACT = [
  { icon: 'globe', label: 'Website', value: SITE.websiteLabel, href: SITE.website, external: true },
  { icon: 'facebook', label: 'Facebook', value: SITE.facebookLabel, href: SITE.facebook, external: true },
  { icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'phone', label: 'Bangladesh · USA', value: `${SITE.phoneBD}\n${SITE.phoneUS}`, href: `tel:${SITE.phoneBD.replace(/\s/g, '')}` },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
}

export default function AboutSection() {
  return (
    <section id="about" className="relative isolate scroll-mt-16 overflow-hidden bg-background py-24 text-foreground sm:py-32">
      {/* decor: red hairline, glows and a small glass mark */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#E5322B]/15 blur-[120px]" />

      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* intro + stats */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <Badge variant="outline" className="border-primary/40 bg-primary/10 px-4 py-1.5 uppercase tracking-[0.18em] text-foreground">
              Who we are
            </Badge>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              One team for the{' '}
              <span className="bg-gradient-to-r from-[#ff5a52] to-[#BD0F1A] bg-clip-text text-transparent">whole picture.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Dreekk Innovation is a creative and software agency with offices in Dhaka and Texas. We design, build and market
              apps and websites, and shoot the videos that launch them, so your brand is handled by one team from start to finish.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7 font-semibold shadow-[0_14px_40px_-12px_rgba(229,50,43,.7)]">
                <a href={SITE.website} target="_blank" rel="noopener noreferrer">
                  Visit our website {ICONS.arrow}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 bg-transparent px-7 font-semibold hover:bg-foreground/10 hover:text-foreground">
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">
                  Follow on Facebook
                </a>
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute -right-6 -top-16 -z-10 w-48 rotate-6 opacity-60 sm:w-64">
              <GlassLogoImage />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {STATS.map((s, i) => (
                <motion.div key={s.label} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={reveal}>
                  <Card className="group relative overflow-hidden rounded-2xl border-foreground/10 bg-foreground/[0.04] p-6 text-foreground backdrop-blur-xl transition-colors hover:border-primary/50 sm:p-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                    <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/40" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* services */}
        <div className="mt-24 sm:mt-32">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">What we do</p>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Six services, built to work together.</h3>
            </div>
            <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary">
              All services {ICONS.arrow}
            </a>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
                <Card className="group h-full rounded-2xl border-foreground/10 bg-card p-7 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_60px_-30px_rgba(229,50,43,.8)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-[#ff5a52] ring-1 ring-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {ICONS[s.icon]}
                  </div>
                  <h4 className="mt-5 font-display text-lg font-bold">{s.title}</h4>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* more information */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal} className="mt-24 sm:mt-32">
          <Card className="relative overflow-hidden rounded-3xl border-primary/30 bg-gradient-to-br from-[#1a0507] via-card to-card p-8 text-card-foreground sm:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-[90px]" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Want to know more?</h3>
                <p className="mt-4 text-lg text-muted-foreground">
                  Visit our website for case studies and full service details, or follow our Facebook page for our latest work.
                  We reply within one business day.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACT.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-start gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 transition-colors hover:border-primary/60 hover:bg-primary/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      {ICONS[c.icon]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                      <span className="mt-0.5 block whitespace-pre-line break-words text-sm font-medium text-foreground group-hover:text-white">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
