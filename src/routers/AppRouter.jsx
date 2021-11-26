import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gerentes from '../containers/Gerentes';
import Veterinarios from '../containers/Veterinarios';
import Home from '../containers/Home';
import VeterinarioDetail from '../containers/VeterinarioDetail';
import NewVet from '../containers/NewVet';

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/gerentes' element={<Gerentes />} />
				<Route exact path='/veterinarios' element={<Veterinarios />} />
				<Route exact path='/nuevoveterinario' element={<NewVet />} />
				<Route exact path='/veterinarios/:id' element={<VeterinarioDetail />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
