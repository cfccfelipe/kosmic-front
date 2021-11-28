import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Veterinarios from '../containers/Veterinarios';
import Home from '../containers/Home';
import UpdateVet from '../containers/updateVet';
import Navbar from '../components/navbar';
import Bovinos from '../containers/bovinos';

const AppRouter = () => {
	return (
		<Router>
            <Navbar />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/veterinarios' element={<Veterinarios />} />
				<Route exact path='/vetActualizar/:id' element={<UpdateVet />} />
				<Route exact path='/bovinos' element={<Bovinos />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
