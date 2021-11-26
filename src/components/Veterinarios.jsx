import Footer from "../components/Footer";
import Navbar from "./navbar";
import { GET_ALL_VETS } from '../gql/querysGql';
import { useQuery } from '@apollo/client';


const Veterinarios = () => {

    

    const Content = () => {

        let listVets = [];
        const { data, loading, error } = useQuery(GET_ALL_VETS);

        if (loading) return 'Loading...';
        if (error) return <pre>{error.message}</pre>;

        listVets = data?.getAllVets.map((veterinarios, i) => <p key={i} > 
            {veterinarios.fullname} </p>
        )
    
        return(

            <div className="page-container flexcenter">
                
                <h2>Lista de Veterinarios</h2>

                <div className="info-container">
                    {listVets}                    
                </div>
            </div>
        )
    }
    return (
        <>
            <Navbar />
            <Content />
            <Footer />
        </>
    )
}

export default Veterinarios;

