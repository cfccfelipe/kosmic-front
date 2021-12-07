import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import Monitor from './monitor';
import useInput from '../hooks/useInput';

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

	const [idVaca, setId] = useInput('');

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

	const FiltroVaca = () => {
		return (
			<div className='filtro'>
				<input value={idVaca} onChange={setId} className='filtro-input' />
				<button className='filtro-btn'> Busca Por id</button>
			</div>
		);
	};

	let vacaCells = [];
	let filtVacas;

	if (idVaca === '') {
		vacaCells = vacas.map((vaca, i) => (
			<tr key={i}>
				<td>{vaca.id}</td>
				<td>{vaca.tiempo}</td>
				<td>{vaca.variables.temperatura}</td>
				<td>{vaca.variables.cardiaco}</td>
				<td>{vaca.variables.respiracion}</td>
			</tr>
		));
	} else {
		filtVacas = vacas.filter(
			(vaca) => idVaca === vaca.id.slice(0, idVaca.length)
		);

		console.log(filtVacas);

		vacaCells = filtVacas.map((vaca, i) => (
			<tr key={i}>
				<td>{vaca.id}</td>
				<td>{vaca.tiempo}</td>
				<td>{vaca.variables.temperatura}</td>
				<td>{vaca.variables.cardiaco}</td>
				<td>{vaca.variables.respiracion}</td>
			</tr>
		));
	}

	return (
        <>
            <div className='page-container2 chto-white flexcenter'>
                <div className='table-container flexcenter'>
                    <h2>Reportes de signos Vitales</h2>
                    <FiltroVaca />
                    {idVaca !== '' && <Monitor DatosVitales={filtVacas} />}

                    <table className='this-table'>
                        <tr>
                            <th>ID Vaca</th>
                            <th>Hora</th>
                            <th>Temperatura</th>
                            <th>Ritmo Cardiaco </th>
                            <th>Ritmo Respiratorio</th>
                        </tr>

                        {vacaCells}
                    </table>
                </div>
            </div>
            <Footer />
        </>
	);
};
export default Report;
