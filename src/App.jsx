import React from 'react';
import "./style.css";
import AppRouter from './routers/AppRouter';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
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
