import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gestores from '../containers/Gestores';
import Veterinarios from '../containers/Veterinarios';
import Home from '../containers/Home';
import UpdateVet from '../containers/updateVet';
import Navbar from '../components/navbar';
import Report from '../containers/Report';
import Bovinos from '../containers/bovinos';
import UpdateBovine from '../containers/UpdateBovine';
import Records from '../containers/Records';
import Treament from '../containers/Treament';

const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/gestores' element={<Gestores />} />
				<Route exact path='/veterinarios' element={<Veterinarios />} />
				<Route exact path='/vetActualizar/:id' element={<UpdateVet />} />
				<Route exact path='/report' element={<Report />} />
				<Route exact path='/bovinos' element={<Bovinos />} />
				<Route exact path='/bovino/:id' element={<UpdateBovine />} />
				<Route exact path='/anomalias/:id' element={<Records />} />
				<Route exact path='/anomalia/:record/:bovine' element={<Treament />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
