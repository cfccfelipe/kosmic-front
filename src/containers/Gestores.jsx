import { useMutation, useQuery } from '@apollo/client';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { GET_ALL_MANAGERS } from '../gql/querysGql';
import InfoMostrada from '../components/infoMostrada';
import { DELETE_MANAGER_BY_ID, NEW_MANAGER } from '../gql/mutationsGql';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import InputText from '../components/textInput';
import MenuDes from '../components/menuDesplegable';

const Gestores = () => {
	const [isDisplayed, setDisplayed] = useState(false);
	const [focusId, setFId] = useState('');

	const desplegarMenu = (id) => {
		setFId(id);
		console.log(id);
		setDisplayed(!isDisplayed);
	};
	const FormNewVet = () => {
		const [id, setId] = useInput('');
		const [name, setName] = useInput('');
		const [email, setEmail] = useInput('');
		const [phone, setPhone] = useInput(0);
		const [position, setPosition] = useInput(0);

		const [newManager, { data, loading, error }] = useMutation(NEW_MANAGER);

		const enviar = (e) => {
			e.preventDefault();

			newManager({
				variables: {
					id: id,
					name: name,
					email: email,
					phone: Number(phone),
					position: position
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
					<form className='flexcenter' onSubmit={enviar}>
						<h2>Registra un nuevo gestor</h2>

						<p>Identificacion</p>
						<InputText setter={setId} val={id} />

						<p>Nombre completo</p>
						<InputText setter={setName} val={name} />

						<p>Correo Electronico</p>
						<InputText setter={setEmail} val={email} />

						<p>Numero de celular</p>
						<InputText setter={setPhone} val={phone} />

						<p>Puesto o cargo</p>
						<InputText setter={setPosition} val={position} />

						<button className='submitbtn'> Envia el registro </button>
					</form>
				</div>
			</div>
		);
	};

	const Content = () => {
		let listManager = [];
		const { data, loading, error } = useQuery(GET_ALL_MANAGERS);

		if (loading) return 'Loading...';
		if (error) return <pre>{error.message}</pre>;

		listManager = data?.getAllManagers.map((gestores, i) => {
			return (
				<InfoMostrada
					key={i}
					method={() => desplegarMenu(gestores._id)} >

                <h2>{gestores.name} </h2>
                <p>Telefono : {gestores.phone} </p>
                <p>Correo : {gestores.email} </p>
				
                </InfoMostrada>
			);
		});

		const MenuCompleto = () => {
			let { name, position, id, email, phone } = data?.getAllManagers.filter(
				(el) => el._id === focusId
			)[0];

			const [deleteManagerById, { data: deleteManager }] =
				useMutation(DELETE_MANAGER_BY_ID);

			const deleteThis = () => {
				deleteManagerById({
					variables: { id: focusId }
				});
				if (deleteManager) {
					alert('Eliminado');
				}
			};

			return (
				<MenuDes
					name={name}
					actualizar={'/managerActualizar/' + focusId}
					salir={() => setDisplayed(!isDisplayed)}
					eliminar={deleteThis}
				>
					<p>Identificacion : {id}</p>
					<p>Numero telefonico : {phone}</p>
					<p>Email : {email}</p>
					<p>Clinica : {position}</p>
				</MenuDes>
			);
		};
		return (
			<div className='page-container flexcenter'>
				<h2>Lista de Gestores</h2>

				<div className='info-container'>{listManager}</div>
				{isDisplayed && <MenuCompleto />}
			</div>
		);
	};
	return (
		<>
			<Navbar />
			<Content />
			<FormNewVet />
		</>
	);
};
export default Gestores;
