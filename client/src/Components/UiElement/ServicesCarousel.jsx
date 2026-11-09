import DishOrbitCarousel from '@/Components/ui/dish-orbit-carousel'

const WEBSITE = 'https://www.dreekkinnovation.com'
const FACEBOOK = 'https://www.facebook.com/dreekkinnovation'
const STUDIO = 'Dreekk Innovation · Dhaka & Texas'

// Brand palette, taken from dreekkinnovation.com
const RED = '#E5322B'
const YELLOW = '#FFCC00'

const services = [
  {
    eyebrow: '✦ What we build',
    title: 'Mobile',
    subtitle: 'Apps',
    label: 'App development',
    image: '/services/app-development.svg',
    alt: 'Illustration of a phone showing an app interface',
    badge: '01',
    chef: 'iOS & Android',
    kitchen: STUDIO,
    description:
      'Smooth, reliable mobile apps, from UX and UI design through development, testing and store launch.',
    ingredients: ['UI/UX design', 'iOS & Android', 'Backend & API', 'Store launch', 'Ongoing support'],
    accent: RED,
  },
  {
    eyebrow: '✦ What we build',
    title: 'Custom',
    subtitle: 'Websites',
    label: 'Website development',
    image: '/services/website-development.svg',
    alt: 'Illustration of a website in a browser window with a cursor',
    badge: '02',
    chef: 'Web & e-commerce',
    kitchen: STUDIO,
    description:
      'Fast, responsive websites and web apps, designed and built to turn visitors into customers.',
    ingredients: ['Web design', 'Development', 'E-commerce', 'SEO-ready build', 'Analytics setup'],
    accent: YELLOW,
  },
  {
    eyebrow: '✦ Limited-time offer',
    title: 'Special',
    subtitle: 'Offers',
    label: 'Special offers',
    image: '/services/special-offers.svg',
    alt: 'Illustration of a red price tag with a percent sign',
    badge: '03',
    chef: 'Launch bundle',
    kitchen: STUDIO,
    description:
      'Bundle a website, social media setup and launch ads into one package at a special price. Ask us about this month’s offer.',
    ingredients: ['Website', 'Social media setup', 'Launch ads', 'Promo video', 'One team'],
    accent: RED,
  },
  {
    eyebrow: '✦ How we grow you',
    title: 'Digital',
    subtitle: 'Marketing',
    label: 'Digital marketing',
    image: '/services/digital-marketing.svg',
    alt: 'Illustration of a megaphone next to a rising bar chart',
    badge: '04',
    chef: 'Ads, social & SEO',
    kitchen: STUDIO,
    description:
      'Social media, paid ads and SEO that reach the right people, with tracking that shows what works.',
    ingredients: ['Social media', 'Meta & Google ads', 'SEO', 'Pixel & GTM setup', 'Reporting'],
    accent: YELLOW,
  },
  {
    eyebrow: '✦ What we shoot',
    title: 'Promotional',
    subtitle: 'Videos',
    label: 'Promotional video',
    image: '/services/promotional-video.svg',
    alt: 'Illustration of a film clapperboard with a play button',
    badge: '05',
    chef: 'Promo & ad films',
    kitchen: STUDIO,
    description:
      'Ad films, reels and product videos: scripted, shot and edited for social media and the web.',
    ingredients: ['Concept & script', 'Shooting', 'Editing', 'Motion graphics', 'Reels & ads'],
    accent: RED,
  },
  {
    eyebrow: '✦ What we shoot',
    title: 'Aerial',
    subtitle: 'Drone video',
    label: 'Aerial video shooting',
    image: '/services/aerial-video.svg',
    alt: 'Top-down illustration of a camera drone',
    badge: '06',
    chef: 'Drone filming',
    kitchen: STUDIO,
    description:
      'Cinematic drone footage for real estate, events, resorts and brand films, shot and edited by our team.',
    ingredients: ['Aerial footage', 'Real estate', 'Events', 'Brand films', 'Color grading'],
    accent: YELLOW,
  },
]

const labels = {
  region: 'Dreekk Innovation services',
  pager: 'Choose a service',
  play: 'Facebook page',
  order: 'Visit website',
  overview: 'Overview',
  ingredients: 'What you get',
  previous: 'Previous service',
  next: 'Next service',
  item: 'Service',
}

// Light "paper" theme with ink text, matching the site's body sections
const theme = {
  '--color-background': '#f5f5f4',
  '--color-foreground': '#101014',
  '--color-primary': RED,
  '--color-muted-foreground': '#69727d',
  '--dsh-font': "'Poppins', 'Roboto'",
}

const open = (url) => window.open(url, '_blank', 'noopener,noreferrer')

export default function ServicesCarousel() {
  return (
    <section id="services" className="bg-[#f5f5f4] pt-[var(--carousel-offset)]" style={theme} aria-label="Our services">
      <DishOrbitCarousel
        dishes={services}
        height="calc(100svh - var(--carousel-offset))"
        scrollDriven={false}
        keyboard="global"
        labels={labels}
        backdrop="/services/backdrop.svg"
        fontSrc={null}
        hideTopButtons
        onPlay={() => open(FACEBOOK)}
        onOrder={() => open(WEBSITE)}
      />

    </section>
  )
}
