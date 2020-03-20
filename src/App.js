import React from 'react';
import Aux from './hof/Aux/Auxiliar';
import Layout from './hof/Layout/Layout';
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
