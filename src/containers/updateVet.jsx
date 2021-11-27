import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import { useMutation, useQuery } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { GET_ALL_VETS } from '../gql/querysGql';
import { useParams } from 'react-router-dom';
import { DELETE_VET_BY_ID } from '../gql/mutationsGql';
import { useState } from 'react';

const UpdateVet = () => {
	const { data, loading, error } = useQuery(GET_ALL_VETS);
	const [deleteVetById, { data: deleteVet }] = useMutation(DELETE_VET_BY_ID);
	const { id } = useParams();
    
    const FormNewVet = () => {                                                                   

	    const [id, setId] = useInput('');
        const [fullname, setFName] = useInput("");                                               
        const [email, setEmail] = useInput("");                                                  
        const [phone, setPhone] = useInput(0);                                                   
        const [clinic, setClinic] = useInput(""); 

	    const [newVet, { data, loading, error }] = useMutation(NEW_VET);

        const enviar = e => {
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
        }


        if (loading) return 'Creando...';
        if (error) return <pre>{error.message}</pre>;

        return(                                                                                  
            <div className="page-container2">                                                    
                <div className="columncontainer flexcenter">
                    <form className="flexcenter"onSubmit={enviar} >                                                          

                        <h2>Actualiza a</h2>                                   

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

                        <button className="submitbtn"> Envia el registro </button>                                        

                    </form>                                                                      
                </div>                                                                           
            </div>                                                                               
        )                                                                                        
    }

	const Content = () => {
		let listVets = [];
		const { data, loading, error } = useQuery(GET_ALL_VETS);


	const vet = loading
		? 'Loading'
		: data?.getAllVets.filter((vet) => vet._id === id)[0];
	if (loading) return 'Loading...';
	if (error) return <pre>{error.message}</pre>;

	return (
        <>
            <Navbar />
            <div className='page-container flexcenter'>
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
        </>
	);
};

export default UpdateVet;
