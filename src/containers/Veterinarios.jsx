import {  GET_ALL_VETS } from '../gql/querysGql';
import { NEW_VET, DELETE_VET_BY_ID  } from '../gql/mutationsGql';
import { useQuery, useMutation } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { useState } from 'react';
import useInput from "../hooks/useInput";
import InputText from "../components/textInput";
import MenuDes from '../components/menuDesplegable';

const Veterinarios = () => {


    const [isDisplayed, setDisplayed] = useState(false);                                         
    const [focusId, setFId] = useState("");                                                      

    const desplegarMenu = id =>{                                                                 
        setFId(id);                                                                              
        console.log(id);                                                                         
        setDisplayed(!isDisplayed);                                                              
    }   
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

                        <h2>Registra un nuevo veterinario</h2>                                   

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


		if (loading) return 'Loading...';
		if (error) return <pre>{error.message}</pre>;

		listVets = data?.getAllVets.map((veterinarios, i) => {
			return (
				<InfoMostrada
                    key={i}
                    method={() => desplegarMenu(veterinarios._id)}
				>
                    <h2>{veterinarios.fullname} </h2>
                    <p>Correo : {veterinarios.email} </p>
                    <p>Telefono : {veterinarios.email} </p>
                    
                </InfoMostrada>
			);
		});

        const MenuCompleto = () => {

            let {fullname, clinic, id, email, phone } = data?.getAllVets.filter(el => el._id ===focusId)[0]
            
	        const [deleteVetById, { data: deleteVet }] = useMutation(DELETE_VET_BY_ID);

            const deleteThis = () => {

                deleteVetById({
                    variables: { id: focusId }
                });
                if (deleteVet) {
                    alert('Eliminado');
                }
            }

            return(
                <MenuDes name={fullname} 
                    actualizar={"/vetActualizar/"+ focusId}
                    salir={() => setDisplayed(!isDisplayed)}
                    eliminar={deleteThis} >

                    <p>Identificacion : {id}</p>
                    <p>Numero telefonico : {phone}</p>
                    <p>Email : {email}</p>
                    <p>Clinica : {clinic}</p>

                </MenuDes>

            )
        }
		return (
			<div className='page-container flexcenter'>
				<h2>Lista de Veterinarios</h2>

				<div className='info-container'>{listVets}</div>
                    {isDisplayed && <MenuCompleto />}
			</div>
		);
	};
	return (
		<>
			<Content />
            <FormNewVet />
		</>
	);
};

export default Veterinarios;
