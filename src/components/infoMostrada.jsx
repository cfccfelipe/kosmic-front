import { Link } from 'react-router-dom';

const InfoMostrada = (props) => {
	return (
		<div onClick={props.method} className='info-display flexcenter'>
			<h3>{props.name}</h3>

			<p>Correo: {props.email} </p>

			<p>Telefono: {props.phone} </p>

		</div>
	);
};

export default InfoMostrada;
