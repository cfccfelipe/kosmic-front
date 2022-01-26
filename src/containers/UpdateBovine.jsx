import { GET_ALL_BOVINE } from '../gql/querysGql';
import { UPDATE_BOVINE_BY_ID } from '../gql/mutationsGql';
import { useMutation } from '@apollo/client';
import useInput from '../hooks/useInput';
import InputText from '../components/textInput';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';

const UpdateBovine = () => {
	const { id } = useParams();
	const UpdateState = () => {
		const [state, setState] = useInput('');

		const [updateBovineById, { data, loading, error }] =
			useMutation(UPDATE_BOVINE_BY_ID);

		const enviar = (e) => {
			e.preventDefault();

			updateBovineById({
				variables: {
					id: id,
					state: state
				}
			});
			if (error) {
				alert(error);
			} else {
				alert('Actualizado');
			}
		};

		if (loading) return 'Creando...';
		if (error) return <pre>{error.message}</pre>;

		return (
			<div className='page-container2' style={{height: "950px"}}>
				<div className='columncontainer flexcenter'>
					<form className='flexcenter' style={{padding: "150px 0px"}} onSubmit={enviar}>
						<h2>Nuevo estado</h2>

						<select
							className='form-select'
							onChange={setState}
							value={state}
							aria-label='Default select example'
						>
							<option value='Saludable'>Saludable</option>
							<option value='Enfermo'>Enfermo</option>
							<option value='Muerto'>Muerto</option>
						</select>
						<p></p>
						<div class='btn-group' role='group' aria-label='Basic example'>
							<button className='btn btn-success'> Guardar</button>
							<Link to={'/bovinos'}>
								<button type='button' class='btn btn btn-success'>
									Volver
								</button>
							</Link>
						</div>
						<p></p>
					</form>
				</div>
					<Footer />
			</div>
		);
	};

	return (

			<UpdateState />
	);
};

export default UpdateBovine;
