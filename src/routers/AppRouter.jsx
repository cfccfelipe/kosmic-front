import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gerentes from '../containers/Gerentes';
import Veterinarios from '../containers/Veterinarios';
import Home from '../containers/Home';
import UpdateVet from '../containers/updateVet';
import Navbar from '../components/navbar';

const AppRouter = () => {
	return (
		<Router>
            <Navbar />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/gerentes' element={<Gerentes />} />
				<Route exact path='/veterinarios' element={<Veterinarios />} />
				<Route exact path='/vetActualizar/:id' element={<UpdateVet />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
