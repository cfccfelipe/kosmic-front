import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useMutation } from '@apollo/client';
import { NEW_VET } from '../gql/mutationsGql';
import { useState } from 'react';

const NewVet = () => {

	const [id, setId] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [clinic, setClinic] = useState('');

	const [newVet, { data, loading, error }] = useMutation(NEW_VET);

	if (loading) return 'Crendo...';
	if (error) return <pre>{error.message}</pre>;

	return (
		<div className='page-container flexcenter'>
			<Navbar />
			<h2>Nuevo Veterinario</h2>
			<form
				onSubmit={(e) => {
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
					console.log(phone);
					if (error) {
						alert(error);
					} else {
						alert('Agregado');
					}
					//setTimeout(window.location.reload(true), 30000);
				}}
			>
				<div>
					<label> Nombre del Veterinario</label>
					<input onChange={(e) => setFullname(e.target.value)} />
				</div>
				<div>
					<label> Numero de identificacion</label>
					<input onChange={(e) => setId(e.target.value)} />
				</div>
				<div>
					<label> Email</label>
					<input onChange={(e) => setEmail(e.target.value)} />
				</div>
				<label> Phone</label>
				<input onChange={(e) => setPhone(e.target.value)} />
				<label> clinic</label>
				<input onChange={(e) => setClinic(e.target.value)} />
				<button type='submit'>Crear</button>
			</form>
			<Footer />
		</div>
	);
};
export default NewVet;
