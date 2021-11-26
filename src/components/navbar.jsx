import {Link} from "react-router-dom";

const Navbar = () => {




    return (
        <nav className="navbar-main">

            <div className="logo-container">
                

            </div>
        
            <div className="redirects">
                <Link to="/gerentes">Gerentes </Link>
                <Link to="/login">Login </Link>
            </div>
        </nav>
    )
}

export default Navbar;

