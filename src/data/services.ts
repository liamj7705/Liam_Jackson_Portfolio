export type Service = {
  id: string
  icon: string
  title: string
  description: string
  includes: string[]
}

export const services: Service[] = [
  {
    id: 'web-development',
    icon: '💻',
    title: 'Custom Website Design & Development',
    description:
      'A fast, mobile-friendly website built from scratch to fit your business and your brand.',
    includes: [
      'Responsive design for phones, tablets, and desktops',
      'Hosting and domain setup',
      'Clean, accessible code',
    ],
  },
  {
    id: 'maintenance',
    icon: '🛠️',
    title: 'Website Maintenance & Updates',
    description:
      'Ongoing support so your site stays current, working, and secure after launch.',
    includes: [
      'Content and design updates',
      'Bug fixes and troubleshooting',
      'Long-term support from the person who built it',
    ],
  },
  {
    id: 'cms-forms',
    icon: '📝',
    title: 'Content Management & Contact Forms',
    description:
      'Tools that let you update your own site and let customers reach you easily.',
    includes: [
      'Working contact forms that email you inquiries',
    ],
  },
  {
    id: 'local-seo',
    icon: '🔎',
    title: 'Local SEO & Google Visibility',
    description:
      'Help local customers find your business when they search online.',
    includes: [
      'Google Search Console and sitemap setup',
      'Google Business Profile setup',
      'On-page basics for local search',
    ],
  },
]