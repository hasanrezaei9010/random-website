import '../css/Navbar.css'
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/about">درباره ما</Link>
        <Link to="/contact">تماس با ما</Link>
        <Link to="/knowledge">دانستنی</Link>
        <Link to="/service">خدمات ما</Link>
        <Link to="/">خانه</Link>
      </nav>
    </header>
  );
}
