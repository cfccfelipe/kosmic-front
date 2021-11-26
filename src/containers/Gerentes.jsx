import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { GET_ALL_VETS } from '../gql/querysGql';
import { useQuery } from '@apollo/client';


const Gerentes = () => {

    

    const Content = () => {

        return(

            <div className="page-container flexcenter">
                
                <h2>Lista de gerentes</h2>

                <div className="info-container">
                    
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

export default Gerentes;

