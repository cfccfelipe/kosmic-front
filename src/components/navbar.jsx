import { Link } from 'react-router-dom';
import ToroLogo from '../media/LogoToro.png';

const Navbar = () => {
	return (
		<nav className='navbar-main'>
			<Link to='/' className='logo-container'>
				<img alt='logo-toro' src={ToroLogo} />
			</Link>

			<div className='redirects'>
				<Link to='/'>Salir </Link>

				<Link to='/veterinarios'>Veterinarios </Link>
				<Link to='/gestores'>Gestores </Link>
				<Link to='/bovinos'>Bovinos </Link>
				<Link to='/report'>Reportes </Link>
			</div>
		</nav>
	);
};

export default Navbar;
