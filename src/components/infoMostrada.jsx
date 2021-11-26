import { Link } from 'react-router-dom';

const InfoMostrada = (props) => {
	return (
		<div className='info-display flexcenter'>
			<h3>{props.name}</h3>

			<p>Correo: {props.email} </p>

			<p>Telefono: {props.phone} </p>
			<Link to={`/veterinarios/${props._id}`}>
				<button>Detalle</button>
			</Link>
		</div>
	);
};

export default InfoMostrada;
