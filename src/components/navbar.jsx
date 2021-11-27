import {Link} from "react-router-dom";
import ToroLogo from "../media/LogoToro.png";

const Navbar = () => {

    return (
        <nav className="navbar-main">

            <Link to="/" className="logo-container">
                <img alt="logo-toro" src={ToroLogo} />

            </Link>
        
            <div className="redirects">
                <Link to="/gerentes">Gerentes </Link>
                <Link to="/login">Login </Link>
                <Link to="/veterinarios">Veterinarios </Link>
            </div>
        </nav>
    )
}

export default Navbar;

