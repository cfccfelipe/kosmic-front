import React from 'react';
import "./style.css";
import AppRouter from './routers/AppRouter';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


//  'https://kosmic-back.herokuapp.com/',
//  "http://localhost:4000",


const client = new ApolloClient({
    uri: 'https://kosmic-back.herokuapp.com/',
	cache: new InMemoryCache()
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<AppRouter />
		</ApolloProvider>
	);
};

export default App;
