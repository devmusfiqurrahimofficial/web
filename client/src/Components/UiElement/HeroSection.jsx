import LiquidMetalHero from '@/Components/ui/liquid-metal-hero'
import { SITE, openLink } from './site'

export default function HeroSection() {
  return (
    <div id="home">
    <LiquidMetalHero
      badge="✦ Dreekk Innovation"
      title={
        <>
          We build brands
          <br className="hidden sm:block" /> that{' '}
          <span className="bg-gradient-to-r from-[#ff9a92] via-[#ff4d45] to-[#E5322B] bg-clip-text text-transparent [filter:drop-shadow(0_0_24px_rgba(229,50,43,.55))]">
            move.
          </span>
        </>
      }
      subtitle="Apps, websites, digital marketing, promotional videos and aerial drone shoots. One team, from first idea to launch and growth."
      primaryCtaLabel="Start a project"
      secondaryCtaLabel="Facebook page"
      onPrimaryCtaClick={() => openLink(SITE.website)}
      onSecondaryCtaClick={() => openLink(SITE.facebook)}
      features={['Apps & Websites', 'Digital Marketing', 'Promo & Aerial Video']}
    />
    </div>
  )
}
