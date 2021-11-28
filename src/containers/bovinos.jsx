import { GET_ALL_BOVINE } from '../gql/querysGql';
import { NEW_VET, DELETE_BOVINE_BY_ID } from '../gql/mutationsGql';
import { useQuery, useMutation } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import InputText from '../components/textInput';
import MenuDes from '../components/menuDesplegable';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Bovinos = () => {
	const [isDisplayed, setDisplayed] = useState(false);
	const [focusId, setFId] = useState('');

	const desplegarMenu = (id) => {
		setFId(id);
		setDisplayed(!isDisplayed);
	};

	const FormNewBovi = () => {
		const [id, setId] = useInput('');
		const [fullname, setFName] = useInput('');
		const [email, setEmail] = useInput('');
		const [phone, setPhone] = useInput(0);
		const [clinic, setClinic] = useInput('');

		const [newVet, { data, loading, error }] = useMutation(NEW_VET);

		const enviar = (e) => {
			e.preventDefault();

			newVet({
				variables: {
					id: id,
					fullname: fullname,
					email: email,
					phone: Number(phone),
					clinic: clinic
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
						<h2>Añade una nueva vaca</h2>

						<p>Identificacion</p>
						<InputText setter={setId} val={id} />

						<p>Nombre completo</p>
						<InputText setter={setFName} val={fullname} />

						<p>Correo Electronico</p>
						<InputText setter={setEmail} val={email} />

						<p>Numero de celular</p>
						<InputText setter={setPhone} val={phone} />

						<p>Nombre de Clinica asociada</p>
						<InputText setter={setClinic} val={clinic} />

						<button className='submitbtn'> Envia el registro </button>
					</form>
					<Footer />
				</div>
			</div>
		);
	};

	const Content = () => {
		let listBovinos = [];
		const { data, loading, error } = useQuery(GET_ALL_BOVINE);

		if (loading) return 'Loading...';
		if (error) {
			console.log(error);
			return <pre>{error.message}</pre>;
		}
		listBovinos = data?.getAllBovine.map((bovi, i) => {
			return (
				<InfoMostrada key={i} method={() => desplegarMenu(bovi.id)}>
					<h3>{bovi.name} </h3>
					<p>Fecha de nacimiento : {Date(bovi.birth).split(' ', 4)} </p>
					<p>Estado : {bovi.state} </p>
				</InfoMostrada>
			);
		});

		const MenuCompleto = () => {
			let { name, state, id, birth, records } = data?.getAllBovine.filter(
				(el) => el.id === focusId
			)[0];

			const [deleteBovineById, { data: deleteBovi }] =
				useMutation(DELETE_BOVINE_BY_ID);

			const deleteThis = () => {
				deleteBovineById({
					variables: { id: focusId }
				});
				if (deleteBovi) {
					alert('Eliminado');
				}
			};

			let LinksReports = records.map((el, i) => {
				return (
					<Link key={i} to={'/registros/' + el.member_id}>
						{el.member_id}
					</Link>
				);
			});

			return (
				<MenuDes
					name={name}
					actualizar={`/bovino/${focusId}`}
					salir={() => setDisplayed(!isDisplayed)}
					eliminar={deleteThis}
				>
					<p>Estado : {state}</p>

					{LinksReports}
					<div class='btn-group' role='group' aria-label='Basic example'>
						<button type='button' class='btn btn-secondary'>
							Ver Anomalias
						</button>
					</div>
				</MenuDes>
			);
		};
		return (
			<div className='page-container flexcenter'>
				<h2>Lista de Bovinos</h2>

				<div className='info-container'>{listBovinos}</div>
				{isDisplayed && <MenuCompleto />}
			</div>
		);
	};
	return (
		<>
			<Content />
			<FormNewBovi />
		</>
	);
};

export default Bovinos;