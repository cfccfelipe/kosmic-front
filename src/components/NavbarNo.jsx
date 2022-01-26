import { Link } from 'react-router-dom';
import ToroLogo from '../media/LogoToroNuevo.svg';

const NavbarNo = () => {
	return (
		<nav className='navbar-main'>
			<Link to='/' className='logo-container'>
				<img alt='logo-toro' src={ToroLogo} />
			</Link>

			<div className='redirects'>
				<Link to='/report'>Ingresar </Link>
				<Link to='/home'>Inicio </Link>
				<Link to='/'>About </Link>
			</div>
		</nav>
	);
};

export default NavbarNo;
