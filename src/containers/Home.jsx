import React from 'react';
import { Link } from 'react-router-dom';
import NavbarNo from '../components/NavbarNo';
import backg from '../media/fondo.jpg';

const Home = () => {
	const st = {
		backgroundImage: `url(${backg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	};

	return (
		<div className='home-bg flexcenter' style={st}>
			<NavbarNo />
			<div className='home-main flexcenter'>
				<div className='whitestr flexcenter'>
					<h2>Bienvenido a Kosmic</h2>

					<br />
					<br />

					<p>
						{' '}
						Aplicacion de rastreo remoto de datos <br />
						fisiologicos del ganada con fines <br />
						Agropecuarios y veterinarios{' '}
					</p>
					<Link to='/report'>
						<button class='btn btn-success'>
							Ingresar
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Home;
