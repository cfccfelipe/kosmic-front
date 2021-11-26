import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useMutation, useQuery } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { GET_ALL_VETS } from '../gql/querysGql';
import { Link, useParams } from 'react-router-dom';
import { DELETE_VET_BY_ID } from '../gql/mutationsGql';
import { useState } from 'react';

const VeterinarioDetail = () => {
	const { data, loading, error } = useQuery(GET_ALL_VETS);
	const [deleteVetById, { data: deleteVet }] = useMutation(DELETE_VET_BY_ID);
	const { id } = useParams();
	const vet = loading
		? 'Loading'
		: data?.getAllVets.filter((vet) => vet._id === id)[0];
	if (loading) return 'Loading...';
	if (error) return <pre>{error.message}</pre>;

	return (
		<div className='page-container flexcenter'>
			<Navbar />
			<h2>Detalle del veterinario</h2>
			<InfoMostrada email={vet.email} phone={vet.phone} name={vet.fullname} />

			<button
				onClick={(e) => {
					e.preventDefault();
					deleteVetById({
						variables: {
							id: id
						}
					});
					if (deleteVet) {
						alert('Eliminado');
					}
				}}
			>
				Eliminar
			</button>
			<Footer />
		</div>
	);
};
export default VeterinarioDetail;
