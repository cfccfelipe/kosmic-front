import React from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL_VETS } from '../gql/querysGql';
import { useQuery } from '@apollo/client';
import backg from "../media/fondo.jpg";

const ShowVets = () => {
	const { data, loading, error } = useQuery(GET_ALL_VETS);
	if (loading) return 'Loading...';
	if (error) return <pre>{error.message}</pre>;

	return (
		<div>
			<h1>Agroindustrial App</h1>

			<div class='row'>
				{loading
					? 'Loading'
					: data?.getAllVets.map((element, index) => {
							return (
								<div key={index} className='col-4'>
									{element.fullname}
									{element.email}
									{element.phone}
								</div>
							);
					  })}
			</div>
		</div>
	);
};


const Home = () => {


    const st = {backgroundImage: `url(${backg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"};

    return (

        <div className="home-bg flexcenter" style={st}>

                <div className="home-main flexcenter">
                    <div className="whitestr flexcenter">

                        <h2>Bienvenido a Kosmic</h2>
                        <br />
                        <Link to="/gerentes">Ir a gestion de gerentes</Link>
                        <Link to="/login">Ir a login</Link>
                        <Link to="/veterinarios">Ir a gestion de veterinarios</Link>

                    </div>
                </div>

        </div>
    )
}
export default Home;
