import React from 'react';
import Aux from './hof/Aux/Auxiliar';
import Layout from './hof/Layout/Layout';
import Home from './containers/Home/Home';
import ModoAnalista from './containers/ModoAnalista/ModoAnalista';
import { Route } from 'react-router-dom';

function App() {
	return (
		<Aux>
			<Layout>
				<Route path='/' exact component={Home} />
				<Route path='/modoanalista' exact component={ModoAnalista} />
			</Layout>
		</Aux>
	);
}

export default App;
