import { Link } from 'react-router-dom';
import ToroLogo from '../media/LogoToro.png';

const NavbarNo = () => {
	return (
		<nav className='navbar-main'>
			<Link to='/' className='logo-container'>
				<img alt='logo-toro' src={ToroLogo} />
			</Link>

			<div className='redirects'>
				<Link to='/report'>Ingresar </Link>
				<Link to='/'>Inicio </Link>
			</div>
		</nav>
	);
};

export default NavbarNo;
