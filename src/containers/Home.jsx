import React from 'react';
import { GET_ALL_VETS } from '../gql/querysGql';
import { useQuery } from '@apollo/client';

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


    return (

        <div className="home-background"
             style = {{backgroundImage: `url(${backg})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center"
             }}>

        </div>
    )
}
export default Home;
