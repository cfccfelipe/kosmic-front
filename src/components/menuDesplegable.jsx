import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const MenuDes = (props) => {
	
    const url = props.actualizar.split('/');
    const [ centered, setCentered ] = useState(false);


    const cerrar = () => {
       
        setCentered(false);
        setTimeout( () => {props.salir()}, 200);

    }

    useEffect(() => setTimeout(500, setCentered(true)),[])

	return (
		<div className={ centered ? "centered-menu flexcenter": "centered-menu up flexcenter"}>
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
				<button className='button-green btrg' onClick={cerrar}>
					{' '}
					Salir{' '}
				</button>
			</div>
		</div>
	);
};

export default MenuDes;
