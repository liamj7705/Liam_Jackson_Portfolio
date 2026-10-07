export type Category = 'Client' | 'Personal' | 'School'

export type Project = {
  id: string
  title: string
  category: Category
  description: string
  tech: string[]
  image?: string
  liveUrl?: string
  codeUrl?: string
}

export const projects: Project[] = [
  {
    id: 'nb-landscape',
    title: 'NB Landscape Construction',
    category: 'Client',
    description:
      'A website for a landscaping company that I built and continue to maintain. The owner can upload new project photos through a content management system, and visitors can send inquiries through a contact form.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Formspree', 'Netlify'],
    liveUrl: 'https://nblandscapeconstruction.com/',
  },
  {
    id: 'jacksons-painting',
    title: "Jackson's Painting",
    category: 'Personal',
    description:
      'The website for my own painting business, built from scratch. I also set up Google Search Console, a sitemap, and a Google Business Profile to improve local search visibility.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    liveUrl: 'https://jacksonspaint.com',
  },
  {
    id: 'restaurant-site',
    title: 'Restaurant Website',
    category: 'School',
    description:
      'A multi-feature restaurant site with a menu, calendar, slideshow, dropdown navigation, and a mini-game, built to practice core front-end skills.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'queue-card-app',
    title: 'Queue Card Web App',
    category: 'School',
    description:
      'A web app built in a team of three using Agile processes and GitHub Copilot, with planning, task tracking, and iterative delivery.',
    tech: ['Agile', 'Jira', 'GitHub Copilot'],
  },
]