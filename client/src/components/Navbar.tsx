import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LiamLogo from "../assets/LiamLogo.png";

const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/education", label: "Education" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
]

function Navbar() {
    return (
        <header>
            <nav className="navigation" aria-label="Main navigation">
                <NavLink to="/" className="logo-link" aria-label="Go to home page">
                    <img src={LiamLogo} alt="Liam Jackson" className="logo-img" />
                </NavLink>

                <div className="nav-links">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;