import { UPDATE_TREATMENT_BOVINE_BY_ID } from '../gql/mutationsGql';
import { useMutation } from '@apollo/client';
import useInput from '../hooks/useInput';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import InputText from '../components/textInput';

const Treatment = () => {
	const { record, bovine } = useParams();
	const UpdateTreatment = () => {
		const [treatment, setTreatment] = useInput('');

		const [updateTreatmentBovineById, { data, loading, error }] = useMutation(
			UPDATE_TREATMENT_BOVINE_BY_ID
		);

		const enviar = (e) => {
			e.preventDefault();

			updateTreatmentBovineById({
				variables: {
					id_bovine: bovine,
					id_record: record,
					treatment: treatment
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
			<div className='page-container2'>
				<div className='columncontainer flexcenter'>
					<Navbar />

					<form className='flexcenter' onSubmit={enviar}>
						<h2>Escribir tratamiento</h2>

						<InputText setter={setTreatment} val={treatment} />

						<button className='submitbtn'> Envia el registro </button>
					</form>
					<Link to={`/anomalias/${bovine}`}>
						<button>Volver</button>
					</Link>

					<Footer />
				</div>
			</div>
		);
	};

	return (
		<div className='page-container flexcenter'>
			<p></p>

			<UpdateTreatment />
		</div>
	);
};

export default Treatment;
