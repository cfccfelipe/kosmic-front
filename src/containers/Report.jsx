import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const Report = () => {
	const firebaseConfig = {
		apiKey: 'AIzaSyBXJbLSXFwYHFIiVV_OVbcfV8LVoegCLAM',
		authDomain: 'farmlab2022.firebaseapp.com',
		databaseURL: 'https://farmlab2022-default-rtdb.firebaseio.com',
		projectId: 'farmlab2022',
		storageBucket: 'farmlab2022.appspot.com',
		messagingSenderId: '467186642961',
		appId: '1:467186642961:web:2e661baa10c18d813041b0',
		measurementId: 'G-7MELHY60TX'
	};
	const app = initializeApp(firebaseConfig);
	const database = ref(getDatabase(app));
	const [data, setData] = useState();
	useEffect(() => {
		const obtenerData = async () => {
			const data = await get(child(database, 'bovinos'));
			setData(data.val());
		};
		obtenerData();
	}, []);
	const vacas = [];
	for (const bovino in data) {
		for (const tiempo in data[bovino]) {
			const signos = data[bovino][tiempo];
			vacas.push({
				id: bovino,
				tiempo: tiempo,
				variables: signos
			});
		}
	}

	return (
		<div className='page-container flexcenter'>
			<Navbar />
			<div>
				<h1>Signos vitales en tiempo real</h1>
				<table>
					<tr>
						<th>ID</th>
						<th>Hora</th>
						<th>Temperatura</th>
						<th>Ritmo Cardiaco </th>
						<th>Ritmo Respiratorio</th>
					</tr>

					{vacas.map((vaca) => (
						<tr>
							<td>{vaca.id}</td>
							<td>{vaca.tiempo}</td>
							<td>{vaca.variables.temperatura}</td>
							<td>{vaca.variables.cardiaco}</td>
							<td>{vaca.variables.respiracion}</td>
						</tr>
					))}
				</table>
			</div>

			<Footer />
		</div>
	);
};
export default Report;
