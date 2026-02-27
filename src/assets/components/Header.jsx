import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setMenuActive(!menuActive);

  // Close menu when clicking a link
  const closeMenu = () => setMenuActive(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-container" style={{ fontFamily: "'Nata Sans', sans-serif" }}>
        {/* Logo goes back to home */}
        <Link to="/" className="logo" onClick={closeMenu}>
          Igor Lopes
        </Link>

        <ul className={`nav-menu ${menuActive ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/works" className="nav-link" onClick={closeMenu}>
              Work
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="contact-btn" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile burger menu */}
        <div
          className={`mobile-toggle ${menuActive ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
