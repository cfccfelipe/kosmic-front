import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../containers/Home';

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Header />
				<div className='container'>
					<Routes>
						<Route exact path='/' element={<Home />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default AppRouter;
