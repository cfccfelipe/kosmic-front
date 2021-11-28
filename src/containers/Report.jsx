import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import Monitor from './monitor';
import useInput from "../hooks/useInput";
import InputText from "../components/textInput";
import {Button} from 'bootstrap';


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
    
    const [idVaca, setId] = useInput("");

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

<<<<<<< HEAD
	const FiltroVaca = () => {
		return (
			<div class='input-group mb-3'>
				<input
					className='input-group-text'
					id='filtrarbyid'
					placeholder={'ID de Vaca'}
				/>
				<button className='submitbtn'>Filtrar</button>
			</div>
		);
	};
=======
    const FiltroVaca = () => {

        return(
            <div className="filtro" >
                <input   
                    value={idVaca}
                    onChange={setId}
                    className="filtro-input"
                    />
                <button className="filtro-btn"> Busca Por id</button>
            </div>
        )
    }
>>>>>>> 7048800b19f6a691a64b3072fccb10ad62c2982f

    let vacaCells = [] 
    let filtVacas;

    if(idVaca === "")
    {
        vacaCells = vacas.map((vaca, i ) => (
            <tr key={i}>
                <td>{vaca.id}</td>
                <td>{vaca.tiempo}</td>
                <td>{vaca.variables.temperatura}</td>
                <td>{vaca.variables.cardiaco}</td>
                <td>{vaca.variables.respiracion}</td>
            </tr>
        ));
    }
    else
    {
        
        filtVacas = vacas.filter((vaca) => idVaca === vaca.id.slice(0, idVaca.length))

        console.log(filtVacas);

        vacaCells = filtVacas.map((vaca, i ) => (
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
		<div className='page-container2 chto-white flexcenter'>
<<<<<<< HEAD
			<div className='table-container flexcenter'>
				<h2>Reportes de signos Vitales</h2>
=======
			<div className="table-container flexcenter" >
                <h2>Reportes de signos Vitales</h2>
                <FiltroVaca />
                {idVaca !== "" && <Monitor DatosVitales={filtVacas} /> }
>>>>>>> 7048800b19f6a691a64b3072fccb10ad62c2982f
				<table className='this-table'>
					<tr>
						<th>ID Vaca</th>
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
<<<<<<< HEAD
					))}
=======
						{vacaCells}
>>>>>>> 7048800b19f6a691a64b3072fccb10ad62c2982f
				</table>
			</div>
		</div>
	);
};
export default Report;
