import {  GET_ALL_BOVINE } from '../gql/querysGql';
import { NEW_VET ,DELETE_BOVINE_BY_ID } from '../gql/mutationsGql';
import { useQuery, useMutation } from '@apollo/client';
import InfoMostrada from '../components/infoMostrada';
import { useState } from 'react';
import useInput from "../hooks/useInput";
import InputText from "../components/textInput";
import MenuDes from '../components/menuDesplegable';
import {Link} from 'react-router-dom';

const Bovinos = () => {


    const [isDisplayed, setDisplayed] = useState(false);                                         
    const [focusId, setFId] = useState("");                                                      

    const desplegarMenu = id =>{                                                                 
        setFId(id);                                                                              
        setDisplayed(!isDisplayed);                                                              
    }   
    
    const FormNewBovi = () => {

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

                        <h2>Añade una nueva vaca</h2>                                   

                        <p>Nombre</p>                                                   
                        <InputText setter={setFName} val={fullname} />                           

                        <p>Fecha de nacimiento</p>                                                
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
		let listBovinos = [];
		const { data, loading, error } = useQuery(GET_ALL_BOVINE);


		if (loading) return 'Loading...';
		if (error) {console.log(error); return <pre>{error.message}</pre>
        }
		listBovinos = data?.getAllBovine.map((bovi, i) => {
			return (
				<InfoMostrada
                    key={i}
                    method={() => desplegarMenu(bovi.id)}
				>
                    <h2>{bovi.name} </h2>
                    <p>Fecha de nacimiento : {bovi.birth} </p>
                    <p>Estado : {bovi.state} </p>

                </InfoMostrada>
			);
		});
        
        const MenuCompleto = () => {

            let {name, state, 
                id, birth, records } = data?.getAllBovine.filter(el => el.id ===focusId)[0]
            
	        const [deleteBovineById, { data: deleteBovi }] = useMutation(DELETE_BOVINE_BY_ID);

            const deleteThis = () => {

                deleteBovineById({
                    variables: { id: focusId }
                });
                if (deleteBovi) {
                    alert('Eliminado');
                }
            }

                console.log(records);
                let LinksReports = records.map((el, i) =>{
                 
             return <Link key={i} to={"/registros/"+ el.member_id}>
                        {el.member_id.event_date} 
                    </Link>
                }
            )


            return(
                <MenuDes name={name} 
                    actualizar={"/vetActualizar/"+ focusId}
                    salir={() => setDisplayed(!isDisplayed)}
                    eliminar={deleteThis} >

                    <p>Nombre : {name}</p>
                    <p>Estado : {state}</p>
                    <p>Fecha de nacimiento : {birth}</p>

                    {LinksReports}

                </MenuDes>

            )
        }
		return (
			<div className='page-container flexcenter'>
				<h2>Lista de Bovinos</h2>

				<div className='info-container'>{listBovinos}</div>
                {isDisplayed && <MenuCompleto />}
			</div>
		);
	};
	return <>	
        <Content />
        <FormNewBovi />
        </>
};

export default Bovinos;
