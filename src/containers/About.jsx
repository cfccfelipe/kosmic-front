import NavbarNo from '../components/NavbarNo';
import backg from '../media/fondo.jpg';
import Ilustracion from "../media/LogoMaterial.svg";


const Home = () => {
	const st = {
		backgroundImage: `url(${backg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	};

	return (
		<div className='home-bg flexcenter' style={st}>
			<NavbarNo />

			<div className='home-main about-mn flexcenter'>
				<div className='flexcenter columnlm-2'>

                    <div className="flexcenter">
                        <img src={Ilustracion} alt="Ilustracion de un toro" />
                    </div>

                    <div>
                        <p>
                            Esta WebApp Fue creada en la hackaton del
                            curso de MisionTic 2021 de la Universidad de 
                            Medellin, Fue realizada por los siguientes 
                            desarrolladores:
                        </p>

                        <ul>
                            <li>Brayan S. Chavarro</li>
                            <li>Carlos Felipe Cortes</li>
                            <li>Juan Carlos Orozco</li>
                            <li>Katherine Arias</li>
                        </ul>
                    </div>

				</div>
			</div>
		</div>
	);
};
export default Home;
