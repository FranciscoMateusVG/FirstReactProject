import React from 'react';
import Aux from './hof/Aux/Auxiliar';
import Layout from './hof/Layout/Layout';
import Home from './containers/Home/Home';

function App() {
	return (
		<Aux>
			<Layout>
				<Home />
			</Layout>
		</Aux>
	);
}

export default App;
