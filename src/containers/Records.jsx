import { GET_ALL_BOVINE } from '../gql/querysGql';
import {
	DELETE_BOVINE_BY_ID,
	NEW_BOVINE,
	NEW_RECORD_ON_BOVINE
} from '../gql/mutationsGql';
import { useQuery, useMutation } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import InputText from '../components/textInput';
import MenuDes from '../components/menuDesplegable';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

import ReturnArrow from "../media/GoBacc.svg"

const Records = () => {

	const { id } = useParams();
	const [isDisplayed, setDisplayed] = useState(false);
	const [focusId, setFId] = useState('');

	const desplegarMenu = (id) => {
		setFId(id);
		setDisplayed(!isDisplayed);
	};

	const FormNewRecord = () => {
		const [event_date, setEvent_date] = useInput('');
		const [temperature, setTemperature] = useInput('');
		const [heart_rate, setHeart_rate] = useInput('');
		const [breathing_rate, setBreathing_rate] = useInput('');

		const [newRecordOnBovineById, { data, loading, error }] =
			useMutation(NEW_RECORD_ON_BOVINE);

		const enviar = (e) => {
			e.preventDefault();

			newRecordOnBovineById({
				variables: {
					bovine_id: id,
					event_date: event_date,
					temperature: Number(temperature),
					heart_rate: Number(heart_rate),
					breathing_rate: Number(breathing_rate)
				}
			});

			if (error) {
				alert(error);
			} else {
				alert('Agregado');
			}
		};

		if (loading) return 'Creando...';
		if (error) return <pre>{error.message}</pre>;

		return (
			<div className='page-container2'>
				<div className='columncontainer flexcenter'>
					<Navbar />
					<form className='flexcenter' onSubmit={enviar}>
						<h2>Añade una nueva anomalia</h2>
						<p>Dia del evento</p>
						<InputText setter={setEvent_date} val={event_date} />

						<p>Temperatura</p>
						<InputText setter={setTemperature} val={temperature} />
						<p>Ritmo cardiaco</p>
						<InputText setter={setHeart_rate} val={heart_rate} />
						<p>Ritmo respiratorio</p>
						<InputText setter={setBreathing_rate} val={breathing_rate} />

						<button className='submitbtn'> Envia el registro </button>
					</form>
				</div>
				<Footer />
			</div>
		);
	};

	const Content = () => {
		let listRecodsOnBovine = [];
		const { data, loading, error } = useQuery(GET_ALL_BOVINE);

		if (loading) return 'Loading...';
		if (error) {
			console.log(error);
			return <pre>{error.message}</pre>;
		}
		const bovine = data?.getAllBovine.filter((item) => item.id === id)[0];
		console.log(bovine.records.id);
		listRecodsOnBovine = bovine.records.map((record, i) => {
			return (
				<InfoMostrada key={i} method={() => desplegarMenu(record.record_id.id)}>
					<h2>ID: {record.record_id.id} </h2>
					<p>Fecha: {record.record_id.event_date} </p>
					<p>Temperatura: {record.record_id.temperature} </p>
					<p>Ritmo Cardiaco : {record.record_id.heart_rate} </p>
					<p>Ritmo respiratorio: {record.record_id.breathing_rate} </p>
					<p>Tratamiento: {record.treatment} </p>
					<Link to={`/anomalia/${record.id}/${bovine.id}`}>
						<button type='button' class='btn btn-primary'>
							Añadir tratamiento
						</button>
					</Link>
				</InfoMostrada>
			);
		});
		// const MenuCompleto = () => {
		// 	const bovine = data?.getAllBovine.filter((item) => item.id === id)[0];

		// 	let { record_id } = bovine.records.filter((el) => el.id === focusId)[0];
		// 	console.log(record_id);

		// 	const [deleteBovineById, { data: deleteBovi }] =
		// 		useMutation(DELETE_BOVINE_BY_ID);

		// 	const deleteThis = () => {
		// 		deleteBovineById({
		// 			variables: { id: focusId }
		// 		});
		// 		if (deleteBovi) {
		// 			alert('Eliminado');
		// 		}
		// 	};

		// 	let LinksReports = records.map((el, i) => {
		// 		return (
		// 			<Link key={i} to={'/registros/' + el.member_id}>
		// 				{el.member_id}
		// 			</Link>
		// 		);
		// 	});

		// 	return (
		// 		<MenuDes
		// 			actualizar={`/bovino/${focusId}`}
		// 			salir={() => setDisplayed(!isDisplayed)}
		// 			eliminar={deleteThis}
		// 		>
		// 			{LinksReports}
		// 			<div class='btn-group' role='group' aria-label='Basic example'>
		// 				<div></div>
		// 			</div>
		// 		</MenuDes>
		// 	);
		// };
		return (
			<div className='page-container flexcenter'>

                <div className="header-with-button">
			        <Link to="/bovinos"><img alt="return arrow" src={ReturnArrow} /></Link>
                    <h2>Lista de Anomalias {id} </h2>
                </div>

				<div className='info-container'>{listRecodsOnBovine}</div>
				{/* {isDisplayed && <MenuCompleto />} */}
			</div>
		);
	};
	return (
		<>
			<Content />


			<FormNewRecord />
		</>
	);
};

export default Records;
