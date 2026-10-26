import { NavLink } from 'react-router-dom'
import './Footer.css'

//Decalare the links to each page of my portfolio
const pageLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/education', label: 'Education' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
]

//Declare the links to my social media profiles making it easier to update them in the future if needed
const socialLinks = [
    { href: 'https://github.com/liamj7705', label: 'GitHub' },
    { href: 'https://linkedin.com/in/liam-m-jackson', label: 'LinkedIn' },
    { href: 'mailto:liamjackson047@gmail.com', label: 'Email' },
]

function Footer() {

    //Calculate the year range for the copyright notice
    //If the current year is the same as the start year, only display the start year
    //Otherwise, display the range from the start year to the current year
    const startYear = 2026
    const currentYear = new Date().getFullYear()
    const year = startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`

    return (
        //Render the footer with the brand, page links, social links, and copyright notice
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <h2>Liam Jackson</h2>
                    <p>Software engineering student and freelance web developer.</p>
                </div>

                <nav className="footer-column" aria-label="Footer navigation">
                    <h3>Pages</h3>
                    <ul>
                        {pageLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to}>{link.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-column">
                    <h3>Connect</h3>
                    <ul>
                        {socialLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="footer-copy">© {year} Liam Jackson. All rights reserved.</p>
        </footer>
    )
}

export default Footer