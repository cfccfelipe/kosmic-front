import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_VETS } from '../gql/querysGql';
import { useParams } from 'react-router-dom';
import useInput from '../hooks/useInput';
import InputText from '../components/textInput';
import {useEffect, useState} from 'react';

const UpdateVet = () => {
	const { data, loading, error } = useQuery(GET_ALL_VETS);
	const { id } = useParams();
    
    const [idsend, setId] = useState('');
    const [fullname, setFName] = useState("");                                               
    const [email, setEmail] = useState("");                                                  
    const [phone, setPhone] = useState(0);                                                   
    const [clinic, setClinic] = useState(""); 

    const setData = () => {
        let user = data?.getAllVets.filter(el => el._id === id)[0];
        setEmail(user.email);
        setClinic(user.clinic);
        setFName(user.fullname);
        setPhone(user.id);
    }


    useEffect(() =>{
        if(!loading && data)
    {
        setTimeout(setData, 1000);
    }
    },[]);

    const enviar = e => {
        e.preventDefault();


    }


    return(                                                                                  
        <div className="page-container2">                                                    
            <div className="columncontainer flexcenter">
                <form className="flexcenter"onSubmit="" > 

                    <br/>
                    <br/>
                    <h2>Actualiza a {fullname}</h2>                                   


                    <p>Correo Electronico</p>                                                
                    <InputText setter={ e => setEmail(e.target.value)} val={email} />                              
                    <br/>
                    <br/>
                    <br/>

                    <p>Numero de celular</p>                                                 
                    <InputText setter={ e => setPhone(e.target.value)} val={phone} />                              
                    <br/>
                    <br/>

                    <p>Nombre de Clinica asociada</p>                                        
                    <InputText setter={ e => setClinic(e.target.value)} val={clinic} />                            
                    <br/>
                    <br/>
                    <br/>

                    <button className="submitbtn"> Envia el registro </button> 
                    <br/>
                    <br/>
                </form>                                                                      
            </div>                                                                           
        </div>                                                                               
    )                                                                                        
}



export default UpdateVet;
