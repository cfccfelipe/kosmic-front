import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Footer from '../components/Footer';
//import Header from '../components/Header';
import Home from '../containers/Home';

const AppRouter = () => {
	return (
		<Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
            </Routes>
		</Router>
	);
};

export default AppRouter;
