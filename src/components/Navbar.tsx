import { NavLink } from "react-router-dom";
import "./Navbar.css";

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
            <nav className="navigation">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}

export default Navbar;