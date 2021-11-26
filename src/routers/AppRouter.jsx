import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gerentes from '../components/Gerentes';
import Home from '../containers/Home';

const AppRouter = () => {
	return (
		<Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/gerentes' element={<Gerentes />} />
            </Routes>
		</Router>
	);
};

export default AppRouter;
