import React from 'react';
import Aux from './hof/Auxiliar';
import Layout from './components/Layout/Layout';
import Acoes from './containers/Acoes';

function App() {
  return (
    <Aux>
      <Layout>
        <Acoes />
      </Layout>
    </Aux>
  );
}

export default App;
