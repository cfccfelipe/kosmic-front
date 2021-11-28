import { Link } from 'react-router-dom';

const MenuDes = (props) => {
	const url = props.actualizar.split('/');

	return (
		<div className='centered-menu flexcenter'>
			<h3>{props.name}</h3>

			{props.children}
			<div className='button-cont'>
				<button className='button-green btlf'>
					<Link to={`/${url[1]}/${url[2]}`}>Actualizar</Link>
				</button>
				<button className='button-green' onClick={props.eliminar}>
					{' '}
					Eliminar{' '}
				</button>
				<button className='button-green btrg' onClick={props.salir}>
					{' '}
					Salir{' '}
				</button>
			</div>
		</div>
	);
};

export default MenuDes;
